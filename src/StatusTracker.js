export class StatusTracker {
  constructor() {
    this.statuses = new Map();
  }

  update(id, status) {
    this.statuses.set(id, status);
  }

  get(id) {
    return this.statuses.get(id) || null;
  }
}
