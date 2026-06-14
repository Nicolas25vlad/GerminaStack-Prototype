const LOGGED_IN_YEAR = "2º Ano";
const LOGGED_IN_ROOM = "Sala E";
const APP_NAME = "GerminaStack";

let nextId = 100;

const SUBJECT_COLORS = {
  EQS: { bg: "#f0fff0", text: "#3a7000", dot: "#7FFF00" },
  IA: { bg: "#e8f4fd", text: "#1565C0", dot: "#56B4E9" },
  DS: { bg: "#fff3ec", text: "#b94800", dot: "#FF6B35" },
  DevOps: { bg: "#f3eafd", text: "#6a1aad", dot: "#9B59B6" },
  DAD: { bg: "#e8fdf7", text: "#0b6952", dot: "#1ABC9C" },
  Mobile: { bg: "#e3f0fb", text: "#1a5b8a", dot: "#2980B9" },
  BD: { bg: "#fde8e8", text: "#a31515", dot: "#E74C3C" },
  MD: { bg: "#f0f0f0", text: "#4a4a4a", dot: "#7F8C8D" },
  BI: { bg: "#fffbe6", text: "#7a5c00", dot: "#F1C40F" },
};

const SUBJECTS = ["EQS", "IA", "DS", "DevOps", "DAD", "Mobile", "BD", "MD", "BI"];
const YEARS = ["1º Ano", "2º Ano", "3º Ano"];
const ROOMS = ["Sala A", "Sala B", "Sala C", "Sala D", "Sala E"];

