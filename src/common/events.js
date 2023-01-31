import EmailEvent from "../components/email/event/email.event.js";
import NotificationEvent from "../components/notification/event/notification.event.js";

const events = {
  EmailEvent,
  NotificationEvent
};

const register = () => {
  if (process.env.NODE_ENV === 'dev') {
    console.log('====== EVENT DEBUG ======');
    Object.entries(events).forEach(([name, event]) => {
      console.log(`Registering ${name} : ${event.listenerCount('send')} listeners`);
    });
    console.log('======== ====== ========\n');
  }
};

export default {
  register,
  events,
};
