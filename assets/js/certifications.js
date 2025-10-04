/**
 * ================================================================
 * CERTIFICATIONS PAGE INTERACTIVE SYSTEM
 * Complete functionality for certificate viewing and interactions
 * ================================================================ */

class CertificationsManager {
    constructor() {
        this.isInitialized = false;
        this.currentModal = null;
        this.certificates = new Map();
        this.loadedImages = new Set();
        
        // Certificate data storage
        this.certificateData = {
            'google-da': {
                title: 'Google Data Analytics Professional',
                provider: 'Google Career Certificates',
                image: 'assets/images/certifications/google-data-analytics.jpg',
                description: 'Comprehensive 8-course program covering data cleaning, analysis, visualization, and storytelling. Learned to use tools like SQL, Tableau, R, and spreadsheets to analyze data and create compelling visualizations.',
                tags: ['Data Analysis', 'SQL', 'Tableau', 'R Programming']
            },
            'aws-ml': {
                title: 'AWS Machine Learning - Specialty',
                provider: 'Amazon Web Services',
                image: 'assets/images/certifications/aws-machine-learning.jpg',
                description: 'Advanced certification validating expertise in building, training, tuning, and deploying machine learning models using AWS services like SageMaker, Rekognition, and Comprehend.',
                tags: ['Machine Learning', 'AWS SageMaker', 'Deep Learning', 'Cloud ML']
            },
            'azure-ai': {
                title: 'Microsoft Azure AI Fundamentals',
                provider: 'Microsoft Learn',
                image: 'assets/images/certifications/azure-ai-fundamentals.jpg',
                description: 'Foundational knowledge of artificial intelligence concepts and Azure AI services including Computer Vision, Natural Language Processing, and Conversational AI using Azure Bot Framework.',
                tags: ['Azure AI', 'Computer Vision', 'NLP', 'Bot Framework']
            },
            'best-project': {
                title: 'Best Student Project Award',
                provider: 'College Technical Symposium',
                image: 'assets/images/certifications/best-project-award.jpg',
                description: 'Awarded for developing an innovative AI-powered Yoga Pose Detection system using computer vision. The project impressed judges with its practical application, technical complexity, and potential real-world impact in fitness and healthcare.',
                tags: ['Computer Vision', 'AI Innovation', 'Healthcare Tech', 'Project Leadership']
            },
            'coding-winner': {
                title: 'Inter-College Coding Competition - 1st Place',
                provider: 'Regional Tech Fest 2024',
                image: 'assets/images/certifications/coding-competition.jpg',
                description: 'Secured first place among 200+ participants by solving complex algorithmic problems efficiently. Demonstrated exceptional problem-solving skills, optimized code performance, and time management under pressure.',
                tags: ['Competitive Programming', 'Algorithms', 'Problem Solving', 'Time Management']
            },
            'leetcode-500': {
                title: 'LeetCode 641+ Problems Solved',
                provider: 'LeetCode Platform',
                image: 'assets/images/certifications/leetcode-achievement.jpg',
                description: 'Achieved through consistent daily practice and dedication to mastering data structures and algorithms. Maintained a streak of solving problems across different difficulty levels, building strong foundation for technical interviews.',
                tags: ['Data Structures', 'Algorithms', 'Daily Practice', 'Consistency']
            }
        };
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleCertificateClick = this.handleCertificateClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🏆 Initializing Certifications Manager...');
        
        try {
            // Core initializations
            this.cacheElements();
            this.setupEventListeners();
            this.initializeLazyLoading();
            this.setupKeyboardNavigation();
            this.preloadCriticalImages();
            
            this.isInitialized = true;
            console.log('✅ Certifications Manager initialized successfully!');
            
        } catch (error) {
            console.error('❌ Certifications Manager initialization failed:', error);
        }
    }

    // ================================================================
    // ELEMENT CACHING
    // ================================================================
    
