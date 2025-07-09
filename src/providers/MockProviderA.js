import { EmailProvider } from './EmailProvider.js';

export class MockProviderA extends EmailProvider {
  constructor() {
    super('MockProviderA');
  }

  async send(email) {
    console.log(`[${this.name}] Sending to ${email.to}`);
    if (Math.random() < 0.4) {
      throw new Error(`${this.name} failed`);
    }
    return { success: true };
  }
}
