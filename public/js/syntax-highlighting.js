// Syntax highlighting and copy buttons (Roq POC)
function detectLanguage(content) {
    content = (content || '').trim();
    if (content.includes('public class') || content.includes('import ') || content.includes('System.out.println') || (content.includes('public ') && content.includes('{'))) return 'java';
    if (content.includes('<?xml') || (content.includes('<') && content.includes('</'))) return 'xml';
    if ((content.startsWith('{') && content.endsWith('}')) || (content.startsWith('[') && content.endsWith(']'))) return 'json';
    if (content.includes('---') || (content.includes(':') && !content.includes(';') && !content.includes('<'))) return 'yaml';
    if (content.includes('#!/') || content.includes('$ ') || content.includes('mvn ') || content.includes('npm ')) return 'bash';
    return 'text';
}

function initSyntaxHighlighting() {
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
        var pre = codeBlock.parentElement;
        if (pre.classList.contains('language-processed')) return;
        var lang = detectLanguage(codeBlock.textContent || codeBlock.innerText);
        pre.className = 'language-' + lang + ' line-numbers';
        codeBlock.className = 'language-' + lang;
        pre.classList.add('language-processed');
    });
    if (window.Prism) window.Prism.highlightAll();
    initCopyButtons();
}

function initCopyButtons() {
    document.querySelectorAll('pre').forEach(function(pre) {
        if (pre.querySelector('.copy-button')) return;
        var btn = document.createElement('button');
        btn.className = 'copy-button';
        btn.innerHTML = '<i class="fas fa-copy"></i>';
        btn.title = 'Copy code';
        btn.setAttribute('aria-label', 'Copy code');
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var code = pre.querySelector('code');
            var text = code ? code.textContent : pre.textContent;
            navigator.clipboard.writeText(text).then(function() {
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.classList.add('copied');
                setTimeout(function() { btn.innerHTML = '<i class="fas fa-copy"></i>'; btn.classList.remove('copied'); }, 2000);
            });
        });
        pre.style.position = 'relative';
        pre.appendChild(btn);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSyntaxHighlighting);
} else {
    initSyntaxHighlighting();
}
