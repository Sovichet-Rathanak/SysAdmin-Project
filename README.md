## Step by Step Guide

### 1. Set Up Environment Variables
Rename the example environment file for both /frontend and /backend:
```bash
mv .env.example .env
```
Make sure to update any necessary environment variables in .env.

---

### 2. Start Docker Container
```bash
docker-compose up -d
```
---

### 3. Install Backend Dependencies
```bash
cd backend
npm install
```
Then start the backend server:
```bash
npm run dev
```
If you encounter issues with nodemon, use:
```bash
npm run start
```

---

### 4. Install Frontend Dependencies
```bash
cd frontend
npm install
```

then start the frontend development server:
```bash
npm run dev
```
