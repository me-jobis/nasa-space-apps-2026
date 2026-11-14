/**
 * NASA Space Apps Challenge - Team smAsh
 * Project: RelicVoyager - Abandoned but not Forgotten
 * Main Application Orchestration Script
 */

// Application State
const state = {
  currentView: "globe", // "globe" | "archive" | "stories" | "timeline" | "quiz" | "heritage"
  selectedBody: "Mars", // "Mars" | "Moon"
  selectedRelic: null,
  activeFilter: "all",
  searchQuery: "",
  unlockedBadges: JSON.parse(localStorage.getItem('smash_unlocked_badges') || '[]'),
  quizAnswers: {},
  quizScore: 0,
  planetViewer: null,
  modelViewer: null
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initLucideIcons();
  initPlanetViewer();
  renderStatsBar();
  renderArchiveGrid();
  renderStoriesList();
  renderTimeline();
  renderQuizSection();
  renderBadgesCollection();
  setupNavigation();
  setupFilterControls();
  setupSearch();
  setupModalControls();
  setupAudioEngineListeners();
});

// Helper to trigger Lucide icons replacement
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 1. Initialize 3D Planet Viewer
function initPlanetViewer() {
  const container = document.getElementById("planet-canvas-container");
  if (!container) return;

  state.planetViewer = new PlanetViewer3D("planet-canvas-container", (relic) => {
    displayTargetReconCard(relic);
  });

  // Body switch buttons (Mars vs Moon)
  const marsBtn = document.getElementById("btn-switch-mars");
  const moonBtn = document.getElementById("btn-switch-moon");

  if (marsBtn && moonBtn) {
    marsBtn.addEventListener("click", () => {
      state.selectedBody = "Mars";
      state.planetViewer.switchBody("Mars");
      closeTargetReconCard();
      updateBodyButtonStyles();
      updatePlanetInfoCard();
    });

    moonBtn.addEventListener("click", () => {
      state.selectedBody = "Moon";
      state.planetViewer.switchBody("Moon");
      closeTargetReconCard();
      updateBodyButtonStyles();
      updatePlanetInfoCard();
    });
  }

  updatePlanetInfoCard();
}

function updateBodyButtonStyles() {
  const marsBtn = document.getElementById("btn-switch-mars");
  const moonBtn = document.getElementById("btn-switch-moon");

  if (state.selectedBody === "Mars") {
    marsBtn.className = "px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-red-600 text-white shadow-lg shadow-red-500/30 flex items-center gap-2";
    moonBtn.className = "px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center gap-2";
  } else {
    moonBtn.className = "px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 flex items-center gap-2";
    marsBtn.className = "px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center gap-2";
  }
}

