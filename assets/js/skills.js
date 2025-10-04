/**
 * ================================================================
 * SKILLS SECTION JAVASCRIPT - CLEAN VERSION 
 * NO POPUPS | RESPONSIVE FIXES | ENHANCED ANIMATIONS
 * Based on actual HTML structure provided
 * ================================================================ */

class SkillsSection {
    constructor() {
        this.isInitialized = false;
        this.animatedSkills = new Set();
        this.observers = [];
        
        // Responsive handling properties
        this.isResizing = false;
        this.resizeTimeout = null;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.refreshLayout = this.refreshLayout.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🎯 Initializing Skills Section (Clean Version)...');
        
        try {
            // Core initializations based on your HTML
            this.initializeSkillsOverview();
            this.initializeSkillCategories();
            this.initializeProgressBars(); 
            this.setupScrollAnimations();
            this.setupResponsiveHandling();
            
            this.isInitialized = true;
            console.log('✅ Skills Section initialized successfully!');
            
        } catch (error) {
            console.error('❌ Skills Section initialization failed:', error);
        }
    }

    // ================================================================
    // RESPONSIVE HANDLING - MOBILE TO DESKTOP FIX
    // ================================================================
    
    setupResponsiveHandling() {
        console.log('📱 Setting up Skills responsive handling...');
        window.addEventListener('resize', this.debounce(this.handleResize, 250));
        setTimeout(() => { this.handleResize(); }, 500);
    }
    
    handleResize() {
        if (this.isResizing) return;
        this.isResizing = true;
        console.log('📐 Handling skills resize...');
        
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        
        this.refreshLayout();
        this.refreshSkillAnimations();
        
        this.resizeTimeout = setTimeout(() => {
            this.isResizing = false;
        }, 300);
    }
    
