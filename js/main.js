/**
 * EAK INTERNATIONAL SCHOOL — CORE INTERACTIVE JAVASCRIPT
 * Pure Vanilla JavaScript (Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFontScaler();
  initBackToTop();
  initUnifiedScrollController();
  initSearchModal();
  initMobileMenu();
  initAnimatedCounters();
  initAiConcierge();
  initShortlist();
  initFeeCalculator();
  initApplicationTracker();
  initPanoramaTour();
  initTransitFinder();
  initStreamExplorer();
  initModals();
  initToastSystem();
  initCardSpotlight();
  initEventFeatures();
  initCampusLifeTabs();
  initEligibilityChecker();
  initDocChecklist();
  initScrollReveal();
  initHeroParallax();
  initBackgroundVideo();
  initMorphxNavIndicator();
  initPageMotionBlur();
});

/* ==========================================================================
   1. THEME SWITCHER (OBSIDIAN DARK <-> SWISS PAPER LIGHT)
   ========================================================================== */
function initTheme() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('eak_theme_vanilla') || 'dark';
  const isLight = savedTheme === 'light';

  if (isLight) {
    document.body.classList.add('light-theme');
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark');
    updateThemeIcons(true);
  } else {
    document.body.classList.remove('light-theme');
    document.documentElement.classList.remove('light-theme');
    document.documentElement.classList.add('dark');
    updateThemeIcons(false);
  }

  // Smoothly remove preload suppressor after first frame renders
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.remove('theme-preload');
    }, 50);
  });

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.documentElement.classList.add('theme-transitioning');
      const nowLight = document.body.classList.toggle('light-theme');
      document.documentElement.classList.toggle('light-theme', nowLight);
      document.documentElement.classList.toggle('dark', !nowLight);
      localStorage.setItem('eak_theme_vanilla', nowLight ? 'light' : 'dark');
      updateThemeIcons(nowLight);
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 350);
    });
  });

  function updateThemeIcons(isLight) {
    document.querySelectorAll('.theme-icon-sun').forEach(el => el.style.display = isLight ? 'none' : 'inline-block');
    document.querySelectorAll('.theme-icon-moon').forEach(el => el.style.display = isLight ? 'inline-block' : 'none');
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('title', isLight ? 'Switch to Obsidian Dark' : 'Switch to Swiss Paper Light');
      btn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    });
  }
}

/* ==========================================================================
   2. FONT SIZE SCALER (A- / A / A+)
   ========================================================================== */
function initFontScaler() {
  const btnMinus = document.getElementById('font-minus');
  const btnReset = document.getElementById('font-reset');
  const btnPlus = document.getElementById('font-plus');

  if (btnMinus) btnMinus.addEventListener('click', () => document.documentElement.style.fontSize = '92%');
  if (btnReset) btnReset.addEventListener('click', () => document.documentElement.style.fontSize = '100%');
  if (btnPlus) btnPlus.addEventListener('click', () => document.documentElement.style.fontSize = '110%');
}

/* ==========================================================================
   3. UNIFIED HIGH-PERFORMANCE SCROLL CONTROLLER
   ========================================================================== */
function initUnifiedScrollController() {
  const navbar = document.querySelector('.navbar');
  const siteHeader = document.querySelector('.site-header');
  let backToTopBtn = document.getElementById('back-to-top');

  let ticking = false;
  let lastScrolled = null;
  let lastBttVisible = null;

  function updateScrollState() {
    const scrollY = window.scrollY;

    // 1. Sticky navbar elevation
    const isScrolled = scrollY > 20;
    if (isScrolled !== lastScrolled) {
      if (navbar) navbar.classList.toggle('scrolled', isScrolled);
      if (siteHeader) siteHeader.classList.toggle('header-elevated', isScrolled);
      lastScrolled = isScrolled;
    }

    // 2. Back to top button visibility
    if (!backToTopBtn) backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      const showBtt = scrollY > 350;
      if (showBtt !== lastBttVisible) {
        backToTopBtn.classList.toggle('visible', showBtt);
        lastBttVisible = showBtt;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });

  // Initial check on load
  updateScrollState();
}

function initReadingProgressBar() {
  // Reading progress strip intentionally removed per user design request
}

function initNavbarScroll() {
  // Handled inside initUnifiedScrollController()
}

/* ==========================================================================
   5. SEARCH MODAL (CTRL + K)
   ========================================================================== */
function initSearchModal() {
  const modal = document.getElementById('search-modal');
  const openBtns = document.querySelectorAll('.search-trigger-btn');
  const closeBtn = document.getElementById('search-close-btn');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  const SEARCH_INDEX = [
    { title: 'Admissions 2027–28 Guidelines', category: 'Admissions', url: 'admissions.html' },
    { title: 'Tuition & Fee Calculator', category: 'Admissions', url: 'admissions.html#tuition-calculator' },
    { title: 'Track Application Status', category: 'Admissions', url: 'admissions.html#tracker' },
    { title: 'Senior Secondary STEM & AI Track', category: 'Academics', url: 'academics.html#streams' },
    { title: 'Turing Robotics & AI Hub', category: 'Facilities', url: 'facilities.html#virtual-tour' },
    { title: 'Olympic 50m Aquatics Complex', category: 'Facilities', url: 'facilities.html' },
    { title: 'Smart Bus Routes & Fleet Telemetry', category: 'Facilities', url: 'facilities.html#transit' },
    { title: 'October 2026 Monthly Calendar', category: 'Events', url: 'events.html' },
    { title: 'Contact Admissions Desk', category: 'Contact', url: 'contact.html' },
    { title: 'Principal Leadership Address', category: 'About', url: 'about.html#leadership' },
  ];

  if (!modal) return;

  function openSearch() {
    modal.classList.add('open');
    if (input) {
      input.value = '';
      input.focus();
      renderResults(SEARCH_INDEX.slice(0, 5));
    }
  }

  function closeSearch() {
    modal.classList.remove('open');
  }

  openBtns.forEach(btn => btn.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeSearch();
    }
  });

  if (input) {
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderResults(SEARCH_INDEX.slice(0, 5));
        return;
      }
      const filtered = SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });
  }

  function renderResults(items) {
    if (!resultsContainer) return;
    if (items.length === 0) {
      resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 13px;">No matching results found</div>';
      return;
    }
    resultsContainer.innerHTML = items.map(item => `
      <a href="${item.url}" class="search-result-item">
        <div>
          <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${item.title}</div>
          <div style="font-size: 11px; color: var(--text-secondary); font-family: var(--font-mono);">${item.category}</div>
        </div>
        <span style="font-size: 14px; color: var(--text-secondary);">→</span>
      </a>
    `).join('');
  }
}

