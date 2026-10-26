# 💼 Job Application Tracker

A clean, responsive, real-time **Job Application Tracker** dashboard built using **Vanilla JavaScript** and styled with **Tailwind CSS**. This tool helps developers manage their job hunting pipeline efficiently by tracking statuses, updating live counters, and creating new logs dynamically.

## 🚀 Features

- **Interactive Job Creation Modal:** Add custom job tracking cards instantly via a responsive, accessible overlay form.
- **Dynamic Event Delegation:** Light, performant click-handling managed by a centralized wrapper element that supports both static and dynamically added cards.
- **Real-Time Data Filtering:** Filter jobs seamlessly between *All* (Active/Unassigned), *Interview*, and *Rejected* pipelines using dynamic navigation tabs.
- **Synchronized Status Shifting:** Instantly move job cards into specific categories by clicking internal action buttons, which automatically repositions them across views.
- **Automated Cross-Section Counters:** Global statistics panels and sub-header labels recalculate dynamically on item deletions, additions, or pipeline shifts.
- **Tailwind CSS Engine:** Modular, production-ready utility layouts optimized for all responsive viewports.

## 🛠️ Tech Stack

- **Markup:** HTML5
- **Styling:** Tailwind CSS (Utility Framework)
- **Interactions:** Vanilla JavaScript (ES6+)

## 📦 Local Installation & Setup

Follow these quick steps to set up the development environment locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd Job-Application-Tracker-with-Tailwind-CSS
   ```

2. **Install the dependencies:**
   Make sure you have [Node.js](https://nodejs.org) installed, then execute:
   ```bash
   npm install
   ```

3. **Start the Tailwind compilation engine:**
   Run the build script to watch for code modifications and automatically build your CSS assets:
   ```bash
   npm run dev
   ```

4. **Launch the Application:**
   Open the main `index.html` file in your browser using a local development server extension (like *Live Server* in VS Code).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