    cacheElements() {
        // Cache DOM elements
        this.modal = document.getElementById('certificateModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalImage = document.getElementById('modalImage');
        this.modalClose = document.getElementById('modalClose');
        this.modalOverlay = document.querySelector('.modal-overlay');
        
        // Cache certificate buttons
        this.certificateButtons = document.querySelectorAll('.view-certificate-btn');
        this.certificateCards = document.querySelectorAll('.certificate-card');
        
        console.log(`📋 Cached ${this.certificateButtons.length} certificate buttons`);
        console.log(`📋 Cached ${this.certificateCards.length} certificate cards`);
    }

    // ================================================================
    // EVENT LISTENERS SETUP
    // ================================================================
    
    setupEventListeners() {
        console.log('🎯 Setting up event listeners...');
        
        // Certificate button clicks
        this.certificateButtons.forEach(button => {
            button.addEventListener('click', this.handleCertificateClick);
        });
        
        // Modal close events
        if (this.modalClose) {
            this.modalClose.addEventListener('click', this.handleModalClose);
        }
        
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', this.handleModalClose);
        }
        
        // Keyboard events
        document.addEventListener('keydown', this.handleKeyDown);
        
        // Intersection Observer for animations
        this.setupScrollAnimations();
        
        // Image error handling
        this.setupImageErrorHandling();
        
        console.log('✅ Event listeners setup complete');
    }

    // ================================================================
    // CERTIFICATE MODAL FUNCTIONALITY
    // ================================================================
    
    handleCertificateClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const button = event.currentTarget;
        const certificateId = button.dataset.certificate;
        
        if (!certificateId) {
            console.error('❌ Certificate ID not found');
            return;
        }
        