const INITIAL_POSTS = [
  {
    id: "1",
    author: "Nicolas Souza",
    avatarColor: "#ffb347",
    initial: "N",
    classGroup: "2ª Tec E",
    content:
      "Acabei de implementar um modelo de classificação de imagens usando CNN com TensorFlow! Os resultados foram incríveis — 94% de acurácia no dataset de validação. Alguém mais está trabalhando com visão computacional? 🤖",
    media: {
      type: "mockup",
      caption: "Gráfico de acurácia por época do modelo CNN",
    },
    subjectTags: ["IA"],
    yearTag: "2º Ano",
    likes: 42,
    liked: false,
    timestamp: "há 2 horas",
    showComments: false,
    comments: [
      {
        id: "c1",
        author: "Mariana Costa",
        avatarColor: "#4db8ff",
        initial: "M",
        classGroup: "2ª Tec E",
        content:
          "Incrível Nicolas! Qual dataset você usou? Estou tentando algo parecido com reconhecimento facial para o projeto final de IA.",
        timestamp: "há 1 hora",
        likes: 8,
        liked: false,
        showReplies: true,
        replies: [
          {
            id: "r1",
            author: "Nicolas Souza",
            avatarColor: "#ffb347",
            initial: "N",
            classGroup: "2ª Tec E",
            replyTo: "Mariana Costa",
            content:
              "Usei o CIFAR-10! Para reconhecimento facial recomendo o LFW (Labeled Faces in the Wild). Posso te mandar o notebook depois.",
            timestamp: "há 45 min",
            likes: 5,
            liked: false,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    author: "Pedro Almeida",
    avatarColor: "#66bb6a",
    initial: "P",
    classGroup: "1ª Tec A",
    content:
      "Dica de DevOps do dia: usem o Docker Compose para orquestrar seus ambientes de desenvolvimento! Evita o clássico 'funciona na minha máquina' e deixa o setup muito mais simples. Criei um template para projetos Node.js + PostgreSQL, quem quiser é só pedir! 🐳",
    subjectTags: ["DevOps"],
    yearTag: "1º Ano",
    likes: 31,
    liked: false,
    timestamp: "há 4 horas",
    showComments: false,
    comments: [],
  },
  {
    id: "3",
    author: "Luiza Ferreira",
    avatarColor: "#ab47bc",
    initial: "L",
    classGroup: "2ª Tec E",
    content:
      "Hoje na aula da Sala E discutimos sobre normalização de banco de dados até a 3FN. Alguém da nossa sala tem dúvidas sobre dependência transitiva? Fiz um resumo que pode ajudar! Também lembrem que a prova de BD é sexta-feira. 📚",
    subjectTags: ["BD", "MD"],
    roomTag: "Sala E",
    likes: 19,
    liked: false,
    timestamp: "há 6 horas",
    showComments: false,
    comments: [
      {
        id: "c2",
        author: "Rafael Torres",
        avatarColor: "#ff7043",
        initial: "R",
        classGroup: "2ª Tec E",
        content:
          "Oi Luiza! Tenho muita dúvida sobre a diferença entre 2FN e 3FN na prática. Você poderia me explicar com um exemplo real?",
        timestamp: "há 5 horas",
        likes: 3,
        liked: false,
        showReplies: false,
        replies: [],
      },
    ],
  },
  {
    id: "4",
    author: "Ana Beatriz",
    avatarColor: "#26c6da",
    initial: "A",
    classGroup: "3ª Tec B",
    content:
      "Terminei o app mobile de gerenciamento de tarefas com React Native e Expo! Implementei notificações push, modo offline com AsyncStorage e sincronização com Firebase. Vai ser o portfólio para o estágio! 📱",
    subjectTags: ["Mobile", "DS"],
    yearTag: "3º Ano",
    likes: 67,
    liked: false,
    timestamp: "há 1 dia",
    showComments: false,
    comments: [],
  },
  {
    id: "5",
    author: "Gabriel Lima",
    avatarColor: "#ffa726",
    initial: "G",
    classGroup: "1ª Tec C",
    content:
      "Compartilhando um artigo incrível sobre Business Intelligence com Power BI que encontrei. A parte sobre DAX e medidas calculadas mudou minha visão sobre análise de dados! Alguém já usou o Power BI com dados do ENEM? 📊",
    subjectTags: ["BI"],
    likes: 24,
    liked: false,
    timestamp: "há 2 dias",
    showComments: false,
    comments: [],
  },
];

const state = {
  posts: clone(INITIAL_POSTS),
  activeTab: "geral",
  activeView: "list",
  filterSubject: null,
  filterYear: null,
  filterRoom: null,
  filterBanner: null,
  creatorContent: "",
  selectedSubjects: [],
  selectedYear: null,
  selectedRoom: null,
  showTagPicker: false,
  commentInputs: {},
  replyInputs: {},
  openReplyInputs: {},
  replyTargets: {},
  following: {},
  savedPosts: {},
  hiddenPosts: {},
  reportedPosts: {},
  openPostMenuId: null,
  activeScreen: "feed",
  notificationsRead: false,
  toast: null,
};

const app = document.querySelector("#app");
const splash = document.querySelector("[data-splash]");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name, size = 18, filled = false) {
  const paths = {
    share:
      '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="M8.6 13.5 15.4 17.5"></path><path d="M15.4 6.5 8.6 10.5"></path>',
    home: '<path d="m3 10 9-7 9 7"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path>',
    compass:
      '<circle cx="12" cy="12" r="10"></circle><path d="m16 8-2.4 5.6L8 16l2.4-5.6Z"></path>',
    bell:
      '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M13.7 21a2 2 0 0 1-3.4 0"></path>',
    bookmark: '<path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4Z"></path>',
    list: '<path d="M8 6h13"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path>',
    grid:
      '<rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect>',
    rss: '<path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"></path><path d="M7 7h.01"></path>',
    calendar:
      '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path>',
    door:
      '<path d="M13 4h3a2 2 0 0 1 2 2v14"></path><path d="M2 20h20"></path><path d="M13 4v16"></path><path d="M13 4 6 6v14"></path><path d="M10 12h.01"></path>',
    user: '<path d="M19 21a7 7 0 0 0-14 0"></path><circle cx="12" cy="7" r="4"></circle>',
    filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5Z"></path>',
    x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
    sparkles:
      '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z"></path><path d="M5 3v4"></path><path d="M3 5h4"></path><path d="M19 17v4"></path><path d="M17 19h4"></path>',
    inbox:
      '<path d="M22 12h-6l-2 3h-4l-2-3H2"></path><path d="m5.5 5 2.8-3h7.4l2.8 3"></path><path d="M2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-7h-13Z"></path>',
    paperclip:
      '<path d="m21.4 11.6-8.5 8.5a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 1 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"></path>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
    heart:
      '<path d="M19.5 12.6 12 20l-7.5-7.4a5 5 0 0 1 7.1-7.1l.4.4.4-.4a5 5 0 0 1 7.1 7.1Z"></path>',
    message:
      '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path>',
    more: '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',
    chevronDown: '<path d="m6 9 6 6 6-6"></path>',
    chevronUp: '<path d="m18 15-6-6-6 6"></path>',
    reply: '<path d="m9 14-5-5 5-5"></path><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>',
    trending:
      '<path d="m22 7-8.5 8.5-5-5L2 17"></path><path d="M16 7h6v6"></path>',
    plusUser:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M19 8v6"></path><path d="M22 11h-6"></path>',
  };

  const fillClass = filled ? " fill-current" : "";
  return `<svg class="icon${fillClass}" style="font-size:${size}px" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || ""}</svg>`;
}

function visiblePosts() {
  return state.posts.filter((post) => {
    if (state.hiddenPosts[post.id]) return false;

    if (state.activeTab === "materia") {
      if (!state.filterSubject) return post.subjectTags.length > 0;
      return post.subjectTags.includes(state.filterSubject);
    }

    if (state.activeTab === "ano") {
      if (!state.filterYear) return Boolean(post.yearTag);
      return post.yearTag === state.filterYear;
    }

    if (state.activeTab === "sala") {
      if (!state.filterRoom) return Boolean(post.roomTag);
      return post.roomTag === state.filterRoom;
    }

    if (state.activeTab === "foryou") {
      return post.yearTag === LOGGED_IN_YEAR || post.roomTag === LOGGED_IN_ROOM;
    }

    return true;
  });
}

function emptyMessage() {
  const messages = {
    geral: "Nenhum post ainda.",
    materia: state.filterSubject
      ? `Nenhum post com a tag #${state.filterSubject}.`
      : "Selecione uma matéria na sidebar.",
    ano: state.filterYear ? `Nenhum post do ${state.filterYear}.` : "Selecione um ano na sidebar.",
    sala: state.filterRoom ? `Nenhum post da ${state.filterRoom}.` : "Selecione uma sala na sidebar.",
    foryou: "Nenhum post para você ainda.",
  };

  return messages[state.activeTab];
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      ${renderHeader()}
      <div class="page">
        <div class="layout">
          <main id="main-content" class="feed" tabindex="-1" aria-live="polite">
            ${renderActiveScreen()}
          </main>
          ${
            state.activeScreen === "feed"
              ? `<aside class="side-column"><div class="sticky">${renderSidebar()}</div></aside>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

function dismissSplash() {
  if (!splash) return;

  splash.classList.add("is-hidden");
  splash.setAttribute("aria-hidden", "true");
  app.removeAttribute("aria-busy");

  window.setTimeout(() => {
    splash.remove();
  }, 520);
}

function initSplash() {
  if (!splash) return;

  app.setAttribute("aria-busy", "true");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minimumLoadingTime = prefersReducedMotion ? 320 : 2950;

  window.setTimeout(dismissSplash, minimumLoadingTime);
}

function renderActiveScreen() {
  if (state.activeScreen === "explore") return renderExploreScreen();
  if (state.activeScreen === "notifications") return renderNotificationsScreen();
  if (state.activeScreen === "saved") return renderSavedScreen();
  if (state.activeScreen === "profile") return renderProfileScreen();

  return `
    ${state.toast ? renderToast() : ""}
    ${renderWorkspaceBand()}
    ${renderTabs()}
    ${state.filterBanner ? renderFilterBanner() : ""}
    ${state.activeTab === "foryou" ? renderForYouNotice() : ""}
    ${state.activeTab === "geral" ? renderCreator() : ""}
    ${renderSubFilters()}
    ${renderPosts()}
  `;
}

function renderWorkspaceBand() {
  const posts = visiblePosts();
  const totalComments = state.posts.reduce((total, post) => total + post.comments.length, 0);
  const topSubjects = SUBJECTS.slice(0, 5);

  return `
    <section class="workspace-band" aria-label="Resumo do workspace">
      <span class="decor-dot dot-a"></span>
      <span class="decor-dot dot-b"></span>
      <span class="decor-dot dot-c"></span>
      <div class="workspace-copy">
        <span class="eyebrow">${APP_NAME} / ${LOGGED_IN_YEAR} / ${LOGGED_IN_ROOM}</span>
        <h1>Feed de estudos da turma</h1>
        <p>Posts, dúvidas e materiais organizados por matéria, ano e sala.</p>
        <div class="workspace-stats" aria-label="Indicadores do feed">
          <span><strong>${state.posts.length}</strong> posts</span>
          <span><strong>${totalComments}</strong> comentários</span>
          <span><strong>${posts.length}</strong> visíveis</span>
        </div>
      </div>
      <div class="workspace-mockup" aria-hidden="true">
        <div class="mockup-toolbar">
          <span></span><span></span><span></span>
        </div>
        <div class="mockup-grid">
          ${topSubjects
            .map((subject, index) => {
              const color = SUBJECT_COLORS[subject];
              return `
                <div class="mockup-note note-${index + 1}">
                  <span style="background:${color.dot}"></span>
                  <strong>${subject}</strong>
                  <small>${state.posts.filter((post) => post.subjectTags.includes(subject)).length} posts</small>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderHeader() {
  const nav = [
    ["home", "Início", "home"],
    ["compass", "Explorar", "explore"],
    ["bell", "Notificações", "notifications"],
    ["bookmark", "Salvos", "saved"],
  ]
    .map(
      ([iconName, label, menu]) => `
        <button class="nav-button ${isTopNavActive(menu) ? "is-active" : ""}" type="button" aria-label="${label}" data-action="go-screen" data-screen="${menu === "home" ? "feed" : menu}" aria-current="${isTopNavActive(menu) ? "page" : "false"}">
          ${icon(iconName, 20)}
          <span>${label}</span>
          ${menu === "notifications" && unreadNotifications().length ? `<strong class="nav-badge">${unreadNotifications().length}</strong>` : ""}
          ${menu === "saved" && savedPosts().length ? `<strong class="nav-badge">${savedPosts().length}</strong>` : ""}
        </button>
      `
    )
    .join("");

  return `
    <header class="app-header" role="banner">
      <div class="brand">
        <span class="brand-mark">${icon("share", 16)}</span>
        <span>${APP_NAME}</span>
      </div>
      <nav class="top-nav" aria-label="Navegação principal">${nav}</nav>
      <div class="header-right">
        <div class="view-toggle" aria-label="Modo de visualização">
          <button class="${state.activeView === "list" ? "is-active" : ""}" type="button" data-action="set-view" data-view="list" aria-label="Visualizar posts em lista" aria-pressed="${state.activeView === "list"}">${icon("list", 18)}</button>
          <button class="${state.activeView === "grid" ? "is-active" : ""}" type="button" data-action="set-view" data-view="grid" aria-label="Visualizar posts em grade" aria-pressed="${state.activeView === "grid"}">${icon("grid", 18)}</button>
        </div>
        <button class="user-mini ${state.activeScreen === "profile" ? "is-active" : ""}" type="button" data-action="go-screen" data-screen="profile" aria-label="Abrir perfil">
          <div class="user-mini-text">
            <strong>Nicolas</strong>
            <span>2ª Tec E</span>
          </div>
          <span class="avatar-small" style="background:#ffb347">N</span>
        </button>
      </div>
    </header>
  `;
}

function isTopNavActive(menu) {
  if (menu === "home") return state.activeScreen === "feed";
  return state.activeScreen === menu;
}

function notificationItems() {
  return [
    {
      id: "n1",
      title: "Mariana respondeu seu post de IA",
      body: "Perguntou qual dataset voce usou no modelo CNN.",
      time: "ha 1 hora",
      postId: "1",
      iconName: "message",
    },
    {
      id: "n2",
      title: "BD em alta na Sala E",
      body: "Luiza publicou um resumo sobre normalizacao ate a 3FN.",
      time: "ha 6 horas",
      postId: "3",
      iconName: "trending",
    },
    {
      id: "n3",
      title: "Conteudo recomendado para voce",
      body: "Ha posts novos alinhados ao 2º Ano e Sala E.",
      time: "agora",
      tab: "foryou",
      iconName: "sparkles",
    },
  ];
}

function unreadNotifications() {
  return state.notificationsRead ? [] : notificationItems();
}

function savedPosts() {
  return state.posts.filter((post) => state.savedPosts[post.id]);
}

function renderToast() {
  return `
    <div class="toast-message" role="status" aria-live="polite">
      <span>${escapeHtml(state.toast)}</span>
      <button type="button" data-action="clear-toast" aria-label="Fechar aviso">${icon("x", 14)}</button>
    </div>
  `;
}

function renderExploreScreen() {
  return `
    <section class="screen-panel" aria-labelledby="explore-title">
    <div class="screen-head">
      <span>${icon("compass", 18)}</span>
      <div>
        <h2 id="explore-title">Explorar</h2>
        <p>Descubra discussões por assunto, ano e sala sem sair do GerminaStack.</p>
      </div>
    </div>
    <div class="menu-section">
      <h3>Matérias ativas</h3>
      <div class="menu-chip-grid">
        ${SUBJECTS.slice(0, 6).map((subject) => {
          const color = SUBJECT_COLORS[subject];
          return `
            <button class="menu-chip" type="button" data-action="menu-filter-subject" data-subject="${subject}" style="--chip-bg:${color.bg}; --chip-fg:${color.text}; --chip-dot:${color.dot}">
              <span></span>#${subject}
            </button>
          `;
        }).join("")}
      </div>
    </div>
    <div class="explore-feature-grid">
      ${renderExploreFeature("IA e modelos", "Posts sobre classificação, visão computacional e datasets.", "IA", "menu-filter-subject")}
      ${renderExploreFeature("Sala E", "Resumo das discussões da sua sala e recados rápidos.", "Sala E", "menu-filter-room")}
      ${renderExploreFeature("2º Ano", "Conteúdos alinhados ao seu ano no curso técnico.", "2º Ano", "menu-filter-year")}
    </div>
    <div class="menu-grid">
      <div class="menu-section">
        <h3>Anos</h3>
        ${YEARS.map((year) => `<button class="menu-row" type="button" data-action="menu-filter-year" data-year="${year}">${icon("calendar", 16)} ${year}</button>`).join("")}
      </div>
      <div class="menu-section">
        <h3>Salas</h3>
        ${ROOMS.map((room) => `<button class="menu-row" type="button" data-action="menu-filter-room" data-room="${room}">${icon("door", 16)} ${room}</button>`).join("")}
      </div>
    </div>
    </section>
  `;
}

function renderExploreFeature(title, body, value, action) {
  const attr =
    action === "menu-filter-subject"
      ? `data-subject="${value}"`
      : action === "menu-filter-room"
        ? `data-room="${value}"`
        : `data-year="${value}"`;

  return `
    <button class="explore-feature" type="button" data-action="${action}" ${attr}>
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(body)}</span>
    </button>
  `;
}

function renderNotificationsScreen() {
  const unreadCount = unreadNotifications().length;

  return `
    <section class="screen-panel" aria-labelledby="notifications-title">
    <div class="screen-head">
      <span>${icon("bell", 18)}</span>
      <div>
        <h2 id="notifications-title">Notificações</h2>
        <p>${unreadCount ? `${unreadCount} novas atualizações no seu fluxo.` : "Tudo lido por aqui."}</p>
      </div>
      <button class="menu-link" type="button" data-action="mark-notifications-read" ${unreadCount ? "" : "disabled"}>Marcar lidas</button>
    </div>
    <div class="menu-list">
      ${notificationItems()
        .map(
          (item) => `
            <button class="menu-notification ${state.notificationsRead ? "is-read" : ""}" type="button" data-action="open-notification" data-post-id="${item.postId || ""}" data-tab="${item.tab || ""}">
              <span class="notification-icon">${icon(item.iconName, 16)}</span>
              <span>
                <strong>${escapeHtml(item.title)}</strong>
                <small>${escapeHtml(item.body)}</small>
                <em>${escapeHtml(item.time)}</em>
              </span>
            </button>
          `
        )
        .join("")}
    </div>
    </section>
  `;
}

function renderSavedScreen() {
  const posts = savedPosts();

  return `
    <section class="screen-panel" aria-labelledby="saved-title">
    <div class="screen-head">
      <span>${icon("bookmark", 18)}</span>
      <div>
        <h2 id="saved-title">Salvos</h2>
        <p>${posts.length ? `${posts.length} posts guardados para revisar.` : "Salve posts pelo icone de marcador no feed."}</p>
      </div>
    </div>
    ${
      posts.length
        ? `<div class="menu-list">${posts
            .map(
              (post) => `
                <button class="menu-saved" type="button" data-action="open-saved-post" data-post-id="${post.id}">
                  <strong>${escapeHtml(post.author)}</strong>
                  <span>${escapeHtml(post.content)}</span>
                </button>
              `
            )
            .join("")}</div>`
        : `<div class="menu-empty">${icon("bookmark", 28)}<span>Nenhum post salvo ainda.</span></div>`
    }
    </section>
  `;
}

function renderProfileScreen() {
  const ownPosts = state.posts.filter((post) => post.author === "Nicolas Souza");
  const likedPosts = state.posts.filter((post) => post.liked);
  const saved = savedPosts();
  const hiddenCount = Object.keys(state.hiddenPosts).length;

  return `
    <section class="screen-panel profile-screen" aria-labelledby="profile-title">
      <div class="profile-hero">
        <span class="profile-avatar" style="background:#ffb347">N</span>
        <div>
          <span class="eyebrow">Perfil GerminaStack</span>
          <h2 id="profile-title">Nicolas Souza</h2>
          <p>2ª Tec E · ${LOGGED_IN_YEAR} · ${LOGGED_IN_ROOM}</p>
        </div>
      </div>
      <div class="profile-stats">
        <span><strong>${ownPosts.length}</strong> posts</span>
        <span><strong>${saved.length}</strong> salvos</span>
        <span><strong>${likedPosts.length}</strong> curtidos</span>
      </div>
      <div class="profile-grid">
        <button class="profile-action" type="button" data-action="profile-open-saved">
          ${icon("bookmark", 18)}
          <strong>Ver salvos</strong>
          <span>Revisar posts marcados para depois.</span>
        </button>
        <button class="profile-action" type="button" data-action="profile-open-foryou">
          ${icon("sparkles", 18)}
          <strong>Meu fluxo</strong>
          <span>Posts do ${LOGGED_IN_YEAR} e da ${LOGGED_IN_ROOM}.</span>
        </button>
        <button class="profile-action" type="button" data-action="clear-hidden-posts" ${hiddenCount ? "" : "disabled"}>
          ${icon("inbox", 18)}
          <strong>Posts ocultos</strong>
          <span>${hiddenCount ? `Restaurar ${hiddenCount} post${hiddenCount > 1 ? "s" : ""}.` : "Nada oculto por enquanto."}</span>
        </button>
      </div>
      <div class="profile-section">
        <h3>Atividade recente</h3>
        <div class="menu-list">
          ${ownPosts
            .map(
              (post) => `
                <button class="menu-saved" type="button" data-action="open-saved-post" data-post-id="${post.id}">
                  <strong>${escapeHtml(post.timestamp)}</strong>
                  <span>${escapeHtml(post.content)}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderTabs() {
  const tabs = [
    ["geral", "Feed Geral", "rss"],
    ["materia", "Por Matéria", "tag"],
    ["ano", "Por Ano", "calendar"],
    ["sala", "Por Sala", "door"],
    ["foryou", "For You", "user"],
  ];

  return `
    <div class="tab-bar" role="tablist" aria-label="Filtros do feed">
      ${tabs
        .map(
          ([id, label, iconName]) => `
            <button id="tab-${id}" class="tab-button ${state.activeTab === id ? "is-active" : ""}" type="button" role="tab" data-action="tab" data-tab="${id}" aria-selected="${state.activeTab === id}" aria-controls="feed-panel">
              ${icon(iconName, 16)}
              <span>${label}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderFilterBanner() {
  return `
    <div class="filter-banner">
      <span>${icon("filter", 16)} ${escapeHtml(state.filterBanner)}</span>
      <button type="button" data-action="clear-filter">${icon("x", 14)} Limpar filtro</button>
    </div>
  `;
}

function renderForYouNotice() {
  return `
    <div class="notice">
      ${icon("sparkles", 16)}
      <span>Mostrando posts do <strong>2º Ano</strong> e <strong>Sala E</strong> para você, Nicolas.</span>
    </div>
  `;
}

function renderCreator() {
  const canPost = state.creatorContent.trim().length > 0;

  return `
    <section class="card creator" aria-labelledby="creator-title">
      <h2 id="creator-title" class="sr-only">Criar post</h2>
      <div class="creator-row">
        <span class="avatar" style="background:#ffb347">N</span>
        <div class="creator-body">
          <label class="sr-only" for="creator-content">Conteúdo do novo post</label>
          <textarea id="creator-content" data-input="creator" placeholder="O que você está aprendendo hoje?" rows="3" aria-describedby="creator-help">${escapeHtml(state.creatorContent)}</textarea>
          <p id="creator-help" class="sr-only">Digite o conteúdo do post. Use o botão Tags para associar matéria, ano e sala.</p>
          ${renderSelectedTags()}
          ${state.showTagPicker ? renderTagPicker() : ""}
          <div class="creator-footer">
            <div class="creator-tools">
              <button class="tool-button" type="button">${icon("paperclip", 15)} <span>Mídia</span></button>
              <button class="tool-button ${state.showTagPicker ? "is-active" : ""}" type="button" data-action="toggle-tag-picker" aria-expanded="${state.showTagPicker}" aria-controls="tag-picker">
                ${icon("tag", 15)} <span>Tags</span>
              </button>
            </div>
            <button class="post-button" type="button" data-action="create-post" ${canPost ? "" : "disabled"} aria-disabled="${!canPost}">
              ${icon("send", 14)}
              Postar
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSelectedTags() {
  if (!state.selectedSubjects.length && !state.selectedYear && !state.selectedRoom) return "";

  const subjectTags = state.selectedSubjects
    .map((subject) => {
      const color = SUBJECT_COLORS[subject];
      return `
        <span class="chip small" style="background:${color.bg}; color:${color.text}; border-color:${color.dot}">
          <span class="dot" style="background:${color.dot}"></span>
          ${subject}
          <button type="button" data-action="creator-subject" data-subject="${subject}" aria-label="Remover ${subject}">${icon("x", 10)}</button>
        </span>
      `;
    })
    .join("");

  const yearTag = state.selectedYear
    ? `
        <span class="chip small" style="background:var(--blue-bg); color:var(--blue-text); border-color:#1a56db">
          ${icon("calendar", 10)}
          ${state.selectedYear}
          <button type="button" data-action="creator-year" data-year="${state.selectedYear}" aria-label="Remover ano">${icon("x", 10)}</button>
        </span>
      `
    : "";

  const roomTag = state.selectedRoom
    ? `
        <span class="chip small" style="background:var(--amber-bg); color:var(--amber-text); border-color:#f59e0b">
          ${icon("door", 10)}
          ${state.selectedRoom}
          <button type="button" data-action="creator-room" data-room="${state.selectedRoom}" aria-label="Remover sala">${icon("x", 10)}</button>
        </span>
      `
    : "";

  return `<div class="tag-preview">${subjectTags}${yearTag}${roomTag}</div>`;
}

function renderTagPicker() {
  return `
    <div id="tag-picker" class="tag-picker">
      <p class="picker-title">Matéria</p>
      <div class="chip-row">
        ${SUBJECTS.map((subject) => renderSubjectPickerChip(subject, state.selectedSubjects.includes(subject), "creator-subject")).join("")}
      </div>
      <p class="picker-title">Ano</p>
      <div class="chip-row">
        ${YEARS.map((year) =>
          renderChip({
            label: year,
            active: state.selectedYear === year,
            action: "creator-year",
            data: `data-year="${year}"`,
            iconName: "calendar",
            activeStyle: "background:var(--blue-bg); color:var(--blue-text); border-color:#1a56db",
          })
        ).join("")}
      </div>
      <p class="picker-title">Sala</p>
      <div class="chip-row">
        ${ROOMS.map((room) =>
          renderChip({
            label: room,
            active: state.selectedRoom === room,
            action: "creator-room",
            data: `data-room="${room}"`,
            iconName: "door",
            activeStyle: "background:var(--amber-bg); color:var(--amber-text); border-color:#f59e0b",
          })
        ).join("")}
      </div>
    </div>
  `;
}

function renderSubFilters() {
  if (state.activeTab === "materia") {
    return `
      <div class="chip-row">
        ${SUBJECTS.map((subject) => renderSubjectPickerChip(subject, state.filterSubject === subject, "filter-subject")).join("")}
      </div>
    `;
  }

  if (state.activeTab === "ano") {
    const styles = {
      "1º Ano": "background:#dbeafe; color:#1e40af; border-color:#93c5fd",
      "2º Ano": "background:#dcfce7; color:#166534; border-color:#86efac",
      "3º Ano": "background:#fef9c3; color:#713f12; border-color:#fde047",
    };

    return `
      <div class="chip-row">
        ${YEARS.map((year) =>
          renderChip({
            label: year,
            active: state.filterYear === year,
            action: "filter-year",
            data: `data-year="${year}"`,
            iconName: "calendar",
            activeStyle: styles[year],
          })
        ).join("")}
      </div>
    `;
  }

  if (state.activeTab === "sala") {
    return `
      <div class="chip-row">
        ${ROOMS.map((room) =>
          renderChip({
            label: room,
            active: state.filterRoom === room,
            action: "filter-room",
            data: `data-room="${room}"`,
            iconName: "door",
            activeStyle: "background:var(--amber-bg); color:var(--amber-text); border-color:#f59e0b",
          })
        ).join("")}
      </div>
    `;
  }

  return "";
}

function renderSubjectPickerChip(subject, active, action) {
  const color = SUBJECT_COLORS[subject];
  return `
    <button
      class="chip"
      type="button"
      data-action="${action}"
      data-subject="${subject}"
      style="${active ? `background:${color.bg}; color:${color.text}; border-color:${color.dot}` : ""}"
    >
      <span class="dot" style="background:${color.dot}"></span>
      #${subject}
    </button>
  `;
}

function renderChip({ label, active, action, data, iconName, activeStyle }) {
  return `
    <button class="chip" type="button" data-action="${action}" ${data} style="${active ? activeStyle : ""}">
      ${icon(iconName, 14)}
      ${label}
    </button>
  `;
}

function renderPosts() {
  const posts = visiblePosts();

  if (!posts.length) {
    return `
      <div class="empty-state">
        ${icon("inbox", 48)}
        <span>${escapeHtml(emptyMessage())}</span>
      </div>
    `;
  }

  return `
    <section id="feed-panel" class="posts ${state.activeView === "grid" ? "grid" : ""}" role="tabpanel" aria-labelledby="tab-${state.activeTab}" aria-label="Posts">
      ${posts.map(renderPostCard).join("")}
    </section>
  `;
}

function renderPostCard(post) {
  return `
    <article class="card post-card" data-post-id="${post.id}" aria-labelledby="post-author-${post.id}" aria-describedby="post-content-${post.id}">
      <div class="post-body">
        <div class="post-head">
          ${renderAvatar(post.initial, post.avatarColor)}
          <div class="post-user">
            <div class="meta-line">
              <strong id="post-author-${post.id}">${escapeHtml(post.author)}</strong>
              <span>${escapeHtml(post.classGroup)}</span>
              <span class="separator-dot">·</span>
              <span>${escapeHtml(post.timestamp)}</span>
            </div>
            <div class="post-tags">${renderPostTags(post)}</div>
          </div>
          <div class="post-more">
            <button class="more-button ${state.openPostMenuId === post.id ? "is-active" : ""}" type="button" data-action="toggle-post-menu" data-post-id="${post.id}" aria-label="Mais opções para post de ${escapeHtml(post.author)}" aria-expanded="${state.openPostMenuId === post.id}" aria-haspopup="menu" aria-controls="post-menu-${post.id}">${icon("more", 20)}</button>
            ${state.openPostMenuId === post.id ? renderPostMenu(post) : ""}
          </div>
        </div>
        <p id="post-content-${post.id}" class="post-content">${escapeHtml(post.content)}</p>
      </div>
      ${renderMedia(post)}
      <footer class="post-footer">
        <button class="action-button ${post.liked ? "is-liked" : ""}" type="button" data-action="like-post" data-post-id="${post.id}" aria-label="${post.liked ? "Remover curtida" : "Curtir"} post de ${escapeHtml(post.author)}" aria-pressed="${post.liked}">
          ${icon("heart", 20, post.liked)}
          <span>${post.likes}</span>
        </button>
        <button class="action-button ${post.showComments ? "is-open" : ""}" type="button" data-action="toggle-comments" data-post-id="${post.id}" aria-label="${post.showComments ? "Ocultar" : "Mostrar"} comentários do post de ${escapeHtml(post.author)}" aria-expanded="${post.showComments}" ${post.showComments ? `aria-controls="comments-${post.id}"` : ""}>
          ${icon("message", 20)}
          <span>${post.comments.length}</span>
        </button>
        <button class="action-button" type="button" data-action="share-post" data-post-id="${post.id}" aria-label="Compartilhar post de ${escapeHtml(post.author)}">${icon("share", 20)}</button>
        <span class="spacer"></span>
        <button class="plain-icon ${state.savedPosts[post.id] ? "is-saved" : ""}" type="button" data-action="toggle-save-post" data-post-id="${post.id}" aria-label="${state.savedPosts[post.id] ? "Remover post dos salvos" : "Salvar post"}" aria-pressed="${Boolean(state.savedPosts[post.id])}">${icon("bookmark", 18, state.savedPosts[post.id])}</button>
      </footer>
      ${post.showComments ? renderComments(post) : ""}
    </article>
  `;
}

function renderPostMenu(post) {
  const saved = Boolean(state.savedPosts[post.id]);
  const reported = Boolean(state.reportedPosts[post.id]);

  return `
    <div id="post-menu-${post.id}" class="post-menu" role="menu" aria-label="Ações do post de ${escapeHtml(post.author)}">
      <button type="button" role="menuitem" data-action="toggle-save-post" data-post-id="${post.id}">
        ${icon("bookmark", 15, saved)}
        ${saved ? "Remover dos salvos" : "Salvar post"}
      </button>
      <button type="button" role="menuitem" data-action="post-menu-comments" data-post-id="${post.id}">
        ${icon("message", 15)}
        Abrir comentários
      </button>
      <button type="button" role="menuitem" data-action="copy-post" data-post-id="${post.id}">
        ${icon("share", 15)}
        Copiar texto
      </button>
      <button type="button" role="menuitem" data-action="hide-post" data-post-id="${post.id}">
        ${icon("x", 15)}
        Ocultar do feed
      </button>
      <button class="${reported ? "is-disabled" : ""}" type="button" role="menuitem" data-action="report-post" data-post-id="${post.id}" ${reported ? "disabled" : ""}>
        ${icon("filter", 15)}
        ${reported ? "Post denunciado" : "Denunciar post"}
      </button>
    </div>
  `;
}

function renderAvatar(initial, color, small = false) {
  return `<span class="${small ? "avatar-small" : "avatar"}" style="background:${escapeHtml(color)}">${escapeHtml(initial)}</span>`;
}

function renderPostTags(post) {
  const subjects = post.subjectTags
    .map((subject) => {
      const color = SUBJECT_COLORS[subject];
      return `
        <span class="chip small" style="background:${color.bg}; color:${color.text}; border-color:${color.bg}">
          <span class="dot" style="background:${color.dot}"></span>
          ${subject}
        </span>
      `;
    })
    .join("");

  const year = post.yearTag
    ? `<span class="chip small" style="background:var(--blue-bg); color:var(--blue-text); border-color:var(--blue-bg)">${icon("calendar", 10)} ${post.yearTag}</span>`
    : "";

  const room = post.roomTag
    ? `<span class="chip small" style="background:var(--amber-bg); color:var(--amber-text); border-color:var(--amber-bg)">${icon("door", 10)} ${post.roomTag}</span>`
    : "";

  return subjects + year + room;
}

function renderMedia(post) {
  if (!post.media) return "";

  if (post.media.type === "mockup") {
    return `
      <figure class="media media-mockup">
        <div class="chart-card" aria-hidden="true">
          <div class="chart-head">
            <span>CNN validation</span>
            <strong>94%</strong>
          </div>
          <div class="chart-bars">
            <span style="height:38%"></span>
            <span style="height:52%"></span>
            <span style="height:61%"></span>
            <span style="height:74%"></span>
            <span style="height:86%"></span>
            <span style="height:94%"></span>
          </div>
        </div>
        ${post.media.caption ? `<figcaption>${escapeHtml(post.media.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  if (post.media.type !== "image") return "";

  return `
    <figure class="media">
      <img src="${escapeHtml(post.media.url)}" alt="${escapeHtml(post.media.caption || "")}" loading="lazy" />
      ${post.media.caption ? `<figcaption>${escapeHtml(post.media.caption)}</figcaption>` : ""}
    </figure>
  `;
}

function renderComments(post) {
  return `
    <section id="comments-${post.id}" class="comments" aria-label="Comentários do post de ${escapeHtml(post.author)}">
      <div class="comment-compose">
        <span class="avatar-small" style="background:#ffb347">N</span>
        <div class="input-shell">
          <label class="sr-only" for="comment-input-${post.id}">Comentar no post de ${escapeHtml(post.author)}</label>
          <input id="comment-input-${post.id}" type="text" data-input="comment" data-post-id="${post.id}" value="${escapeHtml(state.commentInputs[post.id] || "")}" placeholder="Escreva um comentário..." />
          <button class="attach-button" type="button" aria-label="Anexar">${icon("paperclip", 15)}</button>
          <button class="send-button ${(state.commentInputs[post.id] || "").trim() ? "can-send" : ""}" type="button" data-action="add-comment" data-post-id="${post.id}" aria-label="Enviar comentário" aria-disabled="${!(state.commentInputs[post.id] || "").trim()}">${icon("send", 15)}</button>
        </div>
      </div>
      ${post.comments.length ? post.comments.map((comment) => renderComment(post, comment)).join("") : '<p class="empty-comments">Seja o primeiro a comentar!</p>'}
    </section>
  `;
}

function renderComment(post, comment) {
  const replyKey = `${post.id}:${comment.id}`;
  const replyValue = state.replyInputs[replyKey] || "";
  const replyTarget = state.replyTargets[replyKey] || comment.author;

  return `
    <div class="comment" aria-label="Comentário de ${escapeHtml(comment.author)}">
      <div class="comment-row">
        ${renderAvatar(comment.initial, comment.avatarColor, true)}
        <div class="comment-body">
          <div class="comment-bubble">
            <div class="meta-line">
              <strong>${escapeHtml(comment.author)}</strong>
              <span>${escapeHtml(comment.classGroup)}</span>
              <span class="separator-dot">·</span>
              <span>${escapeHtml(comment.timestamp)}</span>
            </div>
            <p>${escapeHtml(comment.content)}</p>
          </div>
          <div class="comment-actions">
            <button class="comment-action ${comment.liked ? "is-liked" : ""}" type="button" data-action="like-comment" data-post-id="${post.id}" data-comment-id="${comment.id}" aria-label="${comment.liked ? "Remover curtida do" : "Curtir"} comentário de ${escapeHtml(comment.author)}" aria-pressed="${comment.liked}">
              ${icon("heart", 13, comment.liked)}
              ${comment.likes}
            </button>
            <button class="comment-action" type="button" data-action="toggle-reply-input" data-post-id="${post.id}" data-comment-id="${comment.id}" aria-label="Responder comentário de ${escapeHtml(comment.author)}" aria-expanded="${Boolean(state.openReplyInputs[replyKey])}">
              ${icon("reply", 13)}
              Responder
            </button>
            ${
              comment.replies.length
                ? `<button class="comment-action replies-toggle" type="button" data-action="toggle-replies" data-post-id="${post.id}" data-comment-id="${comment.id}" aria-expanded="${comment.showReplies}" ${comment.showReplies ? `aria-controls="replies-${comment.id}"` : ""}>
                    ${icon(comment.showReplies ? "chevronUp" : "chevronDown", 14)}
                    ${comment.replies.length} resposta${comment.replies.length !== 1 ? "s" : ""}
                  </button>`
                : ""
            }
          </div>
          ${
            state.openReplyInputs[replyKey]
              ? `
                <div class="reply-input-row">
                  <span class="avatar-mini" style="background:#ffb347">N</span>
                  <div class="input-shell reply-shell">
                    <span class="reply-target"><strong>@${escapeHtml(replyTarget)}</strong></span>
                    <label class="sr-only" for="reply-input-${comment.id}">Responder para ${escapeHtml(replyTarget)}</label>
                    <input id="reply-input-${comment.id}" type="text" data-input="reply" data-post-id="${post.id}" data-comment-id="${comment.id}" value="${escapeHtml(replyValue)}" placeholder="Escreva uma resposta..." />
                    <button class="send-button ${replyValue.trim() ? "can-send" : ""}" type="button" data-action="add-reply" data-post-id="${post.id}" data-comment-id="${comment.id}" aria-label="Enviar resposta para ${escapeHtml(replyTarget)}" aria-disabled="${!replyValue.trim()}">${icon("send", 14)}</button>
                  </div>
                </div>
              `
              : ""
          }
          ${comment.showReplies ? renderReplies(post, comment) : ""}
        </div>
      </div>
    </div>
  `;
}

function renderReplies(post, comment) {
  return `
    <div id="replies-${comment.id}" class="reply-list" aria-label="Respostas ao comentário de ${escapeHtml(comment.author)}">
      ${comment.replies
        .map(
          (reply) => `
            <div class="reply" aria-label="Resposta de ${escapeHtml(reply.author)} para ${escapeHtml(reply.replyTo)}">
              ${renderAvatar(reply.initial, reply.avatarColor, true)}
              <div class="reply-content">
                <p class="reply-label">Respondendo a <strong>@${escapeHtml(reply.replyTo)}</strong></p>
                <div class="reply-bubble">
                  <div class="meta-line">
                    <strong>${escapeHtml(reply.author)}</strong>
                    <span>${escapeHtml(reply.classGroup)}</span>
                    <span class="separator-dot">·</span>
                    <span>${escapeHtml(reply.timestamp)}</span>
                  </div>
                  <p>${escapeHtml(reply.content)}</p>
                </div>
                <button class="comment-action ${reply.liked ? "is-liked" : ""}" type="button" data-action="like-reply" data-post-id="${post.id}" data-comment-id="${comment.id}" data-reply-id="${reply.id}" aria-label="${reply.liked ? "Remover curtida da" : "Curtir"} resposta de ${escapeHtml(reply.author)}" aria-pressed="${reply.liked}">
                  ${icon("heart", 13, reply.liked)}
                  ${reply.likes}
                </button>
                <button class="comment-action" type="button" data-action="toggle-reply-input" data-post-id="${post.id}" data-comment-id="${comment.id}" data-reply-id="${reply.id}" aria-label="Responder resposta de ${escapeHtml(reply.author)}">
                  ${icon("reply", 13)}
                  Responder
                </button>
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderSidebar() {
  const trendingSubjects = [
    ["IA", 34],
    ["DevOps", 28],
    ["Mobile", 22],
    ["DS", 19],
    ["BD", 17],
    ["EQS", 15],
    ["DAD", 12],
    ["BI", 9],
    ["MD", 7],
  ];

  const yearRows = [
    ["1º Ano", 45, "#dbeafe", "#1e40af"],
    ["2º Ano", 62, "#dcfce7", "#166534"],
    ["3º Ano", 38, "#fef9c3", "#713f12"],
  ];

  const roomRows = [
    ["Sala A", 18],
    ["Sala B", 24],
    ["Sala C", 15],
    ["Sala D", 31],
    ["Sala E", 27],
  ];

  const suggestions = [
    ["Mariana Costa", "2ª Tec E", "#4db8ff", "M"],
    ["Rafael Torres", "2ª Tec E", "#ff7043", "R"],
    ["Ana Beatriz", "3ª Tec B", "#26c6da", "A"],
  ];

  return `
    <div class="sidebar">
      <section class="side-card">
        <h2 class="side-title">${icon("trending", 16)} Matérias em Alta</h2>
        <div class="side-list">
          ${trendingSubjects
            .map(([subject, count]) => {
              const color = SUBJECT_COLORS[subject];
              return `
                <button class="side-filter" type="button" data-action="sidebar-subject" data-subject="${subject}">
                  <span class="side-label" style="color:${color.text}"><span class="dot" style="background:${color.dot}"></span>#${subject}</span>
                  <span class="count-badge" style="background:${color.bg}; color:${color.text}">${count}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      </section>
      <section class="side-card">
        <h2 class="side-title">${icon("calendar", 16)} Por Ano</h2>
        <div class="side-list">
          ${yearRows
            .map(
              ([year, count, bg, color]) => `
                <button class="side-filter" type="button" data-action="sidebar-year" data-year="${year}">
                  <span class="side-label">${year}</span>
                  <span class="count-badge" style="background:${bg}; color:${color}">${count} posts</span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="side-card">
        <h2 class="side-title">${icon("door", 16)} Por Sala</h2>
        <div class="side-list">
          ${roomRows
            .map(
              ([room, count]) => `
                <button class="side-filter" type="button" data-action="sidebar-room" data-room="${room}">
                  <span class="side-label">${room}</span>
                  <span class="count-badge" style="background:var(--amber-bg); color:var(--amber-text)">${count} posts</span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="side-card">
        <h2 class="side-title">${icon("plusUser", 16)} Sugestões</h2>
        ${suggestions
          .map(([name, group, color, initial]) => {
            const following = Boolean(state.following[name]);
            return `
              <div class="suggestion">
                <span class="avatar-small" style="background:${color}; color:#fff">${initial}</span>
                <span class="suggestion-copy">
                  <strong>${name}</strong>
                  <span>${group}</span>
                </span>
                <button class="follow-button ${following ? "is-following" : ""}" type="button" data-action="follow" data-name="${name}">
                  ${following ? "Seguindo" : "Seguir"}
                </button>
              </div>
            `;
          })
          .join("")}
      </section>
    </div>
  `;
}

function clearFilter() {
  state.filterSubject = null;
  state.filterYear = null;
  state.filterRoom = null;
  state.filterBanner = null;
}

function setTab(tab) {
  state.activeTab = tab;
  clearFilter();
}

function findPost(postId) {
  return state.posts.find((post) => post.id === postId);
}

function findComment(post, commentId) {
  return post.comments.find((comment) => comment.id === commentId);
}

function createPost() {
  const content = state.creatorContent.trim();
  if (!content) return;

  state.posts.unshift({
    id: String(++nextId),
    author: "Nicolas Souza",
    avatarColor: "#ffb347",
    initial: "N",
    classGroup: "2ª Tec E",
    content,
    subjectTags: [...state.selectedSubjects],
    yearTag: state.selectedYear || undefined,
    roomTag: state.selectedRoom || undefined,
    likes: 0,
    liked: false,
    timestamp: "agora",
    comments: [],
    showComments: false,
  });

  state.creatorContent = "";
  state.selectedSubjects = [];
  state.selectedYear = null;
  state.selectedRoom = null;
  state.showTagPicker = false;
}

function addComment(postId) {
  const text = (state.commentInputs[postId] || "").trim();
  if (!text) return;

  const post = findPost(postId);
  if (!post) return;

  post.comments.push({
    id: `c${++nextId}`,
    author: "Nicolas Souza",
    avatarColor: "#ffb347",
    initial: "N",
    classGroup: "2ª Tec E",
    content: text,
    timestamp: "agora",
    likes: 0,
    liked: false,
    replies: [],
    showReplies: false,
  });

  state.commentInputs[postId] = "";
}

function addReply(postId, commentId) {
  const key = `${postId}:${commentId}`;
  const text = (state.replyInputs[key] || "").trim();
  if (!text) return;

  const post = findPost(postId);
  const comment = post ? findComment(post, commentId) : null;
  if (!comment) return;

  const replyTo = state.replyTargets[key] || comment.author;

  comment.showReplies = true;
  comment.replies.push({
    id: `r${++nextId}`,
    author: "Nicolas Souza",
    avatarColor: "#ffb347",
    initial: "N",
    classGroup: "2ª Tec E",
    replyTo,
    content: text,
    timestamp: "agora",
    likes: 0,
    liked: false,
  });

  state.replyInputs[key] = "";
  delete state.replyTargets[key];
  state.openReplyInputs[key] = false;
}

function handleClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const { action } = button.dataset;
  const postId = button.dataset.postId;
  const commentId = button.dataset.commentId;

  if (action === "set-view") {
    state.activeView = button.dataset.view;
  }

  if (action === "go-screen") {
    state.activeScreen = button.dataset.screen;
    if (state.activeScreen === "feed") setTab("geral");
    state.openPostMenuId = null;
  }

  if (action === "tab") {
    state.activeScreen = "feed";
    setTab(button.dataset.tab);
    state.openPostMenuId = null;
  }

  if (action === "clear-filter") {
    clearFilter();
  }

  if (action === "clear-toast") {
    state.toast = null;
  }

  if (action === "menu-filter-subject") {
    state.activeScreen = "feed";
    state.activeTab = "materia";
    state.filterSubject = button.dataset.subject;
    state.filterYear = null;
    state.filterRoom = null;
    state.filterBanner = `Filtrando por matéria: #${state.filterSubject}`;
  }

  if (action === "menu-filter-year") {
    state.activeScreen = "feed";
    state.activeTab = "ano";
    state.filterYear = button.dataset.year;
    state.filterSubject = null;
    state.filterRoom = null;
    state.filterBanner = `Filtrando por ano: ${state.filterYear}`;
  }

  if (action === "menu-filter-room") {
    state.activeScreen = "feed";
    state.activeTab = "sala";
    state.filterRoom = button.dataset.room;
    state.filterSubject = null;
    state.filterYear = null;
    state.filterBanner = `Filtrando por sala: ${state.filterRoom}`;
  }

  if (action === "mark-notifications-read") {
    state.notificationsRead = true;
  }

  if (action === "open-notification") {
    state.notificationsRead = true;
    if (button.dataset.tab) {
      state.activeScreen = "feed";
      setTab(button.dataset.tab);
    }
    if (button.dataset.postId) {
      state.activeScreen = "feed";
      setTab("geral");
      const post = findPost(button.dataset.postId);
      if (post) post.showComments = true;
    }
  }

  if (action === "open-saved-post") {
    state.activeScreen = "feed";
    setTab("geral");
    const post = findPost(button.dataset.postId);
    if (post) post.showComments = true;
  }

  if (action === "profile-open-saved") {
    state.activeScreen = "saved";
  }

  if (action === "profile-open-foryou") {
    state.activeScreen = "feed";
    setTab("foryou");
  }

  if (action === "clear-hidden-posts") {
    state.hiddenPosts = {};
    state.toast = "Posts ocultos restaurados.";
  }

  if (action === "toggle-post-menu") {
    state.openPostMenuId = state.openPostMenuId === postId ? null : postId;
  }

  if (action === "post-menu-comments") {
    const post = findPost(postId);
    if (post) post.showComments = true;
    state.openPostMenuId = null;
  }

  if (action === "copy-post") {
    const post = findPost(postId);
    if (post && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(`${post.author}: ${post.content}`);
      state.toast = "Texto do post copiado.";
    } else if (post) {
      state.toast = "Texto do post pronto para copiar.";
    }
    state.openPostMenuId = null;
  }

  if (action === "hide-post") {
    state.hiddenPosts[postId] = true;
    state.openPostMenuId = null;
    state.toast = "Post ocultado do feed.";
  }

  if (action === "report-post") {
    state.reportedPosts[postId] = true;
    state.openPostMenuId = null;
    state.toast = "Denuncia registrada para revisão.";
  }

  if (action === "toggle-tag-picker") {
    state.showTagPicker = !state.showTagPicker;
  }

  if (action === "creator-subject") {
    const subject = button.dataset.subject;
    state.selectedSubjects = state.selectedSubjects.includes(subject)
      ? state.selectedSubjects.filter((item) => item !== subject)
      : [...state.selectedSubjects, subject];
  }

  if (action === "creator-year") {
    const year = button.dataset.year;
    state.selectedYear = state.selectedYear === year ? null : year;
  }

  if (action === "creator-room") {
    const room = button.dataset.room;
    state.selectedRoom = state.selectedRoom === room ? null : room;
  }

  if (action === "create-post") {
    createPost();
  }

  if (action === "filter-subject") {
    const subject = button.dataset.subject;
    state.filterSubject = state.filterSubject === subject ? null : subject;
    state.filterBanner = state.filterSubject ? `Filtrando por matéria: #${state.filterSubject}` : null;
  }

  if (action === "filter-year") {
    const year = button.dataset.year;
    state.filterYear = state.filterYear === year ? null : year;
    state.filterBanner = state.filterYear ? `Filtrando por ano: ${state.filterYear}` : null;
  }

  if (action === "filter-room") {
    const room = button.dataset.room;
    state.filterRoom = state.filterRoom === room ? null : room;
    state.filterBanner = state.filterRoom ? `Filtrando por sala: ${state.filterRoom}` : null;
  }

  if (action === "sidebar-subject") {
    state.activeScreen = "feed";
    state.activeTab = "materia";
    state.filterSubject = button.dataset.subject;
    state.filterYear = null;
    state.filterRoom = null;
    state.filterBanner = `Filtrando por matéria: #${state.filterSubject}`;
  }

  if (action === "sidebar-year") {
    state.activeScreen = "feed";
    state.activeTab = "ano";
    state.filterYear = button.dataset.year;
    state.filterSubject = null;
    state.filterRoom = null;
    state.filterBanner = `Filtrando por ano: ${state.filterYear}`;
  }

  if (action === "sidebar-room") {
    state.activeScreen = "feed";
    state.activeTab = "sala";
    state.filterRoom = button.dataset.room;
    state.filterSubject = null;
    state.filterYear = null;
    state.filterBanner = `Filtrando por sala: ${state.filterRoom}`;
  }

  if (action === "like-post") {
    const post = findPost(postId);
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    }
  }

  if (action === "toggle-comments") {
    const post = findPost(postId);
    if (post) post.showComments = !post.showComments;
  }

  if (action === "add-comment") {
    addComment(postId);
  }

  if (action === "like-comment") {
    const post = findPost(postId);
    const comment = post ? findComment(post, commentId) : null;
    if (comment) {
      comment.liked = !comment.liked;
      comment.likes += comment.liked ? 1 : -1;
    }
  }

  if (action === "toggle-reply-input") {
    const key = `${postId}:${commentId}`;
    const post = findPost(postId);
    const comment = post ? findComment(post, commentId) : null;
    const reply = comment && button.dataset.replyId
      ? comment.replies.find((item) => item.id === button.dataset.replyId)
      : null;

    const nextTarget = reply ? reply.author : comment?.author;
    const sameOpenTarget = state.openReplyInputs[key] && state.replyTargets[key] === nextTarget;
    state.replyTargets[key] = nextTarget;
    state.openReplyInputs[key] = !sameOpenTarget;
  }

  if (action === "toggle-replies") {
    const post = findPost(postId);
    const comment = post ? findComment(post, commentId) : null;
    if (comment) comment.showReplies = !comment.showReplies;
  }

  if (action === "add-reply") {
    addReply(postId, commentId);
  }

  if (action === "like-reply") {
    const post = findPost(postId);
    const comment = post ? findComment(post, commentId) : null;
    const reply = comment ? comment.replies.find((item) => item.id === button.dataset.replyId) : null;
    if (reply) {
      reply.liked = !reply.liked;
      reply.likes += reply.liked ? 1 : -1;
    }
  }

  if (action === "share-post") {
    const post = findPost(postId);
    if (post && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(`${post.author}: ${post.content}`);
    }
  }

  if (action === "toggle-save-post") {
    state.savedPosts[postId] = !state.savedPosts[postId];
    if (!state.savedPosts[postId]) delete state.savedPosts[postId];
    state.openPostMenuId = null;
  }

  if (action === "follow") {
    const name = button.dataset.name;
    state.following[name] = !state.following[name];
  }

  render();
}

function handleInput(event) {
  const inputType = event.target.dataset.input;
  if (!inputType) return;

  if (inputType === "creator") {
    state.creatorContent = event.target.value;
  }

  if (inputType === "comment") {
    state.commentInputs[event.target.dataset.postId] = event.target.value;
  }

  if (inputType === "reply") {
    const key = `${event.target.dataset.postId}:${event.target.dataset.commentId}`;
    state.replyInputs[key] = event.target.value;
  }

  render();
  restoreFocus(event.target);
}

function handleKeyDown(event) {
  if (event.key === "Escape") {
    state.openPostMenuId = null;
    state.toast = null;
    render();
    return;
  }

  if (event.key !== "Enter" || event.shiftKey) return;

  const inputType = event.target.dataset.input;
  if (inputType === "comment") {
    event.preventDefault();
    addComment(event.target.dataset.postId);
    render();
  }

  if (inputType === "reply") {
    event.preventDefault();
    addReply(event.target.dataset.postId, event.target.dataset.commentId);
    render();
  }
}

function restoreFocus(previousTarget) {
  const inputType = previousTarget.dataset.input;
  if (!inputType) return;

  let selector = `[data-input="${inputType}"]`;

  if (previousTarget.dataset.postId) {
    selector += `[data-post-id="${previousTarget.dataset.postId}"]`;
  }

  if (previousTarget.dataset.commentId) {
    selector += `[data-comment-id="${previousTarget.dataset.commentId}"]`;
  }

  const nextTarget = document.querySelector(selector);
  if (nextTarget) {
    nextTarget.focus();
    const end = nextTarget.value.length;
    nextTarget.setSelectionRange(end, end);
  }
}

document.addEventListener("click", handleClick);
document.addEventListener("input", handleInput);
document.addEventListener("keydown", handleKeyDown);

render();
initSplash();
