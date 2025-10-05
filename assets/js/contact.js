/**
 * ================================================================
 * CONTACT SECTION JAVASCRIPT - CLEAN & MOBILE OPTIMIZED
 * Final version with minimal scroll on mobile
 * ================================================================ */

class ContactSection {
    constructor() {
        this.isInitialized = false;
        this.formSubmitted = false;
        this.currentScrollPosition = 0;
        
        // Formspree Configuration
        this.formspreeEndpoint = 'https://formspree.io/f/mpwydnrd';
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    // ================================================================
    // INITIALIZATION
    // ================================================================
    init() {
        if (this.isInitialized) return;
        
        console.log('📧 Initializing Contact Section...');
        
        try {
            // Core initializations
            this.initializeForm();
            this.setupMobileScrollFix();
            
            this.isInitialized = true;
            console.log('✅ Contact Section initialized successfully!');
        } catch (error) {
            console.error('❌ Contact Section initialization failed:', error);
        }
    }

    // ================================================================
    // FORM INITIALIZATION
    // ================================================================
    initializeForm() {
        const form = document.getElementById('contact-form');
        if (!form) {
            console.error('Contact form not found!');
            return;
        }

        // Handle form submission
        form.addEventListener('submit', this.handleFormSubmit);
        
        // Style inputs for mobile (prevent zoom)
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.fontSize = '16px'; // Prevent iOS zoom
        });
        
        console.log('📝 Contact form initialized');
    }

    // ================================================================
    // MOBILE SCROLL FIX - THE KEY SOLUTION
    // ================================================================
    setupMobileScrollFix() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (!isMobile) return; // Desktop doesn't need this
        
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        
        inputs.forEach(input => {
            // CRITICAL: Before focus, save current scroll position
            input.addEventListener('focus', () => {
                // Store scroll position just before keyboard opens
                this.currentScrollPosition = window.pageYOffset;
                
                // Small delay to let browser do its thing, then adjust
                setTimeout(() => {
                    // If browser scrolled too far, bring it back a bit
                    const newScrollPosition = window.pageYOffset;
                    
                    // If it scrolled more than 300px, it's overshooting
                    if (newScrollPosition - this.currentScrollPosition > 300) {
                        // Scroll back up by 200px to prevent going to contact info
                        window.scrollTo({
                            top: newScrollPosition - 200,
                            behavior: 'auto' // Instant, no smooth scroll
                        });
                    }
                }, 300); // Wait for keyboard animation to complete
            }, { passive: true });
            
            // On blur, optionally restore position (when switching fields)
            input.addEventListener('blur', () => {
                // Small delay to check if another input is being focused
                setTimeout(() => {
                    const activeElement = document.activeElement;
                    const isAnotherInputFocused = 
                        activeElement && 
                        (activeElement.tagName === 'INPUT' || 
                         activeElement.tagName === 'TEXTAREA');
                    
                    // If not focusing another input, we can restore position
                    if (!isAnotherInputFocused) {
                        // Optionally scroll back to original position
                        // Commented out to allow natural behavior
                        // window.scrollTo(0, this.currentScrollPosition);
                    }
                }, 100);
            }, { passive: true });
        });
        
        console.log('📱 Mobile scroll fix applied');
    }

    // ================================================================
    // FORM SUBMISSION HANDLER
    // ================================================================
    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.formSubmitted) return;
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const statusDiv = document.getElementById('form-status');
        
        // Get form data
        const formData = new FormData(form);
        
        // Validate fields
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            this.showStatus('Please fill in all fields', 'error');
            return;
        }
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        
        try {
            // Submit to Formspree
            const response = await fetch(this.formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                this.showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                this.formSubmitted = true;
                
                // Reset submit button
                submitBtn.innerHTML = '<span class="btn-text">Message Sent!</span><i class="fas fa-check"></i>';
                
                // Allow resubmission after 5 seconds
                setTimeout(() => {
                    this.formSubmitted = false;
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showStatus('Oops! Something went wrong. Please try again.', 'error');
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    }

    // ================================================================
    // STATUS MESSAGE DISPLAY
    // ================================================================
    showStatus(message, type) {
        const statusDiv = document.getElementById('form-status');
        if (!statusDiv) return;
        
        statusDiv.textContent = message;
        statusDiv.className = `form-status ${type}`;
        statusDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

// ================================================================
// INITIALIZE CONTACT SECTION
// ================================================================
const contactSection = new ContactSection();
