// resources/js/components/CaseFileUpload.js
export default class CaseFileUpload {
    constructor(formId, batchId) {
        this.form = document.getElementById(formId);
        this.batchId = batchId;
        this.previewContainer = null;
        if (this.form) {
            this.init();
        } else {
            console.warn('CaseFileUpload: Form not found with ID:', formId);
        }
    }
    
    init() {
        // Create preview container if not exists
        this.previewContainer = document.createElement('div');
        this.previewContainer.id = 'upload-previews';
        this.previewContainer.className = 'mt-6 grid grid-cols-1 gap-4';
        this.form.parentNode.insertBefore(this.previewContainer, this.form.nextSibling);

        // Update file input to support multiple
        const fileInput = this.form.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.setAttribute('multiple', 'true');
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.form) return;
        
        const fileInput = this.form.querySelector('input[type="file"]');
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            this.showError('Please select at least one file to upload');
            return;
        }

        const files = Array.from(fileInput.files);
        this.previewContainer.innerHTML = ''; // Clear previous previews

        // Disable submit button
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading...';

        try {
            // Upload files one by one (or in parallel depending on requirements, here parallel seems better for user)
            const uploadPromises = files.map(file => this.uploadFile(file));
            await Promise.all(uploadPromises);
            
            // If all ok, reload
            window.location.reload();
        } catch (error) {
            console.error('Upload error:', error);
            this.showError('One or more files failed to upload. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }

    uploadFile(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('batch_id', this.batchId);
            
            const xhr = new XMLHttpRequest();
            const fileId = 'upload-' + Math.random().toString(36).substr(2, 9);
            
            // Add UI element for this file
            const fileEl = document.createElement('div');
            fileEl.id = fileId;
            fileEl.className = 'bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 bh-page-animate';
            fileEl.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-xl bg-[#FACC15]/10 flex items-center justify-center border border-[#FACC15]/20">
                             <svg class="w-5 h-5 text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-white truncate max-w-[200px]">${file.name}</p>
                            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">${this.formatSize(file.size)}</p>
                        </div>
                    </div>
                    <span id="${fileId}-percent" class="text-xs font-black text-[#FACC15]">0%</span>
                </div>
                <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div id="${fileId}-bar" class="h-full bg-gradient-to-r from-[#FACC15] to-[#F59E0B] shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-all duration-300 w-0"></div>
                </div>
            `;
            this.previewContainer.appendChild(fileEl);

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    const bar = document.getElementById(`${fileId}-bar`);
                    const percentTxt = document.getElementById(`${fileId}-percent`);
                    if (bar) bar.style.width = percent + '%';
                    if (percentTxt) percentTxt.textContent = percent + '%';
                }
            });

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.ok) {
                            fileEl.classList.add('border-emerald-500/30', 'bg-emerald-500/5');
                            resolve(response);
                        } else {
                            fileEl.classList.add('border-red-500/30', 'bg-red-500/5');
                            reject(new Error(response.error || 'Upload failed'));
                        }
                    } else {
                        fileEl.classList.add('border-red-500/30', 'bg-red-500/5');
                        reject(new Error('HTTP Error: ' + xhr.status));
                    }
                }
            };

            xhr.open('POST', this.form.action);
            xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send(formData);
        });
    }

    formatSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
    
    showError(message) {
        if (window.showToast) {
            window.showToast('Upload Error', message, 'error');
            return;
        }
        // Fallback if toast is not available
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-20 right-4 z-50 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm font-medium shadow-lg max-w-md bh-page-animate';
        errorDiv.innerHTML = `
            <div class="flex items-start gap-3">
                <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div class="flex-1">${message}</div>
            </div>
        `;
        document.body.appendChild(errorDiv);
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transform = 'translateX(100%)';
            errorDiv.style.transition = 'all 0.3s ease';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }
}

