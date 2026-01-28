# 🚀 QUICK COMMAND REFERENCE

## For Windows Users

### Option 1: Using Command Prompt / PowerShell (Easiest)

```powershell
# Step 1: Navigate to server folder
cd C:\Users\alokk\OneDrive\Desktop\voicebot\server

# Step 2: Install and start
npm install
npm run dev

# KEEP THIS TERMINAL OPEN
# You should see: "🚀 Voicebot Server running on http://localhost:5000"
```

```powershell
# Step 3: Open NEW PowerShell/Command Prompt window

# Step 4: Navigate to client folder
cd C:\Users\alokk\OneDrive\Desktop\voicebot\client

# Step 5: Install and start
npm install
npm run dev

# KEEP THIS TERMINAL OPEN
# You should see: "VITE ... ready in ... ms" and "Local: http://localhost:3000/"
```

### Option 2: Using Batch Script (Automatic)

```cmd
cd C:\Users\alokk\OneDrive\Desktop\voicebot
run-voicebot.bat
```

This opens both servers in separate windows automatically.

---

## For Mac/Linux Users

### Option 1: Using Terminal (Easiest)

```bash
# Terminal 1: Start Backend
cd ~/Desktop/voicebot/server
npm install
npm run dev
# Should see "🚀 Voicebot Server running on http://localhost:5000"
```

```bash
# Terminal 2: Start Frontend
cd ~/Desktop/voicebot/client
npm install
npm run dev
# Should see "Local: http://localhost:3000/"
```

### Option 2: Using Bash Script (Automatic)

```bash
cd ~/Desktop/voicebot
bash run-voicebot.sh
```

---

## After Both Servers Start

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see the Voicebot interface with two tabs
4. Click "Driver UI" to try voice chat
5. Press the microphone button and speak!

---

## Troubleshooting Quick Fixes

### Port Already in Use

**Windows:**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID [NUMBER] /F

# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [NUMBER] /F
```

**Mac/Linux:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### npm install Fails

```bash
npm cache clean --force
npm install
```

### Still Having Issues?

See [QUICKSTART.md](QUICKSTART.md) Troubleshooting section.

---

## What to Expect

✅ **Server Output:**
```
[INFO] 2026-01-28T10:00:00.000Z - 🚀 Voicebot Server running on http://localhost:5000
[INFO] 2026-01-28T10:00:00.000Z - Environment: development
[INFO] 2026-01-28T10:00:00.000Z - Brain Service: http://localhost:8000
```

✅ **Frontend Output:**
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:3000/
➜  Press h to show help
```

✅ **In Browser:**
- Voicebot navbar at top
- Two tabs: "Driver UI" and "Agent Dashboard"
- Large blue microphone button
- Language selector dropdown

---

## Let's Get Started! 🎤

Pick your platform above and follow the commands.

**Estimated time to running:** 5 minutes

**Estimated time to first voice query:** 7 minutes

---

Need detailed instructions? See [GETTING_STARTED.md](GETTING_STARTED.md)
