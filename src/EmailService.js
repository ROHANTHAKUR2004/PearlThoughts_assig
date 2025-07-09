import { MockProviderA } from './providers/MockProviderA.js';
import { MockProviderB } from './providers/MockProviderB.js';
import { RateLimiter } from './RateLimiter.js';
import { StatusTracker } from './StatusTracker.js';
import { CircuitBreaker } from './CircuitBreaker.js';
import { Logger } from './Logger.js';
import { Queue } from './Queue.js';

export class EmailService {
  constructor() {
    this.providers = [
      { provider: new MockProviderA(), cb: new CircuitBreaker(3, 5000) },
      { provider: new MockProviderB(), cb: new CircuitBreaker(3, 5000) },
    ];
    this.rateLimiter = new RateLimiter(5, 10000); 
    this.statusTracker = new StatusTracker();
    this.sentIds = new Set();
    this.queue = new Queue();
  }

  async sendEmail(email) {
    if (this.sentIds.has(email.id)) {
      Logger.log(`Duplicate detected for ID: ${email.id}`);
      return { status: 'duplicate email send' };
    }

    if (!this.rateLimiter.isAllowed()) {
      Logger.log(`Rate limit exceeded`);
      return { status: 'rate_limit_exceeded' };
    }

    this.queue.enqueue(email);
    await this.queue.process(this._processEmail.bind(this));
    return { status: this.statusTracker.get(email.id) };
  }

  async _processEmail(email) {
    Logger.log(`Processing email ID: ${email.id}`);
    let attempt = 0;
    let providerIndex = 0;

    while (attempt < 3) {
      const { provider, cb } = this.providers[providerIndex];
      if (!cb.canRequest()) {
        Logger.log(`${provider.name} circuit OPEN. Switching.`);
        providerIndex = (providerIndex + 1) % this.providers.length;
        continue;
      }

      try {
        await provider.send(email);
        this.sentIds.add(email.id);
        cb.recordSuccess();
        this.statusTracker.update(email.id, 'success');
        Logger.log(`Email sent successfully with ${provider.name}`);
        return;
      } catch (err) {
        Logger.log(`Error: ${err.message}`);
        cb.recordFailure();
        attempt++;
        providerIndex = (providerIndex + 1) % this.providers.length;
        await new Promise(res => setTimeout(res, 2 ** attempt * 100));
      }
    }

    this.statusTracker.update(email.id, 'failed');
    Logger.log(`Email ID: ${email.id} failed after retries`);
  }

  getStatus(id) {
    return this.statusTracker.get(id);
  }
}