/* ==========================================================================
   6. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-drawer');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Auto-close menu when tapping any navigation link inside
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Auto-close when clicking outside
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
        menu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   7. ANIMATED STAT COUNTERS
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const duration = 1200;
        const start = performance.now();

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          // Ease out cubic: 1 - pow(1 - progress, 3)
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeProgress * target);
          el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
          }
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   8. "ASK EAK AI" CONCIERGE DRAWER
   ========================================================================== */
function initAiConcierge() {
  const launcher = document.getElementById('ai-launcher-btn');
  const drawer = document.getElementById('ai-drawer');
  const closeBtn = document.getElementById('ai-close-btn');
  const overlay = document.getElementById('drawer-overlay');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const chatMessages = document.getElementById('ai-chat-messages');
  const promptChips = document.querySelectorAll('.ai-chip-btn');

  if (!launcher || !drawer) return;

  function toggleAi(open) {
    drawer.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
  }
  window.toggleAi = toggleAi;

  launcher.addEventListener('click', () => toggleAi(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleAi(false));
  if (overlay) overlay.addEventListener('click', () => toggleAi(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      toggleAi(false);
    }
  });

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sendUserMessage(chip.textContent.trim());
    });
  });

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      sendUserMessage(val);
      chatInput.value = '';
    });
  }

  function sendUserMessage(text) {
    if (!chatMessages) return;

    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.style.cssText = 'margin-bottom: 12px; text-align: right;';
    userDiv.innerHTML = `
      <div class="chat-bubble-user">
        ${text}
      </div>
    `;
    chatMessages.appendChild(userDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Append Typing Indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-typing-wrapper';
    typingDiv.style.cssText = 'margin-bottom: 12px; text-align: left;';
    typingDiv.innerHTML = `
      <div class="ai-typing">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI response with typing delay
    setTimeout(() => {
      typingDiv.remove();

      const lower = text.toLowerCase();
      let answer = "Thank you for inquiring. EAK International School balances academic mastery, athletic vigor, and technological fluency. Our admissions office is ready to assist your family.";
      let actionBtnHtml = '';

      if (lower.includes('deadline') || lower.includes('when') || lower.includes('date')) {
        answer = "Admissions for the 2027–28 session close on December 15, 2026 for early rounds. Merit scholarship reviews conclude on January 20, 2027.";
        actionBtnHtml = '<button type="button" class="chat-action-btn" onclick="window.location.href=\'admissions.html#inquiry\'">Submit Inquiry Form →</button>';
      } else if (lower.includes('fee') || lower.includes('tuition') || lower.includes('cost')) {
        answer = "Annual tuition ranges from ₹1,45,000 (Foundational) to ₹2,35,000 (Senior Secondary STEM). Try our interactive calculator on the Admissions page!";
        actionBtnHtml = '<button type="button" class="chat-action-btn" onclick="window.location.href=\'admissions.html#tuition-calculator\'">Launch Fee Calculator →</button>';
      } else if (lower.includes('bus') || lower.includes('transport') || lower.includes('route')) {
        answer = "We operate 5 GPS-tracked bus corridors across Cyber City, Golf Course, and South Hub with female attendants on 100% of routes.";
        actionBtnHtml = '<button type="button" class="chat-action-btn" onclick="window.location.href=\'facilities.html#transit\'">Inspect Bus Corridors →</button>';
      } else if (lower.includes('curriculum') || lower.includes('stream') || lower.includes('ib') || lower.includes('cbse')) {
        answer = "We offer a Cambridge & CBSE integrated curriculum. Grades 11-12 feature specialized streams in Science (PCM), Science (PCB), Commerce, and Humanities.";
        actionBtnHtml = '<button type="button" class="chat-action-btn" onclick="window.location.href=\'academics.html#streams\'">Explore Academic Streams →</button>';
      }

      const botDiv = document.createElement('div');
      botDiv.style.cssText = 'margin-bottom: 14px; text-align: left;';
      botDiv.innerHTML = `
        <div class="chat-bubble-bot">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-weight: 700; color: var(--accent-emerald); font-size: 10px; font-family: var(--font-mono);">EAK CONCIERGE</span>
            <button type="button" class="font-btn speak-btn" title="Listen to response" style="font-size: 9px; padding: 1px 6px;">🔊 Listen</button>
          </div>
          <div>${answer}</div>
          ${actionBtnHtml}
        </div>
      `;
      chatMessages.appendChild(botDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Text to speech handler
      const speakBtn = botDiv.querySelector('.speak-btn');
      if (speakBtn && 'speechSynthesis' in window) {
        speakBtn.addEventListener('click', () => {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(answer);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        });
      }
    }, 600);
  }
}

/* ==========================================================================
   9. "MY ADMISSIONS SHORTLIST"
   ========================================================================== */
function initShortlist() {
  const launchers = document.querySelectorAll('#shortlist-launcher-btn, .mobile-shortlist-launcher, [data-shortlist-launcher]');
  const drawer = document.getElementById('shortlist-drawer');
  const closeBtn = document.getElementById('shortlist-close-btn');
  const clearBtn = document.getElementById('shortlist-clear-btn');
  const printBtn = document.getElementById('shortlist-print-btn');
  const container = document.getElementById('shortlist-items-container');
  const overlay = document.getElementById('drawer-overlay');

  let shortlist = JSON.parse(localStorage.getItem('eak_shortlist_vanilla') || '[]');

  if (shortlist.length === 0) {
    shortlist = [
      { id: 'item-1', title: 'Senior Secondary STEM & AI Track', category: 'Academics' },
      { id: 'item-2', title: 'Turing Advanced Robotics & AI Hub', category: 'Facility' }
    ];
    saveShortlist();
  }

  updateBadges();

  function saveShortlist() {
    localStorage.setItem('eak_shortlist_vanilla', JSON.stringify(shortlist));
    updateBadges();
    renderItems();
  }

  function updateBadges() {
    const allBadges = document.querySelectorAll('.shortlist-count-badge');
    allBadges.forEach(b => {
      b.textContent = shortlist.length;
      b.style.display = shortlist.length > 0 ? 'inline-flex' : 'none';
    });
  }

  function renderItems() {
    if (!container) return;
    if (shortlist.length === 0) {
      container.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-secondary); font-size: 13px;">Your admissions shortlist is empty. Click the bookmark icon on any facility or program to save it here.</div>';
      return;
    }
    container.innerHTML = shortlist.map((item, idx) => `
      <div class="shortlist-card-item">
        <div>
          <span style="font-size: 10px; font-family: var(--font-mono); color: var(--accent-emerald); text-transform: uppercase;">${item.category}</span>
          <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${item.title}</div>
        </div>
        <button onclick="removeShortlistItem(${idx})" class="shortlist-remove-btn" title="Remove">✕</button>
      </div>
    `).join('');
  }

  window.removeShortlistItem = function(idx) {
    shortlist.splice(idx, 1);
    saveShortlist();
  };

  window.addShortlistItem = function(title, category) {
    if (!shortlist.some(i => i.title === title)) {
      shortlist.unshift({ id: 'item-' + Date.now(), title, category });
      saveShortlist();
      if (window.showToast) {
        window.showToast('Added to Shortlist', `"${title}" has been saved.`, 'success', 'Open Shortlist →', () => toggleShortlist(true));
      }
    } else {
      if (window.showToast) {
        window.showToast('Already in Shortlist', `"${title}" is already bookmarked.`, 'info', 'Open Shortlist →', () => toggleShortlist(true));
      }
    }
  };

  function toggleShortlist(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    if (open) renderItems();
  }
  window.toggleShortlist = toggleShortlist;

  launchers.forEach(l => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      const mobileMenu = document.getElementById('mobile-drawer');
      const toggleBtn = document.getElementById('mobile-menu-btn');
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      toggleShortlist(true);
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', () => toggleShortlist(false));
  if (overlay) overlay.addEventListener('click', () => toggleShortlist(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      toggleShortlist(false);
    }
  });

  if (clearBtn) clearBtn.addEventListener('click', () => {
    shortlist = [];
    saveShortlist();
  });
  if (printBtn) printBtn.addEventListener('click', () => window.print());
}

/* ==========================================================================
   10. INTERACTIVE TUITION & FEE CALCULATOR (MULTI-CURRENCY & RATIO BREAKDOWN)
   ========================================================================== */
function initFeeCalculator() {
  const gradeSelect = document.getElementById('calc-grade');
  const transportSelect = document.getElementById('calc-transport');
  const mealCheckbox = document.getElementById('calc-meal');
  const siblingCheckbox = document.getElementById('calc-sibling');
  const scholarshipSelect = document.getElementById('calc-scholarship');
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const exportBtn = document.getElementById('calc-export-btn');

  const outTuition = document.getElementById('out-tuition');
  const outTransport = document.getElementById('out-transport');
  const outMeal = document.getElementById('out-meal');
  const outDeduction = document.getElementById('out-deduction');
  const outTotal = document.getElementById('out-total');
  const outQuarterly = document.getElementById('out-quarterly');

  const segTuition = document.getElementById('seg-tuition');
  const segTransport = document.getElementById('seg-transport');
  const segDining = document.getElementById('seg-dining');

  if (!gradeSelect || !outTotal) return;

  const CURRENCIES = {
    'INR': { symbol: '₹', rate: 1 },
    'USD': { symbol: '$', rate: 1 / 85 },
    'AED': { symbol: 'AED ', rate: 1 / 23 },
    'GBP': { symbol: '£', rate: 1 / 108 }
  };

  let currentCurrency = 'INR';

  function formatMoney(amountInInr) {
    const curr = CURRENCIES[currentCurrency] || CURRENCIES['INR'];
    const converted = Math.round(amountInInr * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  }

  function calculate() {
    if (!gradeSelect.value) gradeSelect.value = '175000';
    const baseTuition = parseInt(gradeSelect.value, 10) || 175000;
    const transportFee = parseInt(transportSelect ? transportSelect.value : 0, 10) || 0;
    const mealFee = mealCheckbox && mealCheckbox.checked ? 36000 : 0;

    let deduction = 0;
    if (siblingCheckbox && siblingCheckbox.checked) {
      deduction += baseTuition * 0.10;
    }
    const scholarshipPct = scholarshipSelect ? parseFloat(scholarshipSelect.value) : 0;
    if (scholarshipPct > 0) {
      deduction += baseTuition * scholarshipPct;
    }

    const netAnnual = Math.max(0, baseTuition + transportFee + mealFee - deduction);
    const quarterly = Math.round(netAnnual / 4);

    if (outTuition) outTuition.textContent = formatMoney(baseTuition);
    if (outTransport) outTransport.textContent = transportFee === 0 ? 'None' : formatMoney(transportFee);
    if (outMeal) outMeal.textContent = mealFee === 0 ? 'Opted Out' : formatMoney(mealFee);
    if (outDeduction) outDeduction.textContent = deduction === 0 ? `-${formatMoney(0)}` : `-${formatMoney(Math.round(deduction))}`;
    if (outTotal) outTotal.textContent = formatMoney(netAnnual);
    if (outQuarterly) outQuarterly.textContent = formatMoney(quarterly);

    // Update Ratio Breakdown Bar
    const gross = baseTuition + transportFee + mealFee || 1;
    if (segTuition) segTuition.style.width = `${Math.round((baseTuition / gross) * 100)}%`;
    if (segTransport) segTransport.style.width = `${Math.round((transportFee / gross) * 100)}%`;
    if (segDining) segDining.style.width = `${Math.round((mealFee / gross) * 100)}%`;
  }

  [gradeSelect, transportSelect, mealCheckbox, siblingCheckbox, scholarshipSelect].forEach(el => {
    if (el) el.addEventListener('change', calculate);
  });

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.getAttribute('data-currency') || 'INR';
      calculate();
      if (window.showToast) {
        window.showToast('Currency Switched', `Displaying figures in ${currentCurrency}`, 'info');
      }
    });
  });

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const selectedStageText = gradeSelect.options[gradeSelect.selectedIndex].text;
      const slip = `=====================================================
EAK INTERNATIONAL SCHOOL — ADMISSIONS 2027-28
OFFICIAL ANNUAL FEE ESTIMATE QUOTATION
=====================================================
Date of Generation: ${new Date().toLocaleDateString('en-GB')}
Academic Stage: ${selectedStageText}
Selected Currency: ${currentCurrency}

ITEMIZED BREAKDOWN:
-----------------------------------------------------
- Base Tuition:          ${outTuition ? outTuition.textContent : ''}
- Transportation:        ${outTransport ? outTransport.textContent : ''}
- Nutrition & Dining:    ${outMeal ? outMeal.textContent : ''}
- Applied Concessions:   ${outDeduction ? outDeduction.textContent : ''}
-----------------------------------------------------
NET ANNUAL INVESTMENT:   ${outTotal ? outTotal.textContent : ''}
Quarterly Slab (x4):     ${outQuarterly ? outQuarterly.textContent : ''}
-----------------------------------------------------
Admissions Helpdesk: admissions@eakschool.edu.in
Helpline: +91 11 4567 8900
Official Portal: https://eakschool.edu.in
=====================================================`;

      const blob = new Blob([slip], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `EAK_Fee_Quotation_2027_${currentCurrency}.txt`;
      a.click();
      if (window.showToast) {
        window.showToast('Quotation Downloaded', `Official fee estimate saved to your downloads.`, 'success');
      }
    });
  }

  calculate();
}

/* ==========================================================================
   11. APPLICATION STATUS TRACKER
   ========================================================================== */
function initApplicationTracker() {
  const form = document.getElementById('tracker-form');
  const input = document.getElementById('tracker-input');
  const sampleBtns = document.querySelectorAll('.tracker-sample-btn');

  const outId = document.getElementById('track-id');
  const outName = document.getElementById('track-name');
  const outGrade = document.getElementById('track-grade');
  const outStatus = document.getElementById('track-status');
  const outAlert = document.getElementById('track-alert');
  const downloadBtn = document.getElementById('track-download-btn');

  const DATA = {
    'EAK-2027-8492': {
      id: 'EAK-2027-8492',
      name: 'Aarav Sharma',
      grade: 'Grade IX (Cambridge IGCSE)',
      stage: 4,
      status: 'Provisional Offer Letter Issued',
      action: 'Confirm enrollment and submit advance deposit by Oct 25, 2026.'
    },
    'EAK-2027-1048': {
      id: 'EAK-2027-1048',
      name: 'Ananya Sen',
      grade: 'Grade XI (STEM Computing)',
      stage: 3,
      status: 'Academic Interaction Scheduled',
      action: 'Attend Saturday interaction on Oct 24 at 10:30 AM in Turing Lab.'
    },
    'EAK-2027-3104': {
      id: 'EAK-2027-3104',
      name: 'Kabir Mehta',
      grade: 'Grade I (Foundational)',
      stage: 2,
      status: 'Document Verification in Progress',
      action: 'Please upload municipal birth certificate and medical immunization card.'
    }
  };

  if (!form || !outId) return;

  function loadRecord(refId) {
    const item = DATA[refId] || {
      id: refId,
      name: 'Candidate Applicant',
      grade: 'Grade VI (Middle Years)',
      stage: 2,
      status: 'Under Verification',
      action: 'Admissions team is reviewing transcripts.'
    };

    outId.textContent = item.id;
    if (outName) outName.textContent = item.name;
    if (outGrade) outGrade.textContent = item.grade;
    if (outStatus) outStatus.textContent = item.status;
    if (outAlert) outAlert.textContent = item.action;

    // Update steps
    for (let i = 1; i <= 5; i++) {
      const stepEl = document.getElementById(`track-step-${i}`);
      if (stepEl) {
        stepEl.classList.remove('active', 'completed');
        if (i < item.stage) stepEl.classList.add('completed');
        else if (i === item.stage) stepEl.classList.add('active');
      }
    }
  }

  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (input) input.value = id;
      loadRecord(id);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim().toUpperCase() || 'EAK-2027-8492';
    loadRecord(val);
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const text = `EAK INTERNATIONAL SCHOOL - ADMISSION ACKNOWLEDGMENT\nID: ${outId.textContent}\nStatus: ${outStatus ? outStatus.textContent : 'Verified'}\nOfficial Helpdesk: +91 11 4567 8900`;
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${outId.textContent}_status.txt`;
      a.click();
    });
  }

  loadRecord('EAK-2027-8492');
}

