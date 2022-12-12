import ChannelSocket from "../components/channel/socket/channel.socket.js";

const sockets = {
  ChannelSocket,
};

const register = () => {
  if (process.env.NODE_ENV === 'dev') {console.log("sockets registered");}
};

export default {
  register,
  sockets,
};
