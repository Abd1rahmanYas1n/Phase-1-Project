# Phase-1-Project
#  WakiliLink — Legal Help Triage & Referrals

**WakiliLink** is a single-page web application that helps citizens in Kenya find the right kind of legal help quickly.  
It uses a simple triage wizard to identify the nature and urgency of a user’s legal issue, checks basic eligibility for legal aid, and suggests nearby legal-aid centres or lawyers.  
The app also links to relevant resources from [Kenya Law](https://kenyalaw.org) and uses the **Nominatim (OpenStreetMap)** API to locate and rank providers by proximity.

---

##  Project Overview

- **Goal:** Build a **Single Page Application (SPA)** using HTML, CSS, and JavaScript that integrates at least one public API and demonstrates DOM manipulation, event handling, and asynchronous data fetching.  
- **Frameworks:** None — the project is fully front-end and runs in the browser without reloads.  
- **APIs Used:**
  - **Nominatim (OpenStreetMap):** Provides geocoding and reverse-geocoding to determine location proximity.
  - **Kenya Law:** Linked for legal information and case references (no API key required).

---

##  Features (MVP)

1. **Legal Issue Triage Wizard**  
   Users answer a few guided questions to classify their issue (employment, family, property, criminal, etc.).

2. **Urgency & Legal-Aid Eligibility Engine**  
   A simple rule-based logic calculates urgency and determines if the user might qualify for free or low-cost legal services.

3. **Provider Search & Matching System**  
   Displays a list of providers filtered by county, cost band, and area of practice.  
   If location is provided, Nominatim ranks providers by proximity.

4. **Action Cards & Legal Resources**  
   Generates quick next-step cards (e.g., “Document the facts”, “Seek help within 48 hours”) and links to relevant Kenya Law pages.

5. **Printable Demand-Letter Template**  
   Automatically fills a template with user input for printing or saving as PDF.

6. **Local Storage Persistence**  
   Saves triage results locally so users can return without re-entering data.

---


## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6) |
| **API Integration** | Fetch API (async/await) |
| **Data Storage** | localStorage |
| **Optional Backend** | json-server (mock REST API) |
| **External APIs** | Nominatim / Kenya Law links |

---

## 📦 Installation & Setup

### Option 1 — Run as a Static SPA
1. Clone or download this repository.  
2. Open `index.html` in your browser.  
3. Everything runs locally — no setup required.

How It Works

User fills the triage form.

The app scores urgency, fetches coordinates from Nominatim, and filters matching providers.

Results display dynamically on the same page — no reloads.

The user can print or save their generated letter and revisit later (saved in localStorage).

Testing & Debugging

All API requests use fetch() with error handling.

console.log() statements left in non-critical parts for debugging.

Works on modern browsers (Chrome, Edge, Firefox).

UI & Theming

Built with responsive CSS grid.

Supports dark / light theme toggle.

Styled using modern CSS variables, gradients, and soft shadows.

👨🏽‍💻Author

Abdirahman Yasin Hassan
Software Engineering Student 