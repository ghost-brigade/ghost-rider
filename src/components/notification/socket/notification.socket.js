import SocketService from "../../../common/service/Socket/socket.service.js";

const PREFIX = 'notification:';

SocketService.io.on('connection', (socket) => {
  socket.on(`${PREFIX}send`, ({currentUser}, notificationData) => {
    if (currentUser.roles.includes('ROLE_SELLER') || currentUser.roles.includes('ROLE_ADMIN')) {
        socket.emit(`${PREFIX}receive`, {
            ...notificationData,
            'user': currentUser.firstname + ' ' + currentUser.lastname,
        });
    }
  });
});

export default SocketService;
