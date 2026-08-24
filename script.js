const languageNames = {
  python: 'Python',
  java: 'Java',
  javascript: 'JavaScript',
  c: 'C',
  html: 'HTML',
  css: 'CSS'
};

const quizBank = {
  python: [
    {
      question: 'Which keyword is used to define a function in Python?',
      options: ['func', 'define', 'def', 'function'],
      answer: 'def'
    },
    {
      question: 'What is the result of len([1, 2, 3])?',
      options: ['2', '3', '4', '5'],
      answer: '3'
    },
    {
      question: 'Which data type is used for text in Python?',
      options: ['int', 'float', 'str', 'bool'],
      answer: 'str'
    }
  ],
  java: [
    {
      question: 'What does JVM stand for?',
      options: ['Java Virtual Memory', 'Java Virtual Machine', 'Java Variable Model', 'Java Value Map'],
      answer: 'Java Virtual Machine'
    },
    {
      question: 'Which keyword is used to create a class in Java?',
      options: ['class', 'struct', 'type', 'object'],
      answer: 'class'
    },
    {
      question: 'What is the correct entry point of a Java program?',
      options: ['start()', 'main()', 'run()', 'init()'],
      answer: 'main()'
    }
  ],
  javascript: [
    {
      question: 'Which keyword is used to declare a constant in JavaScript?',
      options: ['var', 'let', 'const', 'static'],
      answer: 'const'
    },
    {
      question: 'What does DOM stand for?',
      options: ['Document Object Model', 'Data Object Method', 'Dynamic Outline Module', 'Document Oriented Mode'],
      answer: 'Document Object Model'
    },
    {
      question: 'Which method adds an event listener to an element?',
      options: ['element.onClick()', 'element.listen()', 'element.addEventListener()', 'element.trigger()'],
      answer: 'element.addEventListener()'
    }
  ],
  c: [
    {
      question: 'Which function prints output in C?',
      options: ['print()', 'printf()', 'echo()', 'console.log()'],
      answer: 'printf()'
    },
    {
      question: 'What symbol is used to end each C statement?',
      options: [':', ';', ',', '.'],
      answer: ';'
    },
    {
      question: 'What data type is used for whole numbers in C?',
      options: ['float', 'char', 'int', 'string'],
      answer: 'int'
    }
  ],
  html: [
    {
      question: 'Which tag defines the largest heading?',
      options: ['<h6>', '<h1>', '<header>', '<title>'],
      answer: '<h1>'
    },
    {
      question: 'Which attribute is used to add a link target?',
      options: ['link', 'src', 'href', 'target'],
      answer: 'href'
    },
    {
      question: 'Which tag is used to create a paragraph?',
      options: ['<p>', '<para>', '<text>', '<paragraph>'],
      answer: '<p>'
    }
  ],
  css: [
    {
      question: 'Which property changes text color?',
      options: ['font-size', 'color', 'background', 'padding'],
      answer: 'color'
    },
    {
      question: 'Which CSS feature helps create responsive layouts?',
      options: ['Flexbox', 'If statements', 'Classes only', 'Loops'],
      answer: 'Flexbox'
    },
    {
      question: 'Which selector targets an element by its id?',
      options: ['.class', '#id', 'tag', 'element'],
      answer: '#id'
    }
  ]
};

const challengeIdeas = {
  python: ['Build a personal finance tracker', 'Create a mini text-based game', 'Automate a daily file cleanup script'],
  java: ['Create a student management system', 'Build a library app with CRUD features', 'Design a simple banking application'],
  javascript: ['Build a to-do app', 'Create an interactive quiz dashboard', 'Develop a weather app with API data'],
  c: ['Build a calculator CLI', 'Create a contact manager', 'Make a simple file editor'],
  html: ['Design a portfolio webpage', 'Create a landing page for a product', 'Build a blog layout'],
  css: ['Design a pricing card section', 'Create a responsive dashboard layout', 'Build a modern landing page with flexbox and grid']
};

function setActiveLanguage(language) {
  const cards = document.querySelectorAll('.language-card');
  cards.forEach((card) => {
    card.classList.toggle('selected', card.dataset.language === language);
  });
}

function getCompletedConcepts(language) {
  const stored = localStorage.getItem(`roadmap-progress-${language}`);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch (error) {
    return [];
  }
}

