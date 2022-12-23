import EmailEvent from "../components/email/event/email.event.js";
import NotificationEvent from "../components/notification/event/notification.event.js";

const events = {
  EmailEvent,
  NotificationEvent
};

const register = () => {
  if (process.env.NODE_ENV === 'dev') {console.log("events registered");}
};

export default {
  register,
  events,
};
