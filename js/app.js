// ===== SIDEBAR TOGGLE (Mobile) =====
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // ===== PORTFOLIO TABS =====
  const tabs = document.querySelectorAll('.portfolio-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ===== BOTTOM NAV ACTIVE STATE =====
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  bottomNavItems.forEach(item => {
    item.addEventListener('click', function () {
      bottomNavItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ===== SEARCH FUNCTIONALITY =====
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      const cards = document.querySelectorAll('.uni-card');
      cards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = title.includes(query) ? '' : 'none';
      });
    });
  }

  // ===== SAVE BUTTON =====
  const saveBtn = document.querySelector('.save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      this.textContent = 'Saved ✓';
      this.style.background = '#00b894';
      setTimeout(() => {
        this.textContent = 'Save';
        this.style.background = '';
      }, 2000);
    });
  }

  // ===== UPLOAD BUTTONS =====
  const uploadBtns = document.querySelectorAll('.upload-btn');
  uploadBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf,.jpg,.jpeg,.png';
      input.onchange = () => {
        if (input.files.length > 0) {
          this.innerHTML = '<i class="fas fa-check"></i> Uploaded';
          this.style.background = 'rgba(0, 184, 148, 0.2)';
          this.style.borderColor = 'rgba(0, 184, 148, 0.4)';
          this.style.color = '#00b894';
        }
      };
      input.click();
    });
  });

  // ===== INLINE ACHIEVEMENT PANELS =====
  const addBtn = document.getElementById('addAchievementBtn');
  const achievementsList = document.getElementById('achievementsList');
  const emptyState = document.getElementById('emptyState');
  const panelChooseType = document.getElementById('panelChooseType');
  const panelGramota = document.getElementById('panelGramota');
  const panelEnt = document.getElementById('panelEnt');
  const panelIelts = document.getElementById('panelIelts');
  const allPanels = [panelChooseType, panelGramota, panelEnt, panelIelts];

  function hideAllPanels() {
    allPanels.forEach(p => { if (p) p.classList.add('hidden'); });
    if (addBtn) addBtn.style.display = '';
  }

  function showPanel(panel) {
    hideAllPanels();
    if (addBtn) addBtn.style.display = 'none';
    if (panel) {
      panel.classList.remove('hidden');
      panel.style.animation = 'slideDown 0.3s ease';
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function resetForms() {
    ['gramotaName', 'entScore'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    ['entSubject1', 'entSubject2', 'ieltsOverall', 'ieltsListening', 'ieltsReading', 'ieltsWriting', 'ieltsSpeaking'].forEach(id => { const el = document.getElementById(id); if (el) el.selectedIndex = 0; });
    const lbl = document.getElementById('gramotaFileLabel');
    if (lbl) { lbl.classList.remove('uploaded'); lbl.querySelector('span').textContent = 'Выбрать файл'; lbl.querySelector('i').className = 'fas fa-cloud-upload-alt'; }
  }

  function checkEmptyState() {
    if (!achievementsList || !emptyState) return;
    emptyState.style.display = achievementsList.querySelectorAll('.achievement-item').length === 0 ? 'flex' : 'none';
  }

  function addAchievementItem(type, icon, badgeText, title, details) {
    if (!achievementsList) return;
    if (emptyState) emptyState.style.display = 'none';
    const item = document.createElement('div');
    item.className = 'achievement-item';
    item.style.animation = 'slideDown 0.3s ease';
    item.innerHTML = `
      <div class="ach-info">
        <div><span class="ach-badge ${type}">${badgeText}</span><span class="ach-name">${icon} ${title}</span></div>
        ${details ? `<span class="ach-details">${details}</span>` : ''}
      </div>
      <button class="ach-delete" title="Удалить"><i class="fas fa-trash-alt"></i></button>
    `;
    item.querySelector('.ach-delete').addEventListener('click', function () {
      item.style.opacity = '0'; item.style.transform = 'translateX(20px)'; item.style.transition = 'all 0.3s';
      setTimeout(() => { item.remove(); checkEmptyState(); }, 300);
    });
    achievementsList.appendChild(item);
  }

  // "+ Add new achievement" button
  if (addBtn) addBtn.addEventListener('click', () => showPanel(panelChooseType));

  // Type cards
  document.querySelectorAll('.inline-type-card').forEach(card => {
    card.addEventListener('click', function () {
      const type = this.dataset.type;
      if (type === 'gramota') showPanel(panelGramota);
      else if (type === 'ent') showPanel(panelEnt);
      else if (type === 'ielts') showPanel(panelIelts);
    });
  });

  // Close buttons
  ['closePanelType', 'closePanelGramota', 'closePanelEnt', 'closePanelIelts'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => { hideAllPanels(); resetForms(); });
  });

  // Back buttons
  ['backFromGramota', 'backFromEnt', 'backFromIelts'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => showPanel(panelChooseType));
  });

  // File upload
  document.addEventListener('change', function (e) {
    if (e.target && e.target.id === 'gramotaFile') {
      const label = document.getElementById('gramotaFileLabel');
      if (e.target.files.length > 0 && label) {
        label.classList.add('uploaded');
        label.querySelector('span').textContent = e.target.files[0].name;
        label.querySelector('i').className = 'fas fa-check';
      }
    }
  });

  // Submit Gramota
  const submitGramota = document.getElementById('submitGramota');
  if (submitGramota) {
    submitGramota.addEventListener('click', function () {
      const name = document.getElementById('gramotaName');
      if (!name || !name.value.trim()) { name.style.borderColor = '#e17055'; name.focus(); setTimeout(() => name.style.borderColor = '', 2000); return; }
      addAchievementItem('gramota', '🏅', 'Грамота', name.value.trim(), null);
      hideAllPanels(); resetForms();
    });
  }

  // Submit ENT
  const submitEnt = document.getElementById('submitEnt');
  if (submitEnt) {
    submitEnt.addEventListener('click', function () {
      const s1 = document.getElementById('entSubject1'), s2 = document.getElementById('entSubject2'), score = document.getElementById('entScore');
      if (!s1.value || s1.selectedIndex === 0) { s1.style.borderColor = '#e17055'; setTimeout(() => s1.style.borderColor = '', 2000); return; }
      if (!s2.value || s2.selectedIndex === 0) { s2.style.borderColor = '#e17055'; setTimeout(() => s2.style.borderColor = '', 2000); return; }
      if (!score.value) { score.style.borderColor = '#e17055'; score.focus(); setTimeout(() => score.style.borderColor = '', 2000); return; }
      let val = Math.min(140, Math.max(0, parseInt(score.value)));
      addAchievementItem('ent', '🎓', 'ЕНТ', `${val} баллов`, `${s1.value} + ${s2.value}`);
      hideAllPanels(); resetForms();
    });
  }

  // Submit IELTS
  const submitIelts = document.getElementById('submitIelts');
  if (submitIelts) {
    submitIelts.addEventListener('click', function () {
      const overall = document.getElementById('ieltsOverall');
      if (!overall.value || overall.selectedIndex === 0) { overall.style.borderColor = '#e17055'; setTimeout(() => overall.style.borderColor = '', 2000); return; }
      const parts = [];
      ['ieltsListening', 'ieltsReading', 'ieltsWriting', 'ieltsSpeaking'].forEach((id, i) => {
        const el = document.getElementById(id); const labels = ['L', 'R', 'W', 'S'];
        if (el && el.value) parts.push(`${labels[i]}: ${el.value}`);
      });
      addAchievementItem('ielts', '🌐', 'IELTS', `Overall: ${overall.value}`, parts.length ? parts.join(' | ') : null);
      hideAllPanels(); resetForms();
    });
  }

  // ===== RESULTS PAGE: TEST SCORES =====
  const addTestBtn = document.getElementById('addTestScoreBtn');
  const testScoresList = document.getElementById('testScoresList');
  const scoresEmptyState = document.getElementById('scoresEmptyState');
  const panelChooseTest = document.getElementById('panelChooseTest');
  const panelScoreInput = document.getElementById('panelScoreInput');
  const testPanels = [panelChooseTest, panelScoreInput];

  let currentTest = null;
  let selectedEntCombo = null;
  const panelEntSubjects = document.getElementById('panelEntSubjects');

  function hideTestPanels() {
    [panelChooseTest, panelScoreInput, panelEntSubjects].forEach(p => { if (p) p.classList.add('hidden'); });
    if (addTestBtn) addTestBtn.style.display = '';
  }

  function showTestPanel(panel) {
    hideTestPanels();
    if (addTestBtn) addTestBtn.style.display = 'none';
    if (panel) {
      panel.classList.remove('hidden');
      panel.style.animation = 'slideDown 0.3s ease';
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function checkScoresEmpty() {
    if (!testScoresList || !scoresEmptyState) return;
    scoresEmptyState.style.display = testScoresList.querySelectorAll('.test-score-card').length === 0 ? 'flex' : 'none';
  }

  function resetTestForm() {
    const scoreVal = document.getElementById('testScoreValue');
    const fileLabel = document.getElementById('testFileLabel');
    const fileInput = document.getElementById('testFile');
    if (scoreVal) scoreVal.value = '';
    if (fileInput) fileInput.value = '';
    if (fileLabel) {
      fileLabel.classList.remove('uploaded');
      fileLabel.querySelector('span').textContent = 'Выбрать файл';
      fileLabel.querySelector('i').className = 'fas fa-cloud-upload-alt';
    }
  }

  if (addTestBtn) addTestBtn.addEventListener('click', () => showTestPanel(panelChooseTest));

  const closeChooseTest = document.getElementById('closeChooseTest');
  if (closeChooseTest) closeChooseTest.addEventListener('click', () => { hideTestPanels(); });

  const closeScoreInput = document.getElementById('closeScoreInput');
  if (closeScoreInput) closeScoreInput.addEventListener('click', () => { hideTestPanels(); resetTestForm(); selectedEntCombo = null; });

  const backFromScore = document.getElementById('backFromScore');
  if (backFromScore) backFromScore.addEventListener('click', () => {
    resetTestForm();
    // If current test is ЕНТ, go back to subject selection
    if (currentTest && currentTest.name === 'ЕНТ') {
      showTestPanel(panelEntSubjects);
    } else {
      showTestPanel(panelChooseTest);
    }
  });

  // ЕНТ subject combo selection
  const entCombos = {
    'math-physics': 'Математика + Физика',
    'math-informatics': 'Математика + Информатика',
    'biology-chemistry': 'Биология + Химия',
    'geography-english': 'География + Англ. язык',
    'history-english': 'Всемирная история + Англ. язык',
    'history-geography': 'Всемирная история + География',
    'biology-geography': 'Биология + География',
    'language-literature': 'Каз. язык + Каз. литература'
  };

  const entNextBtn = document.getElementById('entNextToScore');
  const backFromEntSubjects = document.getElementById('backFromEntSubjects');
  const closeEntSubjects = document.getElementById('closeEntSubjects');

  if (backFromEntSubjects) backFromEntSubjects.addEventListener('click', () => { showTestPanel(panelChooseTest); selectedEntCombo = null; });
  if (closeEntSubjects) closeEntSubjects.addEventListener('click', () => { hideTestPanels(); selectedEntCombo = null; });

  document.querySelectorAll('#entProfileCombos .ent-combo-card').forEach(card => {
    card.addEventListener('click', function () {
      document.querySelectorAll('#entProfileCombos .ent-combo-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      selectedEntCombo = this.dataset.combo;
      if (entNextBtn) entNextBtn.disabled = false;
    });
  });

  if (entNextBtn) {
    entNextBtn.addEventListener('click', () => {
      if (!selectedEntCombo) return;
      currentTest = { name: 'ЕНТ', max: 140, step: 1, entCombo: selectedEntCombo, entComboLabel: entCombos[selectedEntCombo] };
      const title = document.getElementById('scoreInputTitle');
      const scoreVal = document.getElementById('testScoreValue');
      const hint = document.getElementById('scoreHint');
      const entSelectedCombo = document.getElementById('entSelectedCombo');
      const entSelectedComboText = document.getElementById('entSelectedComboText');
      if (title) title.textContent = 'ЕНТ';
      if (scoreVal) { scoreVal.min = 0; scoreVal.max = 140; scoreVal.step = 1; scoreVal.placeholder = '0 – 140'; }
      if (hint) hint.textContent = 'Максимум: 140';
      if (entSelectedCombo) { entSelectedCombo.classList.remove('hidden'); }
      if (entSelectedComboText) { entSelectedComboText.textContent = entCombos[selectedEntCombo]; }
      showTestPanel(panelScoreInput);
    });
  }

  // Test type cards
  document.querySelectorAll('#testTypeCards .inline-type-card').forEach(card => {
    card.addEventListener('click', function () {
      const testName = this.dataset.test;
      const max = parseFloat(this.dataset.max);
      const step = parseFloat(this.dataset.step);

      // If ЕНТ, show subject selection first
      if (testName === 'ЕНТ') {
        selectedEntCombo = null;
        document.querySelectorAll('#entProfileCombos .ent-combo-card').forEach(c => c.classList.remove('selected'));
        if (entNextBtn) entNextBtn.disabled = true;
        showTestPanel(panelEntSubjects);
        return;
      }

      currentTest = { name: testName, max, step };

      const title = document.getElementById('scoreInputTitle');
      const scoreVal = document.getElementById('testScoreValue');
      const hint = document.getElementById('scoreHint');
      const entSelectedCombo = document.getElementById('entSelectedCombo');
      if (title) title.textContent = testName;
      if (scoreVal) { scoreVal.min = 0; scoreVal.max = max; scoreVal.step = step; scoreVal.placeholder = `0 – ${max}`; }
      if (hint) hint.textContent = `Максимум: ${max}`;
      if (entSelectedCombo) entSelectedCombo.classList.add('hidden');

      showTestPanel(panelScoreInput);
    });
  });

  // Test file upload
  document.addEventListener('change', function (e) {
    if (e.target && e.target.id === 'testFile') {
      const label = document.getElementById('testFileLabel');
      if (e.target.files.length > 0 && label) {
        label.classList.add('uploaded');
        label.querySelector('span').textContent = e.target.files[0].name;
        label.querySelector('i').className = 'fas fa-check';
      }
    }
  });

  // Submit test score
  const submitTestScore = document.getElementById('submitTestScore');
  if (submitTestScore) {
    submitTestScore.addEventListener('click', function () {
      if (!currentTest) return;
      const scoreVal = document.getElementById('testScoreValue');
      if (!scoreVal || !scoreVal.value) {
        scoreVal.style.borderColor = '#e17055'; scoreVal.focus();
        setTimeout(() => scoreVal.style.borderColor = '', 2000); return;
      }
      let val = parseFloat(scoreVal.value);
      if (val < 0) val = 0;
      if (val > currentTest.max) val = currentTest.max;

      const hasFile = document.getElementById('testFile')?.files?.length > 0;
      const cssClass = currentTest.name.toLowerCase().replace('ент', 'ent');

      if (scoresEmptyState) scoresEmptyState.style.display = 'none';

      const card = document.createElement('div');
      card.className = 'test-score-card';
      card.style.animation = 'slideDown 0.3s ease';

      const initial = currentTest.name.substring(0, 2).toUpperCase();
      const isEnt = currentTest.name === 'ЕНТ' && currentTest.entCombo;
      const entComboLabel = isEnt ? currentTest.entComboLabel : '';

      card.innerHTML = `
        <div class="ts-icon ${cssClass}">${initial}</div>
        <div class="ts-info">
          <div class="ts-name">${currentTest.name}</div>
          <div class="ts-meta">${isEnt ? entComboLabel : 'Max: ' + currentTest.max}</div>
          ${isEnt ? '<div class="ts-meta ts-ent-combo" data-combo="' + currentTest.entCombo + '">Профиль: ' + entComboLabel + '</div>' : ''}
        </div>
        <div class="ts-score-block">
          <span class="ts-score">${val}</span>
          <span class="ts-verified ${hasFile ? 'yes' : 'no'}">
            <i class="fas fa-${hasFile ? 'check-circle' : 'minus-circle'}"></i>
            ${hasFile ? 'Verified' : 'No file'}
          </span>
        </div>
        <button class="ts-delete" title="Удалить"><i class="fas fa-trash-alt"></i></button>
      `;

      card.querySelector('.ts-delete').addEventListener('click', function () {
        card.style.opacity = '0'; card.style.transform = 'translateX(20px)'; card.style.transition = 'all 0.3s';
        setTimeout(() => { card.remove(); checkScoresEmpty(); }, 300);
      });

      testScoresList.appendChild(card);
      hideTestPanels();
      resetTestForm();
      selectedEntCombo = null;
      currentTest = null;
    });
  }

  // ===== FADE IN ANIMATION ON SCROLL =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Trigger fade-in for visible elements immediately
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 100);
});
