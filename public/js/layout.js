// Layout: TOC, sidebar, smooth scroll (Roq POC)
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

function generateTOC() {
    var tocNav = document.getElementById('toc-nav');
    if (!tocNav) return;
    var headings = document.querySelectorAll('.content-wrapper h2, .content-wrapper h3, .content-wrapper h4');
    if (headings.length === 0) {
        var toc = document.getElementById('toc');
        if (toc) toc.style.display = 'none';
        return;
    }
    tocNav.innerHTML = '';
    headings.forEach(function(heading, index) {
        var id = heading.id || 'heading-' + index;
        if (!heading.id) heading.id = id;
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = heading.textContent;
        a.className = 'toc-' + heading.tagName.toLowerCase();
        li.appendChild(a);
        tocNav.appendChild(li);
    });
}

function highlightCurrentPage() {
    var currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar-nav a').forEach(function(link) {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('.toc-nav a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initPage() {
    generateTOC();
    highlightCurrentPage();
    initSmoothScrolling();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
