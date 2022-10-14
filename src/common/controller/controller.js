/**
 * Abstract method to be implemented by child classes
 */
class Controller {

  constructor() {
    if (this.constructor === Controller) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }
}

export default Controller;
