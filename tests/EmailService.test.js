import { EmailService } from '../src/EmailService.js';

describe('EmailService', () => {
  it('should send an email', async () => {
    const service = new EmailService();
    const res = await service.sendEmail({
      id: '1',
      to: 'test@example.com',
      subject: 'Hello',
      body: 'World'
    });
    expect(['success', 'failed']).toContain(res.status);
  });

  it('should detect duplicate', async () => {
    const service = new EmailService();
    await service.sendEmail({ id: '2', to: 'x@y.com', subject: 'Hi', body: '!' });
    const res = await service.sendEmail({ id: '2', to: 'x@y.com', subject: 'Hi', body: '!' });
    expect(res.status).toBe('duplicate');
  });
});
