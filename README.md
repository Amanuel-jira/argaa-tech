# Vertex Labs — Full-Stack Site

Node.js + Express + MySQL backend, React (Vite) frontend. Multipage, responsive,
with a contact form, portfolio, public FAQ (you reply), a general AI chatbot,
and a PDF-grounded Q&A chatbot (upload your company PDF, visitors ask
questions, Claude answers only from that document).

## Structure
```
vertex-labs/
  backend/    Express API + MySQL
  frontend/   React (Vite) site
```

## 1. Set up the database
Install MySQL locally (or use a free hosted MySQL like PlanetScale/Railway),
then run:
```bash
mysql -u root -p < backend/db/schema.sql
```
This creates the `vertex_labs` database and all tables.

## 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Edit `.env`:
- `DB_USER` / `DB_PASSWORD` — your MySQL credentials
- `ADMIN_KEY` — make up a long random string. This is what unlocks `/admin`
  on the frontend (message inbox, FAQ replies, portfolio, PDF upload).
- `ANTHROPIC_API_KEY` — get one at https://console.anthropic.com. Powers both
  chat features (general assistant + PDF Q&A). Without it those two features
  will fail; everything else (contact form, FAQ, portfolio) works fine without it.

Run it:
```bash
npm run dev
```
API runs at http://localhost:4000. Check http://localhost:4000/api/health.

## 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
Site runs at http://localhost:5173.

## 4. Using the admin panel
Go to http://localhost:5173/admin and enter the `ADMIN_KEY` you set in the
backend `.env`. From there you can:
- Read contact form submissions
- Reply to public questions (replies show up on the `/faq` page)
- Add portfolio projects (shown on `/work`)
- Upload your company PDF (powers the "About Our PDF" chat tab)

## How the PDF Q&A works
When you upload a PDF, the backend extracts its text, splits it into
overlapping chunks, and stores them in MySQL. When a visitor asks a question,
it scores each chunk by keyword overlap with the question, picks the most
relevant few, and sends them to Claude as context — so answers come only from
your document. This keyword-based retrieval needs no extra services and works
well for a single company PDF of a few to dozen pages. If you later want a
searchable library of many long documents, swap in real vector embeddings
(e.g. Voyage AI, which Anthropic recommends, paired with MySQL's newer VECTOR
type or a dedicated vector DB).

## Deploying it for real
This code runs great locally but a browser can't reach your laptop, so to
make it public:
- **Backend**: deploy to Railway, Render, or a small VPS. Point `DB_HOST` etc.
  at a hosted MySQL instance (Railway, PlanetScale, or your VPS's own MySQL).
- **Frontend**: deploy to Vercel or Netlify (or serve the `npm run build`
  output from any static host). Set `VITE_API_URL` to your deployed backend's
  URL before building.
- Update `CLIENT_URL` in the backend `.env` to your deployed frontend's URL
  (needed for CORS).
- Buy a domain and point it at the frontend host; most hosts also proxy
  `/api` to the backend if you'd rather keep everything on one domain.

## Notes on what's production-ready vs. MVP
- Admin auth is a single shared secret (`ADMIN_KEY`), fine for one owner. Add
  real login (sessions or JWT + hashed password) before opening this to
  multiple staff.
- No rate limiting on the public endpoints (contact form, chat, PDF Q&A) —
  add `express-rate-limit` before going live to avoid abuse/cost from the
  Claude API.
- Contact form doesn't currently send you an email notification, it just
  saves to the database — you check `/admin`. Wire up Resend/Nodemailer in
  `routes/contact.js` if you want an email the moment someone writes in.