/* ==========================================================================
   12. 360 PANORAMA TOUR
   ========================================================================== */
function initPanoramaTour() {
  const canvas = document.getElementById('panorama-canvas');
  const strip = document.getElementById('panorama-strip');
  const titleEl = document.getElementById('panorama-title');
  const autoBtn = document.getElementById('panorama-auto-btn');
  const sceneBtns = document.querySelectorAll('.panorama-scene-btn');
  const hotspotModal = document.getElementById('hotspot-modal');
  const hotspotDesc = document.getElementById('hotspot-desc');

  if (!canvas || !strip) return;

  let currentPan = 0;
  let isDragging = false;
  let startX = 0;
  let autoRotate = true;

  const SCENES = {
    'quadrangle': { title: 'Central Academic Quadrangle & Sunken Amphitheatre', bg: 'linear-gradient(90deg, #111317, #1E222A, #0D0E12)' },
    'robotics': { title: 'Turing Advanced Robotics & AI Prototyping Hub', bg: 'linear-gradient(90deg, #0B132B, #1C2541, #0B0B0D)' },
    'pool': { title: 'Olympic 50m Heated Aquatics Complex', bg: 'linear-gradient(90deg, #091E2A, #0E3347, #0A1218)' },
    'library': { title: 'Alexander Central Research & Reading Library', bg: 'linear-gradient(90deg, #1E1512, #2A1D1A, #120D0C)' }
  };

  // Drag listeners
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    autoRotate = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    startX = e.clientX;
    currentPan += (dx / canvas.clientWidth) * 30;
    if (currentPan > 40) currentPan = 40;
    if (currentPan < -40) currentPan = -40;
    strip.style.transform = `translateX(${currentPan}%)`;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  // Auto rotate interval
  setInterval(() => {
    if (autoRotate && !isDragging) {
      currentPan += 0.08;
      if (currentPan > 40) currentPan = -40;
      strip.style.transform = `translateX(${currentPan}%)`;
    }
  }, 50);

  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      if (autoRotate) {
        autoBtn.classList.add('btn-solid');
        autoBtn.classList.remove('btn-glass');
      } else {
        autoBtn.classList.remove('btn-solid');
        autoBtn.classList.add('btn-glass');
      }
    });
  }

  sceneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sceneKey = btn.getAttribute('data-scene');
      const scene = SCENES[sceneKey];
      if (scene) {
        if (titleEl) titleEl.textContent = scene.title;
        strip.style.background = scene.bg;
        sceneBtns.forEach(b => {
          b.classList.remove('btn-solid');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-solid');
      }
    });
  });

  // Hotspot clicks
  document.querySelectorAll('.hotspot-pin').forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const spec = pin.getAttribute('data-spec') || 'Engineering certified facility standard.';
      if (hotspotDesc) hotspotDesc.textContent = spec;
      if (hotspotModal) hotspotModal.classList.add('open');
    });
  });
}

