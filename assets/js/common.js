/**
 * ================================================================
 * COMMON JAVASCRIPT UTILITIES - ENHANCED VERSION
 * Shared functions and utilities across all sections
 * ================================================================ */

// ================================================================
// UTILITY FUNCTIONS (Enhanced with your existing code)
// ================================================================

const PortfolioUtils = {
    // Throttle function for performance (Your existing function)
    throttle: (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },

    // Debounce function for input handling (Your existing function)
    debounce: (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Smooth scroll to element (Your existing function)
    smoothScrollTo: (element, offset = 0) => {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    // NEW: Enhanced smooth scroll with callback
    smoothScrollToWithCallback: (element, offset = 0, callback = null) => {
        const targetPosition = element.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let startTime = null;

        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else if (callback) {
                callback();
            }
        };
        
        requestAnimationFrame(animateScroll);
    },

    // Check if element is in viewport (Your existing function)
    isInViewport: (element, threshold = 0) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        return (
            rect.top >= -threshold &&
            rect.top <= windowHeight + threshold
        );
    },

    // Animate number counters (Your existing function)
    animateNumber: (element, start, end, duration = 2000) => {
        const startTime = performance.now();
        const range = end - start;
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (range * easeOut));
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        requestAnimationFrame(updateNumber);
    },

    // Format numbers with commas (Your existing function)
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Generate random ID (Your existing function)
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    },

    // Local storage helpers (Your existing functions)
    storage: {
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.warn('LocalStorage not available:', e);
                return false;
            }
        },
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.warn('Error reading from LocalStorage:', e);
                return defaultValue;
            }
        },
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.warn('Error removing from LocalStorage:', e);
                return false;
            }
        }
    },

    // Device detection (Your existing functions)
    device: {
        isMobile: () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        isTablet: () => {
            return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
        },
        isDesktop: () => {
            return !PortfolioUtils.device.isMobile() && !PortfolioUtils.device.isTablet();
        }
    },

    // NEW: Check if user prefers reduced motion
    prefersReducedMotion: () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // NEW: Get current theme (dark/light)
    getCurrentTheme: () => {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    },

    // NEW: Toggle theme
    toggleTheme: () => {
        const currentTheme = PortfolioUtils.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        PortfolioUtils.storage.set('portfolio-theme', newTheme);
        return newTheme;
    },

    // NEW: Format date
    formatDate: (date, format = 'short') => {
        const options = {
            short: { year: 'numeric', month: 'short', day: 'numeric' },
            long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
            time: { hour: '2-digit', minute: '2-digit' }
        };
        
        return new Intl.DateTimeFormat('en-US', options[format] || options.short).format(new Date(date));
    },

    // NEW: Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (fallbackError) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },

    // NEW: Show toast notification
    showToast: (message, type = 'info', duration = 4000) => {
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
            max-width: 350px;
            word-wrap: break-word;
        `;
        
        // Add slide animations if not already present
        if (!document.querySelector('#toast-animations')) {
            const style = document.createElement('style');
            style.id = 'toast-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    },

    // NEW: Preload images
    preloadImages: (imageUrls) => {
        const promises = imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = () => reject(url);
                img.src = url;
            });
        });
        
        return Promise.allSettled(promises);
    },

    // NEW: Lazy load images
    lazyLoadImage: (img) => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                            image.classList.add('loaded');
                            delete image.dataset.src;
                        }
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            imageObserver.observe(img);
        } else {
            // Fallback for older browsers
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                delete img.dataset.src;
            }
        }
    }
};

// ================================================================
// INTERSECTION OBSERVER UTILITIES (Your existing class enhanced)
// ================================================================

class IntersectionManager {
    constructor() {
        this.observers = new Map();
    }

    // Create and manage intersection observers
    observe(elements, callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };
        
        const observerOptions = { ...defaultOptions, ...options };
        const observerId = this.generateObserverId();
        const observer = new IntersectionObserver(callback, observerOptions);

        // Handle both single elements and NodeLists
        if (elements instanceof NodeList || Array.isArray(elements)) {
            elements.forEach(el => observer.observe(el));
        } else {
            observer.observe(elements);
        }

        this.observers.set(observerId, observer);
        return observerId;
    }

    // Disconnect specific observer
    disconnect(observerId) {
        if (this.observers.has(observerId)) {
            this.observers.get(observerId).disconnect();
            this.observers.delete(observerId);
        }
    }

    // Disconnect all observers
    disconnectAll() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }

    generateObserverId() {
        return 'observer_' + Math.random().toString(36).substr(2, 9);
    }
}

// ================================================================
// ANIMATION UTILITIES (Your existing class enhanced)
// ================================================================

class AnimationManager {
    constructor() {
        this.animations = new Map();
    }

    // Fade in animation
    fadeIn(element, duration = 500, delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transition = `opacity ${duration}ms ease`;
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                });
                setTimeout(resolve, duration);
            }, delay);
        });
    }

    // Slide in animation
    slideIn(element, direction = 'up', duration = 500, delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const transforms = {
                    up: 'translateY(30px)',
                    down: 'translateY(-30px)',
                    left: 'translateX(30px)',
                    right: 'translateX(-30px)'
                };

                element.style.opacity = '0';
                element.style.transform = transforms[direction];
                element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;

                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translate(0)';
                });

                setTimeout(resolve, duration);
            }, delay);
        });
    }

    // Scale animation
    scale(element, from = 0.8, to = 1, duration = 500, delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                element.style.transform = `scale(${from})`;
                element.style.opacity = '0';
                element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

                requestAnimationFrame(() => {
                    element.style.transform = `scale(${to})`;
                    element.style.opacity = '1';
                });

                setTimeout(resolve, duration);
            }, delay);
        });
    }

    // Stagger animations for multiple elements
    stagger(elements, animationType = 'fadeIn', staggerDelay = 100, options = {}) {
        const promises = [];
        elements.forEach((element, index) => {
            const delay = index * staggerDelay;
            promises.push(this[animationType](element, options.duration, delay));
        });
        return Promise.all(promises);
    }
}

// ================================================================
// VISITOR TRACKING UTILITY (NEW)
// ================================================================

class VisitorTracker {
    constructor() {
        this.visitorData = this.getVisitorData();
        this.init();
    }

    init() {
        this.trackVisitor();
        this.updateVisitorCount();
    }

    getVisitorData() {
        const stored = PortfolioUtils.storage.get('portfolio-visitor-data');
        if (stored && this.isToday(stored.lastVisit)) {
            return stored;
        }
        
        return {
            id: this.generateVisitorId(),
            firstVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            visitCount: 0,
            totalTime: 0
        };
    }

    generateVisitorId() {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    isToday(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    trackVisitor() {
        this.visitorData.visitCount++;
        this.visitorData.lastVisit = new Date().toISOString();
        this.startTime = Date.now();
        
        // Save data
        PortfolioUtils.storage.set('portfolio-visitor-data', this.visitorData);
        
        // Track session time
        window.addEventListener('beforeunload', () => {
            this.visitorData.totalTime += Date.now() - this.startTime;
            PortfolioUtils.storage.set('portfolio-visitor-data', this.visitorData);
        });
    }

    updateVisitorCount() {
        // Get global visitor count (starting from a base number)
        const baseCount = 1247; // Your starting visitor count
        const globalCount = PortfolioUtils.storage.get('global-visitor-count', baseCount);
        const newCount = globalCount + (this.visitorData.visitCount === 1 ? 1 : 0);
        
        PortfolioUtils.storage.set('global-visitor-count', newCount);
        
        // Update visitor count display
        const visitorCountElements = document.querySelectorAll('.visitor-count, .visitors-count');
        visitorCountElements.forEach(element => {
            PortfolioUtils.animateNumber(element, 0, newCount, 2000);
        });
    }

    getStats() {
        return {
            ...this.visitorData,
            globalCount: PortfolioUtils.storage.get('global-visitor-count', 1247),
            sessionTime: Date.now() - this.startTime
        };
    }
}

// ================================================================
// SCROLL PROGRESS INDICATOR (NEW)
// ================================================================

class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.setupScrollListener();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 9999;
            transition: width 0.1s ease;
            border-radius: 0 2px 2px 0;
        `;
        
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    setupScrollListener() {
        window.addEventListener('scroll', PortfolioUtils.throttle(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            this.progressBar.style.width = scrolled + '%';
        }, 10), { passive: true });
    }
}