function updatePlanetInfoCard() {
  const card = document.getElementById("planet-info-card");
  if (!card) return;

  const cfg = BODIES_CONFIG[state.selectedBody];
  const count = RELICS_DATA.filter(r => r.body === state.selectedBody).length;

  card.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <h3 class="font-orbitron font-bold text-lg ${state.selectedBody === 'Mars' ? 'text-red-400' : 'text-cyan-400'} flex items-center gap-2">
        <i data-lucide="${state.selectedBody === 'Mars' ? 'flame' : 'moon'}" class="w-5 h-5"></i>
        ${cfg.name}
      </h3>
      <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
        ${count} Relics Mapped
      </span>
    </div>
    <p class="text-xs text-slate-300 leading-relaxed mb-3">${cfg.description}</p>
    <div class="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
      <div>Gravity: <span class="text-white">${cfg.gravity}</span></div>
      <div>Atmosphere: <span class="text-white">${cfg.atmosphere}</span></div>
    </div>
  `;
  initLucideIcons();
}

// Target Reconnaissance Card Display on 3D Celestial Map
function displayTargetReconCard(relic) {
  state.selectedRelic = relic;
  const card = document.getElementById("target-recon-card");
  if (!card) return;

  const imgEl = document.getElementById("target-recon-img");
  if (imgEl) {
    imgEl.src = relic.imageUrl;
    imgEl.alt = relic.name;
  }

  document.getElementById("target-recon-name").textContent = relic.name;
  document.getElementById("target-recon-callsign").textContent = relic.callsign;
  document.getElementById("target-recon-coords").textContent = relic.coordinates.formatted;
  document.getElementById("target-recon-summary").textContent = relic.summary;
  
  const bodyEl = document.getElementById("target-recon-body");
  if (bodyEl) {
    bodyEl.textContent = `${relic.body} • ${relic.category}`;
    bodyEl.className = relic.body === 'Mars' ? 
      'px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-500/40 font-bold' : 
      'px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-bold';
  }

  // Inspect 3D & Specs button
  const inspectBtn = document.getElementById("target-recon-btn-inspect");
  if (inspectBtn) {
    inspectBtn.onclick = () => openRelicModal(relic);
  }

  // Voice narration button
  const voiceBtn = document.getElementById("target-recon-btn-voice");
  if (voiceBtn) {
    voiceBtn.onclick = () => playRelicStoryAudio(relic.id);
  }

  card.classList.remove("hidden");
  initLucideIcons();
}

function closeTargetReconCard() {
  const card = document.getElementById("target-recon-card");
  if (card) card.classList.add("hidden");
}

function jumpToRelic(relicId) {
  const relic = RELICS_DATA.find(r => r.id === relicId);
  if (!relic) return;

  // If looking at another planet, switch bodies first
  if (state.selectedBody !== relic.body && state.planetViewer) {
    state.selectedBody = relic.body;
    state.planetViewer.switchBody(relic.body);
    updateBodyButtonStyles();
    updatePlanetInfoCard();
  }

  // Smoothly rotate the planet to this relic
  if (state.planetViewer) {
    state.planetViewer.focusRelic(relic);
  }

  // Display the Target Reconnaissance Card with its authentic photograph
  displayTargetReconCard(relic);

  if (window.spaceAudio) {
    window.spaceAudio.playRadarPing();
  }
}

// 2. Navigation Handler
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-tab-btn");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      switchView(view);
    });
  });
}

function switchView(viewName) {
  state.currentView = viewName;
  if (window.spaceAudio) window.spaceAudio.playTelemetryBeep();

  // Update tabs
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    if (btn.dataset.view === viewName) {
      btn.className = "nav-tab-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm flex items-center gap-2";
    } else {
      btn.className = "nav-tab-btn px-4 py-2 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 flex items-center gap-2";
    }
  });

  // Toggle views
  const views = ["globe", "archive", "stories", "timeline", "quiz", "heritage"];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === viewName) {
        el.classList.remove("hidden");
        // Trigger resize if globe
        if (v === "globe" && state.planetViewer) {
          state.planetViewer.onWindowResize();
        }
      } else {
        el.classList.add("hidden");
      }
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Render Top Statistics Bar
function renderStatsBar() {
  const bar = document.getElementById("stats-summary-bar");
  if (!bar) return;

  bar.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
        <i data-lucide="database" class="w-5 h-5"></i>
      </div>
      <div>
        <div class="text-xl font-bold font-orbitron text-white">${MISSION_STATS.totalRelicsCataloged}</div>
        <div class="text-[11px] font-mono text-slate-400">Off-World Relics</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
        <i data-lucide="flame" class="w-5 h-5"></i>
      </div>
      <div>
        <div class="text-xl font-bold font-orbitron text-white">${MISSION_STATS.marsRelics} on Mars</div>
        <div class="text-[11px] font-mono text-slate-400">Red Planet Relics</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
        <i data-lucide="moon" class="w-5 h-5"></i>
      </div>
      <div>
        <div class="text-xl font-bold font-orbitron text-white">${MISSION_STATS.moonRelics} on Moon</div>
        <div class="text-[11px] font-mono text-slate-400">Lunar Monuments</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
        <i data-lucide="navigation" class="w-5 h-5"></i>
      </div>
      <div>
        <div class="text-xl font-bold font-orbitron text-white">90+ km</div>
        <div class="text-[11px] font-mono text-slate-400">Off-Earth Distance</div>
      </div>
    </div>
  `;
  initLucideIcons();
}