/* ==========================================================================
   13. SMART TRANSIT FINDER
   ========================================================================== */
function initTransitFinder() {
  const routeBtns = document.querySelectorAll('.transit-route-btn');
  const routeTitle = document.getElementById('transit-route-title');
  const routeStops = document.getElementById('transit-route-stops');

  const ROUTES = {
    'r1': {
      name: 'Route 01: South Hub & Metro Corridor',
      stops: ['HUDA Metro Gate 2 (07:15 AM)', 'Sector 29 Commercial (07:22 AM)', 'Sector 31 Circle (07:30 AM)', 'Sector 15 Part II (07:38 AM)', 'Campus Bus Bay 1 (07:52 AM)']
    },
    'r2': {
      name: 'Route 02: Cyber City & Golf Course Ring',
      stops: ['DLF Phase 1 Club (07:10 AM)', 'Galleria Market Circle (07:20 AM)', 'DLF Phase 5 Aralias (07:28 AM)', 'Horizon Center Link (07:35 AM)', 'Campus Bus Bay 2 (07:50 AM)']
    },
    'r3': {
      name: 'Route 03: Green Valley & Forest Sanctuary',
      stops: ['Sushant Lok B-Block (07:05 AM)', 'Nirvana Courtyard (07:18 AM)', 'Malibu Towne Boulevard (07:28 AM)', 'Vipul Greens Circle (07:36 AM)', 'Campus Bus Bay 3 (07:53 AM)']
    }
  };

  if (!routeBtns.length || !routeTitle) return;

  routeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-route');
      const r = ROUTES[id];
      if (r) {
        routeTitle.textContent = r.name;
        if (routeStops) {
          routeStops.innerHTML = r.stops.map((s, i) => `
            <div class="transit-stop-item">
              <span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-amber); font-size: 11px;">Stop 0${i+1}</span>
              <span>${s}</span>
            </div>
          `).join('');
        }
        routeBtns.forEach(b => {
          b.classList.remove('btn-solid');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-solid');
      }
    });
  });
}

