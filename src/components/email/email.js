import fs from 'fs';
import path from 'path';

class Email {
  #from;
  #to;
  #subject;
  #template;
  #context;

  basePath = path.resolve() + '/templates/email/';

  constructor({from, to, subject, template = 'default.html', context}) {
    this.#from = from ?? process.env.EMAIL_FROM;
    this.#to = to;
    this.#subject = subject;
    this.#context = context;

    this.#template = template;
    if (this.#template.includes('.html') === false) {
      this.#template = this.#template + '.html';
    }
  }

  get from() {
    return this.#from;
  }

  get to() {
    return this.#to;
  }

  get subject() {
    return this.#subject;
  }

  get template() {
    return this.#template;
  }

  get context() {
    return this.#context;
  }

  get content() {
    const templatePath = path.join(this.basePath, this.#template);

    if (fs.existsSync(templatePath) === false) {
      throw new Error('Template does not exist');
    }

    let content = fs.readFileSync(templatePath, 'utf8');
    for (const [key, value] of Object.entries(this.#context)) {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return content;
  }
}

export default Email;