// 4. Render Relics Archive Cards
function renderArchiveGrid() {
  const grid = document.getElementById("relics-archive-grid");
  if (!grid) return;

  const filtered = RELICS_DATA.filter(relic => {
    // Body / Category Filter
    if (state.activeFilter !== "all") {
      if (state.activeFilter === "Mars" && relic.body !== "Mars") return false;
      if (state.activeFilter === "Moon" && relic.body !== "Moon") return false;
      if (["Rover", "Lander", "Helicopter", "Descent Stage", "Vehicle"].includes(state.activeFilter)) {
        if (relic.category !== state.activeFilter) return false;
      }
    }
    // Search Query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const match = relic.name.toLowerCase().includes(q) ||
                    relic.callsign.toLowerCase().includes(q) ||
                    relic.locationName.toLowerCase().includes(q) ||
                    relic.summary.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 text-slate-600"></i>
        <p class="text-lg font-semibold">No space relics match your filter</p>
        <p class="text-sm text-slate-500 mt-1">Try resetting the filter or changing your search terms.</p>
      </div>
    `;
    initLucideIcons();
    return;
  }

  grid.innerHTML = filtered.map(relic => `
    <div class="glass-panel rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer" onclick="openRelicModalById('${relic.id}')">
      <div>
        <!-- Photograph Preview -->
        <div class="relative w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-700/80 group-hover:border-cyan-500/50 transition-colors bg-slate-950">
          <img src="${relic.imageUrl}" alt="${relic.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold flex items-center gap-1">
            <i data-lucide="camera" class="w-3 h-3"></i> NASA ARCHIVE
          </span>
        </div>

        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold ${relic.body === 'Mars' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'}">
            ${relic.body} • ${relic.category}
          </span>
          <span class="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span class="w-2 h-2 rounded-full" style="background-color: ${relic.statusColor}"></span>
            ${relic.statusText.split(';')[0]}
          </span>
        </div>

        <h3 class="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
          ${relic.name}
        </h3>
        <p class="text-xs text-amber-400 font-mono mb-3">${relic.callsign}</p>

        <p class="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
          ${relic.summary}
        </p>

        <div class="bg-slate-900/60 rounded-xl p-3 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-400 mb-4">
          <div class="flex justify-between">
            <span>Location:</span>
            <span class="text-white text-right truncate max-w-[170px]">${relic.locationName}</span>
          </div>
          <div class="flex justify-between">
            <span>Landing Date:</span>
            <span class="text-white">${relic.landingDate.split('(')[0]}</span>
          </div>
          <div class="flex justify-between">
            <span>Active Duration:</span>
            <span class="text-white truncate max-w-[170px]">${relic.actualDuration}</span>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span class="text-xs text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Inspect Relic & Story <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </span>
        <span class="text-xs font-mono text-slate-500">ID: ${relic.nssdcaId}</span>
      </div>
    </div>
  `).join("");

  initLucideIcons();
}

function setupFilterControls() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.className = "filter-btn px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 transition-all");
      btn.className = "filter-btn px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-600 text-white font-bold transition-all shadow-md shadow-cyan-600/30";
      state.activeFilter = btn.dataset.filter;
      if (window.spaceAudio) window.spaceAudio.playTelemetryBeep();
      renderArchiveGrid();
    });
  });
}

function setupSearch() {
  const input = document.getElementById("search-relics-input");
  if (input) {
    input.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderArchiveGrid();
    });
  }
}

// 5. Render Storytelling Mode ("Echoes from the Dust")
function renderStoriesList() {
  const container = document.getElementById("stories-container");
  if (!container) return;

  container.innerHTML = RELICS_DATA.map((relic, idx) => `
    <article class="glass-panel rounded-3xl p-8 mb-10 border border-slate-700/60 relative overflow-hidden">
      <!-- Background subtle glow -->
      <div class="absolute -top-10 -right-10 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20 ${relic.body === 'Mars' ? 'bg-red-500' : 'bg-cyan-500'}"></div>

      <div class="relative z-10">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase ${relic.body === 'Mars' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'}">
              ${relic.body} Story
            </span>
            <span class="text-xs text-slate-400 font-mono">• ${relic.coordinates.formatted}</span>
          </div>
          
          <button id="btn-story-audio-${relic.id}" onclick="playRelicStoryAudio('${relic.id}')" class="px-3.5 py-1.5 rounded-full bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-all flex items-center gap-2 shadow-sm">
            <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
            <span>Listen to Story (Voice)</span>
          </button>
        </div>

        <h2 class="text-2xl md:text-3xl font-orbitron font-extrabold text-white mb-1">
          ${relic.story.title}
        </h2>
        <p class="text-sm font-mono text-amber-400 mb-6">Told by: ${relic.name} (${relic.callsign})</p>

        <div class="story-quote-box rounded-2xl p-5 mb-8">
          <p class="italic text-base md:text-lg text-slate-200 font-serif">
            "${relic.story.quote}"
          </p>
        </div>

        <div class="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
          ${relic.story.chapters.map(ch => `
            <div class="bg-slate-900/40 rounded-xl p-5 border border-slate-800/80">
              <h4 class="font-orbitron text-cyan-300 font-bold text-sm md:text-base mb-2">
                ${ch.heading}
              </h4>
              <p class="text-slate-300 leading-relaxed font-space">
                ${ch.text}
              </p>
            </div>
          `).join("")}
        </div>

        <div class="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <i data-lucide="map-pin" class="w-4 h-4 text-cyan-400"></i>
            <span>Resting permanently at: <strong class="text-white">${relic.locationName}</strong></span>
          </div>

          <button onclick="openRelicModalById('${relic.id}')" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-slate-700 flex items-center gap-2">
            <i data-lucide="cpu" class="w-4 h-4 text-cyan-400"></i>
            <span>Inspect 3D Hardware & Telemetry</span>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  initLucideIcons();
}

function playRelicStoryAudio(relicId) {
  const relic = RELICS_DATA.find(r => r.id === relicId);
  if (!relic || !window.spaceAudio) return;

  if (window.spaceAudio.isSpeaking && window.spaceAudio.activeStoryId === relicId && !window.spaceAudio.isPaused) {
    window.spaceAudio.stopNarration();
  } else {
    window.spaceAudio.narrateStory(relic);
  }
}

function setupAudioEngineListeners() {
  if (!window.spaceAudio) return;

  window.spaceAudio.onStateChange((audioState) => {
    updateAudioHUD(audioState);
    updateStoryButtons(audioState);
  });
}

function updateAudioHUD(audioState) {
  const hud = document.getElementById("floating-audio-hud");
  if (!hud) return;

  if (audioState.isSpeaking && audioState.activeRelic) {
    hud.classList.remove("hidden");
    const nameEl = document.getElementById("hud-story-name");
    const progEl = document.getElementById("hud-story-progress");
    if (nameEl) nameEl.textContent = audioState.activeRelic.name;
    if (progEl) {
      progEl.textContent = audioState.isPaused ? 
        `Paused • Sentence ${audioState.chunkIndex} of ${audioState.totalChunks}` : 
        `Sentence ${audioState.chunkIndex} of ${audioState.totalChunks}`;
    }

    const pauseBtn = document.getElementById("hud-btn-toggle-pause");
    if (pauseBtn) {
      pauseBtn.innerHTML = audioState.isPaused ? 
        `<i data-lucide="play" class="w-4 h-4 text-emerald-400"></i>` : 
        `<i data-lucide="pause" class="w-4 h-4 text-amber-300"></i>`;
    }
  } else {
    hud.classList.add("hidden");
  }
  initLucideIcons();
}

function updateStoryButtons(audioState) {
  RELICS_DATA.forEach(r => {
    const btn = document.getElementById(`btn-story-audio-${r.id}`);
    if (btn) {
      if (audioState.isSpeaking && audioState.activeStoryId === r.id) {
        btn.innerHTML = `<i data-lucide="square" class="w-3.5 h-3.5 text-amber-400"></i> <span class="text-amber-300 font-bold">${audioState.isPaused ? 'Paused (Resume)' : 'Stop Narration'}</span>`;
        btn.className = "px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-semibold transition-all flex items-center gap-2 shadow-sm";
      } else {
        btn.innerHTML = `<i data-lucide="volume-2" class="w-3.5 h-3.5"></i> <span>Listen to Story (Voice)</span>`;
        btn.className = "px-3.5 py-1.5 rounded-full bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-all flex items-center gap-2 shadow-sm";
      }
    }
  });

  // Modal button
  const modalPlayBtn = document.getElementById("modal-btn-play-story");
  if (modalPlayBtn) {
    if (state.selectedRelic && audioState.isSpeaking && audioState.activeStoryId === state.selectedRelic.id) {
      modalPlayBtn.innerHTML = `<i data-lucide="square" class="w-4 h-4 text-amber-400"></i> <span class="text-amber-300">${audioState.isPaused ? 'Resume Voice' : 'Stop Voice'}</span>`;
    } else {
      modalPlayBtn.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4"></i> <span class="hidden sm:inline">Read Story</span>`;
    }
  }
  initLucideIcons();
}

function togglePauseStoryAudio() {
  if (window.spaceAudio) {
    window.spaceAudio.togglePause();
  }
}

function stopStoryAudio() {
  if (window.spaceAudio) {
    window.spaceAudio.stopNarration();
  }
}

function testCommsAudio() {
  if (window.spaceAudio) {
    window.spaceAudio.testComms();
  }
}

// 6. Render Chronological Timeline
function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  // Sort relics by landing date year
  const sorted = [...RELICS_DATA].sort((a, b) => {
    const yearA = parseInt(a.landingDate.match(/\d{4}/)[0]);
    const yearB = parseInt(b.landingDate.match(/\d{4}/)[0]);
    return yearA - yearB;
  });

  container.innerHTML = sorted.map((relic, idx) => {
    const isLeft = idx % 2 === 0;
    const year = relic.landingDate.match(/\d{4}/)[0];

    return `
      <div class="relative flex flex-col md:flex-row items-center mb-12 ${isLeft ? 'md:flex-row-reverse' : ''}">
        <!-- Marker Node -->
        <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 ${relic.body === 'Mars' ? 'border-red-500 bg-red-950 text-red-400' : 'border-cyan-400 bg-cyan-950 text-cyan-300'} flex items-center justify-center font-bold text-xs shadow-lg z-10">
          <i data-lucide="${relic.body === 'Mars' ? 'flame' : 'moon'}" class="w-4 h-4"></i>
        </div>

        <!-- Content Card -->
        <div class="w-full md:w-5/12 pl-14 md:pl-0 ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10'}">
          <div class="glass-panel p-6 rounded-2xl hover:border-cyan-500/40 transition-all cursor-pointer group" onclick="openRelicModalById('${relic.id}')">
            <div class="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold mb-2 ${relic.body === 'Mars' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'}">
              ${year} • ${relic.landingDate.split('(')[0]}
            </div>

            <h3 class="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
              ${relic.name}
            </h3>
            <p class="text-xs text-amber-400 font-mono mb-2">${relic.callsign}</p>
            <p class="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
              ${relic.summary}
            </p>

            <div class="text-[11px] font-mono text-cyan-400 flex items-center gap-1 ${isLeft ? 'md:justify-end' : ''}">
              <span>View Hardware Details</span>
              <i data-lucide="chevron-right" class="w-3 h-3"></i>
            </div>
          </div>
        </div>

        <!-- Empty spacer for opposite side on desktop -->
        <div class="hidden md:block md:w-5/12"></div>
      </div>
    `;
  }).join("");

  initLucideIcons();
}

// 7. Render Junior Space Archaeologist Challenge (Quiz)
function renderQuizSection() {
  const container = document.getElementById("quiz-questions-container");
  if (!container) return;

  container.innerHTML = RELICS_DATA.map((relic, idx) => `
    <div class="glass-panel rounded-2xl p-6 border border-slate-700/80 mb-6" id="quiz-card-${relic.id}">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-mono text-cyan-400 font-bold">Field Mission Challenge #${idx + 1}</span>
        <span class="text-xs font-mono text-slate-400">${relic.name}</span>
      </div>

      <h3 class="font-orbitron text-base md:text-lg text-white font-bold mb-4">
        ${relic.quiz.question}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        ${relic.quiz.options.map((opt, optIdx) => `
          <button onclick="handleQuizAnswer('${relic.id}', ${optIdx})" id="quiz-opt-${relic.id}-${optIdx}" class="p-3.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-800/80 text-left text-sm text-slate-200 transition-all font-space">
            <span class="font-mono text-xs text-cyan-400 font-bold mr-2">${String.fromCharCode(65 + optIdx)}.</span>
            ${opt}
          </button>
        `).join("")}
      </div>

      <div id="quiz-feedback-${relic.id}" class="hidden p-4 rounded-xl text-xs font-space leading-relaxed border"></div>
    </div>
  `).join("");

  initLucideIcons();
}

function handleQuizAnswer(relicId, selectedOptionIdx) {
  const relic = RELICS_DATA.find(r => r.id === relicId);
  if (!relic) return;

  const isCorrect = selectedOptionIdx === relic.quiz.correctIndex;
  const feedbackEl = document.getElementById(`quiz-feedback-${relicId}`);

  // Disable options for this card
  relic.quiz.options.forEach((opt, idx) => {
    const btn = document.getElementById(`quiz-opt-${relicId}-${idx}`);
    if (btn) {
      btn.disabled = true;
      if (idx === relic.quiz.correctIndex) {
        btn.className = "p-3.5 rounded-xl border border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold text-left text-sm";
      } else if (idx === selectedOptionIdx && !isCorrect) {
        btn.className = "p-3.5 rounded-xl border border-rose-500 bg-rose-950/40 text-rose-200 text-left text-sm opacity-60";
      } else {
        btn.className = "p-3.5 rounded-xl border border-slate-800 bg-slate-900/30 text-slate-500 text-left text-sm opacity-40";
      }
    }
  });

  // Sound & scoring
  if (isCorrect) {
    if (window.spaceAudio) window.spaceAudio.playBadgeChime();
    state.quizScore++;
    unlockBadge(relic.badge);
    feedbackEl.className = "p-4 rounded-xl text-xs font-space leading-relaxed border border-emerald-500/40 bg-emerald-950/30 text-emerald-200 block";
    feedbackEl.innerHTML = `
      <div class="flex items-center gap-2 font-bold mb-1 font-orbitron text-emerald-400">
        <i data-lucide="check-circle" class="w-4 h-4"></i> Correct! Mission Accomplished!
      </div>
      <p>${relic.quiz.explanation}</p>
      <div class="mt-2 text-amber-300 font-bold flex items-center gap-1.5 font-mono">
        <i data-lucide="award" class="w-4 h-4"></i> Unlocked Badge: ${relic.badge.name}
      </div>
    `;
  } else {
    if (window.spaceAudio) window.spaceAudio.playBuzz();
    feedbackEl.className = "p-4 rounded-xl text-xs font-space leading-relaxed border border-rose-500/40 bg-rose-950/30 text-rose-200 block";
    feedbackEl.innerHTML = `
      <div class="flex items-center gap-2 font-bold mb-1 font-orbitron text-rose-400">
        <i data-lucide="alert-triangle" class="w-4 h-4"></i> Telemetry Mismatch!
      </div>
      <p>${relic.quiz.explanation}</p>
    `;
  }

  updateQuizScoreDisplay();
  initLucideIcons();
}

function updateQuizScoreDisplay() {
  const scoreEl = document.getElementById("quiz-score-num");
  if (scoreEl) {
    scoreEl.textContent = `${state.quizScore} / ${RELICS_DATA.length}`;
  }

  // If completed all, show certificate button
  if (state.quizScore === RELICS_DATA.length) {
    const certBox = document.getElementById("certificate-banner");
    if (certBox) certBox.classList.remove("hidden");
  }
}

function unlockBadge(badge) {
  if (!state.unlockedBadges.some(b => b.name === badge.name)) {
    state.unlockedBadges.push(badge);
    localStorage.setItem('smash_unlocked_badges', JSON.stringify(state.unlockedBadges));
    renderBadgesCollection();
  }
}

// 8. Render Badges Collection
function renderBadgesCollection() {
  const container = document.getElementById("badges-collection-grid");
  if (!container) return;

  container.innerHTML = RELICS_DATA.map(relic => {
    const isUnlocked = state.unlockedBadges.some(b => b.name === relic.badge.name);

    return `
      <div class="badge-card rounded-2xl p-4 border text-center transition-all ${isUnlocked ? 'unlocked' : 'border-slate-800 bg-slate-900/40 opacity-50'}">
        <div class="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 ${isUnlocked ? 'bg-amber-500/20 text-amber-400 border-2 border-amber-400/60 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-600 border border-slate-700'}">
          <i data-lucide="${relic.badge.icon || 'award'}" class="w-7 h-7"></i>
        </div>
        <h4 class="font-orbitron font-bold text-xs mb-1 ${isUnlocked ? 'text-amber-300' : 'text-slate-400'}">
          ${relic.badge.name}
        </h4>
        <p class="text-[11px] text-slate-400 font-space line-clamp-2">
          ${relic.badge.description}
        </p>
        <span class="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded ${isUnlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}">
          ${isUnlocked ? '✓ COLLECTED' : 'LOCKED (Take Quiz)'}
        </span>
      </div>
    `;
  }).join("");

  initLucideIcons();
}

// 9. Interactive Relic Modal & 3D Hardware Inspector
function openRelicModalById(relicId) {
  const relic = RELICS_DATA.find(r => r.id === relicId);
  if (relic) openRelicModal(relic);
}

function openRelicModal(relic) {
  state.selectedRelic = relic;
  if (window.spaceAudio) window.spaceAudio.playRadarPing();

  const modal = document.getElementById("relic-detail-modal");
  if (!modal) return;

  // Title & Headers
  document.getElementById("modal-relic-name").textContent = relic.name;
  document.getElementById("modal-relic-callsign").textContent = relic.callsign;
  document.getElementById("modal-relic-body").textContent = `${relic.body} • ${relic.category}`;
  document.getElementById("modal-relic-coords").textContent = relic.coordinates.formatted;
  document.getElementById("modal-relic-location").textContent = relic.locationName;
  document.getElementById("modal-relic-status").textContent = relic.statusText;
  document.getElementById("modal-relic-status-indicator").style.backgroundColor = relic.statusColor;

  // Specs Table
  document.getElementById("modal-relic-launch").textContent = relic.launchDate;
  document.getElementById("modal-relic-landing").textContent = relic.landingDate;
  document.getElementById("modal-relic-lastcontact").textContent = relic.lastContact;
  document.getElementById("modal-relic-duration").textContent = relic.actualDuration;
  document.getElementById("modal-relic-distance").textContent = relic.distanceTraveled;
  document.getElementById("modal-relic-nssdca").textContent = relic.nssdcaId;
  document.getElementById("modal-relic-nssdca-link").href = `https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=${relic.nssdcaId}`;

  // Why Abandoned
  document.getElementById("modal-relic-why-abandoned").textContent = relic.whyAbandoned;

  // Key Achievements
  const achieveList = document.getElementById("modal-relic-achievements");
  achieveList.innerHTML = relic.keyAchievements.map(item => `
    <li class="flex items-start gap-2">
      <i data-lucide="check" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i>
      <span class="text-slate-200 text-xs md:text-sm leading-relaxed">${item}</span>
    </li>
  `).join("");

  // Kid Friendly Fact
  document.getElementById("modal-relic-kidfact").textContent = relic.kidFriendlyFact;

  // Subsystems
  const subsList = document.getElementById("modal-relic-subsystems");
  subsList.innerHTML = relic.subsystems.map(sub => `
    <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs font-space">
      <div class="font-bold text-cyan-300 font-orbitron mb-1">${sub.name}</div>
      <div class="text-slate-400">${sub.role}</div>
    </div>
  `).join("");

  // Story Quote in Modal
  document.getElementById("modal-relic-quote").textContent = `"${relic.story.quote}"`;

  // Update Modal Photo
  const modalImg = document.getElementById("modal-relic-img");
  if (modalImg) modalImg.src = relic.imageUrl;

  // Reset to 3D view tab
  switchModalView('3d');

  // Show Modal
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Init 3D Model in canvas container
  setTimeout(() => {
    if (!state.modelViewer) {
      state.modelViewer = new HardwareModelViewer3D("modal-model-container");
    }
    state.modelViewer.loadModel(relic.modelType, relic);
    state.modelViewer.onResize();
  }, 100);

  initLucideIcons();
}

function switchModalView(mode) {
  const modelBox = document.getElementById("modal-model-container");
  const photoBox = document.getElementById("modal-photo-container");
  const tab3d = document.getElementById("modal-tab-3d");
  const tabPhoto = document.getElementById("modal-tab-photo");
  const hintEl = document.getElementById("modal-view-hint");
  const wireBtn = document.getElementById("btn-toggle-wireframe");

  if (mode === '3d') {
    if (modelBox) modelBox.classList.remove("hidden");
    if (photoBox) photoBox.classList.add("hidden");
    if (wireBtn) wireBtn.classList.remove("hidden");
    if (tab3d) tab3d.className = "px-2.5 py-1 rounded-lg bg-cyan-600 text-white font-bold text-xs flex items-center gap-1 transition-all";
    if (tabPhoto) tabPhoto.className = "px-2.5 py-1 rounded-lg text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-all";
    if (hintEl) hintEl.textContent = "Drag to rotate 3D hardware • Scroll to zoom";
    if (state.modelViewer) state.modelViewer.onResize();
  } else {
    if (modelBox) modelBox.classList.add("hidden");
    if (photoBox) photoBox.classList.remove("hidden");
    if (wireBtn) wireBtn.classList.add("hidden");
    if (tabPhoto) tabPhoto.className = "px-2.5 py-1 rounded-lg bg-cyan-600 text-white font-bold text-xs flex items-center gap-1 transition-all";
    if (tab3d) tab3d.className = "px-2.5 py-1 rounded-lg text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-all";
    if (hintEl) hintEl.textContent = "NASA Jet Propulsion Laboratory & Mission Archives";
  }
  initLucideIcons();
}

function setupModalControls() {
  const closeBtn = document.getElementById("modal-close-btn");
  const modal = document.getElementById("relic-detail-modal");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      closeRelicModal();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeRelicModal();
    });
  }

  // Toggle wireframe button
  const wireframeBtn = document.getElementById("btn-toggle-wireframe");
  if (wireframeBtn) {
    wireframeBtn.addEventListener("click", () => {
      if (state.modelViewer) {
        const isWire = state.modelViewer.toggleWireframe();
        wireframeBtn.innerHTML = isWire ? 
          `<i data-lucide="box" class="w-4 h-4"></i> Shaded View` : 
          `<i data-lucide="grid" class="w-4 h-4"></i> Hologram Wireframe`;
        initLucideIcons();
      }
    });
  }

  // Play narration in modal
  const playStoryBtn = document.getElementById("modal-btn-play-story");
  if (playStoryBtn) {
    playStoryBtn.addEventListener("click", () => {
      if (state.selectedRelic) {
        playRelicStoryAudio(state.selectedRelic.id);
      }
    });
  }

  // Sound toggle button on top navbar
  const soundToggleBtn = document.getElementById("btn-toggle-audio");
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      if (window.spaceAudio) {
        const enabled = window.spaceAudio.toggleSound();
        soundToggleBtn.innerHTML = enabled ? 
          `<i data-lucide="volume-2" class="w-4 h-4 text-cyan-400"></i>` : 
          `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i>`;
        initLucideIcons();
      }
    });
  }
}