/* ==========================================================================
   14. SENIOR SECONDARY STREAM & TIMETABLE EXPLORER
   ========================================================================== */
function initStreamExplorer() {
  const streamBtns = document.querySelectorAll('.stream-tab-btn');
  const streamTitle = document.getElementById('stream-title');
  const streamSubjects = document.getElementById('stream-subjects');
  const downloadBtn = document.getElementById('stream-download-btn');

  const STREAMS = {
    'stem': {
      name: 'Science Stream (Physics, Chemistry & Mathematics - PCM)',
      subjects: 'Physics, Chemistry, Mathematics, Computer Science / English Core'
    },
    'medical': {
      name: 'Science Stream (Physics, Chemistry & Biology - PCB)',
      subjects: 'Physics, Chemistry, Biology, Physical Education / English Core'
    },
    'fintech': {
      name: 'Commerce Stream (Accountancy, Business Studies & Economics)',
      subjects: 'Accountancy, Business Studies, Economics, Mathematics / Applied Math'
    },
    'humanities': {
      name: 'Humanities & Social Sciences Stream',
      subjects: 'History, Political Science, Psychology, Sociology & English Core'
    }
  };

  if (!streamBtns.length || !streamTitle) return;

  streamBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-stream');
      const s = STREAMS[id];
      if (s) {
        streamTitle.textContent = s.name;
        if (streamSubjects) streamSubjects.textContent = s.subjects;
        streamBtns.forEach(b => {
          b.classList.remove('btn-solid');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-solid');
      }
    });
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const text = `EAK INTERNATIONAL SCHOOL - CURRICULUM SYLLABUS\nStream: ${streamTitle.textContent}\nSubjects: ${streamSubjects ? streamSubjects.textContent : 'Core Curriculum'}`;
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `curriculum_syllabus.txt`;
      a.click();
    });
  }
}

/* ==========================================================================
   15. MODALS & FORMS
   ========================================================================== */
function initModals() {
  // Generic modal closer
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    });
  });

  // Generic forms with simulation alert replaced by Toast
  document.querySelectorAll('form[data-simulate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.showToast) {
        window.showToast('Inquiry Submitted', 'Thank you! Our admissions coordinator will follow up within 24 hours.', 'success');
      }
      form.reset();
    });
  });
}

