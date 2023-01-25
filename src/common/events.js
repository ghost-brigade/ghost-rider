import EmailEvent from "../components/email/event/email.event.js";
import ChabotEvent from "../components/chatbot/event/chabot.event.js";

const events = {
  EmailEvent,
  ChabotEvent,
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
