import ChannelRepository from "../repository/channel.repository.js";
import SocketService from "../../../common/service/Socket/socket.service.js";

class ChannelService {
  #channel;
  #socket;
  #io;

  /**
   * Prefix for channel room
   * @type {string}
   */
  ROOM_PREFIX = 'channel:';

  constructor(socket = null, repository = null) {
    this.repository = repository ?? new ChannelRepository();
    this.#io = SocketService.io;
    this.#socket = socket;
  }

  /**
   * Search channel data in repository
   * @param channelId
   * @returns {Promise<void>}
   */
  async #getChannelFromId(channelId) {
    this.#channel = await this.repository.find(Number.parseInt(channelId));
  }

  /**
   * Check if the channel limit is reached
   * @returns {Promise<boolean|boolean>}
   */
  async isLimitReached() {
    const rooms = await this.#io.sockets.adapter.rooms[this.ROOM_PREFIX + this.#channel.id];

    /**
     * Check if room exists if not return true by default
     */
    if (rooms === undefined) {
      return false;
    }

    return this.#channel.limit < rooms.size;
  }

  /**
   * Check if user is in channel
   * @returns {Promise<void>}
   */
  async isUserInChannel() {
    return await this.#socket.rooms.has(this.ROOM_PREFIX + this.#channel.id);
  }

  /**
   * Leave a channel
   * @param channelId
   * @returns {Promise<void>}
   */
  async leave(channelId) {
    if (await this.isUserInChannel()) {
      await this.#socket.leave(this.ROOM_PREFIX + channelId);
      if (process.env.NODE_ENV === 'dev') {
        console.log('Channel left : ', this.ROOM_PREFIX + channelId);
        await this.#socket.emit(this.ROOM_PREFIX + 'leave:success', {message: 'Channel left'});
      }
    }
  }

  /**
   * Join a channel
   * @param channelId
   * @returns {Promise<void>}
   */
  async join(channelId) {
    await this.#getChannelFromId(channelId);

    //TODO security check if user has access to channel

    if (await this.isUserInChannel()) {
      throw new Error('You are already in this channel');
    }

    if (await this.isLimitReached()) {
      throw new Error('Channel limit reached');
    }

    await this.#socket.join(this.ROOM_PREFIX + this.#channel.id);
    if (process.env.NODE_ENV === 'dev') {
      console.log('Channel joined : ', this.ROOM_PREFIX + this.#channel.id);
      await this.#socket.emit(this.ROOM_PREFIX + 'join:success', {message: 'Channel joined'});
    }
  }

}

export default ChannelService;