/* ==========================================================================
   16. ICALENDAR (.ICS) EXPORTER
   ========================================================================== */
window.downloadIcsCalendar = function() {
  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EAK International School//Academic Calendar 2026-27//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:EAK International School Events
BEGIN:VEVENT
SUMMARY:Annual School Science & STEM Exhibition
DTSTART:20261010T090000Z
DTEND:20261010T160000Z
DESCRIPTION:Applied science models, robotics projects, and creative experiments by students.
LOCATION:Turing Science Lab, EAK International School
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:Inter-House Annual Swimming Championship
DTSTART:20261017T083000Z
DTEND:20261017T140000Z
DESCRIPTION:Annual school swimming gala featuring freestyle and medley relays across all 4 houses.
LOCATION:School Swimming Pool, EAK International School
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:Term I Parent-Teacher Meeting (PTM)
DTSTART:20261024T090000Z
DTEND:20261024T150000Z
DESCRIPTION:Scheduled parent-teacher conference to review academic progress and term report cards.
LOCATION:School Classrooms & Hall
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'EAK_School_Events_October_2026.ics';
  a.click();
  if (window.showToast) {
    window.showToast('Calendar Downloaded', 'EAK_School_Events_October_2026.ics exported to your calendar.', 'success');
  }
};

/* ==========================================================================
   17. INTERACTIVE TOAST NOTIFICATION ENGINE
   ========================================================================== */
function initToastSystem() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  window.showToast = function(title, desc, type = 'success', actionText = null, actionFn = null) {
    const toast = document.createElement('div');
    toast.className = 'toast-item';

    const iconSvg = type === 'success' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';

    let actionHtml = '';
    if (actionText && typeof actionFn === 'function') {
      actionHtml = `<button type="button" class="toast-btn" id="toast-action-btn">${actionText}</button>`;
    }

    toast.innerHTML = `
      <div class="toast-icon ${type}">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
      ${actionHtml}
      <button type="button" class="toast-close" aria-label="Close Notification">✕</button>
    `;

    container.appendChild(toast);

    if (actionHtml) {
      toast.querySelector('#toast-action-btn').addEventListener('click', () => {
        actionFn();
        dismiss();
      });
    }

    toast.querySelector('.toast-close').addEventListener('click', dismiss);

    const autoTimer = setTimeout(dismiss, 4200);

    function dismiss() {
      clearTimeout(autoTimer);
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 250);
    }
  };
}

/* ==========================================================================
   18. BACK TO TOP FLOATING ACTION
   ========================================================================== */
function initBackToTop() {
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.title = 'Back to top';
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
    document.body.appendChild(btn);
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   19. CARD SPOTLIGHT HOVER EFFECT
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.glass-card, .metric-card, .tool-box, .event-pass, .quote-card');
  if (!cards.length) return;

  cards.forEach(card => {
    let rafId = null;
    card.addEventListener('mousemove', (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        rafId = null;
      });
    }, { passive: true });
  });
}

/* ==========================================================================
   20. EVENTS, NOTICES & VISITOR PASS GENERATOR
   ========================================================================== */
