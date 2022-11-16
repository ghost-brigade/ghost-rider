import EmailEvent from "../components/email/event/email.event.js";

const events = {
  EmailEvent,
};

const register = () => {
  console.log("events registered");
};

export default {
  register,
  events,
};
