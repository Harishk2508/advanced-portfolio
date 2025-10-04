/**
 * ================================================================
 * GLOBAL ANIMATION UTILITIES
 * Complete Animation System for Portfolio with Performance Optimization
 * ================================================================ */

class AnimationManager {
    constructor() {
        this.isInitialized = false;
        this.observers = new Map();
        this.activeAnimations = new Set();
        this.animationQueue = [];
        this.isReducedMotion = this.checkReducedMotion();
        this.animationTimeline = new Map();
        
        // Performance settings
        this.performanceMode = this.detectPerformanceMode();
        this.animationSettings = this.initializeSettings();
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
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
        
        console.log('🎬 Initializing Global Animation System...');
        
        try {
            // Core initializations
            this.setupGlobalAnimationStyles();
            this.initializeScrollAnimations();
            this.initializeHoverAnimations();
            this.initializeLoadingAnimations();
            this.initializeTransitionEffects();
            
            // Setup event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log(`✅ Animation System initialized (Mode: ${this.performanceMode})`);
            
        } catch (error) {
            console.error('❌ Animation System initialization failed:', error);
        }
    }

    // ================================================================
    // SETTINGS AND CONFIGURATION
    // ================================================================
    
    initializeSettings() {
        return {
            // Animation durations (in milliseconds)
            durations: {
                instant: 0,
                fast: 200,
                normal: 300,
                slow: 500,
                slower: 800,
                slowest: 1200
            },
            
            // Easing functions
            easings: {
                linear: 'linear',
                easeIn: 'ease-in',
                easeOut: 'ease-out',
                easeInOut: 'ease-in-out',
                bounceOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                backOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                elasticOut: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
            },
            
            // Animation delays for staggered effects
            staggerDelay: 100,
            
            // Performance thresholds
            maxConcurrentAnimations: this.performanceMode === 'high' ? 20 : 10,
            reducedMotionFallback: this.isReducedMotion
        };
    }
    
    checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    detectPerformanceMode() {
        // Detect device performance
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 2;
        const connection = navigator.connection;
        
        if (memory >= 8 && cores >= 4) {
            return 'high';
        } else if (memory >= 4 && cores >= 2) {
            return 'medium';
        } else {
            return 'low';
        }
    }

    // ================================================================
    // GLOBAL ANIMATION STYLES
    // ================================================================
    