        console.log(`🖼️ Opening certificate: ${certificateId}`);
        this.openCertificateModal(certificateId);
    }
    
    openCertificateModal(certificateId) {
        const certificate = this.certificateData[certificateId];
        
        if (!certificate) {
            console.error(`❌ Certificate data not found for: ${certificateId}`);
            PortfolioUtils.showToast('Certificate not found', 'error');
            return;
        }
        
        // Set modal content
        if (this.modalTitle) {
            this.modalTitle.textContent = certificate.title;
        }
        
        if (this.modalImage) {
            this.modalImage.src = certificate.image;
            this.modalImage.alt = certificate.title;
        }
        
        // Show modal
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            this.currentModal = certificateId;
            this.modalClose?.focus();
            
            // Track modal opening
            this.trackCertificateView(certificateId);
            
            // Add escape key handler
            this.addModalEscapeHandler();
        }
    }
    
    handleModalClose(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        this.closeCertificateModal();
    }
    
    closeCertificateModal() {
        if (!this.modal) return;
        
        console.log('❌ Closing certificate modal');
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset modal content
        if (this.modalImage) {
            this.modalImage.src = '';
            this.modalImage.alt = '';
        }
        
        if (this.modalTitle) {
            this.modalTitle.textContent = 'Certificate Details';
        }
        
        this.currentModal = null;
        
        // Remove escape handler
        this.removeModalEscapeHandler();
        
        // Return focus to trigger button if possible
        const activeButton = document.querySelector(`[data-certificate="${this.currentModal}"]`);
        if (activeButton) {
            activeButton.focus();
        }
    }

    // ================================================================
    // KEYBOARD NAVIGATION
    // ================================================================
    
    setupKeyboardNavigation() {
        console.log('⌨️ Setting up keyboard navigation...');
        
        // Add keyboard support to certificate cards
        this.certificateCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const button = card.querySelector('.view-certificate-btn');
                    if (button) {
                        button.click();
                    }
                }
            });
        });
    }
    
    handleKeyDown(event) {
        // Global keyboard shortcuts
        if (event.key === 'Escape' && this.currentModal) {
            this.closeCertificateModal();
        }
        
        // Arrow key navigation between certificates
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            this.handleArrowNavigation(event);
        }
    }
    
    handleArrowNavigation(event) {
        const focusedElement = document.activeElement;
        const isOnCertificateCard = focusedElement.classList.contains('certificate-card');
        
        if (!isOnCertificateCard) return;
        
        event.preventDefault();
        
        const cards = Array.from(this.certificateCards);
        const currentIndex = cards.indexOf(focusedElement);
        
        let nextIndex;
        if (event.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % cards.length;
        } else {
            nextIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        
        cards[nextIndex].focus();
    }
    
    addModalEscapeHandler() {
        this.modalEscapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeCertificateModal();
            }
        };
        document.addEventListener('keydown', this.modalEscapeHandler);
    }
    
    removeModalEscapeHandler() {
        if (this.modalEscapeHandler) {
            document.removeEventListener('keydown', this.modalEscapeHandler);
            this.modalEscapeHandler = null;
        }
    }

    // ================================================================
    // IMAGE HANDLING
    // ================================================================
    
    initializeLazyLoading() {
        console.log('📸 Initializing lazy loading...');
        
        const images = document.querySelectorAll('.certificate-image img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px 0px'
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                this.loadImage(img);
            });
        }
        
        console.log(`✅ Lazy loading setup for ${images.length} images`);
    }
    
    loadImage(img) {
        if (this.loadedImages.has(img.src)) return;
        
        const card = img.closest('.certificate-card');
        if (card) {
            card.classList.add('loading');
        }
        
        img.onload = () => {
            this.loadedImages.add(img.src);
            if (card) {
                card.classList.remove('loading');
                card.classList.add('loaded');
            }
            console.log(`✅ Image loaded: ${img.alt}`);
        };
        
        img.onerror = () => {
            console.error(`❌ Failed to load image: ${img.src}`);
            this.handleImageError(img);
        };
    }
    
    setupImageErrorHandling() {
        const images = document.querySelectorAll('.certificate-image img');
        
        images.forEach(img => {
            img.addEventListener('error', () => {
                this.handleImageError(img);
            });
        });
    }
    
    handleImageError(img) {
        const card = img.closest('.certificate-card');
        if (card) {
            card.classList.remove('loading');
            card.classList.add('error');
        }
        
        // Create placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'certificate-placeholder';
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <i class="fas fa-certificate"></i>
                <span>Certificate Image</span>
                <small>Failed to load</small>
            </div>
        `;
        
        img.parentNode.replaceChild(placeholder, img);
        
        PortfolioUtils.showToast('Some certificate images failed to load', 'warning', 3000);
    }
    
    preloadCriticalImages() {
        console.log('🚀 Preloading critical images...');
        
        // Preload first few certificate images
        const criticalCertificates = ['google-da', 'aws-ml', 'azure-ai'];
        const imageUrls = criticalCertificates.map(id => 
            this.certificateData[id]?.image
        ).filter(Boolean);
        
        PortfolioUtils.preloadImages(imageUrls).then(results => {
            const successCount = results.filter(result => result.status === 'fulfilled').length;
            console.log(`✅ Preloaded ${successCount}/${imageUrls.length} critical images`);
        });
    }

    // ================================================================
    // SCROLL ANIMATIONS
    // ================================================================
    
    setupScrollAnimations() {
        console.log('📜 Setting up scroll animations...');
        
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.triggerScrollAnimation(entry.target);
                        scrollObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(element => {
                scrollObserver.observe(element);
            });
        } else {
            // Fallback: trigger all animations immediately
            animatedElements.forEach(element => {
                this.triggerScrollAnimation(element);
            });
        }
        
        console.log(`✅ Scroll animations setup for ${animatedElements.length} elements`);
    }
    
    triggerScrollAnimation(element) {
        const delay = parseInt(element.dataset.animationDelay) || 0;
        
        setTimeout(() => {
            if (element.classList.contains('fade-in-on-scroll')) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else if (element.classList.contains('slide-in-on-scroll')) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else if (element.classList.contains('scale-in-on-scroll')) {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }
            
            element.classList.add('animation-complete');
        }, delay);
    }

    // ================================================================
    // ANALYTICS AND TRACKING
    // ================================================================
    
    trackCertificateView(certificateId) {
        console.log(`📊 Certificate viewed: ${certificateId}`);
        
        // Track with common utilities
        if (typeof PortfolioUtils !== 'undefined' && PortfolioUtils.storage) {
            const viewsKey = 'certificate-views';
            const views = PortfolioUtils.storage.get(viewsKey, {});
            views[certificateId] = (views[certificateId] || 0) + 1;
            PortfolioUtils.storage.set(viewsKey, views);
        }
        
        // Track with analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'certificate_view', {
                certificate_id: certificateId,
                certificate_title: this.certificateData[certificateId]?.title
            });
        }
    }
    
    getCertificateStats() {
        const viewsKey = 'certificate-views';
        const views = PortfolioUtils.storage?.get(viewsKey, {}) || {};
        
        return {
            totalViews: Object.values(views).reduce((sum, count) => sum + count, 0),
            certificateViews: views,
            totalCertificates: Object.keys(this.certificateData).length
        };
    }

    // ================================================================
    // UTILITY METHODS
    // ================================================================
    
    addNewCertificate(id, data) {
        if (!id || !data) {
            console.error('❌ Invalid certificate data');
            return false;
        }
        
        this.certificateData[id] = {
            title: data.title || 'Unknown Certificate',
            provider: data.provider || 'Unknown Provider',
            image: data.image || '',
            description: data.description || 'No description available',
            tags: data.tags || []
        };
        
        console.log(`✅ Added new certificate: ${id}`);
        return true;
    }
    
    getCertificate(id) {
        return this.certificateData[id] || null;
    }
    
    getAllCertificates() {
        return { ...this.certificateData };
    }
    
    updateCertificate(id, updates) {
        if (!this.certificateData[id]) {
            console.error(`❌ Certificate not found: ${id}`);
            return false;
        }
        
        this.certificateData[id] = {
            ...this.certificateData[id],
            ...updates
        };
        
        console.log(`✅ Updated certificate: ${id}`);
        return true;
    }
    
    searchCertificates(query) {
        const lowercaseQuery = query.toLowerCase();
        const results = [];
        
        Object.entries(this.certificateData).forEach(([id, data]) => {
            const searchableText = [
                data.title,
                data.provider,
                data.description,
                ...data.tags
            ].join(' ').toLowerCase();
            
            if (searchableText.includes(lowercaseQuery)) {
                results.push({ id, ...data });
            }
        });
        
        return results;
    }
    
    exportCertificateData() {
        const stats = this.getCertificateStats();
        const exportData = {
            certificates: this.getAllCertificates(),
            stats: stats,
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `certificates-data-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        console.log('📁 Certificate data exported');
        PortfolioUtils.showToast('Certificate data exported successfully', 'success');
    }

    // ================================================================
    // PUBLIC API
    // ================================================================
    
    openCertificate(certificateId) {
        return this.openCertificateModal(certificateId);
    }
    
    closeModal() {
        return this.closeCertificateModal();
    }
    
    isModalOpen() {
        return !!this.currentModal;
    }
    
    getCurrentCertificate() {
        return this.currentModal;
    }
    
    getStats() {
        return {
            initialized: this.isInitialized,
            totalCertificates: Object.keys(this.certificateData).length,
            currentModal: this.currentModal,
            loadedImages: this.loadedImages.size,
            ...this.getCertificateStats()
        };
    }
    
    // Destroy method for cleanup
    destroy() {
        console.log('🗑️ Destroying Certifications Manager...');
        
        // Remove event listeners
        this.certificateButtons.forEach(button => {
            button.removeEventListener('click', this.handleCertificateClick);
        });
        
        if (this.modalClose) {
            this.modalClose.removeEventListener('click', this.handleModalClose);
        }
        
        if (this.modalOverlay) {
            this.modalOverlay.removeEventListener('click', this.handleModalClose);
        }
        
        document.removeEventListener('keydown', this.handleKeyDown);
        
        // Remove modal escape handler
        this.removeModalEscapeHandler();
        
        // Close any open modal
        this.closeCertificateModal();
        
        // Clear data
        this.certificates.clear();
        this.loadedImages.clear();
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        this.isInitialized = false;
        console.log('✅ Certifications Manager destroyed');
    }
}

