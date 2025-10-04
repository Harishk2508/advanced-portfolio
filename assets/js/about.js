/**
 * ================================================================
 * ABOUT SECTION JAVASCRIPT - UNIFIED WITH MAIN.JS
 * Timeline, stats, and story animations - ALWAYS WORKS
 * ================================================================ */

class AboutSection {
    constructor() {
        this.timelineItems = [];
        this.statsAnimated = false;
        this.timelineAnimated = false;
        this.statsObserver = null;
        
        // FIXED: Get stats data from main.js
        this.getStatsData();
        
        this.init();
    }
    
    // FIXED: Sync with main.js stats data
    getStatsData() {
        if (window.portfolio && window.portfolio.statsData) {
            this.statsData = window.portfolio.statsData;
            console.log('📊 About section synced with main.js stats:', this.statsData);
        } else {
            // Fallback data matching main.js
            this.statsData = {
                leetcode: 644, // From main.js
                events: 12,
                cgpa: 8.6,
                projects: 10
            };
            console.log('📊 About section using fallback stats:', this.statsData);
        }
    }
    
    init() {
        this.initializeTimeline();
        this.initializeStatsCards();
        this.initializeScrollAnimations();
        this.initializeHighlightEffects();
        
        console.log('📖 About section initialized with unified system');
    }
    
    // ================================================================
    // TIMELINE ANIMATIONS (UNCHANGED)
    // ================================================================
    