    refreshLayout() {
        // Fix skills categories layout
        const skillsCategories = document.querySelectorAll('.skills-category');
        const skillsGrids = document.querySelectorAll('.skills-grid');
        
        skillsCategories.forEach(category => {
            category.style.transform = '';
            category.style.width = '';
            category.style.flexBasis = '';
            category.style.display = 'none';
            category.offsetHeight;
            category.style.display = '';
            category.style.transition = 'all 0.3s ease';
        });
        
        skillsGrids.forEach(grid => {
            grid.style.gridTemplateColumns = '';
            grid.style.gap = '';
            grid.style.display = 'none';
            grid.offsetHeight;
            grid.style.display = '';
        });
        
        // Fix skill items layout
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.style.transform = '';
            item.style.width = '';
            item.style.flexBasis = '';
            item.style.display = 'none';
            item.offsetHeight;
            item.style.display = '';
            item.style.transition = 'all 0.3s ease';
        });
        
        console.log('🔄 Skills layouts refreshed');
    }
    
    refreshSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            if (this.isElementVisible(item)) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                
                // Re-trigger progress bar animation
                const progressBar = item.querySelector('.progress-bar');
                if (progressBar && !progressBar.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        this.animateProgressBar(progressBar);
                        progressBar.setAttribute('data-animated', 'true');
                    }, 100);
                }
            }
        });
        
        // Refresh overview stats
        const overviewStats = document.querySelectorAll('.overview-stat');
        overviewStats.forEach(stat => {
            if (this.isElementVisible(stat)) {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
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
    // SKILLS OVERVIEW STATS ANIMATION
    // ================================================================
    
    initializeSkillsOverview() {
        const overviewSection = document.querySelector('.skills-overview');
        if (!overviewSection) return;
        
        console.log('📊 Initializing skills overview...');
        
        const overviewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOverviewStats();
                    overviewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        overviewObserver.observe(overviewSection);
        this.observers.push(overviewObserver);
        
        // Add hover effects to overview stats
        this.setupOverviewHoverEffects();
    }

    animateOverviewStats() {
        const overviewStats = document.querySelectorAll('.overview-stat');
        
        overviewStats.forEach((stat, index) => {
            // Set initial state
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(30px)';
            
            // Animate with stagger
            setTimeout(() => {
                stat.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
                
                // Add subtle bounce effect
                setTimeout(() => {
                    stat.style.transform = 'translateY(-5px)';
                    setTimeout(() => {
                        stat.style.transform = 'translateY(0)';
                    }, 100);
                }, 300);
                
            }, index * 150);
        });

        console.log('✅ Overview stats animated');
    }
    
    setupOverviewHoverEffects() {
        const overviewStats = document.querySelectorAll('.overview-stat');
        
        overviewStats.forEach(stat => {
            stat.addEventListener('mouseenter', () => {
                stat.style.transform = 'translateY(-10px) scale(1.05)';
                stat.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.3)';
                
                const icon = stat.querySelector('.stat-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.color = 'var(--primary-color)';
                }
            });
            
            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'translateY(0) scale(1)';
                stat.style.boxShadow = '';
                
                const icon = stat.querySelector('.stat-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.color = '';
                }
            });
        });
    }

    // ================================================================
    // SKILL CATEGORIES ANIMATION
    // ================================================================
    
    initializeSkillCategories() {
        const categories = document.querySelectorAll('.skills-category');
        
        categories.forEach((category, categoryIndex) => {
            this.setupCategoryAnimations(category, categoryIndex);
            this.setupCategoryHoverEffects(category);
        });
        
        console.log(`✅ Skill categories initialized: ${categories.length} categories`);
    }

    setupCategoryAnimations(category, categoryIndex) {
        const categoryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedSkills.has(category)) {
                    setTimeout(() => {
                        this.animateCategory(entry.target);
                        this.animatedSkills.add(category);
                    }, categoryIndex * 300);
                    categoryObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        categoryObserver.observe(category);
        this.observers.push(categoryObserver);
    }

    animateCategory(category) {
        // Animate category header
        const header = category.querySelector('.category-header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateX(-50px)';
            header.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                header.style.opacity = '1';
                header.style.transform = 'translateX(0)';
            }, 100);
        }

        // Animate skill items with enhanced stagger
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            // Set initial state
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.9)';
            
            setTimeout(() => {
                this.animateSkillItem(item);
            }, 400 + (index * 150));
        });

        console.log('✅ Category animated with skill items');
    }
    
    setupCategoryHoverEffects(category) {
        const categoryHeader = category.querySelector('.category-header');
        if (categoryHeader) {
            categoryHeader.addEventListener('mouseenter', () => {
                const icon = categoryHeader.querySelector('.category-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.3) rotate(15deg)';
                    icon.style.color = 'var(--primary-color)';
                }
                categoryHeader.style.transform = 'translateX(10px)';
            });
            
            categoryHeader.addEventListener('mouseleave', () => {
                const icon = categoryHeader.querySelector('.category-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.color = '';
                }
                categoryHeader.style.transform = 'translateX(0)';
            });
        }
    }

    // ================================================================
    // PROGRESS BARS SYSTEM
    // ================================================================
    
    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const skillItem = bar.closest('.skill-item');
            if (skillItem) {
                this.setupProgressBarAnimation(bar, skillItem);
            }
        });
        
        console.log(`✅ Progress bars initialized: ${progressBars.length} bars`);
    }

    setupProgressBarAnimation(progressBar, skillItem) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !progressBar.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        this.animateProgressBar(progressBar);
                        progressBar.setAttribute('data-animated', 'true');
                    }, Math.random() * 500);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressObserver.observe(skillItem);
        this.observers.push(progressObserver);
    }

    animateProgressBar(progressBar) {
        const width = progressBar.getAttribute('data-width') || '0';
        const finalWidth = parseInt(width);

        // Reset and animate
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            progressBar.style.width = `${finalWidth}%`;
            
            // Add glow effect during animation
            progressBar.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
            setTimeout(() => {
                progressBar.style.boxShadow = '';
            }, 1500);
        }, 200);

        console.log(`📊 Progress bar animated: ${finalWidth}%`);
    }

    // ================================================================
    // SKILL ITEMS ENHANCED ANIMATION
    // ================================================================
    
    animateSkillItem(skillItem) {
        skillItem.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        skillItem.style.opacity = '1';
        skillItem.style.transform = 'translateY(0) scale(1)';

        // Setup enhanced hover effects
        this.setupSkillItemHoverEffects(skillItem);

        // Animate progress bar if present
        const progressBar = skillItem.querySelector('.progress-bar');
        if (progressBar && !progressBar.hasAttribute('data-animated')) {
            setTimeout(() => {
                this.animateProgressBar(progressBar);
                progressBar.setAttribute('data-animated', 'true');
            }, 500);
        }
        
        // Animate internal elements
        this.animateSkillItemElements(skillItem);
    }
    
    setupSkillItemHoverEffects(skillItem) {
        skillItem.addEventListener('mouseenter', () => {
            skillItem.style.transform = 'translateY(-10px) scale(1.03)';
            skillItem.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
            
            // Animate skill icon
            const skillIcon = skillItem.querySelector('.skill-icon i');
            if (skillIcon) {
                skillIcon.style.transform = 'scale(1.2) rotate(10deg)';
                skillIcon.style.color = 'var(--primary-color)';
            }
            
            // Animate progress bar
            const progressBar = skillItem.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.boxShadow = '0 0 25px rgba(102, 126, 234, 0.6)';
                progressBar.style.transform = 'scaleY(1.2)';
            }
            
            // Animate experience tag
            const experienceTag = skillItem.querySelector('.skill-experience');
            if (experienceTag) {
                experienceTag.style.transform = 'scale(1.1)';
                experienceTag.style.background = 'var(--gradient-primary)';
                experienceTag.style.color = 'white';
            }
        });

        skillItem.addEventListener('mouseleave', () => {
            skillItem.style.transform = 'translateY(0) scale(1)';
            skillItem.style.boxShadow = '';
            
            const skillIcon = skillItem.querySelector('.skill-icon i');
            if (skillIcon) {
                skillIcon.style.transform = 'scale(1) rotate(0deg)';
                skillIcon.style.color = '';
            }
            
            const progressBar = skillItem.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.boxShadow = '';
                progressBar.style.transform = 'scaleY(1)';
            }
            
            const experienceTag = skillItem.querySelector('.skill-experience');
            if (experienceTag) {
                experienceTag.style.transform = 'scale(1)';
                experienceTag.style.background = '';
                experienceTag.style.color = '';
            }
        });
    }
    
    animateSkillItemElements(skillItem) {
        // Animate skill icon
        const skillIcon = skillItem.querySelector('.skill-icon');
        if (skillIcon) {
            skillIcon.style.opacity = '0';
            skillIcon.style.transform = 'scale(0.5)';
            skillIcon.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                skillIcon.style.opacity = '1';
                skillIcon.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Animate skill info
        const skillInfo = skillItem.querySelector('.skill-info h4');
        if (skillInfo) {
            skillInfo.style.opacity = '0';
            skillInfo.style.transform = 'translateX(-20px)';
            skillInfo.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                skillInfo.style.opacity = '1';
                skillInfo.style.transform = 'translateX(0)';
            }, 400);
        }
        
        // Animate experience tag
        const experienceTag = skillItem.querySelector('.skill-experience');
        if (experienceTag) {
            experienceTag.style.opacity = '0';
            experienceTag.style.transform = 'translateY(20px)';
            experienceTag.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                experienceTag.style.opacity = '1';
                experienceTag.style.transform = 'translateY(0)';
            }, 600);
        }
    }

    // ================================================================
    // SECTION HEADER ANIMATION
    // ================================================================
    
    setupScrollAnimations() {
        const sectionHeader = document.querySelector('#skills .section-header');
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

        console.log('✅ Scroll animations setup complete');
    }

    animateSectionHeader() {
        const title = document.querySelector('#skills .section-title');
        const subtitle = document.querySelector('#skills .section-subtitle');

        [title, subtitle].forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // ================================================================
    // UTILITY METHODS
    // ================================================================
    
    trackEvent(eventName, eventData = {}) {
        console.log(`📊 Skills Event tracked: ${eventName}`, eventData);
    }

    refreshSkills() {
        console.log('🔄 Refreshing skills display...');
        this.refreshSkillAnimations();
    }

    destroy() {
        console.log('🗑️ Destroying Skills Section...');
        window.removeEventListener('resize', this.handleResize);
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        this.animatedSkills.clear();
        this.isInitialized = false;
    }
}

// ================================================================
// INITIALIZATION
// ================================================================

// Initialize Skills Section
window.skillsSection = new SkillsSection();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillsSection;
}

console.log('🎯 Clean Skills System loaded successfully (NO POPUPS)');
