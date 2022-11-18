import SocketService from "../../../common/service/Socket/socket.service.js";
import ChannelService from "../service/channel.service.js";

const PREFIX = 'channel:';

SocketService.io.on('connection', (socket) => {
  socket.on(PREFIX + 'join', async (channelId) => {
    const channelService = new ChannelService(socket);

    try {
      await channelService.join(channelId);
    } catch (err) {
      await socket.emit(PREFIX + 'join:error', {message: err.message});
    }
  });
  socket.on(PREFIX + 'leave', async (channelId) => {
    const channelService = new ChannelService(socket);

    try {
      await channelService.leave(channelId);
    } catch (err) {
      await socket.emit(PREFIX + 'leave:error', {message: err.message});
    }
  });
});

export default SocketService;