    initializeTimeline() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        if (this.timelineItems.length === 0) return;
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.timelineAnimated) {
                    this.animateTimeline();
                    this.timelineAnimated = true;
                }
            });
        }, { threshold: 0.2 });
        
        const timelineContainer = document.querySelector('.timeline-container');
        if (timelineContainer) {
            timelineObserver.observe(timelineContainer);
        }
        
        this.addTimelineInteractions();
    }
    
    animateTimeline() {
        this.timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                
                if (item.classList.contains('milestone')) {
                    this.addMilestoneEffects(item);
                }
                
                this.animateAchievements(item);
            }, index * 300);
        });
        
        this.animateTimelineLine();
    }
    
    animateTimelineLine() {
        setTimeout(() => {
            this.addTimelineLineGlow();
        }, 1000);
    }
    
    addTimelineLineGlow() {
        const style = document.createElement('style');
        style.textContent = `
            .timeline-container::before {
                animation: timelineGlow 3s ease-in-out infinite alternate;
            }
            
            @keyframes timelineGlow {
                from { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
                to { box-shadow: 0 0 15px rgba(102, 126, 234, 0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    addMilestoneEffects(milestoneItem) {
        const dot = milestoneItem.querySelector('.timeline-dot');
        if (dot) {
            dot.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            dot.style.animation = 'milestoneGlow 2s ease-in-out infinite alternate';
        }
        
        this.createConfettiEffect(milestoneItem);
    }
    
    createConfettiEffect(element) {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
        const confettiCount = 20;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                const rect = element.getBoundingClientRect();
                confetti.style.left = `${rect.left + Math.random() * rect.width}px`;
                confetti.style.top = `${rect.top + Math.random() * rect.height}px`;
                
                document.body.appendChild(confetti);
                
                confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(-100px) rotate(720deg)`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
                }).onfinish = () => {
                    confetti.remove();
                };
            }, i * 50);
        }
    }
    
    animateAchievements(timelineItem) {
        const achievements = timelineItem.querySelectorAll('.achievement');
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                achievement.style.opacity = '1';
                achievement.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
    
    addTimelineInteractions() {
        this.timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            
            content.addEventListener('mouseenter', () => {
                content.style.transform = 'translateX(10px) scale(1.02)';
                content.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
            });
            
            content.addEventListener('mouseleave', () => {
                content.style.transform = 'translateX(5px) scale(1)';
                content.style.boxShadow = '';
            });
            
            content.addEventListener('click', () => {
                this.showTimelineDetails(item);
            });
        });
    }
    
    showTimelineDetails(item) {
        const year = item.querySelector('.timeline-year')?.textContent;
        const title = item.querySelector('h4')?.textContent;
        console.log(`Timeline item clicked: ${year} - ${title}`);
    }
    
    // ================================================================
    // FIXED: STATS CARDS - UNIFIED WITH MAIN.JS SYSTEM
    // ================================================================
    
    initializeStatsCards() {
        const statsSection = document.querySelector('.stats-showcase');
        if (!statsSection) return;
        
        // FIXED: Create persistent observer that always re-animates
        if (this.statsObserver) {
            this.statsObserver.disconnect();
        }
        
        this.statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('📊 About stats in view - animating with main.js data...');
                    // FIXED: Always get fresh data from main.js and animate
                    this.getStatsData(); // Refresh data
                    this.animateStatsCards();
                } else {
                    console.log('📊 About stats out of view - preparing for next animation...');
                    // FIXED: Reset for next visit
                    this.resetStatsForNextVisit();
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px'
        });
        
        this.statsObserver.observe(statsSection);
        this.addStatsInteractions();
    }
    
    // FIXED: Reset stats for next visit
    resetStatsForNextVisit() {
        const statNumbers = document.querySelectorAll('.stat-card .stat-number');
        statNumbers.forEach(num => {
            num.textContent = '0';
        });
        
        const progressBars = document.querySelectorAll('.stat-card .progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }
    
    // FIXED: Use main.js animation system
    animateStatsCards() {
        console.log('🎬 Animating About stats with unified system...', this.statsData);
        
        const statCards = document.querySelectorAll('.stat-card');
        
        // Reset all elements first
        statCards.forEach(card => {
            const progressBar = card.querySelector('.progress-bar');
            const statNumber = card.querySelector('.stat-number');
            
            if (progressBar) {
                progressBar.style.width = '0%';
            }
            if (statNumber) {
                statNumber.textContent = '0';
            }
        });
        
        // Animate each card
        statCards.forEach((card, index) => {
            setTimeout(() => {
                this.animateStatCard(card, index);
            }, index * 200);
        });
    }
    
    // FIXED: Individual card animation with main.js data
    animateStatCard(card, index) {
        console.log(`📊 Animating About stat card ${index + 1}...`);
        
        // Animate progress bar
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            const width = progressBar.getAttribute('data-width');
            setTimeout(() => {
                progressBar.style.transition = 'width 1s ease-out';
                progressBar.style.width = `${width}%`;
            }, 300);
        }
        
        // Animate number with exact main.js values
        const statNumber = card.querySelector('.stat-number');
        if (statNumber) {
            let targetValue = 0;
            
            // FIXED: Use exact values from main.js statsData
            if (card.classList.contains('leetcode-card')) {
                targetValue = this.statsData.leetcode; // 644 from main.js
            } else if (card.classList.contains('events-card')) {
                targetValue = this.statsData.events; // 12 from main.js
            } else if (card.classList.contains('cgpa-card')) {
                targetValue = this.statsData.cgpa; // 8.6 from main.js
            } else if (card.classList.contains('projects-card')) {
                targetValue = this.statsData.projects; // 10 from main.js
            }
            
            if (targetValue > 0) {
                console.log(`🔢 About card ${index}: animating to ${targetValue}`);
                
                // FIXED: Use main.js animation method
                if (window.portfolio && window.portfolio.animateNumberComplete) {
                    window.portfolio.animateNumberComplete(statNumber, 0, targetValue, 2000, '');
                } else {
                    // Fallback animation
                    this.animateNumberFallback(statNumber, 0, targetValue, 2000);
                }
            }
        }
    }
    
    // FIXED: Fallback animation matching main.js logic
    animateNumberFallback(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;
        const isDecimal = end % 1 !== 0;
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Same easing as main.js
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * easeOut);
            
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Ensure final value is exact
                element.textContent = isDecimal ? end.toFixed(1) : end;
                console.log(`✅ About animation complete: ${element.textContent}`);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }
    
    addStatsInteractions() {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.03)';
                
                if (card.classList.contains('leetcode-card')) {
                    card.style.boxShadow = '0 20px 50px rgba(255, 161, 22, 0.3)';
                } else if (card.classList.contains('events-card')) {
                    card.style.boxShadow = '0 20px 50px rgba(255, 215, 0, 0.3)';
                } else if (card.classList.contains('cgpa-card')) {
                    card.style.boxShadow = '0 20px 50px rgba(76, 175, 80, 0.3)';
                } else if (card.classList.contains('projects-card')) {
                    card.style.boxShadow = '0 20px 50px rgba(233, 30, 99, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
            
            card.addEventListener('click', () => {
                this.showStatDetails(card);
            });
        });
    }
    
    showStatDetails(card) {
        let details = '';
        
        if (card.classList.contains('leetcode-card')) {
            details = 'LeetCode Problems: Data Structures, Algorithms, Dynamic Programming';
        } else if (card.classList.contains('events-card')) {
            details = 'Technical Competitions: AI Hackathons, Project Expos, Coding Contests';
        } else if (card.classList.contains('cgpa-card')) {
            details = 'Academic Performance: Computer Science Engineering, Kingston College';
        } else if (card.classList.contains('projects-card')) {
            details = 'Major Projects: AI/ML, Web Development, Research Publications';
        }
        
        console.log('Stat card clicked:', details);
    }
    
    // ================================================================
    // SCROLL ANIMATIONS (UNCHANGED)
    // ================================================================
    
    initializeScrollAnimations() {
        const storyParagraphs = document.querySelectorAll('.story-content p');
        
        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        storyParagraphs.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(30px)';
            p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            storyObserver.observe(p);
        });
        
        this.initializeHighlightAnimations();
    }
    
    initializeHighlightAnimations() {
        const highlights = document.querySelectorAll('.highlight');
        
        highlights.forEach(highlight => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateHighlight(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(highlight);
        });
    }
    
    animateHighlight(element) {
        const underline = element.querySelector('::after') || element;
        underline.style.animation = 'highlightGlow 2s ease-in-out infinite alternate';
        
        setTimeout(() => {
            this.addSparkleEffect(element);
        }, 500);
    }
    
    addSparkleEffect(element) {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 12px;
            animation: sparkle 1s ease-out;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = `${rect.right - 10}px`;
        sparkle.style.top = `${rect.top - 5}px`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
        
        if (!document.getElementById('sparkle-style')) {
            const style = document.createElement('style');
            style.id = 'sparkle-style';
            style.textContent = `
                @keyframes sparkle {
                    0% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                    100% { opacity: 0; transform: scale(0) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ================================================================
    // HIGHLIGHT EFFECTS (UNCHANGED)
    // ================================================================
    
    initializeHighlightEffects() {
        const highlights = document.querySelectorAll('.highlight');
        
        highlights.forEach(highlight => {
            highlight.addEventListener('mouseenter', () => {
                highlight.style.transform = 'scale(1.05)';
                highlight.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
            });
            
            highlight.addEventListener('mouseleave', () => {
                highlight.style.transform = 'scale(1)';
                highlight.style.textShadow = '';
            });
        });
    }
    
    // ================================================================
    // UTILITY METHODS
    // ================================================================
    
    resetAnimations() {
        this.timelineAnimated = false;
        
        const animatedElements = document.querySelectorAll('.timeline-item, .story-content p');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
        
        this.resetStatsForNextVisit();
    }
    
    // FIXED: Force stats animation with fresh main.js data
    forceStatsAnimation() {
        console.log('🎬 Forcing About stats animation with main.js data...');
        this.getStatsData(); // Get fresh data from main.js
        this.animateStatsCards();
    }
}

// ================================================================
// INITIALIZATION
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    // FIXED: Wait for main.js to be ready
    setTimeout(() => {
        window.aboutSection = new AboutSection();
    }, 100);
});

// Handle resize events
document.addEventListener('portfolioResize', () => {
    if (window.aboutSection) {
        console.log('About section responsive update');
    }
});

// FIXED: Global function that uses main.js data
window.forceAboutStatsAnimation = () => {
    if (window.aboutSection) {
        window.aboutSection.forceStatsAnimation();
    }
};

console.log('📖 Unified About section script loaded');
