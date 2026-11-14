# 🚀 RelicVoyager: Abandoned but not Forgotten
### NASA Space Apps Challenge Project — by **Team smAsh**
**Challenge:** *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*

![RelicVoyager Banner](https://img.shields.io/badge/NASA%20Space%20Apps-Challenge%202024%2F2025-0284c7?style=for-the-badge&logo=nasa)
![Team smAsh](https://img.shields.io/badge/Team-smAsh-ef4444?style=for-the-badge)
![Status](https://img.shields.io/badge/Prototype-Ready%20to%20Run-10b981?style=for-the-badge)

---

## 🌟 Executive Summary

Since the dawn of space exploration, humanity has ventured across the solar system, leaving behind over 100 historical rovers, descent stages, landers, and scientific instruments on the Moon and Mars. While active missions capture headlines, these silent pioneers—from **Opportunity** resting under the Martian dust to **Apollo 11's Eagle Descent Stage** in the Sea of Tranquility—are all too often forgotten.

**RelicVoyager** is an interactive digital storytelling and STEM education platform created by **Team smAsh**. It resurrects NASA's retired and abandoned space hardware through:
- **Interactive 3D Planetary Map**: Real-time 3D WebGL globes of the Moon and Mars with pulsing landing site beacons mapped to real NASA coordinates.
- **"Echoes from the Dust" Storytelling Mode**: Emotional, inspiring first-person narratives told from the machine's perspective, complete with voice narration and synthesized telemetry audio.
- **3D Holographic Hardware Inspector**: Interactive 3D models with wireframe HUD mode, subsystem breakdowns (solar arrays, seismometers, rotors, suspension), and technical roles.
- **Junior Space Archaeologist Challenge**: Gamified field quiz that tests knowledge and rewards learners with collectible digital badges and a printable Certificate of Achievement.
- **Space Heritage Charter**: Educational overview of extraterrestrial site preservation, rocket plume dangers, and international treaty frameworks.

---

## 🛰️ Cataloged Relics & Hardware

| Hardware | Body | Category | Historic Landing Site | Key Legacy / Discovery |
| :--- | :--- | :--- | :--- | :--- |
| **Opportunity Rover (MER-B)** | Mars | Rover | Perseverance Valley, Endeavour Crater | Drove 45.16 km; discovered hematite "blueberries" proving past liquid water. |
| **Ingenuity Mars Helicopter** | Mars | Helicopter | Valinor Hills, Jezero Crater | First powered flight on another planet; 72 flights covering 17 km. |
| **InSight Lander** | Mars | Lander | Elysium Planitia | Detected 1,319 marsquakes; mapped Martian crust, mantle, and molten liquid core. |
| **Apollo 11 Descent Stage ("Eagle")** | Moon | Descent Stage | Mare Tranquillitatis | First human planetary landing platform; permanent peace plaque monument. |
| **Spirit Rover (MER-A)** | Mars | Rover | Columbia Hills, Gusev Crater | Dragged broken wheel to uncover 90% pure silica hot springs deposits. |
| **Apollo 15 Lunar Rover (LRV-001)** | Moon | Electric Vehicle | Hadley-Apennine VIP Site | First car driven off Earth; filmed live lunar liftoff with remote TV camera. |
| **Surveyor 3 Lander** | Moon | Lander | Oceanus Procellarum | Paved way for Apollo; uniquely inspected by Apollo 12 astronauts in 1969. |
| **Sojourner Rover & Pathfinder** | Mars | Rover & Base | Carl Sagan Station, Ares Vallis | First mobile rover on Mars; pioneered rocker-bogie suspension. |
| **Phoenix Mars Lander** | Mars | Lander | Green Valley, Vastitas Borealis | First mission to touch subsurface water ice; observed Martian snow. |
| **Perseverance Sky Crane** | Mars | Descent Stage | Jezero Crater Impact Site | Autonomous rocket platform that gently lowered 1-ton rover on nylon cables. |

---

## 🎯 Target Audience & Educational Value

- **School-Age Space Enthusiasts (Ages 8–18)**: Transforms dry numbers and acronyms into thrilling adventure stories and gamified badge hunts.
- **Educators & Classrooms**: A ready-to-use STEM interactive resource demonstrating geology, aerodynamics, robotics, physics, and planetary science.
- **Space Enthusiasts & Public**: A comprehensive historical archive bridging Apollo-era engineering with modern Artemis and Mars Sample Return missions.

---

## 📡 NASA Open Data Sources Used

1. **NASA Space Science Data Coordinated Archive (NSSDCA)**:
   - Used for authentic spacecraft IDs (e.g., `2003-032A`, `2020-052C`, `1969-059C`), mission durations, and hardware dimensions.
2. **NASA Planetary Data System (PDS)**:
   - Surface landing coordinates, elevation, and atmospheric telemetry.
3. **NASA Mars Reconnaissance Orbiter (MRO) HiRISE & LROC Imagery**:
   - Surface reconnaissance logs locating discarded hardware, heat shield impacts, and rover wheel tracks.
4. **NASA 3D Resources & JPL Solar System Dynamics**:
   - Structural schematics for rovers, descent platforms, and aerial vehicles.

---

## 💻 Tech Stack & Architecture

- **Zero-Dependency Architecture**: Runs in any modern web browser without requiring Node.js, npm builds, or server installations.
- **Three.js (WebGL)**: Real-time 3D planetary rendering (procedural Mars and Moon textures with craters, maria, and polar caps) and 3D hardware holographic inspector with wireframe shaders.
- **Web Audio API**: Real-time procedural audio synthesis generating NASA radio squelches, telemetry blips, radar pings, and achievement chimes.
- **Web Speech Synthesis API**: Built-in voice narration engine reading stories aloud for young or visually-impaired space explorers.
- **Tailwind CSS**: Glassmorphism styling, responsive layout, and futuristic mission-control aesthetics.
- **Lucide Icons**: Crisp vector UI iconography.

---

## 📂 Project Structure

```
NASA/
├── index.html            # Main single-page application
├── css/
│   └── styles.css        # Custom neon glow, radar sweeps, and animations
├── js/
│   ├── data.js           # Comprehensive hardware dataset, coordinates, stories, quizzes
│   ├── audio.js          # Web Audio API sound FX & Speech Synthesis narration engine
│   ├── planet3d.js       # Three.js 3D interactive Moon & Mars globe visualizer
│   ├── modelViewer3d.js  # Three.js 3D hardware inspector (wireframe/shaded models)
│   └── app.js            # UI state management, quiz scoring, and badge storage
└── README.md             # NASA Space Apps Challenge submission document
```

---

## ⚡ How to Run Locally

Because the project is built with vanilla web technologies:

1. **Instant Run (Double-Click)**:
   - Simply double-click [`index.html`](file:///c:/Users/jobis/OneDrive/Desktop/NASA/index.html) in Windows Explorer to open it in Microsoft Edge, Google Chrome, or any browser.
2. **VS Code Live Server**:
   - Right-click `index.html` and select **"Open with Live Server"**.
3. **1-Click Web Deployment**:
   - The repository can be pushed directly to **GitHub Pages**, **Vercel**, or **Netlify** with zero configuration.

---

## 🏆 NASA Space Apps Judging Criteria Alignment

| Criteria | How RelicVoyager Delivers |
| :--- | :--- |
| **Impact** | Inspires school-age students to appreciate past engineering sacrifices while explaining the historical foundations for upcoming Artemis and Mars missions. |
| **Creativity** | Transforms cold technical telemetry into heartfelt, personified first-person stories ("Echoes from the Dust") paired with custom synthesized space audio. |
| **Validity** | Grounded in exact NASA NSSDCA catalog numbers, verified landing coordinates, and authentic historical mission logs. |
| **Relevance** | Directly answers the challenge by focusing specifically on discarded and retired equipment on the Moon and Mars. |
| **Presentation** | Professional, intuitive glassmorphic UI featuring real-time 3D celestial globes, interactive 3D model inspection, and gamified badge achievements. |

---

*Created with pride for NASA Space Apps Challenge by **Team smAsh**.*