    setupGlobalAnimationStyles() {
        if (document.querySelector('#global-animations')) return;
        
        const animationStyles = `
            <style id="global-animations">
                /* Global Animation Variables */
                :root {
                    --duration-instant: 0ms;
                    --duration-fast: 200ms;
                    --duration-normal: 300ms;
                    --duration-slow: 500ms;
                    --duration-slower: 800ms;
                    --duration-slowest: 1200ms;
                    
                    --easing-linear: linear;
                    --easing-ease-in: ease-in;
                    --easing-ease-out: ease-out;
                    --easing-ease-in-out: ease-in-out;
                    --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
                    --easing-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    --easing-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
                }
                
                /* Reduced Motion Support */
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                }
                
                /* Base Animation Classes */
                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn var(--duration-normal) var(--easing-ease-out) forwards;
                }
                
                .animate-fade-out {
                    opacity: 1;
                    animation: fadeOut var(--duration-normal) var(--easing-ease-in) forwards;
                }
                
                .animate-slide-in-up {
                    opacity: 0;
                    transform: translateY(30px);
                    animation: slideInUp var(--duration-slow) var(--easing-ease-out) forwards;
                }
                
                .animate-slide-in-down {
                    opacity: 0;
                    transform: translateY(-30px);
                    animation: slideInDown var(--duration-slow) var(--easing-ease-out) forwards;
                }
                
                .animate-slide-in-left {
                    opacity: 0;
                    transform: translateX(-30px);
                    animation: slideInLeft var(--duration-slow) var(--easing-ease-out) forwards;
                }
                
                .animate-slide-in-right {
                    opacity: 0;
                    transform: translateX(30px);
                    animation: slideInRight var(--duration-slow) var(--easing-ease-out) forwards;
                }
                
                .animate-scale-in {
                    opacity: 0;
                    transform: scale(0.8);
                    animation: scaleIn var(--duration-slow) var(--easing-back) forwards;
                }
                
                .animate-bounce-in {
                    opacity: 0;
                    transform: scale(0.3);
                    animation: bounceIn var(--duration-slower) var(--easing-bounce) forwards;
                }
                
                .animate-rotate-in {
                    opacity: 0;
                    transform: rotate(-180deg) scale(0.8);
                    animation: rotateIn var(--duration-slower) var(--easing-ease-out) forwards;
                }
                
                .animate-flip-in {
                    opacity: 0;
                    transform: perspective(1000px) rotateY(-90deg);
                    animation: flipIn var(--duration-slower) var(--easing-ease-out) forwards;
                }
                
                /* Stagger Animation Classes */
                .animate-stagger-delay-1 { animation-delay: 0.1s; }
                .animate-stagger-delay-2 { animation-delay: 0.2s; }
                .animate-stagger-delay-3 { animation-delay: 0.3s; }
                .animate-stagger-delay-4 { animation-delay: 0.4s; }
                .animate-stagger-delay-5 { animation-delay: 0.5s; }
                
                /* Continuous Animations */
                .animate-pulse {
                    animation: pulse 2s var(--easing-ease-in-out) infinite;
                }
                
                .animate-bounce {
                    animation: bounce 1s var(--easing-ease-in-out) infinite;
                }
                
                .animate-shake {
                    animation: shake 0.5s var(--easing-ease-in-out);
                }
                
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                
                .animate-glow {
                    animation: glow 2s var(--easing-ease-in-out) infinite alternate;
                }
                
                /* Hover Animation Classes */
                .hover-lift {
                    transition: transform var(--duration-normal) var(--easing-ease-out);
                }
                
                .hover-lift:hover {
                    transform: translateY(-5px);
                }
                
                .hover-scale {
                    transition: transform var(--duration-normal) var(--easing-ease-out);
                }
                
                .hover-scale:hover {
                    transform: scale(1.05);
                }
                
                .hover-rotate {
                    transition: transform var(--duration-normal) var(--easing-ease-out);
                }
                
                .hover-rotate:hover {
                    transform: rotate(5deg);
                }
                
                .hover-glow {
                    transition: box-shadow var(--duration-normal) var(--easing-ease-out);
                }
                
                .hover-glow:hover {
                    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
                }
                
                /* Loading Animation Classes */
                .loading-skeleton {
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }
                
                .loading-dots::after {
                    content: '';
                    animation: dots 1.5s infinite;
                }
                
                /* Keyframe Definitions */
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                
                @keyframes fadeOut {
                    to { opacity: 0; }
                }
                
                @keyframes slideInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInDown {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInLeft {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInRight {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes scaleIn {
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.1);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes rotateIn {
                    to {
                        opacity: 1;
                        transform: rotate(0) scale(1);
                    }
                }
                
                @keyframes flipIn {
                    to {
                        opacity: 1;
                        transform: perspective(1000px) rotateY(0);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                    40%, 43% { transform: translateY(-15px); }
                    70% { transform: translateY(-7px); }
                    90% { transform: translateY(-3px); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes glow {
                    from { box-shadow: 0 0 5px rgba(102, 126, 234, 0.2); }
                    to { box-shadow: 0 0 20px rgba(102, 126, 234, 0.6); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                @keyframes dots {
                    0%, 20% { color: transparent; text-shadow: 0.25em 0 0 transparent, 0.5em 0 0 transparent; }
                    40% { color: currentColor; text-shadow: 0.25em 0 0 transparent, 0.5em 0 0 transparent; }
                    60% { text-shadow: 0.25em 0 0 currentColor, 0.5em 0 0 transparent; }
                    80%, 100% { text-shadow: 0.25em 0 0 currentColor, 0.5em 0 0 currentColor; }
                }
                
                /* Performance Optimizations */
                .animate-fade-in,
                .animate-fade-out,
                .animate-slide-in-up,
                .animate-slide-in-down,
                .animate-slide-in-left,
                .animate-slide-in-right,
                .animate-scale-in,
                .animate-bounce-in,
                .animate-rotate-in,
                .animate-flip-in {
                    will-change: transform, opacity;
                    backface-visibility: hidden;
                    transform-style: preserve-3d;
                }
                
                /* Remove will-change after animation */
                .animate-fade-in.animation-complete,
                .animate-fade-out.animation-complete,
                .animate-slide-in-up.animation-complete,
                .animate-slide-in-down.animation-complete,
                .animate-slide-in-left.animation-complete,
                .animate-slide-in-right.animation-complete,
                .animate-scale-in.animation-complete,
                .animate-bounce-in.animation-complete,
                .animate-rotate-in.animation-complete,
                .animate-flip-in.animation-complete {
                    will-change: auto;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', animationStyles);
        console.log('✅ Global animation styles injected');
    }

    // ================================================================
    // SCROLL ANIMATIONS
    // ================================================================
    
    initializeScrollAnimations() {
        console.log('📜 Initializing scroll animations...');
        
        // Setup Intersection Observer for scroll animations
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Find all elements with scroll animation classes
        const animatedElements = document.querySelectorAll(`
            .animate-on-scroll,
            .fade-in-on-scroll,
            .slide-in-on-scroll,
            .scale-in-on-scroll,
            .stagger-animation
        `);
        
        animatedElements.forEach(element => {
            scrollObserver.observe(element);
        });
        
        this.observers.set('scroll', scrollObserver);
        console.log(`✅ Scroll animations setup for ${animatedElements.length} elements`);
    }
    
    triggerScrollAnimation(element) {
        const animationType = this.getAnimationType(element);
        const delay = this.getAnimationDelay(element);
        
        setTimeout(() => {
            this.addAnimationClass(element, animationType);
            this.trackAnimation(element, animationType);
        }, delay);
    }
    
    getAnimationType(element) {
        if (element.classList.contains('fade-in-on-scroll')) return 'animate-fade-in';
        if (element.classList.contains('slide-in-on-scroll')) return 'animate-slide-in-up';
        if (element.classList.contains('scale-in-on-scroll')) return 'animate-scale-in';
        
        // Default animation based on element position
        const rect = element.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        
        if (rect.left < centerX) {
            return 'animate-slide-in-left';
        } else {
            return 'animate-slide-in-right';
        }
    }
    
    getAnimationDelay(element) {
        // Check for stagger animation
        if (element.classList.contains('stagger-animation')) {
            const staggerIndex = Array.from(element.parentNode.children).indexOf(element);
            return staggerIndex * this.animationSettings.staggerDelay;
        }
        
        // Custom delay attribute
        return parseInt(element.dataset.animationDelay) || 0;
    }

    // ================================================================
    // HOVER ANIMATIONS
    // ================================================================
    
    initializeHoverAnimations() {
        console.log('🎯 Initializing hover animations...');
        
        const hoverElements = document.querySelectorAll(`
            .hover-effect,
            .btn,
            .card,
            .project-card,
            .skill-item,
            .contact-method
        `);
        
        hoverElements.forEach(element => {
            this.setupHoverAnimation(element);
        });
        
        console.log(`✅ Hover animations setup for ${hoverElements.length} elements`);
    }
    
    setupHoverAnimation(element) {
        // Skip if reduced motion is preferred
        if (this.isReducedMotion) return;
        
        element.addEventListener('mouseenter', () => {
            this.triggerHoverIn(element);
        });
        
        element.addEventListener('mouseleave', () => {
            this.triggerHoverOut(element);
        });
        
        // Touch device support
        element.addEventListener('touchstart', () => {
            this.triggerHoverIn(element);
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => this.triggerHoverOut(element), 150);
        }, { passive: true });
    }
    
    triggerHoverIn(element) {
        element.classList.add('is-hovered');
        
        // Apply specific hover animations based on element type
        if (element.classList.contains('btn')) {
            element.style.transform = 'translateY(-2px) scale(1.02)';
        } else if (element.classList.contains('card')) {
            element.style.transform = 'translateY(-5px)';
            element.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        } else {
            element.style.transform = 'translateY(-3px)';
        }
    }
    
    triggerHoverOut(element) {
        element.classList.remove('is-hovered');
        element.style.transform = '';
        element.style.boxShadow = '';
    }

    // ================================================================
    // LOADING ANIMATIONS
    // ================================================================
    
    initializeLoadingAnimations() {
        console.log('⏳ Initializing loading animations...');
        
        // Setup page load animations
        this.setupPageLoadAnimation();
        
        // Setup skeleton loaders
        this.setupSkeletonLoaders();
        
        // Setup lazy loading animations
        this.setupLazyLoadAnimations();
        
        console.log('✅ Loading animations initialized');
    }
    
    setupPageLoadAnimation() {
        // Animate elements as they load
        const criticalElements = document.querySelectorAll(`
            .hero-content,
            .section-header,
            .navbar
        `);
        
        criticalElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    setupSkeletonLoaders() {
        const skeletonElements = document.querySelectorAll('.loading-skeleton');
        
        skeletonElements.forEach(element => {
            // Replace skeleton with actual content when loaded
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.target.textContent.trim()) {
                        element.classList.remove('loading-skeleton');
                        element.classList.add('animate-fade-in');
                        observer.disconnect();
                    }
                });
            });
            
            observer.observe(element, { childList: true, subtree: true });
        });
    }
    
    setupLazyLoadAnimations() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Load the content
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        delete element.dataset.src;
                    }
                    
                    // Animate in
                    element.classList.add('animate-fade-in');
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
        
        this.observers.set('lazy', lazyObserver);
    }

    // ================================================================
    // TRANSITION EFFECTS
    // ================================================================
    
    initializeTransitionEffects() {
        console.log('🔄 Initializing transition effects...');
        
        // Page transition effects
        this.setupPageTransitions();
        
        // Section transition effects
        this.setupSectionTransitions();
        
        // Modal transition effects
        this.setupModalTransitions();
        
        console.log('✅ Transition effects initialized');
    }
    
    setupPageTransitions() {
        // Smooth page transitions for SPA-like experience
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.smoothScrollToSection(targetId);
            });
        });
    }
    
    setupSectionTransitions() {
        // Animate sections as they come into view
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    this.animateSectionContent(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        this.observers.set('sections', sectionObserver);
    }
    
    setupModalTransitions() {
        // Enhanced modal animations
        const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.dataset.modalTrigger;
                this.showModal(modalId);
            });
        });
    }

    // ================================================================
    // ANIMATION UTILITIES
    // ================================================================
    
    addAnimationClass(element, animationClass) {
        element.classList.add(animationClass);
        
        // Remove animation class after completion
        element.addEventListener('animationend', () => {
            element.classList.remove(animationClass);
            element.classList.add('animation-complete');
            this.cleanupAnimation(element);
        }, { once: true });
    }
    
    trackAnimation(element, animationType) {
        const animationId = `${Date.now()}-${Math.random()}`;
        this.activeAnimations.add(animationId);
        
        // Clean up after animation
        setTimeout(() => {
            this.activeAnimations.delete(animationId);
        }, this.animationSettings.durations.slowest);
    }
    
    cleanupAnimation(element) {
        // Remove will-change property for performance
        element.style.willChange = 'auto';
    }
    
    smoothScrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.offsetTop - 100; // Account for fixed header
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second
        
        let startTime = null;
        
        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const ease = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        
        requestAnimationFrame(animateScroll);
    }
    
    animateSectionContent(section) {
        const elements = section.querySelectorAll(`
            .section-header,
            .card,
            .btn,
            p,
            h1, h2, h3, h4, h5, h6
        `);
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-fade-in');
            }, index * 50);
        });
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.style.display = 'flex';
        modal.classList.add('animate-fade-in');
        
        // Animate modal content
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.add('animate-scale-in');
        }
    }

    // ================================================================
    // EVENT LISTENERS
    // ================================================================
    
    setupEventListeners() {
        // Visibility change handling
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Resize handling
        window.addEventListener('resize', this.handleResize, { passive: true });
        
        // Reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addListener((e) => {
            this.isReducedMotion = e.matches;
            console.log(`♿ Reduced motion: ${this.isReducedMotion ? 'enabled' : 'disabled'}`);
        });
        
        console.log('✅ Animation event listeners setup complete');
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when page is hidden
            this.pauseAnimations();
        } else {
            // Resume animations when page is visible
            this.resumeAnimations();
        }
    }
    
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            console.log('📱 Responsive animation adjustment');
            
            // Recalculate animation positions for responsive design
            const animatedElements = document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right');
            animatedElements.forEach(element => {
                // Reset and reapply animations based on new viewport
                element.classList.remove('animate-slide-in-left', 'animate-slide-in-right');
                const newAnimationType = this.getAnimationType(element);
                element.classList.add(newAnimationType);
            });
        }, 250);
    }

    // ================================================================
    // PERFORMANCE OPTIMIZATION
    // ================================================================
    
    pauseAnimations() {
        document.querySelectorAll('.animate-pulse, .animate-bounce, .animate-spin').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimations() {
        document.querySelectorAll('.animate-pulse, .animate-bounce, .animate-spin').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
    
    optimizePerformance() {
        // Reduce animation quality on low-performance devices
        if (this.performanceMode === 'low') {
            document.documentElement.style.setProperty('--duration-normal', '150ms');
            document.documentElement.style.setProperty('--duration-slow', '250ms');
            console.log('⚡ Performance optimizations applied');
        }
    }

    // ================================================================
    // PUBLIC API
    // ================================================================
    
    // Animate element with specific animation
    animate(element, animationType, options = {}) {
        if (!element) return;
        
        const {
            delay = 0,
            duration = 'normal',
            easing = 'easeOut',
            callback = null
        } = options;
        
        setTimeout(() => {
            this.addAnimationClass(element, `animate-${animationType}`);
            
            if (callback) {
                element.addEventListener('animationend', callback, { once: true });
            }
        }, delay);
    }
    
    // Animate multiple elements in sequence
    animateSequence(elements, animationType, staggerDelay = 100) {
        elements.forEach((element, index) => {
            this.animate(element, animationType, {
                delay: index * staggerDelay
            });
        });
    }
    
    // Stop all animations on an element
    stopAnimation(element) {
        element.getAnimations().forEach(animation => {
            animation.cancel();
        });
        
        // Remove animation classes
        const animationClasses = Array.from(element.classList).filter(cls => 
            cls.startsWith('animate-')
        );
        
        element.classList.remove(...animationClasses);
    }
    
    // Check if animations are supported and enabled
    isAnimationSupported() {
        return !this.isReducedMotion && 'animate' in Element.prototype;
    }
    
    // Get animation statistics
    getStats() {
        return {
            activeAnimations: this.activeAnimations.size,
            observers: this.observers.size,
            performanceMode: this.performanceMode,
            reducedMotion: this.isReducedMotion,
            animationQueueLength: this.animationQueue.length
        };
    }
    
    // Destroy animation system
    destroy() {
        console.log('🗑️ Destroying animation system...');
        
        // Disconnect all observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        // Remove event listeners
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        window.removeEventListener('resize', this.handleResize);
        
        // Clear active animations
        this.activeAnimations.clear();
        this.animationQueue.length = 0;
        
        // Remove global styles
        const styleElement = document.getElementById('global-animations');
        if (styleElement) {
            styleElement.remove();
        }
        
        clearTimeout(this.resizeTimeout);
        
        this.isInitialized = false;
        console.log('✅ Animation system destroyed');
    }
}

// ================================================================
// INITIALIZATION AND EXPORT
// ================================================================

// Initialize Global Animation System
window.animationManager = new AnimationManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
}

// Global utility functions for easy access
window.animate = (element, type, options) => {
    return window.animationManager.animate(element, type, options);
};

window.animateSequence = (elements, type, delay) => {
    return window.animationManager.animateSequence(elements, type, delay);
};
