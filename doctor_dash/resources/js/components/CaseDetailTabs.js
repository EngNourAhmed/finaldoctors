/**
 * CaseDetailTabs Component
 * 
 * Manages tab navigation in the case detail interface.
 * Handles tab switching, URL hash management, and chat polling control.
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 11.1, 11.2, 11.4, 11.5
 */
export default class CaseDetailTabs {
    /**
     * Initialize the tab navigation component
     * 
     * @param {string} containerId - The ID of the container element
     * @param {string} defaultTab - The default tab to show (default: 'files')
     */
    constructor(containerId, defaultTab = 'files') {
        this.container = document.getElementById(containerId);
        this.defaultTab = defaultTab;
        this.activeTab = this.getTabFromHash() || defaultTab;
        this.init();
    }
    
    /**
     * Initialize the component by binding events and showing initial tab
     */
    init() {
        if (!this.container) {
            console.error('CaseDetailTabs: Container not found with ID:', this.containerId);
            return;
        }
        this.bindTabClicks();
        this.showTab(this.activeTab);
        window.addEventListener('hashchange', () => this.handleHashChange());
    }
    
    /**
     * Bind click event handlers to all tab elements
     */
    bindTabClicks() {
        if (!this.container) return;
        const tabs = this.container.querySelectorAll('[data-tab]');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }
    
    /**
     * Switch to a specific tab by updating the URL hash
     * 
     * @param {string} tabName - The name of the tab to switch to
     */
    switchTab(tabName) {
        window.location.hash = tabName;
        this.showTab(tabName);
    }
    
    /**
     * Show a specific tab by toggling visibility and active classes
     * 
     * @param {string} tabName - The name of the tab to show
     */
    showTab(tabName) {
        if (!this.container) return;
        
        // Hide all tab contents
        const contents = this.container.querySelectorAll('[data-tab-content]');
        contents.forEach(content => content.classList.add('hidden'));
        
        // Remove active state from all tabs
        const tabs = this.container.querySelectorAll('[data-tab]');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Show selected tab content
        const selectedContent = this.container.querySelector(`[data-tab-content="${tabName}"]`);
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
        }
        
        // Add active state to selected tab
        const selectedTab = this.container.querySelector(`[data-tab="${tabName}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        this.activeTab = tabName;
        
        // Start/stop chat polling based on active tab
        if (tabName === 'chat' && window.caseChatManager) {
            window.caseChatManager.startPolling();
        } else if (window.caseChatManager) {
            window.caseChatManager.stopPolling();
        }
    }
    
    /**
     * Get the tab name from the URL hash
     * 
     * @returns {string|null} The tab name from the hash, or null if no hash
     */
    getTabFromHash() {
        const hash = window.location.hash.substring(1);
        return hash || null;
    }
    
    /**
     * Handle browser back/forward navigation by reading the URL hash
     */
    handleHashChange() {
        const tabName = this.getTabFromHash() || this.defaultTab;
        this.showTab(tabName);
    }
}
