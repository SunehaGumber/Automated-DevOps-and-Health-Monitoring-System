🚀 Server Monitoring & Incident Tracking System

A real-time full-stack server monitoring system that tracks server health, generates logs, detects incidents automatically, and updates everything live using Socket.IO.

---

## 📌 Features

### 🔐 Authentication System
- User registration and login
- JWT-based authentication (access + refresh tokens)
- Protected routes for authenticated users
- Secure session handling

---

### 🖥️ Server Management
- Add and delete servers
- View all servers in dashboard
- Dedicated server detail page
- Real-time server status tracking (up/down)

---

### 📊 Monitoring System
- Automated server health checks using cron jobs (every 2 minutes)
- Tracks uptime and response time
- Detects server failures in real time
- Maintains historical monitoring data

---

### 📝 Logs System
- Stores every server check result
- Records status (up/down) with timestamps
- Used as the base for analytics and incident detection
- Displays log history per server

---

### ⚠️ Incident Management
- Auto-creates incidents on consecutive failures
- Tracks incident start and resolution time
- Calculates downtime duration
- Groups related failed logs into meaningful incidents

---

### 🔄 Real-Time Updates
- Socket.IO integration for live updates
- Instant server status updates on dashboard
- Real-time incident creation and resolution updates
- No page refresh required

---

### 📈 Dashboard & Analytics
- Overview of all servers
- Uptime percentage tracking
- Response time metrics
- Incident summary per server
- Detailed server view (logs + incidents)

---

## 🏗️ System Architecture


Frontend (React)
↓ REST API + Socket.IO
Backend (Node.js + Express)
↓
Cron Job (every 2 minutes)
↓
Server Health Check
↓
Logs Collection (MongoDB)
↓
Incident Detection Engine
↓
MongoDB (Servers / Logs / Incidents)
↓
Socket.IO Events → Frontend UI Update


---

## ⚙️ Tech Stack

### Frontend
- React
- Context API
- Custom Hooks
- Socket.IO Client
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- Cron Jobs

---

## 📡 Socket Events

| Event Name         | Description                           |
|------------------|---------------------------------------|
| server-update     | Updates server status in real time    |
| incident-created  | Fired when a new incident is created  |
| incident-resolved | Fired when an incident is resolved    |
| new-log           | updates logs in real time             |

---

## 🗄️ Database Models

### Server
- name
- url
- status
- responseTime
- uptime

### Log
- server (ref)
- status (up/down)
- responseTime
- lastChecked

### Incident
- server (ref)
- startTime
- resolvedAt
- status (open/closed)
- duration

---

## 🚀 Getting Started

### 1. Clone the repository

git clone <repo-url>

2. Install dependencies
    # frontend
    npm install

    # backend
    npm install

3. Set up environment variables

# Backend
    Create a `.env` file and add:

    - EMAIL_CLIENT_ID
    - EMAIL_CLIENT_SECRET
    - EMAIL_REFRESH_TOKEN
    - EMAIL_ACCESS_TOKEN
    - EMAIL_USER (your email address)
    - MONGO_URI=your_mongo_uri
    -  JWT_SECRET=your_secret

4. Run backend
npm run dev

5. Run frontend
npm run dev

### Key Design Decisions
    Logs act as the source of truth for incident generation
    Cron jobs handle monitoring instead of frontend polling
    Socket.IO ensures real-time synchronization across UI
    Incident system derived from log patterns for accuracy

### Future Improvements
    Retry mechanism for failed server checks
    Pagination for logs and incidents
    Email/Slack alert system
    Advanced analytics dashboard
    Distributed monitoring support

### Author

Built as a full-stack learning project focusing on:

Backend system design
Real-time architecture
Monitoring and incident systems