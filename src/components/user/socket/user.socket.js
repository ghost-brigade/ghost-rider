import SocketService from "../../../common/service/Socket/socket.service.js";
import ConseillerService from "../service/ConseillerService.js";

const PREFIX = 'user:';

const service = ConseillerService;
SocketService.io.on('connection', (socket) => {
  socket.on(`${PREFIX}conseiller:connect`, async (user) => {
    if (user.roles.includes('ROLE_SELLER') || user.roles.includes('ROLE_ADMIN')) {
        service.connect(user);
        socket.emit(`${PREFIX}conseiller:update`, service.available);
    }
  });
  socket.on(`${PREFIX}conseiller:disconnect`, async (user) => {
    service.disconnect(user);
    socket.emit(`${PREFIX}conseiller:update`, service.available);
  });
});

export default SocketService;
