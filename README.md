# PhotoJudge - Backend API Service

Production REST API service for the Photo Contest Judging Platform, built with Express.js, MongoDB (Mongoose), and JWT authentication.

---

## 🔒 1. Credential Security & Environment Setup (CRITICAL)

To prevent credentials (like MongoDB connection strings and JWT secrets) from leaking onto GitHub:

1. **Never commit the `.env` file!**
   - The `.env` file is explicitly ignored in `.gitignore`.
   - Never use `git add -f .env` or bypass `.gitignore`.

2. **First-time setup for each developer:**
   Create a `.env` file in the root backend directory:
   - `PORT`: e.g. `5001`
   - `NODE_ENV`: `development`
   - `MONGO_URI`: Your MongoDB connection URI
   - `JWT_SECRET`: A secure private key string (32+ chars)
   - `JUDGE_ACCESS_KEY`: Registration key for judges (e.g. `JUDGE2026`)
   - `CLIENT_URL`: `http://localhost:5500` (or frontend dev server address)

4. **Verify before any git commit:**
   ```bash
   git status
   ```
   Ensure `.env` never appears in staged or untracked changes.

---

## 👥 2. Dividing the Work Between Two Developers

To avoid merge conflicts and overlapping changes, divide the backend modules clearly:

### 👤 Developer A: Identity, Contests & Infrastructure
- **Authentication & Authorization**:
  - `controllers/authController.js` (User registration, login, JWT issuance)
  - `middleware/authMiddleware.js` (Role-based access control: Participant vs Judge vs Admin)
- **Contest Management**:
  - `controllers/contestController.js` & `models/Contest.js`
  - Contest creation, listing, categories, deadlines, status updates
- **Explore & Seeding**:
  - `controllers/exploreController.js`, `models/ExplorePhoto.js`, `seeds/seedData.js`
- **Server & Database Configuration**:
  - `config/db.js`, `server.js`, CORS, rate limiting, and global error middleware.

### 👤 Developer B: Submissions, Judging & Scoring
- **Photo Submissions & File Uploads**:
  - `controllers/entryController.js` & `models/Entry.js`
  - Multer upload configuration, image validation, submission limits per contest
- **Scoring & Judging Engine**:
  - `controllers/scoreController.js` & `models/Score.js`
  - Judge evaluation submissions, weighted criteria calculations (Creativity, Technical, Theme Fit)
- **Leaderboards & Results**:
  - `controllers/leaderboardController.js`
  - Final ranking aggregation, average score calculations, winner announcements
- **Route Testing & Validation**:
  - `test-routes.js`, Express-validator schemas in routes.

---

## 🌿 3. Recommended Git Workflow

Follow feature branches to keep the codebase clean and prevent conflicts:

1. **Clone the repository:**
   ```bash
   git clone <YOUR_NEW_BACKEND_REPO_URL>
   cd <backend-folder>
   npm install
   ```
2. **Always branch off up-to-date `main`:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```
   *Examples:*
   - Developer A: `git checkout -b feature/auth-roles`
   - Developer B: `git checkout -b feature/scoring-calculation`

3. **Commit your work regularly:**
   ```bash
   git add .
   git status   # Verify no .env is added!
   git commit -m "feat: implement weighted scoring calculation"
   ```

4. **Push branch & create a Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Open a Pull Request (PR) on GitHub.
   - The other developer reviews and approves before merging into `main`.

---

## 🚀 4. Running the Backend Locally

```bash
# Install dependencies
npm install

# Seed the database with sample contests & judges (optional)
npm run seed

# Start server in development mode (with nodemon auto-reload)
npm run dev

# Run automated route test suite
npm run test:routes
```
