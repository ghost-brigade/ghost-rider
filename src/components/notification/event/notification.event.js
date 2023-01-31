import {EventEmitter} from 'node:events';

class NotificationEvent extends EventEmitter { }

const event = new NotificationEvent();

export default event;
