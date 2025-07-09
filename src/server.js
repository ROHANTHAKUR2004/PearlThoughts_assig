import express from 'express';
import { EmailService } from './EmailService.js';

const app = express();
app.use(express.json());

const emailService = new EmailService();

app.post('/api/send-email', async (req, res) => {

  const { id, to, subject, body } = req.body;

  if (!id || !to || !subject || !body) {

    return res.status(400).json({ error: 'Missing fields' });
  }

  const result = await emailService.sendEmail({ id, to, subject, body });
  
  res.json(result);
});

app.get('/api/status/:id', (req, res) => {

  const status = emailService.getStatus(req.params.id);
  res.json({ status });

});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
