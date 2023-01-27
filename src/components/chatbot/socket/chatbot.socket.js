import SocketService from "../../../common/service/Socket/socket.service.js";
import ChatbotService from "../service/chatbot.service.js";

const PREFIX = 'chatbot:';

const service = new ChatbotService();
SocketService.io.on('connection', (socket) => {
  socket.on(`${PREFIX}ask`, async (data) => {
    try {
      const chatbot_response = await service.chatbot(data.current, data.previous);
      socket.emit(`${PREFIX}answer`, chatbot_response);
    } catch (error) {
      socket.emit(`${PREFIX}error`, error);
    }
  });
});

export default SocketService;
