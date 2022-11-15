import {EventEmitter} from 'node:events';
import transporter from "../service/nodemailer.js";
import Email from "../Email.js";

class EmailEvent extends EventEmitter {}

const event = new EmailEvent();

/**
 * Send an email
 * @param {Email} email
 * @returns {Promise<void>}
 */
event.on('send', async (event) => {
  if (event instanceof Email === false) {
    throw new Error('Invalid event type in send mail event, please use an Instance of Email');
  }

  await transporter.sendMail({
    from: event.from,
    to: event.to,
    subject: event.subject,
    html: event.content
  }, (err, info) => {
    if (err) {console.error(err);}
    else {console.log(info);}
  });

});

export default event;
