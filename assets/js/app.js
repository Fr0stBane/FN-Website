(() => {
  'use strict';
  const DATA = window.FOOTBALL_DATA;
  const page = document.body.dataset.page || 'home';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const params = new URLSearchParams(window.location.search);
  let matchStatus = 'all', matchLeague = 'All competitions', matchQuery = '';
  let newsCategory = 'All', newsQuery = params.get('q') || '';

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
  const getTeam = id => DATA.teams.find(team => team.id === id);
  const sessionGet = () => {
    try {
      return JSON.parse(localStorage.getItem('fn-demo-session') || sessionStorage.getItem('fn-demo-session') || 'null');
    } catch {
      return null;
    }
  };
  const sessionSet = (value, remember = true) => {
    try {
      sessionClear();
      const store = remember ? localStorage : sessionStorage;
      store.setItem('fn-demo-session', JSON.stringify(value));
    } catch { /* storage may be disabled */ }
  };
  const sessionClear = () => {
    try {
      localStorage.removeItem('fn-demo-session');
      sessionStorage.removeItem('fn-demo-session');
    } catch { /* ignore */ }
  };
  const isLight = () => {
    try {
      return localStorage.getItem('fn-theme') === 'light';
    } catch {
      return false;
    }
  };
  const applyTheme = () => {
    document.body.classList.toggle('light-theme', isLight());
  };
  const fmtDate = value => new Date(value).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
  const fmtTime = value => new Date(value).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const teamCrest = (team, extra = '') => `<span class="${extra || 'crest'}" style="--club-color:${esc(team.color)}">${esc(team.short)}</span>`;
  const articleLink = article => `news.html?article=${encodeURIComponent(article.id)}`;
  const teamLink = team => `teams.html?team=${encodeURIComponent(team.id)}`;
  const matchTeam = id => getTeam(id) || {
    id: '',
    name: 'Unknown team',
    short: 'FC',
    color: '#aab5aa'
  };
  const statusLabel = match => match.status === 'live' ? 'Live · demo' : match.status === 'result' ? 'Full time · demo' : 'Upcoming · demo';

  function header() {
    const current = page === 'home' ? 'index' : page;
    const nav = [
      [
        'Home',
        'index.html',
        'index'
      ],
      [
        'Matches',
        'matches.html',
        'matches'
      ],
      [
        'Teams',
        'teams.html',
        'teams'
      ],
      [
        'News',
        'news.html',
        'news'
      ],
      [
        sessionGet() ? 'Account' : 'Login',
        'login.html',
        'login'
      ]
    ];
    $('#site-header').innerHTML = `<header class="site-header"><div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Football News home"><span class="brand-mark">⚽</span><span><span class="brand-name">FOOTBALL NEWS</span><span class="brand-tag">The game. Every day.</span></span></a>
      <nav class="main-nav" id="main-nav" aria-label="Main navigation">${nav.map(([label, href, key]) => `<a href="${href}" ${current === key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
      <div class="header-actions"><form class="search-form" id="global-search" role="search"><span aria-hidden="true">⌕</span><input name="q" type="search" placeholder="Search stories…" aria-label="Search stories"><button type="submit">Search</button></form>
      <button class="icon-button" id="theme-toggle" type="button" aria-label="Toggle colour theme" title="Toggle colour theme">${isLight() ? '☾' : '☼'}</button>
      <button class="menu-button" id="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">☰</button></div></div></header>`;
    const menu = $('#main-nav');
    $('#menu-toggle').addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      $('#menu-toggle').setAttribute('aria-expanded', String(open));
      $('#menu-toggle').textContent = open ? '✕' : '☰';
    });
    $('#theme-toggle').addEventListener('click', () => {
      try {
        localStorage.setItem('fn-theme', isLight() ? 'dark' : 'light');
      } catch { }
      applyTheme();
      $('#theme-toggle').textContent = isLight() ? '☾' : '☼';
    });
    $('#global-search').addEventListener('submit', event => {
      event.preventDefault();
      const q = new FormData(event.currentTarget).get('q').toString().trim();
      if (q) window.location.href = `news.html?q=${encodeURIComponent(q)}`;
    });
  }

  function footer() {
    $('#site-footer').innerHTML = `<footer class="site-footer"><div class="container"><div class="footer-top"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark">⚽</span><span><span class="brand-name">FOOTBALL NEWS</span><span class="brand-tag">The game. Every day.</span></span></a><p>A clean home for football stories, club profiles and a match-centre experience. Built as a responsive front-end project.</p></div><div class="footer-links"><div class="footer-col"><strong>Explore</strong><a href="matches.html">Match centre</a><a href="teams.html">Teams</a><a href="news.html">Latest stories</a></div><div class="footer-col"><strong>Project</strong><a href="login.html">Demo account</a><a href="README.md">Setup guide</a><a href="https://github.com/" target="_blank" rel="noopener">GitHub</a></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Football News · Student project</span><span class="footer-note">Fixtures, scores, standings and editorial pieces on this demo are illustrative, not live reporting.</span></div></div></footer>`;
  }

  function notice(text = 'Sample content is used throughout this demo. Scores and fixtures are not live.') {
    return `<div class="demo-notice"><span class="notice-icon">ⓘ</span><span><strong>DEMO CONTENT</strong> — ${esc(text)}</span></div>`;
  }

  function scoreCard(match) {
    const home = matchTeam(match.home), away = matchTeam(match.away);
    const score = match.status === 'upcoming' ? `<span class="score-time">${fmtTime(match.date)}</span>` : `<span class="score-value">${match.homeScore} – ${match.awayScore}</span>`;
    return `<article class="score-card" data-match="${match.id}" tabindex="0" role="button" aria-label="View ${esc(home.name)} versus ${esc(away.name)} details"><div class="score-top"><span>${esc(match.league)}</span><span class="status-pill ${match.status}">${statusLabel(match)}</span></div><div class="score-teams"><div class="score-team">${teamCrest(home)}<strong>${esc(home.name)}</strong></div><div>${score}</div><div class="score-team">${teamCrest(away)}<strong>${esc(away.name)}</strong></div></div><div class="score-bottom"><span>${fmtDate(match.date)}</span><span>${match.status === 'live' ? esc(match.minute || 'In play') : match.status === 'result' ? 'Result' : 'Kick-off'}</span></div></article>`;
  }

  function articleCard(article) {
    return `<a class="article-card" href="${articleLink(article)}"><div class="article-image" style="background-image:url('${esc(article.image)}')"></div><div class="article-body"><div class="article-meta"><span class="category-tag">${esc(article.category)}</span><span>${esc(article.date)}</span></div><h3>${esc(article.title)}</h3><p>${esc(article.excerpt)}</p><span class="text-link">Read story ↗</span></div></a>`;
  }

  function renderHome() {
    const [featured, ...rest] = DATA.articles;
    $('#app').innerHTML = `<div class="container"><section class="hero"><div class="hero-content"><div class="hero-kicker">The beautiful game · all in one place</div><h1>More than <span>90 minutes.</span></h1><p>Follow the stories, teams and moments that make football impossible to ignore. Explore thoughtful features and a simple match centre.</p><div class="button-row"><a class="btn btn-primary" href="news.html">Explore the stories <span>↗</span></a><a class="btn btn-secondary" href="matches.html">Open match centre</a></div></div></section>
      <div class="ticker"><div class="ticker-label">AROUND THE GAME</div><div class="ticker-track"><span>Stories, analysis and club profiles</span><span>Match centre · illustrative demo data</span><span>Built for desktop, tablet and mobile</span></div></div>
      <section class="section"><div class="section-head"><div><span class="eyebrow">Match centre</span><h2>Scores & fixtures</h2><p>A quick look at example results and upcoming fixtures.</p></div><a class="text-link" href="matches.html">All matches ↗</a></div>${notice('These scores and fixtures are sample entries for the website demo, not real-time results.')}<div class="score-grid">${DATA.matches.slice(0, 3).map(scoreCard).join('')}</div></section>
      <section class="section"><div class="section-head"><div><span class="eyebrow">From the touchline</span><h2>Featured stories</h2><p>Original sample features about the tactics, people and ideas behind football.</p></div><a class="text-link" href="news.html">All stories ↗</a></div><div class="feature-grid"><a class="feature-card" href="${articleLink(featured)}" style="background-image:url('${esc(featured.image)}')"><div class="feature-content"><div class="article-meta"><span class="category-tag">${esc(featured.category)}</span><span>${esc(featured.read)}</span></div><h3>${esc(featured.title)}</h3><p>${esc(featured.excerpt)}</p><span class="text-link">Read the feature ↗</span></div></a><div class="story-stack">${rest.slice(0, 3).map(a => `<a class="story-row" href="${articleLink(a)}"><div class="story-thumb" style="background-image:url('${esc(a.image)}')"></div><div><div class="article-meta"><span>${esc(a.category)}</span><span>· ${esc(a.read)}</span></div><h3>${esc(a.title)}</h3><span class="text-link">Read story ↗</span></div></a>`).join('')}</div></div></section>
      <section class="section"><div class="section-head"><div><span class="eyebrow">The clubs</span><h2>Explore teams</h2><p>Quick links to club profiles from across Europe.</p></div><a class="text-link" href="teams.html">All teams ↗</a></div><div class="competition-strip">${DATA.teams.slice(0, 8).map(t => `<a class="competition-chip" href="${teamLink(t)}"><strong>${esc(t.name)}</strong>${esc(t.league)}</a>`).join('')}</div></section>
      <section class="section"><div class="section-head"><div><span class="eyebrow">Latest reads</span><h2>More from Football News</h2></div><a class="text-link" href="news.html">Browse news ↗</a></div><div class="article-grid">${DATA.articles.slice(1, 4).map(articleCard).join('')}</div></section></div>`;
    bindMatchOpeners();
  }

  function matchRow(match) {
    const home = matchTeam(match.home), away = matchTeam(match.away);
    const score = match.status === 'upcoming' ? `<strong>${fmtTime(match.date)}</strong><small>Kick-off</small>` : `<strong>${match.homeScore} – ${match.awayScore}</strong><small>${match.status === 'live' ? esc(match.minute || 'In play') : 'Full time'}</small>`;
    return `<article class="match-row" data-match="${match.id}" tabindex="0" role="button" aria-label="View match details"><div style="min-width:0;flex:1"><div class="match-league">${esc(match.league)} · ${fmtDate(match.date)}</div><div class="match-side">${teamCrest(home, 'mini-crest')}<span class="match-team-name">${esc(home.name)}</span></div><div class="match-side" style="margin-top:9px">${teamCrest(away, 'mini-crest')}<span class="match-team-name">${esc(away.name)}</span></div></div><div class="match-score">${score}</div><div class="match-meta"><span class="status-pill ${match.status}">${match.status === 'live' ? 'Live demo' : match.status === 'result' ? 'Result demo' : 'Upcoming'}</span><small>View details ↗</small></div></article>`;
  }

  function renderMatches() {
    $('#app').innerHTML = `<div class="container"><div class="page-heading"><span class="eyebrow">Match centre</span><h1>Fixtures & results</h1><p>Browse the schedule, explore example results and open any fixture for more detail.</p></div>${notice('All match data below is illustrative sample data. No live scores or official fixture feed is connected.')}<div class="page-tools"><div class="filter-tabs" id="match-tabs"><button class="filter-tab active" data-status="all">All matches</button><button class="filter-tab" data-status="live">In play</button><button class="filter-tab" data-status="upcoming">Upcoming</button><button class="filter-tab" data-status="result">Results</button></div><div style="display:flex;gap:8px;flex-wrap:wrap"><select class="select-control" id="league-filter" aria-label="Filter by competition">${DATA.leagues.map(l => `<option>${esc(l)}</option>`).join('')}</select><input class="input-control" id="match-search" type="search" placeholder="Find a club…" aria-label="Search matches"></div></div><div class="match-list" id="match-list"></div></div>`;
    $('#league-filter').addEventListener('change', e => {
      matchLeague = e.target.value;
      updateMatches();
    });
    $('#match-search').addEventListener('input', e => {
      matchQuery = e.target.value.trim().toLowerCase();
      updateMatches();
    });
    $$('#match-tabs [data-status]').forEach(btn => btn.addEventListener('click', () => {
      matchStatus = btn.dataset.status;
      $$('#match-tabs .filter-tab').forEach(b => b.classList.toggle('active', b === btn));
      updateMatches();
    }));
    updateMatches();
    bindMatchOpeners();
  }

  function updateMatches() {
    if (!$('#match-list')) return;
    const list = DATA.matches.filter(m => (matchStatus === 'all' || m.status === matchStatus) && (matchLeague === 'All competitions' || m.league === matchLeague)).filter(m => {
      const h = matchTeam(m.home).name.toLowerCase(), a = matchTeam(m.away).name.toLowerCase();
      return !matchQuery || h.includes(matchQuery) || a.includes(matchQuery) || m.league.toLowerCase().includes(matchQuery);
    });
    $('#match-list').innerHTML = list.length ? list.map(matchRow).join('') : '<div class="empty-state">No fixtures match those filters. Try another club, competition or status.</div>';
    bindMatchOpeners();
  }

  function teamCard(team) {
    return `<a class="team-card" href="${teamLink(team)}"><div class="team-card-top"><span class="team-crest" style="--club-color:${esc(team.color)}">${esc(team.short)}</span><span class="team-league">${esc(team.league)}</span></div><h3>${esc(team.name)}</h3><p>${esc(team.country)}</p><div class="team-card-bottom"><span>${esc(team.venue)}</span><strong class="text-link">Profile ↗</strong></div></a>`;
  }

  function renderTeams() {
    const teamId = params.get('team');
    if (teamId) {
      renderTeamDetail(teamId);
      return;
    }
    $('#app').innerHTML = `<div class="container"><div class="page-heading"><span class="eyebrow">Club directory</span><h1>Know your teams.</h1><p>Explore club profiles, league information and a little context about each team's identity.</p></div><div class="page-tools"><div><strong style="font-size:12px">${DATA.teams.length} club profiles</strong><div style="font-size:10px;color:var(--muted)">Illustrative project data</div></div><input class="input-control" id="team-search" type="search" placeholder="Search clubs or leagues…" aria-label="Search teams" style="width:min(280px,100%)"></div><div class="team-grid" id="team-grid">${DATA.teams.map(teamCard).join('')}</div></div>`;
    $('#team-search').addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      const found = DATA.teams.filter(t => `${t.name} ${t.league} ${t.country}`.toLowerCase().includes(q));
      $('#team-grid').innerHTML = found.length ? found.map(teamCard).join('') : '<div class="empty-state">No clubs found. Try a different search.</div>';
    });
  }

  function renderTeamDetail(id) {
    const team = getTeam(id);
    if (!team) {
      $('#app').innerHTML = '<div class="container"><div class="page-heading"><span class="eyebrow">Club directory</span><h1>Team not found</h1><p>That club profile is not available in this demo.</p><a class="btn btn-primary" href="teams.html">Back to teams</a></div></div>';
      return;
    }
    const related = DATA.matches.filter(m => m.home === id || m.away === id).slice(0, 4);
    $('#app').innerHTML = `<div class="container"><div class="page-heading"><a class="text-link" href="teams.html">← All teams</a></div><div class="team-detail"><section class="detail-panel"><div class="team-detail-head"><span class="team-crest" style="--club-color:${esc(team.color)}">${esc(team.short)}</span><div><span class="eyebrow">${esc(team.league)} · ${esc(team.country)}</span><h2>${esc(team.name)}</h2><span style="font-size:10px;color:var(--muted)">Founded ${esc(team.founded)} · ${esc(team.venue)}</span></div></div><p style="color:var(--muted);font-size:13px;margin:25px 0 0">${esc(team.about)}</p><div class="team-stats"><div class="stat-box"><strong>${esc(team.position)}</strong><span>Demo position</span></div><div class="stat-box"><strong>${team.played}</strong><span>Played</span></div><div class="stat-box"><strong>${team.points}</strong><span>Points</span></div></div><strong style="font-size:11px">Recent form <span style="font-weight:400;color:var(--muted)">(sample)</span></strong><div class="form-dots">${team.form.map(f => `<span class="form-dot ${f}">${f}</span>`).join('')}</div></section><section class="detail-panel"><span class="eyebrow">Fixture list</span><h2 style="font-family:'Barlow Condensed';font-size:30px;margin:7px 0 16px">Club matches</h2>${related.length ? related.map(m => {
      const home = matchTeam(m.home), away = matchTeam(m.away);
      return `<div class="story-row" data-match="${m.id}" role="button" tabindex="0" style="grid-template-columns:1fr auto;margin-bottom:9px"><div><div class="article-meta">${esc(m.league)} · ${fmtDate(m.date)}</div><h3 style="margin:6px 0 0">${esc(home.name)} vs ${esc(away.name)}</h3></div><span class="status-pill ${m.status}">${m.status === 'upcoming' ? 'Upcoming' : m.status === 'live' ? 'Live demo' : 'Result'}</span></div>`;
    }).join('') : '<p style="color:var(--muted);font-size:12px">No sample fixtures listed for this team.</p>'}<p style="font-size:10px;color:var(--muted);margin-top:15px">Team facts and standings shown here are demo values.</p></section></div></div>`;
    bindMatchOpeners();
  }

  function renderNews() {
    const articleId = params.get('article');
    if (articleId) {
      renderArticle(articleId);
      return;
    }
    const categories = [
      'All',
      'Tactics',
      'Analysis',
      'Features'
    ];
    $('#app').innerHTML = `<div class="container"><div class="page-heading"><span class="eyebrow">The newsroom</span><h1>Stories behind the game.</h1><p>Football features, explainers and tactical ideas — written as sample editorial content for this project.</p></div>${notice('These are original sample articles for demonstration, not breaking news or reports of current events.')}<div class="news-controls"><div class="filter-tabs" id="news-tabs">${categories.map((c, i) => `<button class="filter-tab ${i === 0 ? 'active' : ''}" data-category="${c}">${c}</button>`).join('')}</div><form class="news-search" id="news-search"><input class="input-control" type="search" name="q" id="news-query" value="${esc(newsQuery)}" placeholder="Search the stories…" aria-label="Search stories"><button class="btn btn-primary" type="submit">Search</button></form></div><div class="article-grid" id="news-grid"></div></div>`;
    $$('#news-tabs [data-category]').forEach(btn => btn.addEventListener('click', () => {
      newsCategory = btn.dataset.category;
      $$('#news-tabs .filter-tab').forEach(b => b.classList.toggle('active', b === btn));
      updateNews();
    }));
    $('#news-search').addEventListener('submit', e => {
      e.preventDefault();
      newsQuery = $('#news-query').value.trim();
      updateNews();
    });
    $('#news-query').addEventListener('input', () => {
      newsQuery = $('#news-query').value.trim();
      updateNews();
    });
    updateNews();
  }

  function updateNews() {
    if (!$('#news-grid')) return;
    const found = DATA.articles.filter(a => (newsCategory === 'All' || a.category === newsCategory) && `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(newsQuery.toLowerCase()));
    $('#news-grid').innerHTML = found.length ? found.map(articleCard).join('') : '<div class="empty-state">No stories found. Try a different search or category.</div>';
  }

  function renderArticle(id) {
    const article = DATA.articles.find(a => a.id === id);
    if (!article) {
      $('#app').innerHTML = '<div class="container"><div class="page-heading"><span class="eyebrow">The newsroom</span><h1>Story not found</h1><p>This article is not available in the demo.</p><a class="btn btn-primary" href="news.html">Back to stories</a></div></div>';
      return;
    }
    $('#app').innerHTML = `<div class="container"><article class="article-detail"><div class="page-heading" style="padding-bottom:0"><a href="news.html" class="text-link">← All stories</a></div><div class="article-hero" style="background-image:url('${esc(article.image)}')"></div><div class="article-meta"><span class="category-tag">${esc(article.category)}</span><span>${esc(article.date)}</span><span>· ${esc(article.read)}</span></div><h1>${esc(article.title)}</h1><p class="lead">${esc(article.excerpt)}</p><div class="article-copy">${article.body.map(p => `<p>${esc(p)}</p>`).join('')}</div><div class="article-disclaimer">This is original sample editorial content included to demonstrate the article layout. It is not a report about a current match or event.</div><div class="button-row" style="margin-top:24px"><a class="btn btn-primary" href="news.html">More stories</a><button class="btn btn-quiet" id="share-story" type="button">Copy story link ↗</button></div></article></div>`;
    $('#share-story').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast('Story link copied.');
      } catch {
        toast('Copy is not available in this browser.');
      }
    });
  }

  function renderLogin() {
    const session = sessionGet();
    if (session) {
      $('#app').innerHTML = `<div class="container"><section class="profile-panel"><div class="profile-avatar">${esc((session.name || 'F').trim().charAt(0).toUpperCase())}</div><span class="eyebrow">Local demo profile</span><h1>Welcome, ${esc(session.name || 'Football fan')}.</h1><p>You are signed in on this browser. This demo profile is stored only in this browser and is not connected to a server.</p><div class="button-row" style="justify-content:center;margin-top:22px"><a class="btn btn-primary" href="index.html">Back to home</a><button class="btn btn-quiet" id="logout" type="button">Log out</button></div></section></div>`;
      $('#logout').addEventListener('click', () => {
        sessionClear();
        toast('You have been logged out.');
        setTimeout(() => window.location.reload(), 500);
      });
      return;
    }
    $('#app').innerHTML = `<div class="container"><div class="login-wrap"><section class="login-visual"><div><span class="eyebrow">Your football corner</span><h2>Stay close to the game.</h2><p>Sign in to try the account experience for this front-end project.</p></div></section><section class="login-panel"><span class="eyebrow">Member area</span><h1>Welcome back.</h1><p>Use the demo account to explore the local sign-in flow.</p><form id="login-form"><div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" required autocomplete="username" placeholder="you@example.com"></div><div class="field"><label for="password">Password</label><div class="password-wrap"><input id="password" name="password" type="password" required autocomplete="current-password" placeholder="Enter demo password"><button type="button" class="password-toggle" id="show-password">Show</button></div></div><div class="form-options"><label><input type="checkbox" id="remember"> Keep me signed in on this browser</label><a href="#" id="forgot-link">Need help?</a></div><p class="login-message" id="login-message" aria-live="polite"></p><button type="submit" class="btn btn-primary">Log in <span>→</span></button></form><div class="login-split">or</div><button class="btn btn-quiet" id="guest-login" type="button">Continue as a guest</button><div class="demo-credentials"><strong>Demo credentials</strong><br>Email: demo@football.com<br>Password: football123</div><p style="font-size:9px;margin:15px 0 0">Demo only: do not enter a real password. This static site does not provide secure accounts or server-side authentication.</p></section></div></div>`;
    $('#show-password').addEventListener('click', () => {
      const input = $('#password');
      input.type = input.type === 'password' ? 'text' : 'password';
      $('#show-password').textContent = input.type === 'password' ? 'Show' : 'Hide';
    });
    $('#forgot-link').addEventListener('click', e => {
      e.preventDefault();
      toast('This is a local demo. No password reset service is connected.');
    });
    $('#guest-login').addEventListener('click', () => {
      sessionSet({
        name: 'Guest Fan',
        email: null
      }, false);
      toast('Welcome to Football News.');
      setTimeout(() => window.location.reload(), 450);
    });
    $('#login-form').addEventListener('submit', e => {
      e.preventDefault();
      const email = $('#email').value.trim().toLowerCase(), password = $('#password').value;
      const message = $('#login-message');
      if (email === 'demo@football.com' && password === 'football123') {
        sessionSet({
          name: 'Demo Fan',
          email: 'demo@football.com'
        }, $('#remember').checked);
        toast('Demo sign-in successful.');
        setTimeout(() => window.location.reload(), 450);
      } else {
        message.textContent = 'Those demo credentials do not match. Try the details shown below.';
      }
    });
  }

  function bindMatchOpeners() {
    $$('[data-match]').forEach(el => {
      if (el.dataset.bound) return;
      el.dataset.bound = '1';
      el.addEventListener('click', () => openMatch(el.dataset.match));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMatch(el.dataset.match);
        }
      });
    });
  }

  function openMatch(id) {
    const match = DATA.matches.find(m => m.id === id);
    if (!match) return;
    const home = matchTeam(match.home), away = matchTeam(match.away);
    const score = match.status === 'upcoming' ? fmtTime(match.date) : `${match.homeScore} – ${match.awayScore}`;
    $('#modal-root').innerHTML = `<div class="modal-backdrop" id="modal-backdrop"><section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="match-modal-title"><button class="modal-close" id="modal-close" aria-label="Close">✕</button><span class="eyebrow">${esc(match.league)}</span><h2 id="match-modal-title">Match details</h2><p>${fmtDate(match.date)} · ${esc(match.venue)}</p><div class="modal-score"><div class="score-team">${teamCrest(home)}<strong>${esc(home.name)}</strong></div><strong>${score}</strong><div class="score-team">${teamCrest(away)}<strong>${esc(away.name)}</strong></div></div><div class="demo-notice"><span class="notice-icon">ⓘ</span><span><strong>DEMO MATCH</strong> — ${esc(match.note)}. This is not an official score feed.</span></div><p style="margin-bottom:0">${match.status === 'upcoming' ? 'This sample fixture is scheduled for the date and kick-off time shown above.' : match.status === 'live' ? 'The in-play minute and score shown here are examples for the interface.' : 'The final score shown here is sample project data.'}</p></section></div>`;
    $('#modal-close').addEventListener('click', closeModal);
    $('#modal-backdrop').addEventListener('click', e => {
      if (e.target.id === 'modal-backdrop') closeModal();
    });
  }
  function closeModal() {
    $('#modal-root').innerHTML = '';
  }
  function toast(message) {
    const root = $('#toast-root');
    root.innerHTML = `<div class="toast">${esc(message)}</div>`;
    window.setTimeout(() => {
      root.innerHTML = '';
    }, 2600);
  }

  applyTheme();
  header();
  footer();
  if (page === 'home') renderHome();
  else if (page === 'matches') renderMatches();
  else if (page === 'teams') renderTeams();
  else if (page === 'news') renderNews();
  else if (page === 'login') renderLogin();
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();
