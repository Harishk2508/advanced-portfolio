/**
 * ================================================================
 * HARISH K - SINGLE PAGE PORTFOLIO JAVASCRIPT
 * FIXED: Auto-Refreshing LeetCode Stats + Responsive Number Issues
 * ================================================================
 */

// ADDED: Utility function to check if form input is focused
function isFormInputFocused() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}

class SinglePagePortfolio {
    constructor() {
        this.sections = ['hero', 'about', 'projects', 'skills', 'contact'];
        this.currentSection = 0;
        this.isScrolling = false;
        this.lastScrollTime = 0;
        this.scrollThreshold = 1000;
        
        // FIXED: Exact stats data for synchronization
        this.statsData = {
            leetcode: 644, // FIXED: Correct number
            events: 12,    // FIXED: Correct number
            cgpa: 8.6,
            projects: 10
        };
        
        // Responsive handler
        this.handleResize = this.handleResize.bind(this);
        this.isResizing = false;
        
        this.init();
    }


    init() {
        console.log('🚀 Initializing Single Page Portfolio...');
        
        // IMMEDIATELY fix the name issue on load
        setTimeout(() => {
            this.fixNameDisplayImmediate();
        }, 100);
        
        // Hide loading screen
        this.hideLoadingScreen();
        
        // Initialize all components
        this.initializeNavigation();
        this.initializeScrolling();
        this.initializeSectionObserver();
        this.initializeBackToTop();
        
        // Show all sections
        this.showAllSections();
        
        // Auto-load dynamic stats data on every page refresh
        this.autoLoadStatsOnPageLoad();
        
        // Initialize section-specific functionality
        this.initializeAllSections();
        
        // Initialize animations
        this.initializeScrollAnimations();
        
        // FIXED: Setup responsive handling
        this.setupResponsiveHandling();
        
        console.log('✅ Single Page Portfolio initialized successfully!');
    }


    // ================================================================
    // FIXED: RESPONSIVE HANDLING SYSTEM
    // ================================================================
    
    setupResponsiveHandling() {
        console.log('📱 Setting up responsive handling...');
        
        // Debounced resize handler
        window.addEventListener('resize', this.debounce(this.handleResize, 250));
        
        // Force initial layout check
        setTimeout(() => {
            this.handleResize();
        }, 500);
    }
    
    handleResize() {
        if (this.isResizing) return;
        
        this.isResizing = true;
        console.log('📐 Handling window resize...');
        
        // Re-trigger animations for visible elements
        this.refreshVisibleAnimations();
        
        // Re-calculate layouts
        this.refreshLayoutCalculations();
        
        setTimeout(() => {
            this.isResizing = false;
        }, 300);
    }
    
    refreshVisibleAnimations() {
        // Re-animate stats that are currently visible
        const heroStats = document.querySelector('.hero-stats');
        const aboutStats = document.querySelector('.stats-showcase');
        
        if (this.isElementVisible(heroStats)) {
            console.log('🔄 Re-animating hero stats on resize');
            this.animateHeroStatsWithAutoData();
        }
        
        if (this.isElementVisible(aboutStats)) {
            console.log('🔄 Re-animating about stats on resize');
            this.initializeAboutStats();
        }
    }
    
