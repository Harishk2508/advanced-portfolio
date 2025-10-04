/**
 * ================================================================
 * CONTACT SECTION JAVASCRIPT - FORMSPREE INTEGRATION FIXED
 * ================================================================ */

class ContactSection {
    constructor() {
        this.isInitialized = false;
        this.formSubmitted = false;
        this.observers = [];
        this.validationRules = this.initializeValidationRules();
        
        // Updated Formspree Configuration
        this.formspreeEndpoint = 'https://formspree.io/f/mpwydnrd';
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleResize = this.handleResize.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('📧 Initializing Contact Section with Fixed Formspree...');
        
        try {
            // Core initializations
            this.initializeContactForm();
            this.initializeContactInfo();
            this.setupScrollAnimations();
            
            // Event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✅ Contact Section initialized successfully!');
            
        } catch (error) {
            console.error('❌ Contact Section initialization failed:', error);
        }
    }

    // ================================================================
    // VALIDATION RULES
    // ================================================================
    
    initializeValidationRules() {
        return {
            name: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s'-]{2,50}$/,
                errorMessages: {
                    required: 'Name is required',
                    minLength: 'Name must be at least 2 characters',
                    maxLength: 'Name must not exceed 50 characters',
                    pattern: 'Please enter a valid name'
                }
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                errorMessages: {
                    required: 'Email is required',
                    pattern: 'Please enter a valid email address'
                }
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000,
                errorMessages: {
                    required: 'Message is required',
                    minLength: 'Message must be at least 10 characters',
                    maxLength: 'Message must not exceed 1000 characters'
                }
            }
        };
    }

    // ================================================================
    // CONTACT FORM INITIALIZATION - FIXED
    // ================================================================
    
    initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        console.log('📝 Initializing contact form...');
        
        // Ensure form has correct action
        contactForm.setAttribute('action', this.formspreeEndpoint);
        contactForm.setAttribute('method', 'POST');
        
        // Setup form validation
        this.setupFormValidation(contactForm);
        
        // Setup form submission  
        this.setupFormSubmission(contactForm);
        
        // Setup real-time validation
        this.setupRealTimeValidation(contactForm);
        
        // Fix input spacing issues
        this.fixInputSpacing(contactForm);
        
        console.log('✅ Contact form initialized');
    }
    
    // NEW: Fix input spacing issues
    fixInputSpacing(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Ensure proper text input handling
            input.style.fontFamily = 'inherit';
            input.style.fontSize = 'var(--font-size-base)';
            input.style.lineHeight = '1.5';
            input.style.whiteSpace = 'normal';
            input.style.wordSpacing = 'normal';
            input.style.letterSpacing = 'normal';
            
            // Fix focus behavior
            input.addEventListener('focus', () => {
                input.style.outline = 'none';
                input.style.userSelect = 'auto';
            });
            
            // Ensure textarea allows line breaks
            if (input.tagName === 'TEXTAREA') {
                input.style.resize = 'vertical';
                input.style.overflowWrap = 'break-word';
                input.style.whiteSpace = 'pre-wrap';
            }
        });
    }
    
    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input[name], textarea[name]');
        
        inputs.forEach(input => {
            const fieldName = input.name;
            const rules = this.validationRules[fieldName];
            
            if (rules) {
                // Add validation attributes
                if (rules.required) input.setAttribute('required', '');
                if (rules.minLength) input.setAttribute('minlength', rules.minLength);
                if (rules.maxLength) input.setAttribute('maxlength', rules.maxLength);
                
                // Add error display element
                this.createErrorDisplay(input);
            }
        });
    }
    
    createErrorDisplay(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ff4757;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            opacity: 0;
            transform: translateY(-5px);
            transition: all 0.3s ease;
            min-height: 20px;
        `;
        
        input.parentNode.appendChild(errorDiv);
    }
    
    setupRealTimeValidation(form) {
        const inputs = form.querySelectorAll('input[name], textarea[name]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('focus', () => {
                this.clearFieldError(input);
                input.classList.remove('error');
                input.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.classList.remove('focused');
            });
            
            // Character counter for message
            if (input.name === 'message') {
                input.addEventListener('input', () => {
                    this.updateCharacterCounter(input);
                });
            }
        });
    }
    
    setupFormSubmission(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.formSubmitted) {
                this.showToast('⏳ Please wait, form is being submitted...', 'warning');
                return;
            }
            
            // Validate entire form
            const isValid = this.validateForm(form);
            
            if (isValid) {
                await this.submitFormToFormspree(form);
            } else {
                this.showToast('❌ Please fix the errors above', 'error');
                
                // Focus first invalid field
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }

    // ================================================================
    // FORMSPREE INTEGRATION - FIXED
    // ================================================================
    
    async submitFormToFormspree(form) {
        this.formSubmitted = true;
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnHTML = submitBtn.innerHTML;
        
        try {
            // Show loading state
            this.showSubmitLoading(submitBtn);
            
            // Collect form data - FIXED for Formspree
            const formData = new FormData(form);
            
            console.log('📤 Submitting to Formspree...', {
                endpoint: this.formspreeEndpoint,
                data: Object.fromEntries(formData)
            });
            
            // Submit to Formspree using FormData (not JSON)
            const response = await fetch(this.formspreeEndpoint, {
                method: 'POST',
                body: formData, // Use FormData directly
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('📥 Formspree response:', response.status, response.statusText);
            
            if (response.ok) {
                this.handleSubmitSuccess(form, submitBtn, originalBtnHTML);
            } else {
                let errorMessage = 'Failed to send message';
                
                try {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        errorMessage = errorData.errors.map(e => e.message).join(', ');
                    }
                } catch (parseError) {
                    console.error('Error parsing response:', parseError);
                }
                
                this.handleSubmitError(errorMessage, submitBtn, originalBtnHTML);
            }
            
        } catch (error) {
            console.error('❌ Formspree submission error:', error);
            this.handleSubmitError('Network error. Please check your connection and try again.', submitBtn, originalBtnHTML);
        }
        
        this.formSubmitted = false;
    }
    
    showSubmitLoading(button) {
        button.disabled = true;
        button.innerHTML = `
            <span class="btn-text">
                <i class="fas fa-spinner fa-spin"></i>
                Sending...
            </span>
        `;
        button.style.opacity = '0.8';
    }
    
    handleSubmitSuccess(form, button, originalHTML) {
        // Show success state
        button.innerHTML = `
            <span class="btn-text">
                <i class="fas fa-check"></i>
                Message Sent!
            </span>
        `;
        button.style.background = '#2ed573';
        button.style.borderColor = '#2ed573';
        
        // Show success message
        this.showToast('🎉 Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.borderColor = '';
            button.style.opacity = '';
            button.disabled = false;
            
            // Clear all validation states
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('valid', 'error', 'focused');
                this.clearFieldError(input);
            });
            
            // Clear character counter
            const counter = form.querySelector('.char-counter');
            if (counter) counter.remove();
            
        }, 4000);
        
        // Track successful submission
        this.trackEvent('contact_form_submitted', {
            success: true,
            provider: 'formspree',
            timestamp: new Date().toISOString()
        });
    }
    
    handleSubmitError(error, button, originalHTML) {
        // Show error state
        button.innerHTML = `
            <span class="btn-text">
                <i class="fas fa-exclamation-triangle"></i>
                Try Again
            </span>
        `;
        button.style.background = '#ff4757';
        button.style.borderColor = '#ff4757';
        
        // Show error message
        this.showToast(`❌ ${error}`, 'error');
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.borderColor = '';
            button.style.opacity = '';
            button.disabled = false;
        }, 4000);
        
        // Track failed submission
        this.trackEvent('contact_form_error', {
            error: error,
            provider: 'formspree',
            timestamp: new Date().toISOString()
        });
    }

    // ================================================================
    // FORM VALIDATION
    // ================================================================
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[name], textarea[name]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(input) {
        const fieldName = input.name;
        const rules = this.validationRules[fieldName];
        const value = input.value.trim();
        
        if (!rules) return true;
        
        // Clear previous errors
        this.clearFieldError(input);
        
        // Required validation
        if (rules.required && !value) {
            this.showFieldError(input, rules.errorMessages.required);
            return false;
        }
        
        // Skip other validations if field is empty and not required
        if (!value && !rules.required) return true;
        
        // Length validation
        if (rules.minLength && value.length < rules.minLength) {
            this.showFieldError(input, rules.errorMessages.minLength);
            return false;
        }
        
        if (rules.maxLength && value.length > rules.maxLength) {
            this.showFieldError(input, rules.errorMessages.maxLength);
            return false;
        }
        
        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            this.showFieldError(input, rules.errorMessages.pattern);
            return false;
        }
        
        // Field is valid
        input.classList.add('valid');
        input.classList.remove('error');
        
        return true;
    }
    
    showFieldError(input, message) {
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        }
        
        input.classList.add('error');
        input.classList.remove('valid');
    }
    
    clearFieldError(input) {
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.style.opacity = '0';
            errorDiv.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                errorDiv.textContent = '';
            }, 300);
        }
    }
    
    updateCharacterCounter(textarea) {
        const maxLength = this.validationRules.message.maxLength;
        const currentLength = textarea.value.length;
        
        let counter = textarea.parentNode.querySelector('.char-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = `
                font-size: 0.8rem;
                color: var(--text-secondary);
                text-align: right;
                margin-top: 0.5rem;
                transition: color 0.3s ease;
            `;
            textarea.parentNode.appendChild(counter);
        }
        
        counter.textContent = `${currentLength}/${maxLength}`;
        
        // Color coding
        if (currentLength > maxLength * 0.9) {
            counter.style.color = '#ff4757';
        } else if (currentLength > maxLength * 0.7) {
            counter.style.color = '#ffa502';
        } else {
            counter.style.color = 'var(--text-secondary)';
        }
    }

    // ================================================================
    // CONTACT INFO ANIMATIONS
    // ================================================================
    
    initializeContactInfo() {
        const contactMethods = document.querySelectorAll('.contact-method');
        
        if (contactMethods.length === 0) return;
        
        console.log('ℹ️ Initializing contact info animations...');
        
        const infoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(contactMethods).indexOf(entry.target);
                    setTimeout(() => {
                        this.animateContactMethod(entry.target);
                    }, index * 200);
                    
                    infoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        contactMethods.forEach(method => {
            method.style.opacity = '0';
            method.style.transform = 'translateX(-30px)';
            infoObserver.observe(method);
        });
        
        this.observers.push(infoObserver);
        
        console.log(`✅ Contact info initialized: ${contactMethods.length} methods`);
    }
    
    animateContactMethod(method) {
        method.style.transition = 'all 0.8s ease';
        method.style.opacity = '1';
        method.style.transform = 'translateX(0)';
    }

    // ================================================================
    // SCROLL ANIMATIONS
    // ================================================================
    
    setupScrollAnimations() {
        // Animate section header
        const sectionHeader = document.querySelector('#contact .section-header');
        if (sectionHeader) {
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateSectionHeader();
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            headerObserver.observe(sectionHeader);
            this.observers.push(headerObserver);
        }
        
        console.log('✅ Contact scroll animations setup complete');
    }
    
    animateSectionHeader() {
        const badge = document.querySelector('#contact .section-badge');
        const title = document.querySelector('#contact .section-title');
        const line = document.querySelector('#contact .section-line');
        const subtitle = document.querySelector('#contact .section-subtitle');
        
        [badge, title, line, subtitle].forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // ================================================================
    // UTILITY FUNCTIONS
    // ================================================================
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        const colors = {
            success: '#2ed573',
            error: '#ff4757',
            info: '#3742fa',
            warning: '#ffa502'
        };
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10001;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
    
    trackEvent(eventName, eventData = {}) {
        console.log(`📊 Contact Event tracked: ${eventName}`, eventData);
    }

    // ================================================================
    // EVENT LISTENERS
    // ================================================================
    
    setupEventListeners() {
        window.addEventListener('resize', this.handleResize, { passive: true });
        console.log('✅ Contact event listeners setup complete');
    }
    
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            console.log('📱 Contact section responsive adjustment');
        }, 250);
    }

    // ================================================================
    // PUBLIC METHODS
    // ================================================================
    
    resetForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.reset();
            
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('valid', 'error', 'focused');
                this.clearFieldError(input);
            });
            
            console.log('📝 Contact form reset');
        }
    }
    
    destroy() {
        console.log('🗑️ Destroying contact section...');
        
        window.removeEventListener('resize', this.handleResize);
        
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        clearTimeout(this.resizeTimeout);
        
        this.isInitialized = false;
    }
}

// ================================================================
// CSS ANIMATIONS
// ================================================================

const contactAnimationStyles = `
<style>
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

.form-group input.focused,
.form-group textarea.focused {
    border-color: var(--primary-color) !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
}

.form-group input.valid,
.form-group textarea.valid {
    border-color: #2ed573 !important;
    box-shadow: 0 0 0 2px rgba(46, 213, 115, 0.2) !important;
}

.form-group input.error,
.form-group textarea.error {
    border-color: #ff4757 !important;
    box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.2) !important;
    animation: shake 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-3px); }
    75% { transform: translateX(3px); }
}
</style>
`;

// Inject styles
if (!document.querySelector('#contact-animations')) {
    const styleSheet = document.createElement('div');
    styleSheet.id = 'contact-animations';
    styleSheet.innerHTML = contactAnimationStyles;
    document.head.appendChild(styleSheet);
}

// ================================================================
// INITIALIZATION
// ================================================================

// Initialize Contact Section
window.contactSection = new ContactSection();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactSection;
}
