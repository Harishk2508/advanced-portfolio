/**
 * ================================================================
 * HERO SECTION JAVASCRIPT
 * Complete Hero Section Functionality with Animations & Interactions
 * ================================================================ */
// ADDED: Utility function to check if form input is focused (MOBILE FIX)
function isFormInputFocused() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}
class HeroSection {
    constructor() {
        this.isInitialized = false;
        this.typingAnimationComplete = false;
        this.visitorCounter = null;
        this.statsAnimationTriggered = false;
        
        // Bind methods to maintain context
        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
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
        
        console.log('🎯 Initializing Hero Section...');
        
        try {
            // Core initializations
            this.fixNameDisplay();
            this.initializeVisitorCounter();
            this.initializeTypingAnimation();
            this.setupInteractions();
            this.initializeStats();
            this.setupScrollIndicator();
            this.createFloatingTechIcons();
            this.initializeBackgroundElements();
            this.setupAdminPanel();
            // Event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✅ Hero Section initialized successfully!');
            
        } catch (error) {
            console.error('❌ Hero Section initialization failed:', error);
        }
    }

    // ================================================================
    // NAME DISPLAY FIX
    // ================================================================
    
    fixNameDisplay() {
        const nameElement = document.querySelector('.typing-animation');
        const nameParent = document.querySelector('.name');
        
        console.log('🔧 Fixing name display...');
        
        if (nameElement) {
            // Immediate fix
            nameElement.innerHTML = '';
            nameElement.textContent = 'Harish K';
            nameElement.style.opacity = '1';
            nameElement.style.transform = 'translateY(0)';
            nameElement.style.animation = 'none';
            
            console.log('✅ Name fixed to: "Harish K"');
        }
        
        if (nameParent) {
            nameParent.style.opacity = '1';
            nameParent.style.transform = 'translateY(0)';
        }
    }

    // ================================================================
    // TYPING ANIMATION
    // ================================================================
    
    initializeTypingAnimation() {
        // Start typing animation after a delay
        setTimeout(() => {
            this.startTypingAnimation();
        }, 2000);
    }
    
    startTypingAnimation() {
        const nameElement = document.querySelector('.typing-animation');
        if (!nameElement || this.typingAnimationComplete) return;
        
        const correctName = 'Harish K';
        nameElement.textContent = '';
        nameElement.classList.add('typing-active');
        
        console.log('⌨️ Starting typing animation...');
        
        let index = 0;
        const typeCharacter = () => {
            if (index < correctName.length) {
                nameElement.textContent = correctName.substring(0, index + 1);
                index++;
                setTimeout(typeCharacter, 120);
            } else {
                // Animation complete
                setTimeout(() => {
                    nameElement.classList.remove('typing-active');
                    this.typingAnimationComplete = true;
                    console.log('✅ Typing animation completed');
                }, 2000);
            }
        };
        
        typeCharacter();
    }

// ================================================================
// REAL-TIME VISITOR COUNTER - PROFESSIONAL VERSION (SECURE & ACCURATE)
// ================================================================

initializeVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    if (!counterElement) return;
    
    console.log('👥 Initializing PROFESSIONAL visitor counter (starts from 0)...');
    
    // Initialize real visitor tracking
    this.setupRealVisitorTracking(counterElement);
}

setupRealVisitorTracking(counterElement) {
    // Generate unique session ID for this visitor
    const sessionId = this.generateSessionId();
    
    // Check if this is a returning visitor or new visitor
    const isReturningVisitor = this.checkReturningVisitor(sessionId);
    
    // Get real visitor count from multiple sources
    this.getRealVisitorCount().then(count => {
        // Only increment if new visitor
        if (!isReturningVisitor) {
            count = this.incrementVisitorCount(count, sessionId);
        }
        
        // Animate counter with REAL number
        this.animateCounter(counterElement, count);
        
        // Setup real-time updates
        this.setupRealTimeUpdates(counterElement);
        
        // Track visitor analytics
        this.trackVisitorAnalytics(sessionId, isReturningVisitor);
        
        console.log(`✅ REAL visitor counter: ${count} (Session: ${isReturningVisitor ? 'Returning' : 'New'})`);
    });
}

// ================================================================
// ENHANCED REAL VISITOR TRACKING METHODS - FIXED ACCURACY
// ================================================================

generateSessionId() {
    // Create unique session ID based on multiple factors
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const userAgent = navigator.userAgent.length;
    const screenRes = screen.width + 'x' + screen.height;
    const browserFingerprint = this.getBrowserFingerprint();
    
    return `${timestamp}_${random}_${userAgent}_${screenRes}_${browserFingerprint}`;
}

// ENHANCED: Browser fingerprinting for better uniqueness
getBrowserFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Portfolio fingerprint', 2, 2);
    
    const fingerprint = [
        canvas.toDataURL(),
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        navigator.platform
    ].join('|');
    
    return btoa(fingerprint).slice(0, 20); // Shortened hash
}