function closeRelicModal() {
  const modal = document.getElementById("relic-detail-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
  if (window.spaceAudio) {
    window.spaceAudio.stopNarration();
  }
}

// Certificate Generator
function printCertificate() {
  const win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Junior Space Archaeologist Certificate - Team smAsh</title>
      <style>
        body { font-family: 'Georgia', serif; text-align: center; padding: 40px; background: #0b1120; color: #f8fafc; }
        .border-box { border: 8px double #38bdf8; padding: 40px; border-radius: 20px; background: #0f172a; max-width: 800px; margin: 0 auto; box-shadow: 0 0 50px rgba(56, 189, 248, 0.3); }
        h1 { font-size: 36px; color: #f59e0b; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 2px; }
        h2 { font-size: 20px; color: #38bdf8; margin-top: 0; font-family: sans-serif; }
        p { font-size: 16px; line-height: 1.6; color: #cbd5e1; }
        .seal { width: 120px; height: 120px; border-radius: 50%; border: 4px solid #f59e0b; display: inline-flex; align-items: center; justify-content: center; margin: 20px 0; font-weight: bold; color: #f59e0b; }
        .signatures { display: flex; justify-content: space-around; margin-top: 40px; font-family: sans-serif; font-size: 14px; color: #94a3b8; }
        .sig-line { border-top: 1px solid #64748b; padding-top: 8px; width: 220px; }
      </style>
    </head>
    <body>
      <div class="border-box">
        <h2>NASA SPACE APPS CHALLENGE • TEAM SMASH</h2>
        <h1>CERTIFICATE OF ACHIEVEMENT</h1>
        <p>This certifies that the space explorer has successfully mastered the field missions of</p>
        <h2 style="color: #ffffff; font-size: 26px;">JUNIOR SPACE ARCHAEOLOGIST</h2>
        <p>Demonstrating deep knowledge of NASA's retired and abandoned hardware on the Moon and Mars, uncovering the legacy of Opportunity, Ingenuity, InSight, Apollo 11, and the silent pioneers of the solar system.</p>
        <div class="seal">OFF-WORLD<br>HERITAGE<br>VERIFIED</div>
        <div class="signatures">
          <div><div class="sig-line">Team smAsh Mission Control</div></div>
          <div><div class="sig-line">NASA Space Apps Challenge</div></div>
        </div>
      </div>
      <script>window.print();</script>
    </body>
    </html>
  `);
  win.document.close();
}
