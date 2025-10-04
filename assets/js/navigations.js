/**
 * ================================================================
 * NAVIGATION SYSTEM
 * Complete Navigation with Smooth Scrolling, Active States, and Mobile Support
 * ================================================================ */

class NavigationManager {
    constructor() {
        this.isInitialized = false;
        this.activeSection = 'hero';
        this.scrollTimeout = null;
        this.isScrolling = false;
        this.navHeight = 0;
        this.sections = [];
        this.navLinks = [];
        this.observers = [];
        
        // Navigation state
        this.isMobileMenuOpen = false;
        this.lastScrollY = 0;
        this.navbarVisible = true;
        
        // Smooth scroll settings
        this.scrollSettings = {
            duration: 800,
            easing: 'easeInOutCubic',
            offset: 80 // Offset for fixed navbar
        };
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🧭 Initializing Navigation System...');
        
        try {
            // Core initializations
            this.cacheElements();
            this.calculateDimensions();
            this.initializeNavLinks();
            this.initializeScrollSpy();
            this.initializeSmoothScrolling();
            this.initializeMobileMenu();
            this.initializeNavbarEffects();
            
            // Event listeners
            this.setupEventListeners();
            
            // Set initial active state
            this.updateActiveLink();
            
            this.isInitialized = true;
            console.log('✅ Navigation System initialized successfully!');
            
        } catch (error) {
            console.error('❌ Navigation System initialization failed:', error);
        }
    }

    // ================================================================
    // ELEMENT CACHING AND SETUP
    // ================================================================
    
    cacheElements() {
        // Cache DOM elements
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.hamburger = document.getElementById('hamburger');
        this.logoText = document.querySelector('.logo-text');
        
        if (!this.navbar) {
            console.error('❌ Navbar element not found');
            return;
        }
        
        // Cache nav links and sections
        this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
        this.sections = Array.from(document.querySelectorAll('section[id]'));
        
        console.log(`✅ Cached ${this.navLinks.length} nav links and ${this.sections.length} sections`);
    }
    
    calculateDimensions() {
        if (!this.navbar) return;
        
        this.navHeight = this.navbar.offsetHeight;
        this.scrollSettings.offset = this.navHeight + 20; // Add some padding
        
        console.log(`📏 Navbar height: ${this.navHeight}px`);
    }

    // ================================================================
    // NAVIGATION LINKS INITIALIZATION
    // ================================================================
    
    initializeNavLinks() {
        console.log('🔗 Initializing navigation links...');
        
        this.navLinks.forEach(link => {
            this.setupNavLink(link);
        });
        
        console.log('✅ Navigation links initialized');
    }
    
    setupNavLink(link) {
        const href = link.getAttribute('href');
        const isExternalLink = link.classList.contains('external-link');
        const isHashLink = href && href.startsWith('#');
        
        // Handle different link types
        if (isExternalLink) {
            this.setupExternalLink(link);
        } else if (isHashLink) {
            this.setupInternalLink(link);
        }
        
        // Add hover effects
        this.addHoverEffects(link);
        
        // Add click tracking
        link.addEventListener('click', () => {
            this.trackNavClick(link);
        });
    }
    
