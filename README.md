# 🌟 Personal Professional Portfolio Website

Welcome to your first professional portfolio website! This project is designed specifically for beginners to be clean, modern, fully responsive, and easy to customize.

---

## 📁 Project Structure

```text
portfolio-website/
│
├── index.html       # The Structure & Content (Semantic HTML5)
├── style.css        # The Visual Presentation & Layout (CSS3 + Variables)
├── script.js        # The Interactivity & Logic (Vanilla JavaScript)
└── README.md        # Documentation and guide
```

---

## 🚀 How to Run the Website in Your Browser

Because this is a pure front-end project (HTML, CSS, and Vanilla JavaScript), **no build step, bundler, or package installation is required**.

### Method 1: Direct File Opening (Easiest)
1. Open your file manager (File Explorer on Windows).
2. Navigate to:
   ```text
   C:\Users\marya\.gemini\antigravity\scratch\portfolio-website
   ```
3. Double-click **`index.html`** (or right-click -> **Open with** -> **Google Chrome**, **Microsoft Edge**, **Firefox**, or any preferred browser).
4. The website will immediately load in your browser!

---

### Method 2: Using Python's Built-in Web Server (Recommended)
Running a local web server mirrors how real websites run on the internet:

1. Open PowerShell or Command Prompt.
2. Change into the project directory:
   ```powershell
   cd C:\Users\marya\.gemini\antigravity\scratch\portfolio-website
   ```
3. Start the server:
   ```powershell
   python -m http.server 8000
   ```
4. Open your browser and visit:
   ```text
   http://localhost:8000
   ```
5. To stop the server when you are done, press `Ctrl + C` in the terminal.

---

### Method 3: VS Code "Live Server" Extension
If you are using Visual Studio Code:
1. Open the `portfolio-website` folder in VS Code (`File` -> `Open Folder...`).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab.
3. Right-click on `index.html` and select **Open with Live Server** (or click "Go Live" in the bottom status bar).
4. Any changes you make to HTML, CSS, or JS will reload in your browser automatically!

---

## 🎓 Understanding the Core Files

### 1. `index.html` — The Skeleton & Content
* Defines the structure using **semantic HTML5** elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* Semantic tags make your website accessible to screen readers and help search engines index your content (SEO).
* Organizes the page into distinct sections:
  * **Navigation Header**: Contains the brand logo and anchor links.
  * **Hero Section**: Introduces who you are, your title, and quick action buttons.
  * **Projects Section**: Displays cards with your project titles, tech tags, and repository links.
  * **Skills Section**: Groups your technical skills into clear categories.
  * **Education Section**: A visual timeline of your academic background and certificates.
  * **Contact Section**: Provides your contact details, social links, and an interactive message form.
  * **Footer**: Displays your copyright notice and back-to-top shortcut.

### 2. `style.css` — The Skin & Presentation
* Uses **CSS Custom Properties (Variables)** declared in `:root` at the top of the file. You can change primary colors across the whole website in seconds by updating one variable!
* Employs **Flexbox** for 1-dimensional layouts (navbars, button groups, badge pills).
* Employs **CSS Grid** for 2-dimensional layouts (responsive project card grids and skill columns).
* Includes **Media Queries (`@media (max-width: 768px)`)** to adapt the layout for mobile phones and tablets seamlessly.

### 3. `script.js` — The Behavior & Interactivity
* Written in clean, modern vanilla JavaScript (`ES6+`).
* **Mobile Menu**: Toggles the hamburger navigation on mobile screens and closes automatically when a link is clicked.
* **Scroll Highlighting**: Dynamically illuminates the navigation link corresponding to the section you are viewing.
* **Dynamic Year**: Calculates `new Date().getFullYear()` and inserts it into the footer automatically.
* **Form Validation**: Validates that required fields (Name, Email, Message) are filled and correctly formatted, preventing default page reload (`event.preventDefault()`) and showing clear feedback.

---

## 🎨 How to Customize the Portfolio for Yourself

### 1. Update Personal Info (`index.html`)
* Search for `"Jane Doe"` and replace it with your own name.
* Edit the `<title>` tag and `<meta name="description">` inside `<head>`.
* Replace `jane.doe@example.com` and social links with your real GitHub and LinkedIn profile URLs.

### 2. Add Your Real Projects (`index.html`)
* Look for the `<div class="projects-grid">` section.
* In each `<article class="project-card">`, update:
  * Project Title
  * Description
  * Tags (e.g. `React`, `Python`, `HTML5`, `PostgreSQL`)
  * `href` links for GitHub repository and live demo.

### 3. Change Colors & Themes (`style.css`)
At the very top of `style.css`, adjust these CSS variables:
```css
:root {
  --primary-color: #2563eb;       /* Try #10b981 for green, #8b5cf6 for purple */
  --primary-hover: #1d4ed8;
  --accent-color: #0ea5e9;
  /* ... */
}
```

### 4. Connect a Real Email Service (Optional Next Step)
The contact form currently validates inputs and simulates a response on screen. To receive real emails without a backend server, you can connect a free form endpoint like [Formspree](https://formspree.io) by updating the form's `action` attribute:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## 📄 License
This project is open-source and free to use for personal or commercial portfolios.