// ================================================================
// PERFORMANCE UTILITIES (Your existing class enhanced)
// ================================================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            interactionDelay: 0,
            memoryUsage: 0
        };
        this.init();
    }

    init() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Portfolio loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
            }, 5000);
        }
    }

    // Measure function execution time
    measure(func, label = 'Function') {
        const start = performance.now();
        const result = func();
        const end = performance.now();
        console.log(`${label} executed in ${(end - start).toFixed(2)}ms`);
        return result;
    }

    getMetrics() {
        return { ...this.metrics };
    }
}

// ================================================================
// GLOBAL INSTANCES
// ================================================================

// Create global utility instances
window.PortfolioUtils = PortfolioUtils;
window.IntersectionManager = new IntersectionManager();
window.AnimationManager = new AnimationManager();
window.PerformanceMonitor = new PerformanceMonitor();

// Initialize new utilities
window.VisitorTracker = new VisitorTracker();
window.ScrollProgress = new ScrollProgress();

// ================================================================
// COMMON EVENT LISTENERS (Your existing events enhanced)
// ================================================================

// Handle resize events
window.addEventListener('resize', PortfolioUtils.throttle(() => {
    // Trigger resize event for all components
    document.dispatchEvent(new Event('portfolioResize'));
}, 250));

// Handle orientation change for mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        document.dispatchEvent(new Event('portfolioResize'));
    }, 100);
});

// Prevent right-click context menu (optional)
document.addEventListener('contextmenu', (e) => {
    // Uncomment next line if you want to disable right-click
    // e.preventDefault();
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Trigger search functionality
        document.dispatchEvent(new Event('portfolioSearch'));
    }
    
    // NEW: Theme toggle with Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        const newTheme = PortfolioUtils.toggleTheme();
        PortfolioUtils.showToast(`Switched to ${newTheme} theme`, 'info');
    }
});

// NEW: Initialize theme from storage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = PortfolioUtils.storage.get('portfolio-theme', 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
});

console.log('✅ Enhanced common utilities loaded successfully');