// ================================================================
// INITIALIZATION AND EXPORT
// ================================================================

// Initialize Certifications Manager
window.certificationsManager = new CertificationsManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CertificationsManager;
}

// Global utility functions for easy access
window.openCertificate = (certificateId) => {
    return window.certificationsManager.openCertificate(certificateId);
};

window.closeCertificateModal = () => {
    return window.certificationsManager.closeModal();
};

// Additional CSS for placeholders and loading states
const additionalStyles = `
    <style id="certificate-dynamic-styles">
        .certificate-placeholder {
            height: 250px;
            background: var(--background-card);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px dashed rgba(102, 126, 234, 0.3);
            border-radius: var(--radius-medium);
        }
        
        .placeholder-content {
            text-align: center;
            color: var(--text-secondary);
        }
        
        .placeholder-content i {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }
        
        .placeholder-content span {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .placeholder-content small {
            color: var(--text-muted);
            font-size: 0.8rem;
        }
        
        .certificate-card.loading .certificate-image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .certificate-card.loaded {
            animation: cardLoadIn 0.5s ease;
        }
        
        @keyframes cardLoadIn {
            from {
                opacity: 0.5;
                transform: scale(0.98);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    </style>
`;

// Inject additional styles if not already present
if (!document.querySelector('#certificate-dynamic-styles')) {
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
}

console.log('🏆 Certifications system loaded successfully');
