// resources/js/components/CaseChatManager.js
export default class CaseChatManager {
    constructor(batchId, messagesUrl, sendUrl) {
        this.batchId = batchId;
        this.messagesUrl = messagesUrl;
        this.sendUrl = sendUrl;
        this.pollingInterval = null;
        this.pendingFiles = []; // Array of File objects
        this.isProcessing = false;
        this.pendingMessages = new Map(); // Track uploading messages
        this.messagesCache = []; // Cache for persistency during uploads
        
        console.log('CaseChatManager: Final Polish & UI Refinement...', { batchId });

        this.init();
        this.initLightbox();
    }

    init() {
        this.messageContainer = document.getElementById('case-chat-messages');
        this.messageForm = document.getElementById('case-chat-form');
        this.messageInput = document.getElementById('case-chat-input');
        this.fileInput = document.getElementById('case-chat-file');
        this.attachButton = document.getElementById('case-chat-attach-btn');
        this.filePreview = document.getElementById('case-chat-file-preview');

        if (!this.messageContainer || !this.messageForm || !this.messageInput) {
            console.error('CaseChatManager: Required elements NOT found.');
            return;
        }

        // Fresh clones to avoid double listeners
        const newForm = this.messageForm.cloneNode(true);
        this.messageForm.parentNode.replaceChild(newForm, this.messageForm);
        this.messageForm = newForm;
        
        this.messageInput = document.getElementById('case-chat-input');
        this.attachButton = document.getElementById('case-chat-attach-btn');
        this.fileInput = document.getElementById('case-chat-file');
        this.filePreview = document.getElementById('case-chat-file-preview');

        this.messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSend();
        });

        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        if (this.attachButton && this.fileInput) {
            this.attachButton.onclick = (e) => { 
                console.log('CaseChatManager: Attach button clicked');
                e.preventDefault(); 
                this.fileInput.click(); 
            };
            this.fileInput.onchange = (e) => {
                console.log('CaseChatManager: Files selected', e.target.files);
                this.handleFileSelect(e);
            };
        }

        this.loadMessages();
        this.setupPolling();
    }

    initLightbox() {
        this.lightbox = document.getElementById('chat-lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.closeLightboxBtn = document.getElementById('close-lightbox');

        if (this.closeLightboxBtn) {
            this.closeLightboxBtn.onclick = () => this.closeLightbox();
        }
        if (this.lightbox) {
            this.lightbox.onclick = (e) => { if (e.target === this.lightbox) this.closeLightbox(); };
        }
    }

    openLightbox(src) {
        if (!this.lightbox || !this.lightboxImg) return;
        this.lightboxImg.src = src;
        this.lightbox.classList.remove('hidden');
        setTimeout(() => this.lightbox.classList.add('opacity-100'), 10);
    }

    closeLightbox() {
        if (!this.lightbox) return;
        this.lightbox.classList.remove('opacity-100');
        setTimeout(() => {
            this.lightbox.classList.add('hidden');
            this.lightboxImg.src = '';
        }, 300);
    }

    setupPolling() {
        if (this.pollingInterval) clearInterval(this.pollingInterval);
        this.pollingInterval = setInterval(() => this.loadMessages(), 5000);
    }

    async loadMessages() {
        if (!this.messageContainer) return;
        try {
            const response = await fetch(this.messagesUrl, { headers: { 'Accept': 'application/json' } });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (data.messages) {
                for (const [tempId, pending] of this.pendingMessages) {
                    const exists = data.messages.some(m => m.body === pending.body && (m.file_name === pending.file_name || m.tempId === tempId));
                    if (exists) this.pendingMessages.delete(tempId);
                }
                this.renderMessages(data.messages);
            }
        } catch (error) { console.warn('Polling error', error); }
    }

    renderMessages(messages) {
        if (!this.messageContainer) return;
        if (messages && messages.length > 0) this.messagesCache = messages;
        
        const isNearBottom = this.messageContainer.scrollHeight - this.messageContainer.scrollTop <= this.messageContainer.clientHeight + 150;
        const currentUserId = parseInt(document.querySelector('meta[name="user-id"]')?.content || 0);
        
        let html = this.messagesCache.map(msg => this.createMessageHtml(msg, msg.sender_id === currentUserId)).join('');
        for (const [tempId, pending] of this.pendingMessages) {
            html += this.createMessageHtml(pending, true, true, tempId);
        }
        
        this.messageContainer.innerHTML = html;
        if (isNearBottom) this.scrollToBottom();
    }

    createMessageHtml(message, isSelf, isOptimistic = false, progressId = null) {
        let attachmentHtml = '';
        const fileUrl = isOptimistic ? (message.previewUrl || '') : (message.file_url || (message.file_path ? `/storage/${message.file_path}` : ''));
        const isImage = message.mime_type?.startsWith('image/') || message.isImage;
        const fileName = message.file_name || '';
        const fileSize = message.file_size_formatted || (message.size ? (message.size / 1024).toFixed(1) + ' KB' : '');
        
        if (fileUrl || isOptimistic) {
            if (isImage) {
                attachmentHtml = `
                    <div class="mt-2 rounded-lg overflow-hidden relative group max-w-full bg-black/10">
                        <img src="${fileUrl}" class="max-h-80 w-full object-cover transition-opacity ${!isOptimistic ? 'cursor-pointer active:opacity-90' : 'opacity-60'}" 
                             ${!isOptimistic ? `onclick="window.CaseChatManager.openLightboxProxy('${fileUrl}')"` : ''}>
                        ${isOptimistic ? `
                            <div class="absolute inset-0 flex items-center justify-center z-10" id="prog-wrap-${progressId}">
                                <div class="relative w-12 h-12 flex items-center justify-center">
                                    <svg class="w-full h-full -rotate-90">
                                        <circle class="text-white/20" stroke-width="2" stroke="currentColor" fill="transparent" r="22" cx="24" cy="24" />
                                        <circle class="text-white transition-all duration-300" id="prog-circle-${progressId}" stroke-width="2" stroke-dasharray="138.2" stroke-dashoffset="138.2" stroke-linecap="round" stroke="currentColor" fill="transparent" r="22" cx="24" cy="24" />
                                    </svg>
                                    <span class="absolute text-[10px] text-white font-black" id="prog-text-${progressId}">0%</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else if (fileName) {
                const isPdf = fileName.toLowerCase().endsWith('.pdf');
                attachmentHtml = `
                    <div class="mt-2 p-0 rounded-xl overflow-hidden border border-white/5 flex flex-col ${isSelf ? 'bg-black/20' : 'bg-white/5'}">
                        <div class="p-4 flex items-center gap-4">
                            <div class="w-12 h-12 shrink-0 relative flex items-center justify-center ${isPdf ? 'text-red-500' : 'text-[#FACC15]'}">
                                <svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Zm4,18H6V4h7V9h5Z"/></svg>
                                ${isPdf ? '<span class="absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] font-black text-white uppercase">PDF</span>' : ''}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-[14px] font-bold truncate ${isSelf ? 'text-black' : 'text-white'}">${fileName}</p>
                                <p class="text-[10px] opacity-60 font-medium">${fileSize || 'Document'}</p>
                            </div>
                            ${isOptimistic ? `
                            <div class="w-8 h-8 relative flex items-center justify-center" id="prog-wrap-${progressId}">
                                <svg class="w-full h-full -rotate-90 absolute">
                                    <circle class="text-black/10" stroke-width="2" stroke="currentColor" fill="transparent" r="14" cx="16" cy="16" />
                                    <circle class="text-${isSelf ? 'black' : '[#FACC15]'} transition-all duration-300" id="prog-circle-${progressId}" stroke-width="2" stroke-dasharray="87.9" stroke-dashoffset="87.9" stroke-linecap="round" stroke="currentColor" fill="transparent" r="14" cx="16" cy="16" />
                                </svg>
                                <span class="text-[7px] font-black" id="prog-text-${progressId}">0%</span>
                            </div>
                            ` : ''}
                        </div>
                        ${!isOptimistic ? `
                        <div class="flex border-t border-white/5 bg-black/5">
                            <a href="${fileUrl}" target="_blank" class="flex-1 py-2 text-center text-[11px] font-black hover:bg-black/5 transition-colors ${isSelf ? 'text-black/80' : 'text-[#FACC15]'}">OPEN</a>
                            <div class="w-[1px] bg-white/5"></div>
                            <a href="${fileUrl}" download="${fileName}" class="flex-1 py-2 text-center text-[11px] font-black hover:bg-black/5 transition-colors ${isSelf ? 'text-black/80' : 'text-[#FACC15]'}">SAVE AS...</a>
                        </div>
                        ` : `
                        <div class="py-2 px-3 bg-black/5 text-[11px] font-bold text-center opacity-50" id="prog-label-${progressId}">Uploading...</div>
                        `}
                    </div>
                `;
            }
        }

        const alignClass = isSelf ? 'justify-end' : 'justify-start';
        const bubbleClass = isSelf ? 'message-self' : 'message-other';
        const tailClass = isSelf ? 'message-tail-self' : 'message-tail-other';

        return `
            <div class="flex ${alignClass} mb-2 w-full px-4" ${isOptimistic ? `id="opt-msg-${progressId}" data-optimistic="true"` : ''}>
                <div class="message-bubble ${bubbleClass} shadow-md border border-black/5">
                    <div class="${tailClass}"></div>
                    ${!isSelf ? `<p class="text-[11px] font-black text-[#FACC15] mb-1.5 uppercase tracking-wider">${message.sender_name || 'ADMIN'}</p>` : ''}
                    ${message.body ? `<p class="message-content text-[15px] leading-relaxed whitespace-pre-wrap break-words py-1 ${isSelf ? 'font-medium' : ''}">${this.linkify(message.body)}</p>` : ''}
                    ${attachmentHtml}
                    <div class="message-info flex items-center justify-end gap-1 mt-1">
                        <span class="text-[10px] opacity-60 font-medium">
                            ${message.created_at_label || 'Just now'}
                        </span>
                        ${isSelf && !isOptimistic ? `
                            <svg class="w-4 h-4 text-black/40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        this.pendingFiles = [...this.pendingFiles, ...files];
        this.renderFilePreview();
        e.target.value = ''; // Reset input
    }

    renderFilePreview() {
        if (!this.filePreview) return;
        if (this.pendingFiles.length === 0) {
            this.filePreview.classList.add('hidden');
            this.filePreview.style.display = 'none';
            this.filePreview.innerHTML = '';
            return;
        }

        this.filePreview.classList.remove('hidden');
        this.filePreview.style.display = 'flex';
        this.filePreview.innerHTML = `
            <div class="flex flex-wrap gap-3 p-4 bg-black/60 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
                ${this.pendingFiles.map((file, i) => {
                    const isImage = file.type.startsWith('image/');
                    const url = isImage ? URL.createObjectURL(file) : null;
                    return `
                        <div class="relative w-20 h-20 rounded-xl overflow-hidden border border-white/20 bg-white/5 group shadow-lg">
                            ${isImage ? `<img src="${url}" class="w-full h-full object-cover">` : `
                                <div class="w-full h-full flex flex-col items-center justify-center p-2">
                                    <svg class="w-8 h-8 text-[#FACC15]" fill="currentColor" viewBox="0 0 24 24"><path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Zm4,18H6V4h7V9h5Z"/></svg>
                                    <span class="text-[8px] text-white/70 truncate w-full text-center mt-1 font-bold">${file.name}</span>
                                </div>
                            `}
                            <button onclick="window.caseChatManager.removePendingFile(${i})" class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    removePendingFile(index) {
        this.pendingFiles.splice(index, 1);
        this.renderFilePreview();
    }

    handleSend() {
        const text = this.messageInput.value.trim();
        const hasFiles = this.pendingFiles.length > 0;
        
        if (!text && !hasFiles) return;

        const filesToSend = [...this.pendingFiles];
        const sharedText = text;

        this.messageInput.value = '';
        this.pendingFiles = [];
        this.renderFilePreview();

        if (filesToSend.length > 0) {
            for (let i = 0; i < filesToSend.length; i++) {
                const currentText = (i === 0) ? sharedText : ''; 
                this.sendSingleRequestWithProgress(currentText, filesToSend[i], filesToSend[i].name);
            }
        } else {
            this.sendSingleRequestWithProgress(sharedText, null);
        }
    }

    sendSingleRequestWithProgress(text, file, customName = null) {
        const tempId = Math.random().toString(36).substr(2, 9);
        const isImage = file && file.type.startsWith('image/');
        const previewUrl = isImage ? URL.createObjectURL(file) : null;

        const messageData = {
            sender_name: 'You',
            body: text,
            file_name: customName || (file ? file.name : null),
            mime_type: file ? file.type : null,
            size: file ? file.size : 0,
            isImage: isImage,
            previewUrl: previewUrl,
            sender_id: document.querySelector('meta[name="user-id"]')?.content || 0
        };
        
        this.pendingMessages.set(tempId, messageData);
        this.renderMessages();
        
        const formData = new FormData();
        if (text) formData.append('message', text);
        if (file) {
            formData.append('file', file, customName || file.name);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.sendUrl);
        xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                this.updateUploadProgress(tempId, percent, isImage);
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this.pendingMessages.delete(tempId);
                this.loadMessages();
            } else {
                this.markMessageFailed(tempId);
            }
        };

        xhr.onerror = () => this.markMessageFailed(tempId);
        xhr.send(formData);
    }

    updateUploadProgress(tempId, percent, isImage) {
        const text = document.getElementById(`prog-text-${tempId}`);
        const circle = document.getElementById(`prog-circle-${tempId}`);
        if (text) text.textContent = `${percent}%`;
        if (circle) {
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percent / 100 * circumference);
            circle.style.strokeDashoffset = offset;
        }
        if (percent === 100) {
            const label = document.getElementById(`prog-label-${tempId}`);
            if (label) label.textContent = 'Processing...';
        }
    }

    markMessageFailed(tempId) {
        const msg = document.getElementById(`opt-msg-${tempId}`);
        if (msg) {
            msg.querySelector('.message-bubble').classList.add('!bg-red-900/40', 'border-red-500');
            const wrap = document.getElementById(`prog-wrap-${tempId}`);
            if (wrap) wrap.remove();
        }
    }

    linkify(text) {
        if (!text) return '';
        // Escape HTML to prevent XSS
        const escaped = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        // Simple regex to detect URLs
        const urlRegex = /((https?:\/\/[^\s]+)|(www\.[^\s]+))/g;
        return escaped.replace(urlRegex, function(url) {
            let href = url;
            if (!href.startsWith('http://') && !href.startsWith('https://')) {
                href = 'https://' + href;
            }
            
            // Transform preview links into explicit download links to preserve original file names
            if (href.match(/\/reports\/shared\/[a-zA-Z0-9-]+\/\d+\/preview/i)) {
                href = href.replace(/\/preview/i, '');
            } else if (href.match(/\/reports\/\d+\/preview/i)) {
                href = href.replace(/\/preview/i, '/download');
            }
            
            return '<a href="' + href + '" target="_blank" class="underline font-bold hover:opacity-80 transition-opacity" rel="noopener noreferrer" style="color: inherit;">' + url + '</a>';
        });
    }

    scrollToBottom() {
        if (this.messageContainer) {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        }
    }

    static openLightboxProxy(src) {
        if (window.caseChatManager) {
            window.caseChatManager.openLightbox(src);
        }
    }
}
window.CaseChatManager = CaseChatManager;