### 🧠 *Concept Overview*

Create a web app for *AI-driven personalized learning* focused on web development skills (JavaScript, React, Python, Node.js).
It should include:

* *Onboarding* (goal + subject + level)
* *Gemini-generated roadmap*
* *Adaptive quiz system* using a *rolling window difficulty algorithm*
* *Progress dashboard* and *analytics visualizations*
* *Beautiful animated UI* with smooth motion & glassmorphism design

---

### ⚙ *Tech Stack*

*Frontend*

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui components (Card, Dialog, Toast, Button, Input, Accordion, etc.)
* MagicUI and Aceternity components (Charts, Sidebar, Navbar, Breadcrumbs, etc.)
* Framer Motion for animations
* Lucide-react for icons
* Zustand or React Context for state
* Recharts / MagicUI charts for visual analytics

*Server (AI Layer)*

* Inside /server folder
* API endpoints:

  * /server/generate-roadmap → Uses Gemini API
  * /server/generate-question → Adaptive question generation
  * /server/evaluate-answer → Handles rolling window logic
* All AI interactions use structured JSON schema
* Store responses temporarily in memory (no DB, single user)

---

### 🧩 *Core Features*

#### *1. Onboarding*

* 3-step guided onboarding flow:

  * Select subject (Python, JS, React, Node.js)
  * Choose goal (e.g., Web Dev, DSA, Full-Stack)
  * Choose level (Basic, Intermediate, Advanced)
* Animated card-based UI (Framer Motion + shadcn cards)
* Final “Generate Roadmap” button calls /server/generate-roadmap

---

#### *2. AI Roadmap Screen*

* Display Gemini-generated roadmap:

  * Timeline or accordion of modules (8–12)
  * Each module card:

    * Title
    * Description
    * Estimated time
    * “Start Module” button
* Smooth transitions and collapsible modules
* Store roadmap JSON in localStorage

---

#### *3. Adaptive Quiz (Rolling Window Algorithm)*

* Start module → show quiz interface
* *Gemini question generation* endpoint:
  /server/generate-question?module=<id>&difficulty=<easy|medium|hard>
* First question always *medium*
* *Rolling window logic* (3-question window):

  ts
  const adjustDifficulty = (lastThree) => {
    const score = lastThree.reduce((acc, a) => acc + (a.correct ? 1 : -1), 0);
    if (score >= 2) return "hard";
    if (score <= -2) return "easy";
    return "medium";
  };
  
* 10–20 total questions per module
* Show progress bar, question counter, and animated transitions
* End quiz at:

  * ≥70% accuracy, or
  * ≥80% in first 10 questions

---

#### *4. Module Report*

* After quiz completion:

  * Show score %, time taken, strengths, weaknesses
  * Display Gemini-recommended resources
  * “Retry Module” button
* Use MagicUI charts (bar, radar, line) for performance visuals

---

#### *5. Dashboard & Analytics*

* Overview page with:

  * Completed modules
  * Average accuracy
  * Time spent
  * AI-assigned “Career Readiness” score
* Charts via MagicUI or Aceternity:

  * Line chart: improvement over time
  * Radar chart: topic mastery
  * Bar chart: difficulty vs accuracy

---

### 💻 *UI Design*

*Layout:*

* *Navbar:* Floating top bar with breadcrumb + progress
* *Sidebar:* Collapsible (Aceternity UI)
* *Main area:* Smooth scroll-based animations
* *Cards:* Glassmorphism, soft gradients
* *Theme:* Futuristic dark theme with neon accents
* *Animations:* Scroll-triggered fade/slide transitions using Framer Motion
* *Toast notifications:* From shadcn/ui for success, errors, or tips

---

### 📦 *Structure*


src/
 ├── app/
 │    ├── page.tsx
 │    ├── onboarding/
 │    ├── dashboard/
 │    ├── roadmap/
 │    ├── module/[id]/
 │    └── report/[id]/
 ├── components/
 │    ├── ui/ (shadcn + MagicUI)
 │    ├── charts/
 │    ├── layout/
 │    └── quiz/
 ├── lib/
 │    └── utils.ts
 ├── store/
 │    └── useRoadmapStore.ts
 └── server/
      ├── generate-roadmap.ts
      ├── generate-question.ts
      └── evaluate-answer.ts


---

### 🧾 *Gemini Integration (Server Folder)*

Use official Gemini SDK or REST fetch.

#### /server/generate-roadmap.ts

* Input: { subject, goal, level }
* Prompt Gemini to create 8–12 module roadmap in JSON
* Return roadmap JSON to frontend

#### /server/generate-question.ts

* Input: { moduleTitle, difficulty }
* Prompt Gemini to return:

  * Question text
  * Options (MCQ)
  * Correct answer index
  * Explanation
* Ensure strict JSON structure

#### /server/evaluate-answer.ts

* Input: { questionId, userAnswer, correct }
* Store results temporarily
* Adjust next question difficulty using rolling window logic
* Return next difficulty + updated stats

---

### 🧰 *Other Functionalities*

* LocalStorage persistence (progress, roadmap, answers)
* Toast notifications after each answer
* Scroll-based module transitions
* “Retake Module” resets progress
* Responsive design (desktop-first)
* Simple npm run dev startup

---

### ✅ *Deliverables*

* Fully functional *Next.js + TypeScript + Tailwind* app
* AI logic implemented in /server folder (Gemini integration)
* Single-user learning workflow (no auth)
* Animated, responsive, modern UI
* All components from *shadcn, **MagicUI, and **Aceternity*
* Charts, Navbar, Sidebar, Breadcrumbs, Toasts ready
* Adaptive quiz with rolling-window Gemini logic working end-to-end

---

*Final Output Goal:*
A single-user *AI adaptive learning frontend* with:

* Personalized Gemini roadmap
* Rolling-window adaptive quiz engine
* Modern animations and UI components
* Local progress tracking
* Modular and developer-friendly codebase