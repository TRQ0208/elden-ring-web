(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./story.js'));
  else {
    root.EldenAdventure = factory(root.EldenAdventureStory);
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', root.EldenAdventure.mount);
    else root.EldenAdventure.mount();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (story) {
  'use strict';

  var STORAGE_KEY = 'elden.adventure.chapter1.v1';
  var VERSION = 1;
  // Keep the original key and version so the first-chapter edition can continue here.
  var MAX_HISTORY = 512;
  var SCENE_POSITIONS = ['0% 0%', '50% 0%', '100% 0%', '0% 100%', '50% 100%', '100% 100%'];

  function copy(value) { return JSON.parse(JSON.stringify(value)); }
  function initialSnapshot() { return { nodeId: story.start, inventory: [], clues: [], flags: {}, choiceId: null }; }
  function nodeFor(snapshot) { return story.nodes[snapshot.nodeId]; }
  function matches(snapshot, condition) {
    if (!condition) return true;
    return Object.keys(condition.flags || {}).every(function (key) { return snapshot.flags[key] === condition.flags[key]; }) &&
      (condition.noneFlags || []).every(function (key) { return !snapshot.flags[key]; }) &&
      (!condition.anyFlags || condition.anyFlags.some(function (key) { return !!snapshot.flags[key]; })) &&
      (condition.items || []).every(function (key) { return snapshot.inventory.indexOf(key) !== -1; }) &&
      (condition.clues || []).every(function (key) { return snapshot.clues.indexOf(key) !== -1; });
  }
  function choicesFor(snapshot) {
    return (nodeFor(snapshot).choices || []).filter(function (choice) { return matches(snapshot, choice.requires); });
  }
  function chapterFor(snapshot) {
    return story.chapters.find(function (chapter) { return chapter.id === nodeFor(snapshot).chapter; }) || story.chapters[0];
  }
  function addUnique(target, values) {
    (values || []).forEach(function (value) { if (target.indexOf(value) === -1) target.push(value); });
  }
  function resolveDestination(choice, snapshot) {
    if (choice.ending === 'journey') {
      if (snapshot.flags.helped) return 'endingFriend';
      if (snapshot.flags.cautious || snapshot.flags.mapped) return 'endingGuided';
      return 'endingBold';
    }
    var branch = (choice.nextCases || []).find(function (entry) { return matches(snapshot, entry.when); });
    return branch ? branch.next : choice.next;
  }
  function advance(snapshot, choiceId) {
    var choice = choicesFor(snapshot).find(function (entry) { return entry.id === choiceId; });
    if (!choice) return null;
    var next = copy(snapshot);
    var effects = choice.effects || {};
    addUnique(next.inventory, effects.items);
    addUnique(next.clues, effects.clues);
    Object.keys(effects.flags || {}).forEach(function (key) { next.flags[key] = effects.flags[key]; });
    next.nodeId = resolveDestination(choice, next);
    next.choiceId = choice.id;
    return story.nodes[next.nodeId] ? next : null;
  }
  function sameSnapshot(saved, expected) {
    if (!saved || typeof saved !== 'object' || !expected) return false;
    if (Object.keys(saved).sort().join(',') !== 'choiceId,clues,flags,inventory,nodeId') return false;
    if (saved.nodeId !== expected.nodeId || saved.choiceId !== expected.choiceId) return false;
    if (JSON.stringify(saved.inventory) !== JSON.stringify(expected.inventory) || JSON.stringify(saved.clues) !== JSON.stringify(expected.clues)) return false;
    if (!saved.flags || typeof saved.flags !== 'object' || Array.isArray(saved.flags)) return false;
    var keys = Object.keys(saved.flags).sort();
    if (keys.join(',') !== Object.keys(expected.flags).sort().join(',')) return false;
    return keys.every(function (key) { return saved.flags[key] === expected.flags[key]; });
  }

  // Replay each saved choice instead of trusting editable inventory or flag data.
  function validateSave(value) {
    try {
      if (!value || value.version !== VERSION || value.storyId !== story.id) return null;
      if (!Array.isArray(value.history) || !value.history.length || value.history.length > MAX_HISTORY) return null;
      if (!Number.isInteger(value.cursor) || value.cursor < 0 || value.cursor >= value.history.length) return null;
      if (!Number.isFinite(value.updatedAt) || value.updatedAt < 0) return null;
      var expected = initialSnapshot();
      var history = [];
      for (var i = 0; i < value.history.length; i += 1) {
        var saved = value.history[i];
        if (!saved || typeof saved !== 'object') return null;
        if (i) expected = advance(expected, saved.choiceId);
        if (!sameSnapshot(saved, expected)) return null;
        history.push(copy(expected));
      }
      return { version: VERSION, storyId: story.id, cursor: value.cursor, history: history, updatedAt: value.updatedAt };
    } catch (error) { return null; }
  }

  function createEngine(options) {
    options = options || {};
    var storage = options.storage || null;
    var storageKey = options.storageKey || STORAGE_KEY;
    var now = options.now || Date.now;
    var history = [];
    var cursor = -1;
    var saveStatus = 'idle';

    function current() { return cursor >= 0 ? history[cursor] : null; }
    function persist() {
      if (!current()) return false;
      try {
        if (!storage) throw new Error('Storage unavailable');
        storage.setItem(storageKey, JSON.stringify({ version: VERSION, storyId: story.id, cursor: cursor, history: history, updatedAt: now() }));
        saveStatus = 'saved';
        return true;
      } catch (error) { saveStatus = 'memory'; return false; }
    }
    function readSaved() {
      try {
        if (!storage) throw new Error('Storage unavailable');
        var text = storage.getItem(storageKey);
        if (!text) return null;
        if (text.length > 2000000) { saveStatus = 'invalid'; return null; }
        var validated = validateSave(JSON.parse(text));
        if (!validated) saveStatus = 'invalid';
        return validated;
      } catch (error) {
        saveStatus = error instanceof SyntaxError ? 'invalid' : 'memory';
        return null;
      }
    }
    return {
      start: function () { history = [initialSnapshot()]; cursor = 0; persist(); return copy(current()); },
      choose: function (choiceId) {
        if (!current()) return false;
        var next = advance(current(), choiceId);
        if (!next || cursor + 1 >= MAX_HISTORY) return false;
        if (history[cursor + 1] && sameSnapshot(history[cursor + 1], next)) cursor += 1;
        else { history = history.slice(0, cursor + 1); history.push(next); cursor += 1; }
        persist(); return true;
      },
      back: function () { if (cursor <= 0) return false; cursor -= 1; persist(); return true; },
      goTo: function (index) {
        if (!Number.isInteger(index) || index < 0 || index >= history.length) return false;
        cursor = index; persist(); return true;
      },
      forward: function () {
        if (!current()) return false;
        var choices = choicesFor(current());
        return choices.length === 1 ? this.choose(choices[0].id) : false;
      },
      restore: function () {
        var saved = readSaved();
        if (!saved) return false;
        history = saved.history; cursor = saved.cursor; saveStatus = 'saved'; return true;
      },
      readSaved: readSaved,
      clearSaved: function () {
        history = []; cursor = -1;
        try { if (!storage) throw new Error('Storage unavailable'); storage.removeItem(storageKey); saveStatus = 'idle'; return true; }
        catch (error) { saveStatus = 'memory'; return false; }
      },
      getState: function () { return current() ? copy(current()) : null; },
      getHistory: function () { return copy(history); },
      getCursor: function () { return cursor; },
      getSaveStatus: function () { return saveStatus; },
      availableChoices: function () { return current() ? copy(choicesFor(current())) : []; }
    };
  }

  function mount() {
    var doc = typeof document !== 'undefined' ? document : null;
    if (!doc || !story || !doc.getElementById('bookCover') || doc.documentElement.dataset.adventureMounted) return;
    doc.documentElement.dataset.adventureMounted = 'true';
    var byId = function (id) { return doc.getElementById(id); };
    var embedded = new URLSearchParams(window.location.search).get('embed') === '1';
    if (embedded) doc.documentElement.classList.add('is-embedded');
    var local = null;
    try { local = window.localStorage; } catch (error) { /* Reading remains usable without storage. */ }
    var engine = createEngine({ storage: local });
    var saved = engine.readSaved();
    var cover = byId('bookCover');
    var reading = byId('readingView');
    var contents = byId('contentsDialog');
    var journal = byId('journalPanel');
    var book = reading.querySelector('.open-book');
    var spread = book.querySelector('.book-spread');
    var turning = false;
    var finishTurn = null;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var warmedImages = Object.create(null);

    function sceneForState(state) {
      var node = nodeFor(state);
      var variant = (node.sceneVariants || []).find(function (entry) { return matches(state, entry.when); });
      return { index: variant ? variant.scene : node.scene, scene: story.scenes[variant ? variant.scene : node.scene] || story.scenes[0] };
    }

    // Only warm the immediately reachable pages, never the whole illustrated book.
    function warmNextScenes(state, choices, currentImage) {
      var connection = window.navigator.connection;
      if (connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || ''))) return;
      var queued = 0;
      choices.forEach(function (choice) {
        var next = advance(state, choice.id);
        var scene = next && sceneForState(next).scene;
        if (!scene || scene.image === currentImage || warmedImages[scene.image] || queued >= 2) return;
        queued += 1;
        var preview = new window.Image();
        warmedImages[scene.image] = preview;
        preview.decoding = 'async';
        preview.onload = function () { warmedImages[scene.image] = true; };
        preview.onerror = function () { delete warmedImages[scene.image]; };
        preview.src = scene.image;
      });
    }

    // Visual snapshots never own IDs, focus, live regions, or story state.
    function paperCopy(element) {
      var clone = element.cloneNode(true);
      [clone].concat(Array.from(clone.querySelectorAll('*'))).forEach(function (entry) {
        ['id', 'aria-live', 'aria-labelledby', 'aria-describedby', 'aria-controls', 'tabindex'].forEach(function (attribute) { entry.removeAttribute(attribute); });
        if (entry.matches('button, a, input, select, textarea, summary, [contenteditable]')) entry.setAttribute('tabindex', '-1');
      });
      clone.setAttribute('aria-hidden', 'true');
      clone.inert = true;
      return clone;
    }
    function settleTurn() { if (finishTurn) finishTurn(); }
    function turnPage(action) {
      if (turning) return false;
      // Lock before changing the engine, including keyboard and directory events.
      turning = true;
      var oldCursor = engine.getCursor();
      var previous = paperCopy(spread);
      if (!action()) { turning = false; return false; }
      var direction = engine.getCursor() < oldCursor ? 'backward' : 'forward';
      var changed = engine.getCursor() !== oldCursor;
      render(false);
      reading.scrollIntoView({ block: 'start', behavior: 'instant' });
      if (!changed || reducedMotion.matches || typeof book.animate !== 'function') {
        turning = false; focusTitle(); return true;
      }
      try { animateTurn(previous, direction); }
      catch (error) { settleTurn(); turning = false; book.classList.remove('is-turning'); reading.removeAttribute('aria-busy'); focusTitle(); }
      return true;
    }
    function animateTurn(previous, direction) {
      var bounds = spread.getBoundingClientRect();
      var single = window.matchMedia('(max-width: 620px)').matches;
      var layer = doc.createElement('div');
      layer.className = 'page-flip-layer';
      layer.dataset.direction = direction;
      layer.dataset.layout = single ? 'single' : 'spread';
      layer.setAttribute('aria-hidden', 'true'); layer.inert = true;
      layer.style.left = spread.offsetLeft + 'px';
      layer.style.top = spread.offsetTop + 'px';
      layer.style.width = bounds.width + 'px';
      // A long story remains in normal document flow; only visible paper is rendered in 3D.
      layer.style.height = Math.min(bounds.height, Math.max(300, window.innerHeight - Math.max(0, bounds.top) - 18)) + 'px';
      layer.style.setProperty('--page-perspective', Math.max(1100, bounds.width * 2.1) + 'px');
      var leaf = doc.createElement('div'); leaf.className = 'page-flip-leaf';
      var animations = [];
      var timer;
      var cleaned = false;
      function surface(name, content) {
        var face = doc.createElement('div'); face.className = name;
        face.appendChild(content); return face;
      }
      function flat(name, content) { layer.appendChild(surface('page-flip-flat ' + name, content)); }
      if (single) {
        flat('page-flip-single-base', direction === 'forward' ? paperCopy(spread) : previous);
        leaf.appendChild(surface('page-flip-face page-flip-front', direction === 'forward' ? previous : paperCopy(spread)));
      } else {
        var oldLeft = previous.children[0];
        var oldRight = previous.children[1];
        var newLeft = paperCopy(spread.children[0]);
        var newRight = paperCopy(spread.children[1]);
        flat('page-flip-left', direction === 'forward' ? oldLeft : newLeft);
        flat('page-flip-right', direction === 'forward' ? newRight : oldRight);
        leaf.appendChild(surface('page-flip-face page-flip-front', direction === 'forward' ? oldRight : oldLeft));
        leaf.appendChild(surface('page-flip-face page-flip-back', direction === 'forward' ? newLeft : newRight));
      }
      var sheen = doc.createElement('div'); sheen.className = 'page-flip-sheen'; leaf.appendChild(sheen);
      var shadow = doc.createElement('div'); shadow.className = 'page-flip-shadow'; layer.appendChild(shadow);
      layer.appendChild(leaf); book.appendChild(layer);
      book.classList.add('is-turning'); reading.setAttribute('aria-busy', 'true');
      function cleanup() {
        if (cleaned) return;
        cleaned = true; finishTurn = null;
        window.clearTimeout(timer);
        animations.forEach(function (animation) { animation.cancel(); });
        layer.remove(); book.classList.remove('is-turning'); reading.removeAttribute('aria-busy');
        turning = false; focusTitle();
      }
      finishTurn = cleanup;
      var frames;
      if (single) {
        frames = direction === 'forward' ? [
          { transform: 'rotateY(0deg)', offset: 0 },
          { transform: 'rotateY(-48deg) translateZ(18px)', offset: .55 },
          { transform: 'rotateY(-105deg)', offset: 1 }
        ] : [
          { transform: 'rotateY(-105deg)', offset: 0 },
          { transform: 'rotateY(-48deg) translateZ(18px)', offset: .45 },
          { transform: 'rotateY(0deg)', offset: 1 }
        ];
      } else {
        var sign = direction === 'forward' ? -1 : 1;
        frames = [
          { transform: 'rotateY(0deg) translateZ(0px)', offset: 0 },
          { transform: 'rotateY(' + sign * 43 + 'deg) translateZ(22px) skewY(' + sign * .6 + 'deg)', offset: .3 },
          { transform: 'rotateY(' + sign * 122 + 'deg) translateZ(16px) skewY(' + sign * -.4 + 'deg)', offset: .7 },
          { transform: 'rotateY(' + sign * 180 + 'deg) translateZ(0px)', offset: 1 }
        ];
      }
      var timing = { duration: single ? 680 : 820, easing: 'cubic-bezier(.38,.06,.22,1)', fill: 'both' };
      var motion = leaf.animate(frames, timing); animations.push(motion);
      animations.push(shadow.animate([{ opacity: 0, transform: 'scaleX(.35)' }, { opacity: .65, transform: 'scaleX(1)', offset: .5 }, { opacity: 0, transform: 'scaleX(.3)' }], timing));
      animations.push(sheen.animate([{ opacity: 0 }, { opacity: .8, offset: .4 }, { opacity: .15, offset: .7 }, { opacity: 0 }], timing));
      motion.finished.then(cleanup, cleanup);
      // Cancellation, background tabs and an iframe closing must all release the same lock.
      timer = window.setTimeout(cleanup, timing.duration + 400);
    }
    window.addEventListener('resize', settleTurn);
    window.addEventListener('pagehide', settleTurn);
    doc.addEventListener('visibilitychange', function () { if (doc.hidden) settleTurn(); });
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', function () { if (reducedMotion.matches) settleTurn(); });

    function showStatus() {
      var status = engine.getSaveStatus();
      byId('saveStatus').textContent = status === 'saved' ? '进度已自动保存到此浏览器' :
        status === 'memory' ? '本次可以正常阅读；浏览器未允许保存进度' :
        status === 'invalid' ? '旧进度无法读取，可以重新开始冒险' : '每次选择都会保存进度';
    }
    function textList(target, values, labels, empty) {
      if (!target) return;
      target.replaceChildren();
      if (!values.length) {
        var emptyItem = doc.createElement('li'); emptyItem.textContent = empty; emptyItem.className = 'journal-empty'; target.appendChild(emptyItem); return;
      }
      values.forEach(function (value) { var item = doc.createElement('li'); item.textContent = labels[value] || value; target.appendChild(item); });
    }
    function focusTitle() {
      var title = byId('pageTitle');
      title.setAttribute('tabindex', '-1');
      title.focus({ preventScroll: true });
    }
    function confirmRestart() {
      if (turning) return;
      if (!window.confirm('从第一章重新开始整本冒险？当前阅读进度与旅途选择会被替换。可以先在目录里重访已读章节。')) return;
      engine.clearSaved(); engine.start();
      cover.hidden = true; reading.hidden = false; render(true);
    }
    function returnHome(event) {
      settleTurn();
      if (embedded && window.parent !== window) {
        if (event) event.preventDefault();
        window.parent.postMessage({ type: 'elden-adventure-close' }, window.location.origin);
      }
    }
    function renderContents() {
      var list = byId('contentsList');
      list.replaceChildren();
      var history = engine.getHistory();
      var currentChapter = chapterFor(engine.getState());
      var chapterList = byId('chapterList');
      chapterList.replaceChildren();
      story.chapters.forEach(function (chapter) {
        var index = history.findIndex(function (snapshot) { return nodeFor(snapshot).chapter === chapter.id; });
        var row = doc.createElement('li');
        var button = doc.createElement('button'); button.type = 'button'; button.disabled = index === -1;
        button.dataset.chapter = chapter.id;
        var heading = doc.createElement('strong'); heading.textContent = String(chapter.number).padStart(2, '0') + '  ' + chapter.title;
        var description = doc.createElement('small'); description.textContent = chapter.summary;
        var status = doc.createElement('span'); status.textContent = index === -1 ? '尚未抵达' : chapter.id === currentChapter.id ? '正在阅读' : '重访篇章';
        button.append(heading, description, status);
        if (chapter.id === currentChapter.id) button.setAttribute('aria-current', 'location');
        button.addEventListener('click', function () { if (!turning) { contents.close(); turnPage(function () { return engine.goTo(index); }); } });
        row.appendChild(button); chapterList.appendChild(row);
      });
      history.forEach(function (snapshot, index) {
        if (nodeFor(snapshot).chapter !== currentChapter.id) return;
        var row = doc.createElement('li');
        var button = doc.createElement('button'); button.type = 'button';
        button.textContent = String(index + 1).padStart(2, '0') + '  ' + story.nodes[snapshot.nodeId].title;
        if (index === engine.getCursor()) button.setAttribute('aria-current', 'page');
        // Only pages on the visited route are shown, without revealing other branches.
        button.addEventListener('click', function () {
          if (!turning) { contents.close(); turnPage(function () { return engine.goTo(index); }); }
        });
        row.appendChild(button); list.appendChild(row);
      });
    }
    function render(moveFocus) {
      var state = engine.getState();
      if (!state) return;
      var node = nodeFor(state);
      var chapter = chapterFor(state);
      var page = engine.getCursor() + 1;
      var choices = engine.availableChoices();
      reading.dataset.node = state.nodeId;
      reading.classList.toggle('is-ending', !!node.ending);
      reading.classList.toggle('is-chapter-end', !!node.chapterEnd);
      byId('readerChapter').textContent = '第 ' + chapter.number + ' 章 / ' + chapter.title;
      byId('chapterRegion').textContent = chapter.region;
      byId('pageTitle').textContent = node.title;
      byId('pageKicker').textContent = node.kicker;
      byId('pageNumber').textContent = String(page).padStart(2, '0');
      byId('pageCounter').textContent = '第 ' + chapter.number + ' / ' + story.chapters.length + ' 章 · 旅程第 ' + page + ' 页';
      byId('readingProgress').max = story.chapters.length;
      byId('readingProgress').value = node.ending ? story.chapters.length : chapter.number - (node.chapterEnd ? 0 : .5);
      byId('readingProgress').setAttribute('aria-label', '全书章节进度');
      byId('readingProgress').setAttribute('aria-valuetext', '共 ' + story.chapters.length + ' 章，当前第 ' + chapter.number + ' 章');
      var art = byId('sceneArt');
      var illustration = sceneForState(state);
      var scene = illustration.scene;
      art.dataset.scene = String(illustration.index);
      art.style.backgroundImage = 'url("' + scene.image + '")';
      art.style.setProperty('--scene-position', SCENE_POSITIONS[scene.panel]);
      art.setAttribute('aria-label', scene.description || node.title + '场景插画');
      byId('sceneLabel').textContent = String(chapter.number).padStart(2, '0') + ' — ' + (scene.title || chapter.subtitle);
      warmNextScenes(state, choices, scene.image);
      var text = byId('storyText'); text.replaceChildren();
      var variants = (node.variants || []).filter(function (entry) { return matches(state, entry.when); });
      var paragraphs = node.text.concat.apply(node.text, variants.map(function (entry) { return entry.text || []; }));
      paragraphs.forEach(function (paragraph) { var p = doc.createElement('p'); p.textContent = paragraph; text.appendChild(p); });
      var dialogue = byId('dialogue'); dialogue.replaceChildren();
      var speeches = (node.dialogue || []).concat.apply(node.dialogue || [], variants.map(function (entry) { return entry.dialogue || []; }));
      var longDialogue = speeches.length > 1 || speeches.reduce(function (total, entry) { return total + entry.text.length; }, 0) > 70;
      var transcript = byId('sceneTranscript');
      transcript.hidden = !longDialogue;
      (longDialogue ? transcript : art).appendChild(dialogue);
      speeches.forEach(function (entry) {
        var bubble = doc.createElement('div'); bubble.className = 'speech-bubble';
        var speaker = doc.createElement('span'); speaker.className = 'speaker'; speaker.textContent = entry.speaker;
        var p = doc.createElement('p'); p.textContent = entry.text;
        bubble.append(speaker, p); dialogue.appendChild(bubble);
      });
      var choiceList = byId('choices'); choiceList.replaceChildren();
      choices.forEach(function (choice) {
        var button = doc.createElement('button'); button.type = 'button'; button.className = 'story-choice'; button.dataset.choice = choice.id;
        var title = doc.createElement('span'); title.className = 'choice-title'; title.textContent = choice.label;
        var hint = doc.createElement('small'); hint.className = 'choice-hint'; hint.textContent = choice.hint;
        button.append(title, hint);
        button.addEventListener('click', function () { turnPage(function () { return engine.choose(choice.id); }); });
        choiceList.appendChild(button);
      });
      byId('backPage').disabled = engine.getCursor() === 0;
      byId('nextPage').disabled = !!node.ending;
      byId('nextPage').textContent = node.chapterEnd ? '下一章 →' : choices.length > 1 ? '选择前路 →' : '下一页 →';
      var route = state.flags.path === 'forest' ? '林地路线' : state.flags.path === 'bridge' ? '石桥路线' : '旅程尚未分岔';
      if (byId('routeLabel')) byId('routeLabel').textContent = chapter.number === 1 ? route : chapter.region;
      textList(byId('journalItems'), state.inventory, story.itemLabels, '行囊里还没有物品');
      textList(byId('journalClues'), state.clues, story.clueLabels, '等待你发现第一条线索');
      if (byId('journalPath')) byId('journalPath').textContent = '第 ' + chapter.number + ' 章 · ' + chapter.title + '。起程于' + route + '，已走过 ' + page + ' 页。' + (state.flags.frenzied ? '身负癫火：其他世界结局暂时封闭。' : state.flags.flameCured ? '癫火已被金针压制，世界的选择重新开启。' : '');
      var ending = byId('endingSummary');
      if (ending) {
        ending.hidden = !node.ending;
        ending.replaceChildren();
        if (node.ending) {
          var endingText = doc.createElement('p'); endingText.textContent = node.summary; ending.appendChild(endingText);
          var collected = doc.createElement('p'); collected.className = 'ending-collected';
          collected.textContent = '这次旅程：' + route + ' · ' + state.inventory.length + ' 件物品 · ' + state.clues.length + ' 条线索';
          ending.appendChild(collected);
          var actions = doc.createElement('div'); actions.className = 'ending-actions';
          var replay = doc.createElement('button'); replay.type = 'button'; replay.textContent = '重新探索另一条路'; replay.addEventListener('click', confirmRestart);
          var home = doc.createElement('a'); home.href = 'index.html'; home.textContent = embedded ? '合上冒险手册' : '返回网站首页'; home.addEventListener('click', returnHome);
          actions.append(replay, home); ending.appendChild(actions);
        }
      }
      renderContents(); showStatus();
      if (moveFocus) {
        focusTitle();
        // Long chapters need a fresh view at every turn, including within the iframe.
        reading.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    }
    function begin(restore) {
      if (restore && !engine.restore()) {
        byId('continueAdventure').hidden = true; showStatus(); return;
      }
      if (!restore) {
        if (saved && !window.confirm('开始新的旅程会替换这本手册的已有进度，继续吗？')) return;
        engine.start();
      }
      cover.hidden = true; reading.hidden = false; render(true);
    }
    byId('continueAdventure').hidden = !saved;
    byId('startAdventure').addEventListener('click', function () { begin(false); });
    byId('continueAdventure').addEventListener('click', function () { begin(true); });
    byId('backPage').addEventListener('click', function () { turnPage(function () { return engine.back(); }); });
    byId('nextPage').addEventListener('click', function () {
      if (turning) return;
      if (!turnPage(function () { return engine.forward(); })) { var firstChoice = byId('choices').querySelector('button'); if (firstChoice) firstChoice.focus(); }
    });
    byId('restartAdventure').addEventListener('click', confirmRestart);
    byId('openContents').addEventListener('click', function () { if (turning) return; renderContents(); if (!contents.open) contents.showModal(); });
    byId('closeContents').addEventListener('click', function () { contents.close(); });
    byId('journalToggle').addEventListener('click', function () {
      journal.hidden = !journal.hidden;
      byId('journalToggle').setAttribute('aria-expanded', String(!journal.hidden));
    });
    doc.querySelectorAll('[data-adventure-close]').forEach(function (element) { element.addEventListener('click', returnHome); });
    doc.addEventListener('keydown', function (event) {
      var modalOpen = !!doc.querySelector('dialog[open]');
      if (event.key === 'Escape' && embedded && !modalOpen && !event.defaultPrevented) { event.preventDefault(); returnHome(); return; }
      if (turning || modalOpen || reading.hidden || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      var target = event.target;
      if (target && target.closest && target.closest('button, a, input, textarea, select, [contenteditable="true"], summary')) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); turnPage(function () { return engine.back(); }); }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (!turnPage(function () { return engine.forward(); })) { var button = byId('choices').querySelector('button'); if (button) button.focus(); }
      }
    });
    var gesture = null;
    book.addEventListener('pointerdown', function (event) {
      if (turning || event.pointerType === 'mouse' || !event.isPrimary || event.target.closest('button, a, input, select, textarea, summary')) return;
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, at: Date.now() };
    });
    book.addEventListener('pointercancel', function () { gesture = null; });
    book.addEventListener('pointerup', function (event) {
      var start = gesture; gesture = null;
      if (!start || start.id !== event.pointerId || turning || window.getSelection().toString()) return;
      var dx = event.clientX - start.x, dy = event.clientY - start.y;
      if (Date.now() - start.at > 900 || Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx > 0) turnPage(function () { return engine.back(); });
      else if (!turnPage(function () { return engine.forward(); })) { var option = byId('choices').querySelector('button'); if (option) option.focus(); }
    });
    showStatus();
  }

  return { createEngine: createEngine, validateSave: validateSave, matches: matches, story: story, STORAGE_KEY: STORAGE_KEY, mount: mount };
});
