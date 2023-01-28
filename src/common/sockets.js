import ChannelSocket from "../components/channel/socket/channel.socket.js";
import ChatbotSocket from "../components/chatbot/socket/chatbot.socket.js";
import UserSocket from "../components/user/socket/user.socket.js";
import NotificationSocket from "../components/notification/socket/notification.socket.js";

const sockets = {
  ChannelSocket,
  ChatbotSocket,
  UserSocket,
  NotificationSocket,
};

const register = () => {
  if (process.env.NODE_ENV === 'dev') {console.log("sockets registered");}
};

export default {
  register,
  sockets,
};