    setupInternalLink(link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                this.smoothScrollToSection(targetSection);
                this.setActiveLink(link);
                this.closeMobileMenu();
            }
        });
    }
    
    setupExternalLink(link) {
        // Add external link indicator
        link.style.position = 'relative';
        
        // Handle external links (like certifications.html)
        link.addEventListener('click', (e) => {
            // Add loading state
            link.classList.add('loading');
            
            // Close mobile menu if open
            this.closeMobileMenu();
            
            // Add smooth transition effect
            this.addPageTransition(() => {
                window.location.href = link.getAttribute('href');
            });
            
            // Remove loading state after delay
            setTimeout(() => {
                link.classList.remove('loading');
            }, 1000);
        });
    }
    
    addHoverEffects(link) {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(-2px)';
                link.style.color = 'var(--primary-color)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = '';
                link.style.color = '';
            }
        });
    }

    // ================================================================
    // SMOOTH SCROLLING SYSTEM
    // ================================================================
    
    initializeSmoothScrolling() {
        console.log('🌊 Initializing smooth scrolling...');
        
        // Override default scroll behavior
        document.documentElement.style.scrollBehavior = 'auto';
        
        console.log('✅ Smooth scrolling initialized');
    }
    
    smoothScrollToSection(targetElement) {
        if (!targetElement || this.isScrolling) return;
        
        this.isScrolling = true;
        
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.offsetTop - this.scrollSettings.offset;
        const distance = targetPosition - startPosition;
        const duration = this.scrollSettings.duration;
        
        let startTime = null;
        
        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const easeProgress = this.easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                this.isScrolling = false;
                console.log(`✅ Smooth scroll completed to: ${targetElement.id}`);
            }
        };
        
        requestAnimationFrame(animateScroll);
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // ================================================================
    // SCROLL SPY SYSTEM
    // ================================================================
    
    initializeScrollSpy() {
        console.log('👁️ Initializing scroll spy...');
        
        // Use Intersection Observer for better performance
        const scrollSpyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                const navLink = document.querySelector(`[data-section="${sectionId}"]`);
                
                if (entry.isIntersecting) {
                    this.activeSection = sectionId;
                    if (navLink && !this.isScrolling) {
                        this.setActiveLink(navLink);
                    }
                }
            });
        }, {
            rootMargin: `-${this.scrollSettings.offset}px 0px -50% 0px`,
            threshold: 0.1
        });
        
        // Observe all sections
        this.sections.forEach(section => {
            scrollSpyObserver.observe(section);
        });
        
        this.observers.push(scrollSpyObserver);
        
        console.log('✅ Scroll spy initialized');
    }
    
    setActiveLink(activeLink) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            link.style.transform = '';
            link.style.color = '';
        });
        
        // Add active class to current link
        if (activeLink) {
            activeLink.classList.add('active');
            this.activeSection = activeLink.dataset.section;
            console.log(`🎯 Active section: ${this.activeSection}`);
        }
    }
    
    updateActiveLink() {
        const currentSection = this.getCurrentSection();
        const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
        
        if (activeLink) {
            this.setActiveLink(activeLink);
        }
    }
    
    getCurrentSection() {
        const scrollPosition = window.pageYOffset + this.scrollSettings.offset + 100;
        
        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            if (section.offsetTop <= scrollPosition) {
                return section.id;
            }
        }
        
        return 'hero'; // Default to hero section
    }

    // ================================================================
    // MOBILE MENU SYSTEM
    // ================================================================
    
    initializeMobileMenu() {
        if (!this.hamburger || !this.navMenu) return;
        
        console.log('📱 Initializing mobile menu...');
        
        // Hamburger click handler
        this.hamburger.addEventListener('click', this.toggleMobileMenu);
        
        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        console.log('✅ Mobile menu initialized');
    }
    
    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        if (!this.navMenu || !this.hamburger) return;
        
        this.isMobileMenuOpen = true;
        
        this.navMenu.classList.add('active');
        this.hamburger.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        const menuItems = this.navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
        
        console.log('📱 Mobile menu opened');
    }
    
    closeMobileMenu() {
        if (!this.navMenu || !this.hamburger || !this.isMobileMenuOpen) return;
        
        this.isMobileMenuOpen = false;
        
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Reset menu items
        const menuItems = this.navMenu.querySelectorAll('li');
        menuItems.forEach(item => {
            item.style.transition = '';
            item.style.opacity = '';
            item.style.transform = '';
        });
        
        console.log('📱 Mobile menu closed');
    }

    // ================================================================
    // NAVBAR EFFECTS
    // ================================================================
    
    initializeNavbarEffects() {
        console.log('✨ Initializing navbar effects...');
        
        // Navbar scroll effects
        this.setupScrollEffects();
        
        // Logo animation
        this.setupLogoAnimation();
        
        console.log('✅ Navbar effects initialized');
    }
    
    setupScrollEffects() {
        let ticking = false;
        
        const updateNavbar = () => {
            const currentScrollY = window.pageYOffset;
            
            // Add background when scrolled
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                // Scrolling down
                if (this.navbarVisible) {
                    this.navbar.classList.add('navbar-hidden');
                    this.navbarVisible = false;
                }
            } else {
                // Scrolling up
                if (!this.navbarVisible) {
                    this.navbar.classList.remove('navbar-hidden');
                    this.navbarVisible = true;
                }
            }
            
            this.lastScrollY = currentScrollY;
            ticking = false;
        };
        
        const requestNavbarUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
    }
    
    setupLogoAnimation() {
    if (!this.logoText) return;

    // Store original styles
    const originalText = this.logoText.textContent;
    const originalStyles = window.getComputedStyle(this.logoText);
    
    // Clear text for typing effect
    this.logoText.textContent = '';
    
    // Ensure visibility during typing
    this.logoText.style.opacity = '1';
    this.logoText.style.visibility = 'visible';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        this.logoText.textContent += originalText.charAt(i);
        i++;

        if (i >= originalText.length) {
            clearInterval(typeInterval);
            
            // FIXED: Keep text visible after typing
            setTimeout(() => {
                // Ensure text remains visible
                this.logoText.style.opacity = '1';
                this.logoText.style.visibility = 'visible';
                
                // Apply gradient background if defined in CSS
                this.logoText.style.background = 'var(--gradient-primary)';
                this.logoText.style.webkitBackgroundClip = 'text';
                this.logoText.style.webkitTextFillColor = 'transparent';
                this.logoText.style.backgroundClip = 'text';
                
                // Add subtle pulse effect (not animation that makes it disappear)
                this.logoText.classList.add('logo-visible');
                
                console.log('✅ Logo typing completed and remains visible');
            }, 200);
        }
    }, 120); // Slightly slower typing for better effect
}

    // ================================================================
    // PAGE TRANSITIONS
    // ================================================================
    
    addPageTransition(callback) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-primary);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(overlay);
        
        // Trigger transition
        setTimeout(() => {
            overlay.style.opacity = '0.9';
        }, 10);
        
        // Execute callback and remove overlay
        setTimeout(() => {
            if (callback) callback();
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            }, 200);
        }, 300);
    }

    // ================================================================
    // EVENT LISTENERS
    // ================================================================
    
    setupEventListeners() {
        // Scroll handling
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        
        // Resize handling
        window.addEventListener('resize', this.handleResize, { passive: true });
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
        
        console.log('✅ Navigation event listeners setup complete');
    }
    
    handleScroll() {
        clearTimeout(this.scrollTimeout);
        
        this.scrollTimeout = setTimeout(() => {
            if (!this.isScrolling) {
                this.updateActiveLink();
            }
        }, 100);
    }
    
    handleResize() {
        clearTimeout(this.resizeTimeout);
        
        this.resizeTimeout = setTimeout(() => {
            console.log('📱 Navigation responsive adjustment');
            
            // Recalculate dimensions
            this.calculateDimensions();
            
            // Close mobile menu if window becomes large
            if (window.innerWidth > 768 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        }, 250);
    }
    
    handleKeyboardNavigation(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            this.navbar.classList.add('keyboard-navigation');
            
            // Remove class after tab navigation ends
            setTimeout(() => {
                this.navbar.classList.remove('keyboard-navigation');
            }, 3000);
        }
        
        // Arrow key navigation
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const currentIndex = this.sections.findIndex(section => section.id === this.activeSection);
            let newIndex;
            
            if (e.key === 'ArrowUp') {
                newIndex = Math.max(0, currentIndex - 1);
            } else {
                newIndex = Math.min(this.sections.length - 1, currentIndex + 1);
            }
            
            const targetSection = this.sections[newIndex];
            if (targetSection) {
                this.smoothScrollToSection(targetSection);
            }
        }
    }

    // ================================================================
    // UTILITY FUNCTIONS
    // ================================================================
    
    trackNavClick(link) {
        const section = link.dataset.section || 'external';
        const href = link.getAttribute('href');
        
        console.log(`🔗 Navigation clicked: ${section} (${href})`);
        
        // Track with analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'navigation_click', {
                section: section,
                href: href
            });
        }
    }
    
    getCurrentActiveSection() {
        return this.activeSection;
    }
    
    scrollToTop() {
        this.smoothScrollToSection(document.getElementById('hero') || document.body);
    }
    
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ================================================================
    // PUBLIC API
    // ================================================================
    
    // Navigate to specific section programmatically
    navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (targetSection) {
            this.smoothScrollToSection(targetSection);
            
            if (targetLink) {
                this.setActiveLink(targetLink);
            }
        }
    }
    
    // Get navigation statistics
    getStats() {
        return {
            activeSection: this.activeSection,
            isMobileMenuOpen: this.isMobileMenuOpen,
            navbarVisible: this.navbarVisible,
            navHeight: this.navHeight,
            sectionsCount: this.sections.length,
            linksCount: this.navLinks.length
        };
    }
    
    // Destroy navigation system
    destroy() {
        console.log('🗑️ Destroying navigation system...');
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        
        // Disconnect observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        // Clear timeouts
        clearTimeout(this.scrollTimeout);
        clearTimeout(this.resizeTimeout);
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        this.isInitialized = false;
        console.log('✅ Navigation system destroyed');
    }
}

// ================================================================
// INITIALIZATION AND EXPORT
// ================================================================

// Initialize Navigation System
window.navigationManager = new NavigationManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}

// Global utility functions
window.navigateToSection = (sectionId) => {
    return window.navigationManager.navigateToSection(sectionId);
};

window.scrollToTop = () => {
    return window.navigationManager.scrollToTop();
};