// FIXED: Enhanced visitor detection with better uniqueness
checkReturningVisitor(sessionId) {
    // Less sensitive visitor detection
    const visited = localStorage.getItem('portfolio-visited');
    const sessionVisited = sessionStorage.getItem('portfolio-session');
    
    // Check basic factors only (less sensitive)
    if (!visited || !sessionVisited) {
        // Mark as visited with timestamp
        localStorage.setItem('portfolio-visited', 'true');
        localStorage.setItem('portfolio-first-visit', Date.now());
        sessionStorage.setItem('portfolio-session', sessionId);
        
        console.log('🎯 NEW VISITOR detected');
        return false; // New visitor
    }
    
    console.log('🔄 RETURNING VISITOR detected');
    return true; // Returning visitor
}

async getRealVisitorCount() {
    try {
        const response = await fetch('/.netlify/functions/visitor-counter', {
            method: 'GET'
        });
        const data = await response.json();
        
        if (data && data.value !== undefined) {
            console.log(`📊 Count from Netlify: ${data.value}`);
            localStorage.setItem('portfolio-real-visitors', data.value.toString());
            return data.value;
        }
        
        throw new Error('Invalid response');
        
    } catch (error) {
        console.warn('⚠️ Using localStorage fallback');
        const count = parseInt(localStorage.getItem('portfolio-real-visitors')) || 0;
        return count;
    }
}

async incrementVisitorCount(currentCount, sessionId) {
    try {
        const response = await fetch('/.netlify/functions/visitor-counter', {
            method: 'POST'
        });
        const data = await response.json();
        
        if (data && data.value !== undefined) {
            const newCount = data.value;
            console.log(`📈 Count incremented on Netlify: ${newCount}`);
            
            localStorage.setItem('portfolio-real-visitors', newCount.toString());
            localStorage.setItem('portfolio-last-visitor', sessionId);
            localStorage.setItem('portfolio-last-visit-time', Date.now().toString());
            
            this.broadcastVisitorCount(newCount);
            return newCount;
        }
        
        throw new Error('Invalid response');
        
    } catch (error) {
        console.warn('⚠️ Using local increment');
        const newCount = currentCount + 1;
        localStorage.setItem('portfolio-real-visitors', newCount.toString());
        localStorage.setItem('portfolio-last-visitor', sessionId);
        localStorage.setItem('portfolio-last-visit-time', Date.now().toString());
        this.broadcastVisitorCount(newCount);
        
        return newCount;
    }
}


// NEW: Track total sessions
getTotalSessions() {
    return parseInt(localStorage.getItem('portfolio-total-sessions')) || 0;
}

getBroadcastVisitorCount() {
    return new Promise((resolve) => {
        try {
            // Listen for visitor count from other tabs
            const channel = new BroadcastChannel('portfolio-visitors');
            
            // Request current count from other tabs
            channel.postMessage({ type: 'REQUEST_COUNT' });
            
            let resolved = false;
            
            channel.addEventListener('message', (event) => {
                if (event.data.type === 'COUNT_RESPONSE' && !resolved) {
                    resolved = true;
                    resolve(event.data.count);
                    channel.close();
                }
            });
            
            // Timeout after 1 second
            setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    resolve(0);
                    channel.close();
                }
            }, 1000);
            
            // Also respond to requests from other tabs
            channel.addEventListener('message', (event) => {
                if (event.data.type === 'REQUEST_COUNT') {
                    const count = parseInt(localStorage.getItem('portfolio-real-visitors')) || 0;
                    channel.postMessage({ type: 'COUNT_RESPONSE', count: count });
                }
            });
        } catch (error) {
            console.warn('BroadcastChannel not supported:', error);
            resolve(0);
        }
    });
}

broadcastVisitorCount(count) {
    try {
        const channel = new BroadcastChannel('portfolio-visitors');
        channel.postMessage({ 
            type: 'COUNT_UPDATE', 
            count: count,
            timestamp: Date.now(),
            source: 'increment'
        });
        channel.close();
        console.log(`📡 Broadcasted count update: ${count}`);
    } catch (error) {
        console.warn('Broadcasting not supported:', error);
    }
}

async getNetworkVisitorCount() {
    try {
        console.log('🌐 Network visitor count check (optional feature)');
        return null; // Disabled for now - pure local tracking
    } catch (error) {
        console.warn('Network visitor count unavailable:', error);
    }
    return null;
}

setupRealTimeUpdates(counterElement) {
    try {
        // Listen for real-time updates from other tabs/windows
        const channel = new BroadcastChannel('portfolio-visitors');
        
        channel.addEventListener('message', (event) => {
            if (event.data.type === 'COUNT_UPDATE') {
                // Update counter in real-time
                this.animateCounter(counterElement, event.data.count);
                console.log(`🔄 Real-time update: ${event.data.count} visitors`);
            } else if (event.data.type === 'RESET_COUNTER') {
                // Handle reset from admin
                this.animateCounter(counterElement, 0);
                console.log('🔄 Counter reset received');
            }
        });
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            channel.close();
        });
        
        // Periodic sync every 30 seconds
        setInterval(() => {
            this.syncVisitorCount(counterElement);
        }, 30000);
        
    } catch (error) {
        console.warn('Real-time updates not supported:', error);
    }
}

