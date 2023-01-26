import Controller from "../../../common/controller/controller.js";
import * as Response from "../../../common/service/Http/Response.js";
import MaintenanceRepository from "../../maintenance/repository/maintenance.repository.js";
import fs from "fs";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

class ChatbotController extends Controller {

  constructor() {
    super();
    this.repository = new MaintenanceRepository();
  }

  chatbot = async (req, res) => {
    const treePath = path.join(dirname(fileURLToPath(import.meta.url)), '..', 'tree.json');
    let tree = fs.readFileSync(treePath);
    tree = JSON.parse(tree);

    const {previous, current} = req.body;

    try {
      this.#checkCurrent({current, tree});
      this.#checkPrevious({current, previous, tree});
      this.#checkCurrentNodeIsInPrevious({previous, current, tree});
    } catch (error) {
      return Response.badRequest(req, res, error.message);
    }

    const currentTree = tree[current?.id];

    if (currentTree?.choices !== undefined) {
      return Response.ok(req, res, currentTree);
    }

    if (currentTree?.ask !== undefined) {
      const appointments = await this.repository.findAllByType(currentTree?.ask?.appointment);
      const appointmentsDateStrings = appointments.map(a => a.appointment.toDateString());
      const startDate = new Date();

      const availableDates = await this.#findAvailableDatesNotInAppointments(startDate, appointmentsDateStrings);

      currentTree['ask']['choices'] = availableDates;
      return Response.ok(req, res, currentTree);
    }

    if (currentTree?.save === true && currentTree?.last === true) {
      return Response.ok(req, res, "saved");
    }
  };

  #checkPrevious = ({current, previous, tree}) => {
    if (previous?.id === undefined && current?.id !== 'root') {
      if (previous?.data === undefined) {
        throw new Error('Invalid previous data');
      }

      if (tree[previous.id] === undefined) {
        throw new Error('Previous node not found');
      }
      throw new Error('Invalid previous node');
    }
  };

  #checkCurrent = ({current, tree}) => {
    if (current?.id === undefined) {
      throw new Error('Invalid current node');
    }

    if (current?.data === undefined && current.id !== 'root') {
      throw new Error('Invalid current data');
    }

    if (tree[current.id] === undefined) {
      throw new Error('Current node not found');
    }
  };

  #checkCurrentNodeIsInPrevious = ({previous, current, tree}) => {
    if (current?.id === 'root' || tree[current?.id]?.save === true && tree[current?.id]?.last === true) {
      return;
    }

    const previousNode = tree[previous.id];
    const isCurrentNodeInPrevious = previousNode.choices.find((choice) => choice.id === current.id);
    if (!isCurrentNodeInPrevious) {
      throw new Error('Current node is not in previous node');
    }
  };

  #findAvailableDatesNotInAppointments = (startDate, appointmentsDateStrings) => {
    const availableDates = [];

    /** Set friday date related to startDate */
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + (5 - startDate.getDay()));
    /** ------------------------------- */

    while (startDate <= endDate) {
      if (
        startDate.getDay() >= 1 && startDate.getDay() <= 5 &&
        appointmentsDateStrings.indexOf(startDate.toDateString()) === -1 &&
        new Date().toDateString() !== startDate.toDateString()
      ) {
        availableDates.push(new Date(startDate));
      }

      //console.log(startDate);

      startDate.setDate(startDate.getDate() + 1);
    }

    /**
     * search for next available week
     */
    if (availableDates.length === 0) {
      let nextStartDate = new Date();
      nextStartDate.setDate(endDate.getDate() + 1);
      while (nextStartDate.getDay() !== 1) {
        nextStartDate.setDate(nextStartDate.getDate() + 1);
      }
      return this.#findAvailableDatesNotInAppointments(nextStartDate, appointmentsDateStrings);
    }

    //availableDates.forEach(d => {d.setHours(0, 0, 0, 0)});
    return availableDates;
  };
}

export default new ChatbotController;