function initEventFeatures() {
  const filterBtns = document.querySelectorAll('.event-filter-btn');
  const eventCards = document.querySelectorAll('.event-item-card');
  const calDays = document.querySelectorAll('.calendar-event-day');
  const passModal = document.getElementById('pass-modal');
  const nameInput = document.getElementById('pass-input-name');
  const attendeeDisplay = document.getElementById('pass-attendee-name');
  const downloadBtn = document.getElementById('pass-download-btn');
  const printBtn = document.getElementById('pass-print-btn');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';

      eventCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Live Event & Notice Text Search
  const searchInput = document.getElementById('event-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      eventCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Calendar Day Click -> Jump to Event Card
  calDays.forEach(day => {
    day.addEventListener('click', () => {
      const targetId = day.getAttribute('data-target-event');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const allBtn = document.querySelector('.event-filter-btn[data-filter="all"]');
        if (allBtn) allBtn.click();

        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.style.transition = 'all 0.4s ease';
        targetEl.style.outline = '2px solid var(--accent-emerald)';
        targetEl.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.3)';
        setTimeout(() => {
          targetEl.style.outline = 'none';
          targetEl.style.boxShadow = '';
        }, 2200);
      }
    });
  });

  // Global Pass Modal Opener
  window.openPassModal = function(title, date, time, venue) {
    if (!passModal) return;
    const titleEl = document.getElementById('pass-event-title');
    const dateEl = document.getElementById('pass-event-date');
    const venueEl = document.getElementById('pass-event-venue');
    const serialEl = document.getElementById('pass-serial-id');

    if (titleEl) titleEl.textContent = title;
    if (dateEl) dateEl.textContent = `${date} (${time})`;
    if (venueEl) venueEl.textContent = venue;
    if (serialEl) serialEl.textContent = `EAK-PASS-${Math.floor(1000 + Math.random() * 9000)}`;

    passModal.classList.add('open');
  };

  // Sync Attendee Name
  if (nameInput && attendeeDisplay) {
    nameInput.addEventListener('input', () => {
      attendeeDisplay.textContent = nameInput.value.trim() || 'Guest Attendee';
    });
  }

  // Download Pass (.txt)
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const title = document.getElementById('pass-event-title')?.textContent || 'School Event';
      const date = document.getElementById('pass-event-date')?.textContent || 'Date';
      const venue = document.getElementById('pass-event-venue')?.textContent || 'Campus';
      const serial = document.getElementById('pass-serial-id')?.textContent || 'EAK-PASS-0000';
      const name = attendeeDisplay?.textContent || 'Guest Attendee';

      const passSlip = `=====================================================
EAK INTERNATIONAL SCHOOL — OFFICIAL GUEST PASS
=====================================================
PASS ID:         ${serial}
EVENT:           ${title}
DATE & TIME:     ${date}
VENUE:           ${venue}
GUEST ATTENDEE:  ${name}
ADMISSION TIER:  VIP Guest / Family Entry Pass
STATUS:          VERIFIED & ISSUED

INSTRUCTIONS:
1. Please show this digital pass or printed copy at Security Gate 1.
2. Visitor parking is reserved in North Quadrangle Bay B.
3. For special mobility assistance, call +91 11 4567 8900.
=====================================================`;

      const blob = new Blob([passSlip], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${serial}_Visitor_Pass.txt`;
      a.click();
      if (window.showToast) {
        window.showToast('Guest Pass Saved', `${serial}_Visitor_Pass.txt downloaded.`, 'success');
      }
    });
  }

  // Print Pass
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   21. CAMPUS LIFE TABS (INDEX)
   ========================================================================== */
function initCampusLifeTabs() {
  const tabBtns = document.querySelectorAll('.life-tab-btn');
  const panels = document.querySelectorAll('.life-panel');

  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   22. GRADE & AGE ELIGIBILITY ESTIMATOR (INDEX)
   ========================================================================== */
function initEligibilityChecker() {
  const birthSelect = document.getElementById('eligibility-birth-year');
  const boardSelect = document.getElementById('eligibility-board-pref');
  const outGrade = document.getElementById('eligibility-result-grade');
  const outDetail = document.getElementById('eligibility-result-detail');
  const outBtn = document.getElementById('eligibility-action-btn');

  if (!birthSelect || !outGrade) return;

  const GRADE_MAP = {
    '2023': { grade: 'Nursery (Early Years)', stage: 'Foundational', detail: 'Sensory play, linguistic exploration, and physical coordination.', fee: 140000 },
    '2022': { grade: 'Kindergarten (KG 1/2)', stage: 'Foundational', detail: 'Early numeracy, phonics immersion, and collaborative play.', fee: 140000 },
    '2021': { grade: 'Grade 1', stage: 'Foundational', detail: 'Cambridge Primary Stage 1 with dual language foundation.', fee: 175000 },
    '2020': { grade: 'Grade 2', stage: 'Primary Years', detail: 'Cambridge Primary Stage 2 & foundational STEM inquiry.', fee: 175000 },
    '2019': { grade: 'Grade 3', stage: 'Primary Years', detail: 'Cambridge Primary Stage 3 with science labs and sports rotation.', fee: 175000 },
    '2018': { grade: 'Grade 4', stage: 'Primary Years', detail: 'Cambridge Primary Stage 4 with robotics introduction and digital literacy.', fee: 175000 },
    '2017': { grade: 'Grade 5', stage: 'Primary Years', detail: 'Primary Checkpoint milestone preparation and inter-school tournaments.', fee: 175000 },
    '2016': { grade: 'Grade 6', stage: 'Middle Years', detail: 'Cambridge Lower Secondary & CBSE Middle Stage with specialized lab faculties.', fee: 210000 },
    '2015': { grade: 'Grade 7', stage: 'Middle Years', detail: 'Applied sciences, Python programming, and model UN debates.', fee: 210000 },
    '2014': { grade: 'Grade 8', stage: 'Middle Years', detail: 'Lower Secondary Checkpoint examination preparation and career guidance.', fee: 210000 },
    '2013': { grade: 'Grade 9', stage: 'Secondary Years', detail: 'Cambridge IGCSE / CBSE Board Stage with rigorous subject selection.', fee: 245000 },
    '2012': { grade: 'Grade 10', stage: 'Secondary Years', detail: 'Board certification year with national and international competitive coaching.', fee: 245000 },
    '2011': { grade: 'Grade 11', stage: 'Senior Secondary', detail: 'Senior secondary streams: Science (PCM), Science (PCB), Commerce, or Humanities.', fee: 280000 },
    '2010': { grade: 'Grade 12', stage: 'Senior Secondary', detail: 'Board examination preparation, laboratory practicals, and higher education guidance.', fee: 280000 }
  };

  function update() {
    const yr = birthSelect.value;
    const info = GRADE_MAP[yr] || GRADE_MAP['2018'];

    outGrade.textContent = `${info.grade} (${info.stage})`;
    if (outDetail) outDetail.textContent = info.detail;
    if (outBtn) {
      outBtn.textContent = `Estimate ${info.grade} Fees →`;
      outBtn.href = `admissions.html#tuition-calculator`;
    }
  }

  birthSelect.addEventListener('change', update);
  if (boardSelect) boardSelect.addEventListener('change', update);

  update();
}

/* ==========================================================================
   23. ACCESSIBLE DOCUMENT CHECKLIST
   ========================================================================== */
function initDocChecklist() {
  const items = document.querySelectorAll('.doc-item');
  if (!items.length) return;

  function updateProgress() {
    const checked = document.querySelectorAll('.doc-item.checked');
    const count = checked.length;
    const total = items.length;
    const pct = Math.round((count / total) * 100);

    const label = document.getElementById('doc-progress-label');
    const bar = document.getElementById('doc-progress-bar');
    const badge = document.getElementById('doc-progress-badge');

    if (label) {
      if (count === total) {
        label.innerHTML = '<span style="color: var(--accent-emerald); font-weight: 700;">✓ All ' + total + ' documents verified & ready for submission!</span>';
      } else {
        label.textContent = `${count} of ${total} documents verified (${pct}%)`;
      }
    }
    if (bar) {
      bar.style.width = `${pct}%`;
    }
    if (badge) {
      badge.textContent = `${count}/${total} Ready`;
      badge.style.color = count === total ? 'var(--accent-emerald)' : 'var(--text-secondary)';
    }
  }

  items.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'checkbox');
    item.setAttribute('aria-checked', item.classList.contains('checked'));

    item.addEventListener('click', (e) => {
      // Toggle class if not already handled by inline attribute
      if (!item.hasAttribute('onclick')) {
        item.classList.toggle('checked');
      }
      item.setAttribute('aria-checked', item.classList.contains('checked'));
      updateProgress();
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        item.classList.toggle('checked');
        item.setAttribute('aria-checked', item.classList.contains('checked'));
        updateProgress();
      }
    });
  });

  updateProgress();
}