async syncVisitorCount(counterElement) {
    try {
        const currentCount = await this.getRealVisitorCount();
        const displayedCount = parseInt(counterElement.textContent) || 0;
        
        if (currentCount !== displayedCount) {
            this.animateCounter(counterElement, currentCount);
            console.log(`🔄 Synced visitor count: ${displayedCount} → ${currentCount}`);
        }
    } catch (error) {
        console.warn('Sync error:', error);
    }
}

trackVisitorAnalytics(sessionId, isReturning) {
    const analytics = {
        sessionId: sessionId,
        isReturning: isReturning,
        timestamp: Date.now(),
        date: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href,
        screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth
        },
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform,
        // Enhanced tracking
        deviceType: this.getDeviceType(),
        browserInfo: this.getBrowserInfo(),
        connectionType: this.getConnectionType(),
        fingerprint: this.getBrowserFingerprint()
    };
    
    // Store analytics data
    const existingAnalytics = JSON.parse(localStorage.getItem('portfolio-analytics') || '[]');
    existingAnalytics.push(analytics);
    
    // Keep only last 100 entries to prevent storage bloat
    if (existingAnalytics.length > 100) {
        existingAnalytics.splice(0, existingAnalytics.length - 100);
    }
    
    localStorage.setItem('portfolio-analytics', JSON.stringify(existingAnalytics));
    
    // Log visitor info
    console.log('📊 Visitor tracked:', {
        type: isReturning ? 'Returning' : 'New',
        referrer: this.getReferrerType(document.referrer),
        device: analytics.deviceType,
        browser: analytics.browserInfo,
        connection: analytics.connectionType,
        timestamp: new Date().toLocaleString()
    });
}

// Enhanced device detection
getDeviceType() {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'Mobile';
    return 'Desktop';
}

// Enhanced browser detection
getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.includes('Chrome') && !ua.includes('Edge')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    else if (ua.includes('Opera')) browser = 'Opera';
    
    return browser;
}

// Connection type detection
getConnectionType() {
    if (navigator.connection) {
        return navigator.connection.effectiveType || 'Unknown';
    }
    return 'Unknown';
}

// Enhanced referrer analysis
getReferrerType(referrer) {
    if (!referrer) return 'Direct';
    if (referrer.includes('linkedin.com')) return 'LinkedIn';
    if (referrer.includes('instagram.com')) return 'Instagram';
    if (referrer.includes('google.com')) return 'Google';
    if (referrer.includes('facebook.com')) return 'Facebook';
    if (referrer.includes('twitter.com')) return 'Twitter';
    return 'Other';
}

// ================================================================
// ENHANCED COUNTER ANIMATION - SMOOTHER & MORE PROFESSIONAL
// ================================================================

animateCounter(element, targetCount) {
    const startCount = parseInt(element.textContent) || 0;
    
    // FIXED: Show target immediately if no animation needed
    if (startCount === targetCount) {
        element.textContent = targetCount;
        return;
    }
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure max 1
        
        // Smooth easing
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = startCount + (targetCount - startCount) * easeOut;
        
        if (progress < 1) {
            element.textContent = Math.round(current);
            requestAnimationFrame(animate);
        } else {
            // FIXED: Force exact target value
            element.textContent = targetCount;
            console.log(`✅ Counter animation complete: ${targetCount}`);
            
            // Success animation
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    };
    
    element.style.opacity = '0.8';
    element.style.transform = 'scale(0.95)';
    requestAnimationFrame(animate);
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 100);
}


// ================================================================
// PROFESSIONAL ADMIN METHODS - ENHANCED WITH FIXED CALCULATIONS
// ================================================================

getVisitorAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('portfolio-analytics') || '[]');
    const summary = this.getAnalyticsSummary(analytics);
    
    console.log('📊 Complete Analytics Summary:', summary);
    return {
        raw: analytics,
        summary: summary
    };
}

// FIXED: Analytics summary with proper unique visitor calculation
getAnalyticsSummary(analytics) {
    const total = analytics.length; // Total visits (including returns)
    
    // FIXED: Calculate unique visitors using fingerprint
    const uniqueFingerprints = new Set();
    analytics.forEach(visit => {
        if (visit.fingerprint) {
            uniqueFingerprints.add(visit.fingerprint);
        } else {
            // Fallback for older entries without fingerprint
            uniqueFingerprints.add(visit.sessionId.split('_')[0]);
        }
    });
    const unique = uniqueFingerprints.size;
    
    // Device breakdown
    const devices = analytics.reduce((acc, a) => {
        acc[a.deviceType] = (acc[a.deviceType] || 0) + 1;
        return acc;
    }, {});
    
    // Referrer breakdown
    const referrers = analytics.reduce((acc, a) => {
        const ref = this.getReferrerType(a.referrer);
        acc[ref] = (acc[ref] || 0) + 1;
        return acc;
    }, {});
    
    // ADDED: Connection type breakdown
    const connections = analytics.reduce((acc, a) => {
        const conn = a.connectionType || 'Unknown';
        acc[conn] = (acc[conn] || 0) + 1;
        return acc;
    }, {});
    
    // ADDED: Browser breakdown
    const browsers = analytics.reduce((acc, a) => {
        acc[a.browserInfo] = (acc[a.browserInfo] || 0) + 1;
        return acc;
    }, {});
    
    return {
        totalVisits: total,           // All visits (including returns)
        uniqueVisitors: unique,       // Actual unique visitors by fingerprint
        deviceBreakdown: devices,
        referrerBreakdown: referrers,
        connectionBreakdown: connections,  // NEW: Connection types
        browserBreakdown: browsers,        // NEW: Browser types
        averageSessionsPerVisitor: unique > 0 ? (total / unique).toFixed(2) : 0
    };
}

