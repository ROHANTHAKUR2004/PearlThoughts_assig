import { EmailProvider } from './EmailProvider.js';

export class MockProviderB extends EmailProvider {
  constructor() {
    super('MockProviderB');
  }

  async send(email) {
    console.log(`[${this.name}] Sending to ${email.to}`);
    if (Math.random() < 0.3) {
      throw new Error(`${this.name} failed`);
    }
    return { success: true };
  }
}
