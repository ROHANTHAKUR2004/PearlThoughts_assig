
## ✅ Project Overview

A robust backend service that demonstrates:

* Retry logic with exponential backoff.
* Fallback between two mock email providers.
* Idempotency to prevent duplicate sends.
* Basic rate limiting.
* Status tracking for each send.
* Unit testing with Jest.

## 🗂️ Setup Instructions

1. Clone this repo.
2. Run `npm install` to install dependencies.
3. Start the server: `npm start`.
4. Run tests: `npm test`.

## 🚀 API Endpoints

* **POST** `/api/send-email` — Send an email.
  Required JSON body: `{ "to": "email@example.com", "subject": "...", "body": "...", "id": "unique_id" }`
* **GET** `/api/status?id=unique_id` — Check status by ID.

## ⚙️ Assumptions

* Uses mock providers, no real email sending.
* Rate limit: max 5 requests per minute.
* Status stored in-memory.

## ✅ Deployment

* https://pearlthoughts-assig-1.onrender.com

## 🧪 Testing

* Jest unit tests included: `npm test`.

## 📖 Author & Notes

* Clean, maintainable code.
* SOLID principles.
* Suitable for backend trainee evaluation.

---