getCurrentVisitorCount() {
    return parseInt(localStorage.getItem('portfolio-real-visitors')) || 0;
}

// ENHANCED: Professional reset with confirmation
resetVisitorCount(newCount = 0, confirm = true) {
    if (confirm && !window.confirm(`🔄 Reset visitor counter to ${newCount}? This will clear all visitor data.`)) {
        return false;
    }
    
    // Clear all visitor data
    localStorage.removeItem('portfolio-real-visitors');
    localStorage.removeItem('portfolio-visited');
    localStorage.removeItem('portfolio-first-visit');
    localStorage.removeItem('portfolio-last-visitor');
    localStorage.removeItem('portfolio-last-visit-time');
    localStorage.removeItem('portfolio-total-sessions');
    localStorage.removeItem('portfolio-analytics');
    localStorage.removeItem('portfolio-fingerprint');
    sessionStorage.clear();
    
    // Clear daily tracking
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith('portfolio-daily-')) {
            localStorage.removeItem(key);
        }
    });
    
    // Set new count
    localStorage.setItem('portfolio-real-visitors', newCount.toString());
    localStorage.setItem('portfolio-reset-date', new Date().toISOString());
    
    // Update display
    const counterElement = document.getElementById('visitor-count');
    if (counterElement) {
        this.animateCounter(counterElement, newCount);
    }
    
    // Broadcast reset to other tabs
    try {
        const channel = new BroadcastChannel('portfolio-visitors');
        channel.postMessage({ type: 'RESET_COUNTER', count: newCount });
        channel.close();
    } catch (error) {
        console.warn('Reset broadcast failed:', error);
    }
    
    console.log(`✅ Visitor count professionally reset to: ${newCount}`);
    return true;
}

// Export analytics data
exportAnalytics() {
    const data = this.getVisitorAnalytics();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    console.log('📁 Analytics data exported');
}

// ================================================================
// 🔐 SECURE ADMIN PANEL - PASSWORD PROTECTED
// ================================================================

// SECURE: Password-protected admin panel setup
setupAdminPanel() {
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'A') {
            event.preventDefault();
            this.authenticateAdmin();
        }
    });
    
    console.log('🔐 SECURE Admin Analytics Panel Ready! Press Ctrl+Shift+A (Password required)');
}

// SECURE: Admin authentication
authenticateAdmin() {
    // Prompt for admin password
    const password = prompt('🔐 Enter Admin Password:');
    
    // Change this to your secret password
    const adminPassword = 'Harish@2508';  // ← Change this to your own password
    
    if (password === adminPassword) {
        this.showAdminPanel();
        console.log('✅ Admin authenticated successfully');
        
        // Setup security timeout (30 minutes)
        this.setupAdminSecurity();
    } else if (password !== null) { // User didn't cancel
        alert('❌ Invalid password! Access denied.');
        console.warn('🚨 Failed admin authentication attempt');
    }
}

// SECURE: Admin session management
setupAdminSecurity() {
    let adminTimeout;
    
    const resetTimeout = () => {
        clearTimeout(adminTimeout);
        adminTimeout = setTimeout(() => {
            const panel = document.getElementById('admin-analytics-panel');
            if (panel && panel.style.display === 'flex') {
                panel.style.display = 'none';
                document.body.style.overflow = 'auto';
                alert('🕒 Admin session expired due to inactivity (30 minutes)');
                console.log('🔒 Admin session expired');
            }
        }, 30 * 60 * 1000); // 30 minutes
    };
    
    // Reset timeout on any user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetTimeout, true);
    });
    
    resetTimeout(); // Start the timer
}

