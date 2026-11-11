(function () {
  // ── Cards and Tags pages: list every card or tag, filter readings by the one in the URL (#the-moon)
  var index = document.getElementById('card-index');
  if (index) {
    var feed = document.getElementById('card-feed');
    var entries = Array.prototype.slice.call(feed.querySelectorAll('.entry'));
    var kind = index.dataset.kind || 'cards';
    var isTags = kind === 'tags';
    var names = {}, counts = {};
    entries.forEach(function (e) {
      e.querySelectorAll(isTags ? '.tag' : '.chip').forEach(function (c) {
        var slug = c.getAttribute('href').split('#')[1];
        names[slug] = c.childNodes[0].textContent.trim();
        counts[slug] = (counts[slug] || 0) + 1;
      });
    });
    var slugs = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || names[a].localeCompare(names[b]);
    });
    slugs.forEach(function (s) {
      var a = document.createElement('a');
      a.className = 'card-pick'; a.href = '#' + s; a.dataset.slug = s;
      a.innerHTML = '<span></span><b></b>';
      a.firstChild.textContent = names[s]; a.lastChild.textContent = counts[s];
      index.appendChild(a);
    });
    var title = document.getElementById('cards-title'), sub = document.getElementById('cards-sub');
    function apply() {
      var s = decodeURIComponent(location.hash.slice(1));
      if (!counts[s]) s = '';
      entries.forEach(function (e) { e.hidden = !!s && e.dataset[kind].indexOf(' ' + s + ' ') < 0; });
      index.querySelectorAll('.card-pick').forEach(function (a) {
        if (a.dataset.slug === s) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      if (s) {
        title.textContent = names[s];
        sub.innerHTML = (isTags ? 'Tagged on ' : 'Came up in ') + counts[s] + (counts[s] === 1 ? ' reading' : ' readings') + ' · <a href="#">show all ' + kind + '</a>';
      } else {
        title.textContent = isTags ? 'Tags' : 'Cards';
        sub.textContent = !slugs.length ? '' : isTags
          ? slugs.length + ' tags so far. Tap one to see every reading that has it.'
          : slugs.length + ' different cards so far. Tap one to see every reading it appeared in.';
      }
    }
    window.addEventListener('hashchange', apply);
    apply();
  }

  // ── Post page: open GitHub's "new file" screen with today's entry pre-filled
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  document.querySelectorAll('.js-new').forEach(function (btn) {
    var d = new Date();
    var day = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    var kind = btn.dataset.kind;
    var lines = ['---',
      'title: ' + (kind === 'challenge' ? 'Challenge prompt' : 'Today'),
      'category: ' + kind];
    if (kind === 'challenge') lines.push('challenge: ' + (window.JOURNAL_CHALLENGE || 'challenge-name'), 'day: ' + d.getDate());
    lines.push('photo: IMG_1234.jpg');
    if (kind !== 'challenge') lines.push('question: What did you ask?');
    lines.push(
      'tags: [love, work]',
      '---',
      'Your notes go here.', '');
    var name = day + '-' + (kind === 'challenge' ? 'challenge' : 'reading') + '.md';
    btn.href = 'https://github.com/' + (window.JOURNAL_REPO || '') + '/new/main/_posts?filename=' +
      encodeURIComponent(name) + '&value=' + encodeURIComponent(lines.join('\n'));
  });
})();
