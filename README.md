# Innocent — The Art of Design

> **Where Design Meets Perfection**

An interactive design learning platform built with pure HTML, CSS, and JavaScript. Innocent gives aspiring and practicing designers hands-on tools, exercises, and educational content — all inside a single, dependency-free webpage.

---

## 🌐 Live Demos

| Host | URL |
|------|-----|
| GitHub Pages | https://muhammad-asif10.github.io/Innocent_website/ |
| Netlify | https://innocent-design.netlify.app/ |

---

## ✨ Features

### 🎨 Practice Board
A fully-featured drawing canvas with multiple tools:
- Brush, Eraser, Straight Line
- Rectangle and Circle shape tools
- Text annotation tool
- Adjustable brush size and color picker
- Clear and download actions

### 📐 Design Principles
In-depth explanations of the six core design principles:
- **Contrast** · **Alignment** · **Repetition**
- **Proximity** · **Balance** · **Whitespace**

### 🛠️ Interactive Design Tools
Five real-time tools that generate ready-to-use CSS code:

| Tool | Description |
|------|-------------|
| **Color Palette Generator** | Generate complementary, analogous, triadic, and monochromatic palettes |
| **Typography Explorer** | Adjust font family, size, weight, line height, and letter spacing live |
| **Box Shadow Designer** | Configure X/Y offset, blur, spread, and color with instant preview |
| **Gradient Builder** | Build linear or radial gradients and copy the CSS output |
| **Spacing & Layout Tool** | Visualise padding and margin relationships |

### 🏋️ Learning Exercises
Ten exercises across three difficulty levels:

| Level | Exercises |
|-------|-----------|
| **Beginner** | Color Matching Challenge, Whitespace Mastery |
| **Intermediate** | Alignment Puzzle, Typography Pairing, Button Designer, Card Builder, Grid Layout Builder |
| **Advanced** | Contrast Checker, Color Harmony Quiz, Responsive Tester |

### 🖼️ Gallery
Six gradient-themed design cards for visual inspiration.

### 🎭 Theming & Accessibility
- **8 color themes** — Dark, Light, Red, Blue, Green, Purple, Orange, Cyan
- Adjustable **contrast slider** (70–150%)
- Semantic HTML and ARIA labels throughout
- Color-blind-friendly palette options

### UI Highlights
- Animated splash screen with letter-by-letter reveal
- Hero section with rotating headline text and Canvas-powered floating shapes
- Custom cursor glow effect
- Smooth scroll and scroll-reveal animations
- Fully responsive — mobile, tablet, and desktop

---

## 🏗️ Project Structure

```
Innocent_website/
├── index.html   # All markup, sections, and interactive widgets
├── style.css    # CSS variables, theming, animations, and responsive layout
└── script.js    # Canvas drawing, tool logic, exercises, and theme switching
```

No build tools, no package managers, no dependencies — just three files.

---

## 🚀 Getting Started

Because the project has no build step, you can run it in seconds.

### Option 1 — Open directly in a browser
```bash
# Clone the repository
git clone https://github.com/muhammad-asif10/Innocent_website.git
cd Innocent_website

# Open in your default browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

### Option 2 — Serve with any static file server
```bash
# Using Python (comes pre-installed on most systems)
python -m http.server 8080
# Then visit http://localhost:8080

# Using Node.js (npx, no install required)
npx serve .
```

### Option 3 — Use the live deployment
Visit https://innocent-design.netlify.app/ — no setup needed.

---

## 🧰 Tech Stack

| Technology | Role |
|-----------|------|
| HTML5 | Semantic structure and interactive widgets |
| CSS3 | Custom properties, animations, and responsive layout |
| Vanilla JavaScript (ES6+) | All interactivity — no frameworks |
| Canvas API | Hero animations and the practice drawing board |
| Google Fonts | Typography — *Inter* and *Playfair Display* |

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please keep contributions focused on vanilla HTML/CSS/JS — the zero-dependency nature of the project is intentional.

---

## 👤 Author

**Muhammad Asif**

- GitHub: [@muhammad-asif10](https://github.com/muhammad-asif10)

---

## 📄 License

This project is open source. Feel free to use it for learning and personal projects.