showAdminPanel() {
    const panel = document.getElementById('admin-analytics-panel');
    if (panel) {
        panel.style.display = 'flex';
        this.loadAdminData();
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

// UPDATED: Admin data loading with fixed calculations
loadAdminData() {
    const analytics = this.getVisitorAnalytics();
    const currentCount = this.getCurrentVisitorCount();
    
    console.log('📊 Analytics Data:', analytics); // Debug log
    
    // FIXED: Update main stats with correct calculations
    document.getElementById('admin-total-count').textContent = analytics.summary.totalVisits || 0;
    document.getElementById('admin-unique-count').textContent = analytics.summary.uniqueVisitors || 0;
    
    // FIXED: Today's visits calculation
    const today = new Date().toDateString();
    const todayVisits = analytics.raw.filter(visit => {
        const visitDate = new Date(visit.timestamp).toDateString();
        return visitDate === today;
    }).length;
    document.getElementById('admin-today-count').textContent = todayVisits;
    
    // FIXED: Return rate calculation
    const returnVisits = analytics.raw.filter(visit => visit.isReturning).length;
    const returnRate = analytics.summary.totalVisits > 0 ? 
        ((returnVisits / analytics.summary.totalVisits) * 100).toFixed(1) : 0;
    document.getElementById('admin-return-rate').textContent = returnRate + '%';
    
    // Load enhanced charts with connection type
    this.loadEnhancedDeviceChart(analytics.summary.deviceBreakdown);
    this.loadEnhancedReferrerChart(analytics.summary.referrerBreakdown);
    this.loadEnhancedBrowserChart(analytics.summary.browserBreakdown);
    this.loadEnhancedConnectionChart(analytics.summary.connectionBreakdown); // NEW
    
    // FIXED: Load recent visitors (top 10 only)
    this.loadEnhancedRecentVisitors(analytics.raw.slice(-10));
    
    console.log('📊 Admin dashboard data loaded successfully');
}

loadEnhancedDeviceChart(devices) {
    const chartDiv = document.getElementById('device-chart');
    let chartHTML = '';
    const total = Object.values(devices).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
        chartHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7);">No device data yet</p>';
    } else {
        Object.entries(devices).forEach(([device, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            const color = device === 'Mobile' ? '#4ECDC4' : device === 'Desktop' ? '#45B7D1' : '#96CEB4';
            chartHTML += `
                <div style="margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${device}</span>
                        <span>${count} (${percentage}%)</span>
                    </div>
                    <div class="chart-bar">
                        <div class="chart-fill" style="background: ${color}; width: ${percentage}%;"></div>
                    </div>
                </div>
            `;
        });
    }
    chartDiv.innerHTML = chartHTML;
}

loadEnhancedReferrerChart(referrers) {
    const chartDiv = document.getElementById('referrer-chart');
    let chartHTML = '';
    const total = Object.values(referrers).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
        chartHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7);">No referrer data yet</p>';
    } else {
        Object.entries(referrers).forEach(([referrer, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            const emoji = this.getReferrerEmoji(referrer);
            const color = this.getReferrerColor(referrer);
            chartHTML += `
                <div style="margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${emoji} ${referrer}</span>
                        <span>${count} (${percentage}%)</span>
                    </div>
                    <div class="chart-bar">
                        <div class="chart-fill" style="background: ${color}; width: ${percentage}%;"></div>
                    </div>
                </div>
            `;
        });
    }
    chartDiv.innerHTML = chartHTML;
}

// UPDATED: Browser chart using summary data
loadEnhancedBrowserChart(browserSummary) {
    const chartDiv = document.getElementById('browser-chart');
    let chartHTML = '';
    const total = Object.values(browserSummary).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
        chartHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7);">No browser data yet</p>';
    } else {
        Object.entries(browserSummary).forEach(([browser, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            const color = this.getBrowserColor(browser);
            chartHTML += `
                <div style="margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${browser}</span>
                        <span>${count} (${percentage}%)</span>
                    </div>
                    <div class="chart-bar">
                        <div class="chart-fill" style="background: ${color}; width: ${percentage}%;"></div>
                    </div>
                </div>
            `;
        });
    }
    chartDiv.innerHTML = chartHTML;
}

// NEW: Connection type chart
loadEnhancedConnectionChart(connections) {
    // Find or create connection chart container
    let chartDiv = document.getElementById('connection-chart');
    if (!chartDiv) {
        // Create new chart section for connection types
        const chartsSection = document.querySelector('.admin-charts-section');
        if (chartsSection) {
            const connectionSection = document.createElement('div');
            connectionSection.className = 'chart-container';
            connectionSection.innerHTML = `
                <h4>📡 Connection Types</h4>
                <div id="connection-chart"></div>
            `;
            chartsSection.appendChild(connectionSection);
            chartDiv = document.getElementById('connection-chart');
        }
    }
    
    if (!chartDiv) return; // Safety check
    
    let chartHTML = '';
    const total = Object.values(connections).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
        chartHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7);">No connection data yet</p>';
    } else {
        Object.entries(connections).forEach(([connection, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            const color = this.getConnectionColor(connection);
            const emoji = this.getConnectionEmoji(connection);
            chartHTML += `
                <div style="margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${emoji} ${connection}</span>
                        <span>${count} (${percentage}%)</span>
                    </div>
                    <div class="chart-bar">
                        <div class="chart-fill" style="background: ${color}; width: ${percentage}%;"></div>
                    </div>
                </div>
            `;
        });
    }
    chartDiv.innerHTML = chartHTML;
}

