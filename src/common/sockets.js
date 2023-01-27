import ChannelSocket from "../components/channel/socket/channel.socket.js";
import ChatbotSocket from "../components/chatbot/socket/chatbot.socket.js";

const sockets = {
  ChannelSocket,
  ChatbotSocket,
};

const register = () => {
  if (process.env.NODE_ENV === 'dev') {console.log("sockets registered");}
};

export default {
  register,
  sockets,
};
