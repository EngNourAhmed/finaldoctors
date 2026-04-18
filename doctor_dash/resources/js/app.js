import './bootstrap';

// Import case detail components
import CaseDetailTabs from './components/CaseDetailTabs.js';
import CaseFileUpload from './components/CaseFileUpload.js';
import CaseChatManager from './components/CaseChatManager.js';

// Make components available globally
window.CaseDetailTabs = CaseDetailTabs;
window.CaseFileUpload = CaseFileUpload;
window.CaseChatManager = CaseChatManager;

/**
 * Global Toast System
 */
window.showToast = function(title, message, type = 'success') {
    // Flexible argument handling
    if (arguments.length === 1) {
        message = title;
        title = 'SUCCESS';
        type = 'success';
    } else if (arguments.length === 2) {
        const validTypes = ['success', 'error', 'info', 'warning'];
        if (validTypes.includes(message)) {
            type = message;
            message = title;
            title = type.toUpperCase();
        } else {
            // Title is probably the first arg and message is the second
            type = 'success';
        }
    }

    // High-integrity title normalization
    const titles = { success: 'SUCCESS', error: 'ERROR', info: 'INFO', warning: 'WARNING' };
    const typeNorm = type.toLowerCase();
    if (titles[typeNorm] && (!title || ['SUCCESS', 'ERROR', 'INFO', 'WARNING', 'Status Updated'].includes(title))) {
        title = titles[typeNorm];
    }

    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 pointer-events-none';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'px-6 py-5 rounded-[24px] border flex items-center gap-4 shadow-2xl transform translate-y-12 opacity-0 transition-all duration-700 pointer-events-auto min-w-[320px] max-w-[450px]';
    
    // Premium styling
    toast.style.background = 'rgba(12, 12, 12, 0.9)';
    toast.style.backdropFilter = 'blur(20px)';
    
    const isError = type === 'error';
    const accentColor = isError ? 'red' : 'green';
    
    toast.classList.add(`border-${accentColor}-500/30`, 'text-white');
    toast.innerHTML = `
        <div class="h-10 w-10 rounded-2xl bg-${accentColor}-500/10 flex items-center justify-center shrink-0 border border-${accentColor}-500/20">
            <svg class="w-6 h-6 text-${accentColor}-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${isError 
                    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>'
                    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>'}
            </svg>
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-sm font-black tracking-tight uppercase tracking-widest ${isError ? 'text-red-400' : 'text-[#FACC15]'}">${title}</p>
            <p class="text-[13px] font-medium text-gray-400 mt-1 break-words">${message}</p>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Forced reflow and animation
    toast.offsetHeight;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    
    // Removal
    const removeToast = () => {
        toast.style.transform = 'translateY(12px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 700);
    };
    
    setTimeout(removeToast, 4500);
    toast.onclick = removeToast;
};

/**
 * Robust Copy to Clipboard
 */
window.copyToClipboard = async function(text) {
    if (!text) return false;
    
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
        
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const success = document.execCommand('copy');
        textArea.remove();
        return success;
    } catch (err) {
        console.error('Copy to clipboard failed:', err);
        return false;
    }
};

/**
 * Enhance Case Notes:
 * 1. Convert any bare URLs to clickable links.
 * 2. Ensure all links have target="_blank" and rel="noopener noreferrer".
 * 3. Add the "download" attribute if the link points to a known file type.
 */
window.enhanceCaseNotes = function() {
    const isFileUrl = (url) => {
        // Detect standard file extensions
        if (url.match(/\.(pdf|zip|rar|doc|docx|xls|xlsx|jpg|jpeg|png|stl|dcm)(?:\?.*)?$/i)) return true;
        // Detect BoneHard internal system file links (preview routes)
        if (url.match(/\/reports\/shared\/[a-zA-Z0-9-]+\/\d+\/preview/i)) return true;
        if (url.match(/\/reports\/\d+\/preview/i)) return true;
        return false;
    };

    // First, safely linkify all bare URLs in text nodes inside .prose
    function linkifyTextNodes(node) {
        if (node.nodeType === 3) { // Text node
            const urlRegex = /((https?:\/\/[^\s<]+)|(www\.[^\s<]+))/g;
            if (urlRegex.test(node.nodeValue)) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = node.nodeValue.replace(urlRegex, function(url) {
                    let href = url.startsWith('http') ? url : 'https://' + url;
                    // Rewrite preview URLs to their native download equivalents
                    if (href.match(/\/reports\/shared\/[a-zA-Z0-9-]+\/\d+\/preview/i)) {
                        href = href.replace(/\/preview/i, '');
                    } else if (href.match(/\/reports\/\d+\/preview/i)) {
                        href = href.replace(/\/preview/i, '/download');
                    }
                    let isFile = isFileUrl(href);
                    // use #FACC15 like the rest of the site's accent color
                    return `<a href="${href}" target="_blank" rel="noopener noreferrer" ${isFile ? 'download' : ''} class="text-[#FACC15] underline hover:text-[#EAB308] transition-colors break-all">${url}</a>`;
                });
                node.parentNode.replaceChild(wrapper, node);
            }
        } else if (node.nodeType === 1 && node.tagName !== 'A' && node.tagName !== 'BUTTON') {
            Array.from(node.childNodes).forEach(linkifyTextNodes);
        }
    }

    document.querySelectorAll('.prose').forEach(el => {
        Array.from(el.childNodes).forEach(linkifyTextNodes);

        // Also update any existing <a> tags that were saved by CKEditor
        el.querySelectorAll('a').forEach(a => {
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
            let href = a.href;
            if (href.match(/\/reports\/shared\/[a-zA-Z0-9-]+\/\d+\/preview/i)) {
                href = href.replace('/preview', '');
                a.href = href;
            } else if (href.match(/\/reports\/\d+\/preview/i)) {
                href = href.replace('/preview', '/download');
                a.href = href;
            }
            // Force premium styling
            a.classList.add('text-[#FACC15]', 'underline', 'hover:text-[#EAB308]', 'transition-colors', 'break-all');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    window.enhanceCaseNotes();
});