// FIXED: Recent visitors - top 10 only with connection info
loadEnhancedRecentVisitors(recentVisitors) {
    const visitorDiv = document.getElementById('visitor-details');
    let visitorHTML = '';
    
    if (recentVisitors.length === 0) {
        visitorHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7);">No visitors yet</p>';
    } else {
        // FIXED: Get only the last 10 entries and reverse for newest first
        const last10Visitors = recentVisitors.slice(-10).reverse();
        
        last10Visitors.forEach((visitor, index) => {
            const date = new Date(visitor.timestamp).toLocaleString();
            const referrerEmoji = this.getReferrerEmoji(this.getReferrerType(visitor.referrer));
            const timeAgo = this.getTimeAgo(visitor.timestamp);
            const connectionEmoji = this.getConnectionEmoji(visitor.connectionType || 'Unknown');
            
            visitorHTML += `
                <div class="visitor-log-item">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong>${visitor.isReturning ? '🔄 Returning' : '🆕 New'} Visitor #${last10Visitors.length - index}</strong>
                        <small style="opacity: 0.8;">${timeAgo}</small>
                    </div>
                    <div style="margin: 0.5rem 0; font-size: 0.85rem; opacity: 0.9;">
                        🖥️ ${visitor.deviceType} • 🌐 ${visitor.browserInfo}<br>
                        ${referrerEmoji} From: ${this.getReferrerType(visitor.referrer)} • ${connectionEmoji} ${visitor.connectionType || 'Unknown'}<br>
                        📍 ${visitor.timezone || 'Unknown'} • 🕒 ${date}
                    </div>
                </div>
            `;
        });
    }
    
    visitorDiv.innerHTML = visitorHTML;
}

// Enhanced helper methods
getReferrerColor(referrer) {
    const colors = {
        'LinkedIn': '#0077B5',
        'Instagram': '#E4405F',
        'Google': '#4285F4',
        'Direct': '#34C759',
        'Facebook': '#1877F2',
        'Twitter': '#1DA1F2',
        'Other': '#8E8E93'
    };
    return colors[referrer] || '#8E8E93';
}

getBrowserColor(browser) {
    const colors = {
        'Chrome': '#4285F4',
        'Firefox': '#FF7139',
        'Safari': '#006CFF',
        'Edge': '#0078D4',
        'Opera': '#FF1B2D',
        'Unknown': '#8E8E93'
    };
    return colors[browser] || '#8E8E93';
}

// NEW: Connection type helpers
getConnectionColor(connection) {
    const colors = {
        '4g': '#FF6B35',
        '5g': '#00FF88',
        'wifi': '#4285F4',
        '3g': '#FFD23F',
        '2g': '#FF6B9D',
        'slow-2g': '#8E8E93',
        'Unknown': '#CCCCCC'
    };
    return colors[connection] || '#8E8E93';
}

getConnectionEmoji(connection) {
    const emojis = {
        '4g': '📶',
        '5g': '🚀',
        'wifi': '📶',
        '3g': '📱',
        '2g': '📞',
        'slow-2g': '🐌',
        'Unknown': '❓'
    };
    return emojis[connection] || '❓';
}

getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
}