/* ==========================================================================
   23. ADVANCED SCROLL REVEAL & INTERSECTION OBSERVER ENGINE
   ========================================================================== */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const targetSelectors = [
    '.reveal',
    '.glass-card',
    '.metric-card',
    '.section-header',
    '.event-item-card',
    '.timeline-node',
    '.leadership-card',
    '.stream-card',
    '.route-card',
    '.facility-showcase',
    '.duo-card',
    '.eligibility-box',
    '.tool-box',
    '.achievement-card'
  ];

  const targets = document.querySelectorAll(targetSelectors.join(', '));
  if (!targets.length) return;

  // Stagger grouping by parent container
  const parentMap = new Map();
  targets.forEach(el => {
    const rect = el.getBoundingClientRect();
    // If element is already in viewport on initial load, reveal immediately
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-revealed');
      return;
    }

    el.classList.add('reveal');

    const parent = el.parentElement;
    if (parent) {
      if (!parentMap.has(parent)) {
        parentMap.set(parent, []);
      }
      parentMap.get(parent).push(el);
    }
  });

  // Apply sequential stagger delays to siblings
  parentMap.forEach(children => {
    if (children.length > 1) {
      children.forEach((child, index) => {
        const delay = Math.min((index % 6) * 80, 420);
        child.style.transitionDelay = `${delay}ms`;
      });
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  targets.forEach(el => {
    if (!el.classList.contains('is-revealed')) {
      observer.observe(el);
    }
  });
}

/* ==========================================================================
   24. HERO PARALLAX DEPTH EFFECT & CONTINUOUS BACKGROUND VIDEO
   ========================================================================== */
function initHeroParallax() {
  // Persistent background video remains stationary while page content scrolls over it
  return;
}

function initBackgroundVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  video.muted = true;
  video.loop = true;

  const playVideo = () => {
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // Will play on user interaction if restricted by battery/browser policy
      });
    }
  };

  playVideo();

  // Smart battery & GPU optimization: pause video when scrolled out of view
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (video.paused) playVideo();
        } else {
          if (!video.paused) video.pause();
        }
      });
    }, { threshold: 0.05 });
    videoObserver.observe(video);
  }

  // Resume smoothly if browser tab is switched and restored
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (!video.paused) video.pause();
    } else {
      playVideo();
    }
  });
  window.addEventListener('focus', playVideo);

  document.addEventListener('touchstart', playVideo, { once: true, passive: true });
  document.addEventListener('click', playVideo, { once: true, passive: true });
}

/* ==========================================================================
   25. MORPHX DESKTOP NAV FLOATING PILL INDICATOR
   ========================================================================== */
function initMorphxNavIndicator() {
  const navMenu = document.querySelector('.nav-menu');
  if (!navMenu) return;

  let indicator = navMenu.querySelector('.morphx-nav-indicator');
  if (!indicator) {
    indicator = document.createElement('span');
    indicator.className = 'morphx-nav-indicator';
    navMenu.prepend(indicator);
  }

  const links = navMenu.querySelectorAll('.nav-link');
  const activeLink = navMenu.querySelector('.nav-link.active');

  function positionIndicator(targetEl, animate = true) {
    if (!targetEl) {
      indicator.style.opacity = '0';
      return;
    }
    const menuRect = navMenu.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const left = targetRect.left - menuRect.left;
    const width = targetRect.width;

    if (!animate) {
      indicator.style.transition = 'none';
    } else {
      indicator.style.transition = '';
    }

    indicator.style.transform = `translate3d(${left}px, 0, 0)`;
    indicator.style.width = `${width}px`;
    indicator.style.opacity = '1';
  }

  // Expose globally for instant click response
  window.morphxPositionIndicator = positionIndicator;

  // Initial position on active link
  if (activeLink) {
    setTimeout(() => positionIndicator(activeLink, false), 40);
  }

  // Re-align when web fonts are loaded
  if (document.fonts) {
    document.fonts.ready.then(() => {
      const currentActive = navMenu.querySelector('.nav-link.active');
      if (currentActive) positionIndicator(currentActive, false);
    });
  }

  // Hover and click over nav links
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      navMenu.classList.add('hovering');
      indicator.classList.add('hovering');
      positionIndicator(link, true);
    });
    link.addEventListener('click', () => {
      positionIndicator(link, true);
    });
  });

  // Mouse leaves navbar -> morph back to active link
  navMenu.addEventListener('mouseleave', () => {
    navMenu.classList.remove('hovering');
    indicator.classList.remove('hovering');
    if (activeLink) {
      positionIndicator(activeLink, true);
    } else {
      indicator.style.opacity = '0';
    }
  });

  window.addEventListener('resize', () => {
    const currentActive = navMenu.querySelector('.nav-link.active');
    if (currentActive) {
      positionIndicator(currentActive, false);
    }
  }, { passive: true });
}

/* ==========================================================================
   26. PAGE SWITCHING SMOOTH FADE NAVIGATION
   ========================================================================== */
function initPageMotionBlur() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  // Restore state when returning via browser back / forward buttons (bfcache)
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-fading-out');
    mainContent.classList.remove('page-motion-blur-out', 'page-fading-out');
  });

  // Intercept internal link navigations for silky fade transition
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    const isSameOrigin = (window.location.protocol === 'file:' && url.protocol === 'file:') || (url.origin === window.location.origin);
    if (!isSameOrigin) return;

    // Anchor links on the current page: keep smooth in-page scroll
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;
    if (url.href === window.location.href) return;

    // If clicking link pointing to current active page, scroll to top smoothly without exit fade
    const curNormPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    const targetNormPath = url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if (curNormPath === targetNormPath && url.search === window.location.search && !url.hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Trigger smooth fade out
    e.preventDefault();
    document.body.classList.add('page-fading-out');
    mainContent.classList.add('page-fading-out', 'page-motion-blur-out');

    // If navbar link was clicked, animate the pill indicator
    if (typeof window.morphxPositionIndicator === 'function' && link.classList.contains('nav-link')) {
      window.morphxPositionIndicator(link, true);
    }

    // Smooth navigation after fade (180ms)
    setTimeout(() => {
      window.location.href = url.href;
    }, 180);
  });
}



