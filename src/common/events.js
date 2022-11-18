import EmailEvent from "../components/email/event/email.event.js";

const events = {
  EmailEvent,
};

const register = () => {
  if (process.env.NODE_ENV === 'dev') {console.log("events registered");}
};

export default {
  register,
  events,
};