getReferrerEmoji(referrer) {
    const emojis = {
        'LinkedIn': '🔗',
        'Instagram': '📸',
        'Google': '🔍',
        'Direct': '🌐',
        'Facebook': '👥',
        'Twitter': '🐦',
        'Other': '🌍'
    };
    return emojis[referrer] || '🌍';
}


    // ================================================================
    // HERO STATS WITH LEETCODE INTEGRATION
    // ================================================================
    
    initializeStats() {
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        console.log('📊 Initializing hero stats...');
        
        // Use Intersection Observer to trigger animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsAnimationTriggered) {
                    this.animateStats();
                    this.statsAnimationTriggered = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(statsSection);
    }
    
    async animateStats() {
        try {
            console.log('📈 Animating hero stats...');
            
            // Get shared stats data from main portfolio instance
            const statsData = window.portfolio?.statsData || {
                leetcode: 641,
                events: 10,
                cgpa: 8.6,
                projects: 12
            };
            
            const values = [
                statsData.leetcode, // LeetCode problems (dynamic)
                statsData.events,   // Events Won
                statsData.cgpa,     // CGPA
                statsData.projects  // Projects
            ];
            
            const suffixes = ['+', '+', '', '+'];
            const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
            
            // Animate each stat with staggered timing
            statNumbers.forEach((stat, index) => {
                if (values[index] !== undefined) {
                    setTimeout(() => {
                        this.animateNumber(stat, 0, values[index], 1500);
                        
                        // Add suffix after animation
                        if (suffixes[index]) {
                            setTimeout(() => {
                                const currentText = stat.textContent;
                                if (!currentText.includes('+')) {
                                    stat.textContent = currentText + suffixes[index];
                                }
                            }, 1700);
                        }
                    }, index * 200);
                }
            });
            
            console.log('✅ Hero stats animation completed');
            
        } catch (error) {
            console.error('❌ Stats animation failed:', error);
        }
    }
    
    animateNumber(element, start, end, duration) {
        const startTime = Date.now();
        const range = end - start;
        const isDecimal = end % 1 !== 0;
        
        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * easeOutCubic);
            
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        updateNumber();
    }

    // ================================================================
    // INTERACTIVE ELEMENTS
    // ================================================================
    
    setupInteractions() {
        console.log('🎮 Setting up hero interactions...');
        
        // Navigation buttons
        this.setupNavigationButtons();
        
        // Social links
        this.setupSocialLinks();
        
        // Download CV button
        this.setupDownloadButton();
        
        // Profile image interactions
        this.setupProfileInteractions();
        
        console.log('✅ Hero interactions setup complete');
    }
    
    setupNavigationButtons() {
        const navButtons = document.querySelectorAll('[data-navigate]');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (isFormInputFocused()) return;
                const target = button.getAttribute('data-navigate');
                const targetElement = document.getElementById(target);
                
                if (targetElement) {
                    console.log(`🎯 Navigating to: ${target}`);
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update navigation if portfolio instance exists
                    if (window.portfolio?.updateNavigation) {
                        window.portfolio.updateNavigation(target);
                    }
                    
                    // Add click effect
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = '';
                    }, 150);
                }
            });
        });
    }
    
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            // Add hover effects
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-5px) rotate(5deg) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) rotate(0deg) scale(1)';
            });
            
            // Add click tracking
            link.addEventListener('click', (e) => {
                const platform = link.getAttribute('aria-label') || 'Social Media';
                console.log(`🔗 Social link clicked: ${platform}`);
                
                // Add click animation
                link.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
            });
        });
    }
    
    setupDownloadButton() {
        const downloadBtn = document.querySelector('.btn-secondary');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                console.log('📁 CV download initiated');
                
                // Add download effect
                const icon = downloadBtn.querySelector('i');
                if (icon) {
                    icon.style.animation = 'downloadBounce 0.5s ease';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 500);
                }
                
                // Track download (could integrate with analytics)
                this.trackEvent('cv_download', 'engagement');
            });
        }
    }
    
    setupProfileInteractions() {
        const profileImage = document.querySelector('.profile-image');
        
        if (profileImage) {
            let clickCount = 0;
            
            profileImage.addEventListener('click', () => {
                clickCount++;
                
                if (clickCount === 1) {
                    // First click - simple scale
                    profileImage.style.transform = 'scale(1.1) rotate(5deg)';
                    setTimeout(() => {
                        profileImage.style.transform = '';
                    }, 300);
                } else if (clickCount === 5) {
                    // Easter egg after 5 clicks
                    this.triggerEasterEgg();
                    clickCount = 0;
                }
                
                console.log(`🖼️ Profile image clicked: ${clickCount} times`);
            });
        }
    }
    
    triggerEasterEgg() {
        console.log('🥚 Easter egg triggered!');
        
        // Create floating emojis
        const emojis = ['🚀', '💻', '🤖', '⚡', '🎯', '✨'];
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
            }, i * 100);
        }
        
        // Show message
        this.showToast('🎉 You found the easter egg! Thanks for exploring!', 'success');
    }
    
    createFloatingEmoji(emoji) {
        const emojiEl = document.createElement('div');
        emojiEl.textContent = emoji;
        emojiEl.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
            animation: floatUp 3s ease-out forwards;
        `;
        
        document.body.appendChild(emojiEl);
        
        // Remove after animation
        setTimeout(() => {
            emojiEl.remove();
        }, 3000);
    }

    // ================================================================
    // SCROLL INDICATOR
    // ================================================================
    
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                if (isFormInputFocused()) return;
                const aboutSection = document.getElementById('about');
                
                if (aboutSection) {
                    console.log('⬇️ Scroll indicator clicked - going to About');
                    
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add click effect
                    scrollIndicator.style.transform = 'translateX(-50%) translateY(5px)';
                    setTimeout(() => {
                        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
                    }, 200);
                }
            });
        }
    }

    // ================================================================
    // FLOATING TECH ICONS
    // ================================================================
    
    createFloatingTechIcons() {
        const heroImage = document.querySelector('.hero-image');
        if (!heroImage) return;
        
        console.log('💫 Creating floating tech icons...');
        
        const icons = [
            { icon: 'fab fa-python', color: 'linear-gradient(135deg, #3776ab 0%, #ffd43b 100%)', position: 1 },
            { icon: 'fas fa-robot', color: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)', position: 2 },
            { icon: 'fas fa-brain', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 3 },
            { icon: 'fas fa-chart-line', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', position: 4 },
            { icon: 'fab fa-java', color: 'linear-gradient(135deg, #ed7014 0%, #5382a1 100%)', position: 5 },
            { icon: 'fas fa-database', color: 'linear-gradient(135deg, #336791 0%, #f29111 100%)', position: 6 }
        ];
        
        // Create floating icons container if not exists
        let floatingContainer = heroImage.querySelector('.floating-icons');
        if (!floatingContainer) {
            floatingContainer = document.createElement('div');
            floatingContainer.className = 'floating-icons';
            heroImage.appendChild(floatingContainer);
        }
        
        icons.forEach((iconData, index) => {
            const iconEl = document.createElement('div');
            iconEl.className = 'tech-icon';
            iconEl.innerHTML = `<i class="${iconData.icon}"></i>`;
            iconEl.style.cssText = `
                --position: ${iconData.position};
                --delay: ${index}s;
                background: ${iconData.color};
            `;
            
            // Add click handler
            iconEl.addEventListener('click', () => {
                this.handleTechIconClick(iconData.icon, iconEl);
            });
            
            floatingContainer.appendChild(iconEl);
        });
        
        console.log('✅ Floating tech icons created');
    }
    
    handleTechIconClick(iconClass, element) {
        console.log(`💫 Tech icon clicked: ${iconClass}`);
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            width: 20px;
            height: 20px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Track click
        this.trackEvent('tech_icon_click', iconClass);
    }

    // ================================================================
    // BACKGROUND ELEMENTS
    // ================================================================
    
    initializeBackgroundElements() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        console.log('🌟 Initializing background elements...');
        
        // Create background elements if not exist
        let bgContainer = heroContent.querySelector('.hero-background');
        if (!bgContainer) {
            bgContainer = document.createElement('div');
            bgContainer.className = 'hero-background';
            heroContent.appendChild(bgContainer);
            
            // Create floating background elements
            for (let i = 1; i <= 3; i++) {
                const bgElement = document.createElement('div');
                bgElement.className = `bg-element bg-element-${i}`;
                bgContainer.appendChild(bgElement);
            }
        }
        
        console.log('✅ Background elements initialized');
    }

    // ================================================================
    // EVENT LISTENERS
    // ================================================================
    
    setupEventListeners() {
        // Scroll events
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        
        // Resize events
        window.addEventListener('resize', this.handleResize, { passive: true });
        
        // Visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !this.typingAnimationComplete) {
                // Restart typing animation if page becomes visible
                setTimeout(() => {
                    this.startTypingAnimation();
                }, 1000);
            }
        });
        
        console.log('✅ Event listeners setup complete');
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero-content')?.offsetHeight || 0;
        
        // Parallax effect for background elements
        const bgElements = document.querySelectorAll('.bg-element');
        bgElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        // Fade out hero elements on scroll
        const heroText = document.querySelector('.hero-text');
        if (heroText && scrollY > 0) {
            const opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.5)));
            heroText.style.opacity = opacity;
        }
    }
    
    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            console.log('📱 Hero section responsive adjustment');
            
            // Re-position floating icons if needed
            const floatingIcons = document.querySelectorAll('.tech-icon');
            if (window.innerWidth <= 480 && floatingIcons.length > 0) {
                // Hide on very small screens
                floatingIcons.forEach(icon => {
                    icon.style.display = 'none';
                });
            } else {
                floatingIcons.forEach(icon => {
                    icon.style.display = 'flex';
                });
            }
        }, 250);
    }

    // ================================================================
    // UTILITY FUNCTIONS
    // ================================================================
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            info: '#2196f3',
            warning: '#ff9800'
        };
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    trackEvent(eventName, eventData = {}) {
        // Analytics tracking (can be integrated with Google Analytics, etc.)
        console.log(`📊 Event tracked: ${eventName}`, eventData);
        
        // Could integrate with:
        // gtag('event', eventName, eventData);
        // or other analytics services
    }
    
    // ================================================================
    // PUBLIC METHODS
    // ================================================================
    
    refreshStats() {
        console.log('🔄 Refreshing hero stats...');
        this.statsAnimationTriggered = false;
        this.animateStats();
    }
    
    resetTypingAnimation() {
        console.log('⌨️ Resetting typing animation...');
        this.typingAnimationComplete = false;
        this.startTypingAnimation();
    }
    
    updateVisitorCount() {
        console.log('👥 Updating visitor count...');
        this.initializeVisitorCounter();
    }
    
    destroy() {
        console.log('🗑️ Destroying hero section...');
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        
        // Clear timeouts
        clearTimeout(this.resizeTimeout);
        
        this.isInitialized = false;
    }
}

// ================================================================
// CSS ANIMATIONS (Add to document head)
// ================================================================

const heroAnimationStyles = `
<style>
@keyframes floatUp {
    0% { 
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% { 
        transform: translateY(-200vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
</style>
`;

// Inject styles
if (!document.querySelector('#hero-animations')) {
    const styleSheet = document.createElement('div');
    styleSheet.id = 'hero-animations';
    styleSheet.innerHTML = heroAnimationStyles;
    document.head.appendChild(styleSheet);
}

// ================================================================
// INITIALIZATION
// ================================================================
// ================================================================
// GLOBAL FUNCTIONS FOR ADMIN PANEL BUTTONS
// ================================================================

// Global functions for admin panel buttons
window.refreshAdminData = () => {
    heroSection.loadAdminData();
    console.log('🔄 Admin data refreshed');
};

window.exportAnalytics = () => {
    heroSection.exportAnalytics();
};

window.resetCounter = () => {
    if (heroSection.resetVisitorCount(0)) {
        heroSection.loadAdminData();
    }
};

window.closeAdminPanel = () => {
    const panel = document.getElementById('admin-analytics-panel');
    if (panel) {
        panel.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('📊 Admin panel closed');
    }
};

// Initialize Hero Section
window.heroSection = new HeroSection();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroSection;
}