    refreshLayoutCalculations() {
        // Force re-calculation of any cached dimensions
        const projectCards = document.querySelectorAll('.project-card');
        const skillItems = document.querySelectorAll('.skill-item');
        
        projectCards.forEach(card => {
            card.style.transform = '';
            card.style.transition = 'all 0.3s ease';
        });
        
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress-bar');
            if (progressBar) {
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = `${width}%`;
            }
        });
    }
    
    isElementVisible(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }


    // ================================================================
    // AUTO-REFRESH STATS ON PAGE LOAD
    // ================================================================
    
    async autoLoadStatsOnPageLoad() {
        try {
            console.log('🔄 Auto-refreshing LeetCode stats on page load...');
            
            // Show loading indicator in description text
            this.showInlineLoading();
            
            // Try to fetch live LeetCode data if API is available
            if (window.leetCodeAPI) {
                try {
                    const leetCodeStats = await window.leetCodeAPI.fetchLeetCodeStats();
                    if (leetCodeStats && leetCodeStats.totalSolved) {
                        this.statsData.leetcode = leetCodeStats.totalSolved;
                        console.log(`✅ Auto-updated LeetCode count to: ${this.statsData.leetcode}`);
                        
                        // Update the description text with new count
                        this.updateDescriptionText();
                        
                        // Show success message briefly
                        setTimeout(() => {
                            this.showMessage('🔄 LeetCode stats auto-updated!', 'info');
                        }, 2000);
                    }
                } catch (error) {
                    console.warn('Failed to fetch live LeetCode data:', error);
                    this.updateDescriptionText(); // Still update with fallback data
                }
            } else {
                this.updateDescriptionText(); // Update with static data
            }
        } catch (error) {
            console.error('Error auto-loading stats data:', error);
            this.updateDescriptionText(); // Fallback update
        }
    }
    
    showInlineLoading() {
        const descriptionElement = document.querySelector('.hero-description');
        if (descriptionElement) {
            // Temporarily show loading state
            const originalHTML = descriptionElement.innerHTML;
            descriptionElement.innerHTML = originalHTML.replace(
                /\d+\+? LeetCode problems solved/g,
                '🔄 Updating LeetCode problems'
            );
            
            // Store original HTML for restoration
            this.originalDescriptionHTML = originalHTML;
        }
    }
    
    updateDescriptionText() {
        const descriptionElement = document.querySelector('.hero-description');
        if (descriptionElement) {
            // FIXED: Update description with EXACT stats
            const updatedDescription = `
                Tech Trainee at <strong class="company-highlight">ZEAI Soft</strong>,
                passionate about creating intelligent solutions with Machine Learning,
                Natural Language Processing, and Deep Learning technologies.
                ${this.statsData.leetcode} LeetCode problems solved and
                ${this.statsData.events}+ competitions won with expertise in medical AI and research.
            `;
            descriptionElement.innerHTML = updatedDescription;
            console.log(`📝 Description updated with LeetCode count: ${this.statsData.leetcode}`);
        }
    }


    // ================================================================
    // IMMEDIATE NAME FIX
    // ================================================================
    
    fixNameDisplayImmediate() {
        const nameElement = document.querySelector('.typing-animation');
        const nameParent = document.querySelector('.name');
        
        console.log('🔧 Fixing name display...');
        
        if (nameElement) {
            nameElement.innerHTML = '';
            nameElement.textContent = '';
            nameElement.style.animation = 'none';
            nameElement.style.opacity = '1';
            nameElement.style.transform = 'translateY(0)';
            nameElement.textContent = 'Harish K';
            
            console.log('✅ Name fixed to: "Harish K"');
            
            setTimeout(() => {
                this.startCleanTypingAnimation();
            }, 2000);
        }
        
        if (nameParent) {
            nameParent.style.opacity = '1';
            nameParent.style.transform = 'translateY(0)';
        }
    }
    
    startCleanTypingAnimation() {
        const nameElement = document.querySelector('.typing-animation');
        if (!nameElement) return;
        
        const correctName = 'Harish K';
        nameElement.textContent = '';
        nameElement.classList.add('typing-active');
        
        let index = 0;
        const typeCharacter = () => {
            if (index < correctName.length) {
                nameElement.textContent = correctName.substring(0, index + 1);
                index++;
                setTimeout(typeCharacter, 120);
            } else {
                setTimeout(() => {
                    nameElement.classList.remove('typing-active');
                }, 2000);
            }
        };
        typeCharacter();
    }


    // ================================================================
    // SHOW ALL SECTIONS
    // ================================================================
    
    showAllSections() {
        const allSections = document.querySelectorAll('.section-container');
        allSections.forEach(section => {
            section.style.display = 'block';
            section.style.minHeight = '100vh';
            section.classList.add('active');
        });
    }


    // ================================================================
    // FIXED NAVIGATION SYSTEM
    // ================================================================
    
    initializeNavigation() {
        console.log('🔧 Initializing Navigation...');
        
        const navLinks = document.querySelectorAll('.nav-link');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        console.log('Found nav links:', navLinks.length);
        
        navLinks.forEach((link, index) => {
            const sectionName = link.getAttribute('data-section');
            const href = link.getAttribute('href');
            
            console.log(`Setting up nav link ${index}:`, sectionName, href);
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // ADDED: Guard against scroll when input is focused
                if (isFormInputFocused()) return;
                
                console.log(`🎯 Nav clicked: ${sectionName}`);
                
                let targetSection = sectionName;
                if (!targetSection && href) {
                    targetSection = href.replace('#', '');
                }
                
                if (targetSection) {
                    const targetElement = document.getElementById(targetSection);
                    if (targetElement) {
                        console.log(`📍 Scrolling to: ${targetSection}`);
                        this.updateNavigation(targetSection);
                        
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        const sectionIndex = this.sections.indexOf(targetSection);
                        if (sectionIndex !== -1) {
                            this.currentSection = sectionIndex;
                        }
                        
                        this.closeMobileMenu();
                    } else {
                        console.warn(`❌ Section not found: ${targetSection}`);
                    }
                }
            });
        });
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMobileMenu();
            }
        });
        
        console.log('✅ Navigation initialized');
    }
    
    updateNavigation(activeSection) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
            if (linkSection === activeSection) {
                link.classList.add('active');
                console.log(`✅ Nav updated - active: ${activeSection}`);
            }
        });
    }
    
    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }


    // ================================================================
    // SCROLL FUNCTIONALITY
    // ================================================================
    
    initializeScrolling() {
        document.addEventListener('keydown', (e) => {
            // Only trigger section scroll if NOT focused in an input, textarea, or contenteditable
            const tag = e.target.tagName.toLowerCase();
            const isTextInput = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
            if (isTextInput) {
                return; // Let the user type space/newlines etc!
            }
            if (e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                this.scrollToNextSection();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.scrollToPreviousSection();
            }
        });
    }
    
    scrollToNextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.currentSection++;
            this.scrollToSection(this.currentSection);
        }
    }
    
    scrollToPreviousSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.scrollToSection(this.currentSection);
        }
    }
    
    scrollToSection(index) {
        // ADDED: Guard against scroll when input is focused
        if (isFormInputFocused()) return;
        
        if (index < 0 || index >= this.sections.length || this.isScrolling) {
            return;
        }
        
        this.isScrolling = true;
        this.currentSection = index;
        const targetSection = document.getElementById(this.sections[index]);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            this.updateNavigation(this.sections[index]);
            
            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);
        }
    }


    // ================================================================
    // SECTION OBSERVER
    // ================================================================
    
    initializeSectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const sectionIndex = this.sections.indexOf(sectionId);
                    if (sectionIndex !== -1) {
                        this.currentSection = sectionIndex;
                        this.updateNavigation(sectionId);
                    }
                }
            });
        }, observerOptions);
        
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
            }
        });
    }


    // ================================================================
    // SECTION INITIALIZATIONS
    // ================================================================
    
    initializeAllSections() {
        this.initializeHero();
        this.initializeAbout();
        this.initializeProjects();
        this.initializeSkills();
        this.initializeContact();
    }
    
    initializeHero() {
        console.log('🎯 Initializing Hero section...');
        this.initializeVisitorCounter();
        this.setupHeroButtons();
        this.initializeHeroStats();
    }
    
    initializeAbout() {
        console.log('📖 Initializing About section...');
        this.initializeTimeline();
        this.initializeAboutStats();
    }
    
    initializeProjects() {
        console.log('💼 Initializing Projects section...');
        this.initializeProjectFilters();
        this.initializeProjectAnimations();
    }
    
    initializeSkills() {
        console.log('🛠️ Initializing Skills section...');
        this.initializeSkillBars();
    }
    
    initializeContact() {
        console.log('📧 Initializing Contact section...');
        this.initializeContactForm();
    }


    // ================================================================
    // HERO SECTION FUNCTIONS (SIMPLIFIED - NO REFRESH BUTTON)
    // ================================================================
    
    initializeVisitorCounter() {
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            let count = localStorage.getItem('portfolio-visitors') || 1247;
            count = parseInt(count) + Math.floor(Math.random() * 3) + 1;
            localStorage.setItem('portfolio-visitors', count);
            this.animateNumber(counterElement, 0, count, 2000);
        }
    }
    
    setupHeroButtons() {
        // Navigation buttons
        const navButtons = document.querySelectorAll('[data-navigate]');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // ADDED: Guard against scroll when input is focused
                if (isFormInputFocused()) return;
                
                const target = button.getAttribute('data-navigate');
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    this.updateNavigation(target);
                }
            });
        });
        
        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                // ADDED: Guard against scroll when input is focused
                if (isFormInputFocused()) return;
                
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
        
        console.log('📝 Refresh button removed - stats auto-update on page load');
    }


    // ================================================================
    // FIXED: HERO STATS (AUTO-UPDATED DATA WITH CORRECT NUMBERS)
    // ================================================================
    
    async initializeHeroStats() {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateHeroStatsWithAutoData();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(heroStats);
        }
    }
    
    animateHeroStatsWithAutoData() {
        console.log('📊 Animating Hero stats with EXACT auto-updated data:', this.statsData);
        
        // FIXED: Use exact numbers
        const values = [
            this.statsData.leetcode, // 644 (exact)
            this.statsData.events,   // 12 (exact)
            this.statsData.cgpa,     // 8.6 (exact)
            this.statsData.projects  // 10 (exact)
        ];
        
        // Hero section keeps + signs for LeetCode and Events only
        const suffixes = ['+', '+', '', '+'];
        const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
        
        // FIXED: Animate each stat with proper completion
        statNumbers.forEach((stat, index) => {
            if (values[index] !== undefined) {
                setTimeout(() => {
                    // Clear any existing content
                    stat.textContent = '0';
                    
                    // Start animation
                    this.animateNumberComplete(stat, 0, values[index], 2000, suffixes[index]);
                    
                }, index * 200);
            }
        });
        
        // Update timestamp
        this.updateStatsTimestamp('hero', 'auto-updated');
    }


    // ================================================================
    // FIXED: ABOUT SECTION FUNCTIONS (EXACT NUMBERS)
    // ================================================================
    
    initializeTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, index * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(item);
        });
    }
    
    initializeAboutStats() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            this.animateAboutStatCard(card, index);
                        }, index * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(card);
        });
    }
    
    animateAboutStatCard(card, index) {
        const progressBar = card.querySelector('.progress-bar');
        const statNumber = card.querySelector('.stat-number');
        
        if (progressBar) {
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = `${width}%`;
        }
        
        if (statNumber) {
            // FIXED: Use exact auto-updated stats data - NO PLUS SIGNS for About section
            const values = [
                this.statsData.leetcode, // 644 (exact number, auto-updated)
                this.statsData.events,   // 12 (exact number)
                this.statsData.cgpa,     // 8.6 (exact number)  
                this.statsData.projects  // 10 (exact number)
            ];
            
            // NO SUFFIXES for About section - show exact real numbers
            const suffixes = ['', '', '', '']; // All empty - no plus signs
            const targetValue = values[index];
            
            if (targetValue !== undefined) {
                console.log(`📊 Animating About stat ${index}: ${targetValue} (exact auto-updated number)`);
                
                // Clear existing content
                statNumber.textContent = '0';
                
                // Animate with exact number
                this.animateNumberComplete(statNumber, 0, targetValue, 2000, '');
            }
        }
        
        // Update timestamp for about section
        this.updateStatsTimestamp('about', 'auto-updated');
    }


    // ================================================================
    // PROJECTS SECTION FUNCTIONS
    // ================================================================
    
    initializeProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    initializeProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(card);
        });
    }


    // ================================================================
    // FIXED: SKILLS SECTION FUNCTIONS
    // ================================================================
    
    initializeSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            const progressBar = entry.target.querySelector('.progress-bar');
                            if (progressBar) {
                                const width = progressBar.getAttribute('data-width');
                                // FIXED: Ensure proper animation
                                progressBar.style.transition = 'width 1s ease-out';
                                progressBar.style.width = `${width}%`;
                            }
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(item);
        });
    }


    // ================================================================
    // CONTACT SECTION FUNCTIONS
    // ================================================================
    
    initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm);
            });
        }
    }
    
    handleFormSubmit(form) {
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            this.showMessage('Message sent successfully!', 'success');
            form.reset();
        }, 2000);
    }


    // ================================================================
    // UTILITY FUNCTIONS
    // ================================================================
    
    showMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            info: '#2196f3'
        };
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.success};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                messageDiv.remove();
            }, 500);
        }, 3000);
    }
    
    updateStatsTimestamp(section, type = 'static') {
        const sectionElement = section === 'hero' 
            ? document.querySelector('.hero-stats')
            : document.querySelector('.stats-showcase');
            
        if (sectionElement) {
            let timestamp = sectionElement.querySelector(`.stats-timestamp-${section}`);
            if (!timestamp) {
                timestamp = document.createElement('div');
                timestamp.className = `stats-timestamp stats-timestamp-${section}`;
                timestamp.style.cssText = `
                    position: absolute;
                    bottom: -20px;
                    right: 0;
                    font-size: 10px;
                    color: var(--text-muted);
                    opacity: 0.7;
                    animation: fadeIn 0.5s ease;
                `;
                sectionElement.style.position = 'relative';
                sectionElement.appendChild(timestamp);
            }
            
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const typeLabel = type === 'auto-updated' ? '🔄 Auto-Updated' : '📊 Static';
            timestamp.textContent = `${typeLabel} • ${timeString}`;
        }
    }
    
    initializeScrollAnimations() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        document.querySelectorAll('.fade-in').forEach(el => {
            animationObserver.observe(el);
        });
    }
    
    hideLoadingScreen() {
        const loadingContainer = document.getElementById('loading');
        if (loadingContainer) {
            loadingContainer.style.opacity = '0';
            setTimeout(() => {
                loadingContainer.style.display = 'none';
            }, 500);
        }
    }
    
    initializeBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > window.innerHeight) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            backToTop.addEventListener('click', () => {
                // ADDED: Guard against scroll when input is focused
                if (isFormInputFocused()) return;
                
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    heroSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }


    // ================================================================
    // FIXED: NUMBER ANIMATION WITH GUARANTEED COMPLETION
    // ================================================================
    animateNumberComplete(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const range = end - start;
        const isDecimal = end % 1 !== 0;
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Ensure max is 1
            
            // Smooth easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * easeOut);
            
            if (progress < 1) {
                // Still animating
                if (isDecimal) {
                    element.textContent = current.toFixed(1) + suffix;
                } else {
                    element.textContent = Math.round(current) + suffix;
                }
                requestAnimationFrame(updateNumber);
            } else {
                // CRITICAL: Animation complete - FORCE exact final value
                if (isDecimal) {
                    element.textContent = end.toFixed(1) + suffix;
                } else {
                    element.textContent = end + suffix;
                }
                console.log(`✅ Animation complete - EXACT VALUE: ${element.textContent}`);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    // Legacy method for compatibility
    animateNumber(element, start, end, duration) {
        this.animateNumberComplete(element, start, end, duration, '');
    }
}


// ================================================================
// INITIALIZATION
// ================================================================


let portfolio;


document.addEventListener('DOMContentLoaded', () => {
    portfolio = new SinglePagePortfolio();
});


window.addEventListener('load', () => {
    console.log('All resources loaded - Portfolio ready!');
});


window.portfolio = portfolio;


// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 0.7; }
    }
`;
document.head.appendChild(style);
