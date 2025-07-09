export class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(task) {
    this.queue.push(task);
  }

  async process(processFn) {
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await processFn(task);
    }
  }
}
