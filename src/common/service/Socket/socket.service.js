import {Server} from "socket.io";
import TokenService from "../../../components/security/service/jwt/token.service.js";
import UserRepository from "../../../components/user/repository/user.repository.js";

class SocketService {
  #io;

  init(httpServer = 9000) {
    this.#io = new Server(httpServer, {
      cors: {
        origin: "*",
      }
    });

    this.#io.use(async (socket, next) => {
      const token = socket.handshake.auth.token;

      const tokenService = new TokenService();
      let user = await tokenService.validate(token);

      if (!user) {
        return next(new Error('Authentication error'));
      }

      const userRepository = new UserRepository();
      user = await userRepository.find(user.id);

      if (user.isActive === false) {
        next(new Error('Your account is not active'));
      }

      if (token) {
        socket.user = user;
        return next();
      }
      return next(new Error("Authentication error"));
    });
  }

  get io() {
    return this.#io;
  }
}

export default new SocketService();
