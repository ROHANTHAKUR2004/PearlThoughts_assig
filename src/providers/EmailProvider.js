export class EmailProvider {
  constructor(name) {
    this.name = name;
  }

  async send(email) {
    throw new Error("send() must be implemented by child class");
  }
}