function getProgressText(language, data) {
  const allConcepts = [
    ...(data.beginner || []),
    ...(data.intermediate || []),
    ...(data.advanced || [])
  ];

  const completed = allConcepts.filter((item) => {
    const key = `roadmap-progress-${language}-${String(item).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    return getCompletedConcepts(language).includes(key);
  }).length;

  const percent = allConcepts.length ? Math.round((completed / allConcepts.length) * 100) : 0;

  return { completed, total: allConcepts.length, percent };
}

function renderDashboard() {
  const panel = document.getElementById('dashboard-panel');
  if (!panel) return;

  const allLanguages = Object.keys(languageNames);
  const progressEntries = allLanguages.map((lang) => {
    const completed = getCompletedConcepts(lang).length;
    return { language: lang, completed };
  });

  const totalDone = progressEntries.reduce((sum, item) => sum + item.completed, 0);
  const activeLanguages = progressEntries.filter((item) => item.completed > 0).length;
  const bestTrack = Math.max(...progressEntries.map((item) => item.completed), 0);

  panel.innerHTML = `
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <span class="dashboard-label">Progress</span>
        <strong>${totalDone}</strong>
        <small>Concepts completed</small>
      </div>
      <div class="dashboard-card">
        <span class="dashboard-label">Languages</span>
        <strong>${activeLanguages}</strong>
        <small>Active tracks</small>
      </div>
      <div class="dashboard-card">
        <span class="dashboard-label">Best streak</span>
        <strong>${bestTrack}</strong>
        <small>Most completed</small>
      </div>
      <div class="dashboard-card">
        <span class="dashboard-label">Focus</span>
        <strong>${languageNames[localStorage.getItem('last-language') || 'python'] || 'Python'}</strong>
        <small>Current path</small>
      </div>
    </div>
  `;
}

function renderChallengeIdeas(language) {
  const ideas = challengeIdeas[language] || challengeIdeas.python;
  return `
    <div class="challenge-panel">
      <div class="panel-header">
        <h4>Project ideas</h4>
      </div>
      <ul class="challenge-list">
        ${ideas.map((idea) => `<li>${idea}</li>`).join('')}
      </ul>
    </div>
  `;
}

function renderQuiz(language) {
  const questions = quizBank[language] || quizBank.python;

  return `
    <div class="quiz-panel">
      <div class="panel-header">
        <h4>${languageNames[language] || 'Python'} quick quiz</h4>
      </div>
      <div class="quiz-list">
        ${questions
          .map(
            (item, index) => `
              <div class="quiz-card" data-answer="${item.answer}">
                <p>${index + 1}. ${item.question}</p>
                <div class="quiz-options">
                  ${item.options
                    .map(
                      (option) => `
                        <button class="quiz-option" type="button" data-value="${option}">${option}</button>
                      `
                    )
                    .join('')}
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function attachQuizHandlers() {
  document.querySelectorAll('.quiz-option').forEach((button) => {
    button.addEventListener('click', () => {
      const questionCard = button.closest('.quiz-card');
      const answer = questionCard.dataset.answer;
      const selectedValue = button.dataset.value;
      const isCorrect = selectedValue === answer;

      questionCard.querySelectorAll('.quiz-option').forEach((option) => {
        option.disabled = true;
        option.classList.remove('correct', 'wrong');
        if (option.dataset.value === answer) {
          option.classList.add('correct');
        }
        if (option === button && !isCorrect) {
          option.classList.add('wrong');
        }
      });

      const status = document.createElement('div');
      status.className = 'quiz-status';
      status.textContent = isCorrect ? '✅ Correct answer!' : `❌ Correct answer: ${answer}`;

      const existing = questionCard.querySelector('.quiz-status');
      if (existing) existing.remove();
      questionCard.appendChild(status);
    });
  });
}

function renderRoadmap(data, language) {
  const output = document.getElementById('roadmap-output');
  if (!output) return;

  const safeData = data || {};
  const name = safeData.name || languageNames[language] || language.charAt(0).toUpperCase() + language.slice(1);
  const beginner = safeData.beginner || [];
  const intermediate = safeData.intermediate || [];
  const advanced = safeData.advanced || [];
  const description = safeData.description || `${name} is a useful programming language to learn for modern software development.`;
  const useCases = safeData.useCases || ['Web development', 'Automation', 'Learning core programming principles'];
  const careerPath = safeData.careerPath || ['Developer', 'Engineer', 'Problem solver'];
  const example = safeData.example || {
    title: `${name} Example`,
    code: `console.log('Hello from ${name}!');`,
    explanation: 'This simple example helps demonstrate the basic syntax and execution flow of the language.'
  };
  const projects = safeData.projects || ['Beginner project', 'Practice app', 'Mini challenge'];
  const companies = safeData.companies || ['Popular tech companies'];

  const progress = getProgressText(language, safeData);
  const sections = [
    ['Beginner', beginner],
    ['Intermediate', intermediate],
    ['Advanced', advanced]
  ];

  output.innerHTML = `
    <div class="roadmap-box">
      <div class="roadmap-header">
        <div>
          <p class="eyebrow accent">${name} roadmap</p>
          <h3>${name}</h3>
        </div>
        <span class="badge">${language.toUpperCase()}</span>
      </div>

      <div class="progress-panel">
        <div class="progress-header">
          <strong>Learning progress</strong>
          <span>${progress.completed}/${progress.total} completed</span>
        </div>
        <div class="progress-bar">
          <span style="width: ${progress.percent}%"></span>
        </div>
      </div>

      <div class="intro-panel">
        <div>
          <h4>Why learn ${name}?</h4>
          <p>${description}</p>
        </div>
        <div>
          <h4>Best for</h4>
          <ul>
            ${useCases.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <h4>Career path</h4>
          <ul>
            ${careerPath.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="info-card">
          <h4>Recommended path</h4>
          <ul>
            <li>Start with the basics</li>
            <li>Build mini projects</li>
            <li>Practice daily for 2-4 weeks</li>
          </ul>
        </div>
      </div>

      <div class="example-panel">
        <h4>${example.title}</h4>
        <pre><code>${example.code}</code></pre>
        <p>${example.explanation}</p>
      </div>

      <div class="projects-panel">
        <h4>Popular beginner projects</h4>
        <div class="project-list">
          ${projects.map((project) => `<span>${project}</span>`).join('')}
        </div>
      </div>

      <div class="roadmap-grid">
        ${sections
          .map(
            ([level, items]) => `
              <div class="roadmap-card">
                <h4>${level}</h4>
                <ul>${(items || []).map((item) => `<li>${item}</li>`).join('')}</ul>
              </div>
            `
          )
          .join('')}
      </div>

      <div class="tool-grid">
        ${renderChallengeIdeas(language)}
        ${renderQuiz(language)}
      </div>

      <p class="company-list">
        <strong>Companies using ${name}:</strong> ${companies.join(', ')}
      </p>
    </div>
  `;

  attachQuizHandlers();
}

function generateRoadmap(language) {
  const output = document.getElementById('roadmap-output');
  if (!output) return;

  setActiveLanguage(language);
  localStorage.setItem('last-language', language);
  output.innerHTML = '<div class="loading-state">Loading roadmap...</div>';

  // Load data from the local `roadmap.json` so the static Pages site works
  fetch('roadmap.json')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load data');
      return res.json();
    })
    .then((all) => {
      const data = (all && all[language]) || null;
      renderRoadmap(data, language);
      renderDashboard();
    })
    .catch(() => {
      output.innerHTML = `
        <div class="error-state">
          ⚠️ Unable to load roadmap data.
        </div>
      `;
    });
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  }
  localStorage.setItem('theme-mode', theme);
}

function bindThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

function bindSearch() {
  const searchInput = document.getElementById('language-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (event) => {
    const value = event.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.language-card');

    cards.forEach((card) => {
      const language = card.dataset.language || '';
      const text = `${languageNames[language] || language} ${language}`.toLowerCase();
      const matches = !value || text.includes(value);
      card.style.display = matches ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme-mode') || 'light';
  applyTheme(savedTheme);
  bindThemeToggle();
  bindSearch();
  renderDashboard();

  const cards = document.querySelectorAll('.language-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const language = card.dataset.language;
      if (language) {
        // navigate relative so GitHub Pages repo path resolves correctly
        window.location.href = `${language}`;
      }
    });
  });

  const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
  ctaButtons.forEach((button) => {
    const target = button.dataset.language || 'python';
    button.addEventListener('click', () => {
      window.location.href = `${target}`;
    });
  });

  const initialLanguage = localStorage.getItem('last-language') || 'python';
  generateRoadmap(initialLanguage);
});