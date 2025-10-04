/**
 * ================================================================
 * PROJECTS SECTION JAVASCRIPT - COMPLETE WORKING VERSION
 * Tech Tags + Click Functionality + Responsive + Image Loading
 * ================================================================ */

class ProjectsSection {
    constructor() {
        this.isInitialized = false;
        this.currentFilter = 'all';
        this.animatedProjects = new Set();
        this.observers = [];
        this.loadedImages = new Set();
        this.isResizing = false;
        
        // Project database for easy addition/modification
        this.projectDatabase = this.initializeProjectDatabase();
        
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
        
        console.log('💼 Initializing Projects Section (COMPLETE)...');
        
        try {
            // Core initializations - PRESERVED YOUR ORDER
            this.initializeFilters();
            this.initializeProjectCards();
            this.initializeProjectImages();
            this.initializeStats();
            this.setupScrollAnimations();
            this.setupEventListeners();
            
            // NEW: Add responsive handling
            this.setupResponsiveHandling();
            
            this.isInitialized = true;
            console.log('✅ Projects Section initialized successfully!');
            
        } catch (error) {
            console.error('❌ Projects Section initialization failed:', error);
        }
    }
    

    // ================================================================
    // PROJECT DATABASE - YOUR WORKING VERSION PRESERVED
    // ================================================================
    
    initializeProjectDatabase() {
        return {
                'portfolio-website': {
    title: 'Personal Portfolio Website',
    period: '2025',
    category: ['web-dev'],
    featured: true,
    new: true,
    shortDescription: 'Modern, full-featured portfolio website with real-time analytics, LeetCode integration, interactive animations, working contact forms, and comprehensive visitor tracking dashboard.',
    fullDescription: `
        <p>Professional single-page portfolio website showcasing technical skills and projects with advanced analytics capabilities, real-time API integrations, and modern web technologies.</p>
        
        <h4>🚀 Core Features:</h4>
        <ul>
            <li><strong>Real-time LeetCode Integration:</strong> Live fetching of problem count and profile statistics</li>
            <li><strong>Working Contact Form:</strong> Functional email integration with validation and success handling</li>
            <li><strong>Comprehensive Analytics Dashboard:</strong> Real-time visitor tracking with interactive charts</li>
            <li><strong>Responsive Design:</strong> Optimized layouts for all devices with smooth animations</li>
            <li><strong>Interactive Animations:</strong> Smooth scrolling, typing effects, and scroll-triggered animations</li>
            <li><strong>Password-protected Admin Panel:</strong> Secure analytics access with session management</li>
        </ul>
        
        <h4>📊 Analytics & Tracking:</h4>
        <ul>
            <li>Real-time visitor counter with unique fingerprint-based detection</li>
            <li>Device, browser, connection type, and geographical tracking</li>
            <li>Visitor journey analytics with detailed session information</li>
            <li>Cross-tab synchronization for live updates across multiple windows</li>
            <li>Analytics data export functionality (JSON/CSV formats)</li>
            <li>Return visitor identification and behavior pattern analysis</li>
        </ul>
        
        <h4>🎨 Technical Excellence:</h4>
        <ul>
            <li>Advanced browser fingerprinting for accurate unique visitor counting</li>
            <li>Professional UI/UX following modern design principles and accessibility standards</li>
            <li>Performance optimized with 60fps animations and lazy loading techniques</li>
            <li>SEO-friendly structure with proper meta tags and semantic HTML</li>
            <li>Cross-browser compatibility ensuring consistent experience</li>
        </ul>
        
        <h4>🔐 Security & Performance:</h4>
        <ul>
            <li>Secure admin authentication with password protection and auto-timeout</li>
            <li>Input validation and sanitization for contact forms</li>
            <li>Privacy-compliant data storage and session management</li>
            <li>Optimized loading times with efficient resource management</li>
        </ul>
    `,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'API Integration', 'LocalStorage API', 'Canvas API', 'Bootstrap'],
    highlights: [
        { icon: 'fas fa-code', text: 'Integration with leetcode' },
        { icon: 'fas fa-envelope', text: 'working contact form' },
        { icon: 'fas fa-chart-line', text: 'Real-time Analytics' },
        { icon: 'fas fa-mobile-alt', text: 'Responsive Design' }
    ],
    imageUrl: 'assets/images/projects/portfolio-website.png',
    imageAlt: 'Personal Portfolio Website'
},

'yoga-detection': {
    title: 'Gamified Yoga Detection Website',
    period: '2024 – 2025',
    category: ['ai-ml', 'web-dev'],
    featured: true,
    new: true,
    shortDescription: 'ML-powered pose evaluation platform using Google PoseLandmarker for real-time yoga pose analysis with multiplayer features, automated corrections, and gamified experience.',
    fullDescription: `
        <p>Revolutionary yoga pose evaluation system that combines cutting-edge machine learning with gamification to transform traditional yoga practice through real-time AI-powered feedback and multiplayer competition.</p>
        
        <h4>🎯 Advanced Pose Detection:</h4>
        <ul>
            <li><strong>Google PoseLandmarker Integration:</strong> Utilizes state-of-the-art pose estimation for accurate keypoint extraction</li>
            <li><strong>95%+ Similarity Accuracy:</strong> Advanced vector comparison algorithms for precise pose similarity scoring</li>
            <li><strong>50+ Yoga Asanas:</strong> Comprehensive pose library with difficulty ratings and progression tracking</li>
            <li><strong>Real-time Feedback:</strong> Instant pose corrections and improvement suggestions</li>
            <li><strong>Keypoint Normalization:</strong> Advanced geometric analysis for consistent pose evaluation</li>
        </ul>
        
        <h4>🎮 Gamified Experience:</h4>
        <ul>
            <li><strong>Multiplayer Support:</strong> Real-time competition for up to 4 participants simultaneously</li>
            <li><strong>Progressive Difficulty:</strong> Adaptive challenge levels based on user performance</li>
            <li><strong>Achievement System:</strong> Points, badges, and leaderboards for motivation</li>
            <li><strong>Quiz Integration:</strong> Interactive yoga knowledge tests combined with pose practice</li>
            <li><strong>Social Features:</strong> Friend challenges and community pose sharing</li>
        </ul>
        
        <h4>🔧 Technical Architecture:</h4>
        <ul>
            <li><strong>FastAPI Backend:</strong> High-performance API architecture for real-time pose processing</li>
            <li><strong>OpenCV Integration:</strong> Advanced computer vision for video stream processing</li>
            <li><strong>Lightweight ML:</strong> 80% reduction in CNN training overhead through geometric analysis</li>
            <li><strong>Modular Design:</strong> Separate modules for detection, quiz system, and multiplayer functionality</li>
            <li><strong>Socket.io Integration:</strong> Real-time multiplayer communication and synchronization</li>
        </ul>
        
        <h4>📈 Performance Metrics:</h4>
        <ul>
            <li>95%+ pose similarity accuracy across all supported asanas</li>
            <li>Real-time processing with <100ms latency for pose evaluation</li>
            <li>80% reduction in traditional CNN training time</li>
            <li>Supports concurrent multiplayer sessions with seamless synchronization</li>
            <li>Interpretable pose analysis without deep learning dependencies</li>
        </ul>
    `,
    technologies: ['Python', 'Google PoseLandmarker', 'FastAPI', 'OpenCV', 'NumPy', 'Google APIs', 'Socket.io'],
    highlights: [
        { icon: 'fas fa-yoga', text: 'Real-time Pose Detection' },
        { icon: 'fas fa-users', text: 'Multiplayer Support' },
        { icon: 'fas fa-gamepad', text: 'Gamified Experience' }
    ],
    imageUrl: 'assets/images/projects/yoga-detection.png',
    imageAlt: 'Gamified Yoga Detection Website'
},

'heart-disease': {
    title: 'Heart Disease Severity Classification',
    period: 'Feb 2025 – Apr 2025',
    category: ['ai-ml', 'research'],
    featured: true,
    shortDescription: 'Deep Neural Network achieving 91%+ accuracy for heart disease severity classification using UCI Cleveland dataset with comparative evaluation against Random Forest and Boosting algorithms.',
    fullDescription: `
        <p>Research-grade machine learning project implementing advanced deep learning techniques for medical diagnosis, achieving superior performance in heart disease severity classification with comprehensive clinical validation.</p>
        
        <h4>🎯 Research Objectives:</h4>
        <ul>
            <li><strong>Multi-class Classification:</strong> Develop accurate 5-level heart disease severity prediction system</li>
            <li><strong>Comparative Analysis:</strong> Systematic evaluation against Random Forest, XGBoost, and boosting algorithms</li>
            <li><strong>Clinical Validation:</strong> Ensure medical accuracy through cross-validation and feature importance analysis</li>
            <li><strong>Reproducible Research:</strong> Documented architecture and methodology for scientific rigor</li>
        </ul>
        
        <h4>📊 Advanced Methodology:</h4>
        <ul>
            <li><strong>Dataset:</strong> UCI Cleveland Heart Disease Dataset (303 patients, 14 clinical features)</li>
            <li><strong>Feature Engineering:</strong> Categorical encoding, polynomial transformations, and collinearity filtering</li>
            <li><strong>Class Balancing:</strong> SMOTE (Synthetic Minority Oversampling Technique) for imbalanced data handling</li>
            <li><strong>Model Architecture:</strong> Deep Neural Network with dropout regularization and batch normalization</li>
            <li><strong>Validation Strategy:</strong> Stratified 5-fold cross-validation with robust performance metrics</li>
        </ul>
        
        <h4>🔬 Technical Implementation:</h4>
        <ul>
            <li><strong>Feature Selection:</strong> Multiple techniques including L1 regularization, RFE, and Random Forest importance</li>
            <li><strong>Hyperparameter Optimization:</strong> Grid search and Bayesian optimization for model tuning</li>
            <li><strong>Preprocessing Pipeline:</strong> Comprehensive data cleaning, scaling, and transformation workflow</li>
            <li><strong>Model Interpretability:</strong> SHAP values and feature importance analysis for clinical insights</li>
        </ul>
        
        <h4>🏆 Outstanding Results:</h4>
        <ul>
            <li><strong>Overall Accuracy:</strong> 91.2% on independent test set</li>
            <li><strong>Precision:</strong> 89.5% average across all severity levels</li>
            <li><strong>Recall:</strong> 88.7% average with consistent performance per class</li>
            <li><strong>F1-Score:</strong> 89.1% weighted average indicating balanced performance</li>
            <li><strong>Comparative Advantage:</strong> 12% better than Random Forest, 8% superior to XGBoost</li>
        </ul>
        
        <h4>📱 Clinical Deployment:</h4>
        <ul>
            <li>Streamlit web application for real-time severity prediction</li>
            <li>Interactive clinical interface with confidence scores</li>
            <li>Integrated preprocessing pipeline for seamless prediction workflow</li>
        </ul>
    `,
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'SMOTE', 'Matplotlib', 'Pandas', 'NumPy', 'Streamlit'],
    highlights: [
        { icon: 'fas fa-chart-line', text: '91%+ Accuracy' },
        { icon: 'fas fa-layer-group', text: '5-Level Classification' },
        { icon: 'fas fa-microscope', text: 'Research Grade' }
    ],
    imageUrl: 'assets/images/projects/heart-disease.png',
    imageAlt: 'Heart Disease Classification'
},

'llama-finetuning': {
    title: 'LLaMA 3.2 Fine-Tuning Implementation',
    period: 'Aug 2024 – Nov 2024',
    category: ['ai-ml', 'research'],
    featured: true,
    shortDescription: 'Fine-tuned LLaMA 3.2 with Unsloth on large-scale medical datasets using LoRA techniques for AI doctor applications, optimizing training efficiency while maintaining accuracy.',
    fullDescription: `
        <p>Advanced large language model fine-tuning project implementing parameter-efficient training techniques for medical domain applications, achieving significant performance improvements while optimizing computational resources.</p>
        
        <h4>🎯 Project Objectives:</h4>
        <ul>
            <li><strong>Medical AI Development:</strong> Fine-tune LLaMA 3.2 for accurate medical consultation and diagnosis assistance</li>
            <li><strong>Efficiency Optimization:</strong> Implement LoRA techniques for parameter-efficient training</li>
            <li><strong>Resource Management:</strong> Optimize GPU memory usage and training time using Unsloth framework</li>
            <li><strong>Clinical Accuracy:</strong> Ensure medical knowledge precision and safety for healthcare applications</li>
        </ul>
        
        <h4>🔬 Technical Implementation:</h4>
        <ul>
            <li><strong>Base Model:</strong> LLaMA 3.2-3B parameter model with transformer architecture</li>
            <li><strong>Fine-tuning Method:</strong> LoRA (Low-Rank Adaptation) with rank=16, alpha=32 configuration</li>
            <li><strong>Training Framework:</strong> Unsloth optimization for 2x faster training with 4x memory efficiency</li>
            <li><strong>Dataset:</strong> Curated 100,000+ patient-doctor conversation samples from medical databases</li>
            <li><strong>Infrastructure:</strong> Google Colab T4 GPU instances with gradient checkpointing</li>
        </ul>
        
        <h4>⚙️ Advanced Optimization:</h4>
        <ul>
            <li><strong>Memory Management:</strong> Mixed precision training and gradient accumulation strategies</li>
            <li><strong>Hyperparameter Tuning:</strong> Learning rate scheduling, batch optimization, and warmup steps</li>
            <li><strong>Generalization Enhancement:</strong> Validation on held-out medical test sets for robust performance</li>
            <li><strong>Training Loop Customization:</strong> Following Unsloth best practices for medical domain adaptation</li>
        </ul>
        
        <h4>📈 Performance Achievements:</h4>
        <ul>
            <li><strong>Training Speed:</strong> 60% reduction in training time compared to standard fine-tuning</li>
            <li><strong>Memory Efficiency:</strong> 4x reduction in GPU memory usage on free-tier resources</li>
            <li><strong>Medical Accuracy:</strong> 87% accuracy on medical knowledge benchmarks and clinical scenarios</li>
            <li><strong>Response Quality:</strong> Human evaluation score of 8.2/10 for medical consultation responses</li>
            <li><strong>Deployment Ready:</strong> Optimized inference pipeline for real-time clinical applications</li>
        </ul>
        
        <h4>🚀 Deployment & Integration:</h4>
        <ul>
            <li>Hugging Face Hub integration for model distribution and version control</li>
            <li>RESTful API endpoint development for healthcare application integration</li>
            <li>Streamlined inference pipeline with sub-second response times</li>
            <li>Scalable deployment architecture for clinical environments</li>
        </ul>
    `,
    technologies: ['LLaMA 3.2', 'Unsloth', 'LoRA', 'Hugging Face', 'PyTorch', 'Transformers', 'PEFT', 'NLP'],
    highlights: [
        { icon: 'fas fa-rocket', text: 'Optimized Performance' },
        { icon: 'fas fa-medical-kit', text: 'Medical AI' },
        { icon: 'fas fa-cogs', text: 'LoRA Techniques' }
    ],
    imageUrl: 'assets/images/projects/finetunning-llama.png',
    imageAlt: 'LLaMA Fine-tuning'
},

'pii-detection': {
    title: 'Indian PII Detection System',
    period: 'Nov 2024 – Feb 2025',
    category: ['ai-ml'],
    shortDescription: 'Hybrid NER and regex-based pipeline to detect and classify Indian PII in text data with interactive Streamlit UI for real-time alerting and user consent workflow.',
    fullDescription: `
        <p>Comprehensive privacy protection system designed specifically for Indian data context, combining advanced NER models with custom regex patterns for robust PII detection and GDPR-compliant consent management.</p>
        
        <h4>🛡️ Privacy Protection Features:</h4>
        <ul>
            <li><strong>Indian-Specific Detection:</strong> Aadhaar numbers, PAN cards, passport numbers, GSTIN, IFSC codes</li>
            <li><strong>Contact Information:</strong> Phone numbers (all Indian formats), email addresses, postal codes</li>
            <li><strong>Identity Documents:</strong> Voter ID, driving license, and other government identification patterns</li>
            <li><strong>Address Recognition:</strong> Indian-specific address patterns and geographic entity detection</li>
            <li><strong>Real-time Scoring:</strong> Privacy risk assessment with confidence levels and severity ratings</li>
        </ul>
        
        <h4>🔬 Technical Architecture:</h4>
        <ul>
            <li><strong>Hybrid Pipeline:</strong> Combination of transformer-based NER and handcrafted regex patterns</li>
            <li><strong>NER Model:</strong> Fine-tuned RoBERTa-large for Indian entity recognition with custom training</li>
            <li><strong>Pattern Matching:</strong> 10+ custom regex patterns optimized for Indian document formats</li>
            <li><strong>Real-time Processing:</strong> Streamlit interface with instant PII highlighting and detection</li>
            <li><strong>Consent Workflow:</strong> GDPR-compliant user consent management before data submission</li>
        </ul>
        
        <h4>⚙️ Advanced Implementation:</h4>
        <ul>
            <li><strong>Model Integration:</strong> Hugging Face Transformers pipeline for seamless NER processing</li>
            <li><strong>Interactive UI:</strong> User-friendly Streamlit application with real-time entity highlighting</li>
            <li><strong>Privacy-First Design:</strong> Local processing options and data anonymization capabilities</li>
            <li><strong>Containerized Deployment:</strong> Docker setup for easy deployment across cloud platforms</li>
        </ul>
        
        <h4>🚀 Deployment & Scalability:</h4>
        <ul>
            <li><strong>Cloud Compatibility:</strong> Ready deployment on AWS, Azure, and Google Cloud platforms</li>
            <li><strong>Single-Command Setup:</strong> Docker containerization for streamlined deployment</li>
            <li><strong>Scalable Architecture:</strong> Designed for high-volume text processing applications</li>
            <li><strong>API Integration:</strong> RESTful endpoints for integration with existing privacy workflows</li>
        </ul>
        
        <h4>📊 Performance Metrics:</h4>
        <ul>
            <li>95%+ accuracy for Indian PII entity detection</li>
            <li>Sub-second processing time for document analysis</li>
            <li>Zero false negatives for critical identifiers (Aadhaar, PAN)</li>
            <li>GDPR-compliant consent workflow implementation</li>
        </ul>
    `,
    technologies: ['Python', 'Streamlit', 'Transformers', 'Regex', 'spaCy', 'RoBERTa', 'Docker', 'Hugging Face'],
    highlights: [
        { icon: 'fas fa-shield-alt', text: 'Privacy Protection' },
        { icon: 'fas fa-bolt', text: 'Real-time Processing' }
    ],
    imageUrl: 'assets/images/projects/pii_detection.png',
    imageAlt: 'PII Detection System'
},

'medical-ai': {
    title: 'AI-Powered Medical Assistance System',
    period: '2024',
    category: ['ai-ml', 'web-dev'],
    shortDescription: 'Robust AI-based healthcare assistant using ChatGPT API, delivering accurate, personalized health recommendations with seamless AI-user interaction integration.',
    fullDescription: `
        <p>Intelligent healthcare assistance platform leveraging OpenAI's ChatGPT API to provide personalized medical guidance, health recommendations, and preliminary diagnosis support through advanced natural language processing.</p>
        
        <h4>🏥 Healthcare Intelligence Features:</h4>
        <ul>
            <li><strong>Symptom Analysis:</strong> AI-powered preliminary diagnosis based on user-reported symptoms</li>
            <li><strong>Drug Interaction Checking:</strong> Comprehensive medication compatibility analysis and warnings</li>
            <li><strong>Health Lifestyle Recommendations:</strong> Personalized diet, exercise, and wellness suggestions</li>
            <li><strong>Medical Appointment Assistance:</strong> Smart scheduling and preparation guidance</li>
            <li><strong>Health Record Management:</strong> Secure storage and analysis of personal health information</li>
        </ul>
        
        <h4>🤖 AI Integration & Processing:</h4>
        <ul>
            <li><strong>ChatGPT API Integration:</strong> Advanced natural language understanding for medical queries</li>
            <li><strong>Context-Aware Responses:</strong> Maintains conversation history for accurate medical consultations</li>
            <li><strong>Medical Knowledge Base:</strong> Integration with verified medical databases and guidelines</li>
            <li><strong>Multi-language Support:</strong> Healthcare assistance in multiple regional languages</li>
        </ul>
        
        <h4>🔐 Security & Compliance:</h4>
        <ul>
            <li><strong>HIPAA Compliance:</strong> Secure handling of patient health information</li>
            <li><strong>Data Encryption:</strong> End-to-end encryption for all medical conversations</li>
            <li><strong>Privacy Protection:</strong> Local data processing options for sensitive information</li>
            <li><strong>Audit Logging:</strong> Comprehensive logging for medical consultation tracking</li>
        </ul>
        
        <h4>💊 Clinical Applications:</h4>
        <ul>
            <li>Preliminary health screening and triage assistance</li>
            <li>Medication reminders and dosage tracking</li>
            <li>Emergency contact and medical alert systems</li>
            <li>Integration with telemedicine platforms</li>
        </ul>
        
        
    `,
    technologies: ['ChatGPT API', 'Python', 'Flask', 'REST API', 'OpenAI', 'Natural Language Processing'],
    highlights: [
        { icon: 'fas fa-user-md', text: 'Healthcare AI' },
        { icon: 'fas fa-comments', text: 'Chatbot Integration' }
    ],
    imageUrl: 'assets/images/projects/medical-ai.png',
    imageAlt: 'Medical AI Assistant'
},

'bus-reservation': {
    title: 'Bus Reservation System',
    period: '2024',
    category: ['web-dev'],
    shortDescription: 'Simple bus booking platform with Django framework featuring admin bus management, user ticket booking, and cancellation system.',
    fullDescription: `
        <p>Straightforward bus reservation system built with Django, providing essential booking functionality for passengers and comprehensive bus management for administrators.</p>
        
        <h4>🚌 Core Features:</h4>
        <ul>
            <li><strong>Bus Search & Booking:</strong> Users can search available buses by route and date</li>
            <li><strong>Seat Selection:</strong> Interactive seat selection with real-time availability</li>
            <li><strong>Ticket Management:</strong> Book tickets with passenger details and contact information</li>
            <li><strong>Booking Cancellation:</strong> Users can cancel their bookings and get refund status</li>
            <li><strong>Booking History:</strong> View previous bookings and current reservations</li>
        </ul>
        
        <h4>👨‍💼 Admin Features:</h4>
        <ul>
            <li><strong>Bus Management:</strong> Add new buses with seat configuration and capacity</li>
            <li><strong>Route Setup:</strong> Configure departure and arrival points for different routes</li>
            <li><strong>Schedule Management:</strong> Set departure times, arrival times, and travel duration</li>
            <li><strong>Fare Management:</strong> Set and update ticket prices for different routes</li>
            <li><strong>Booking Overview:</strong> View all bookings, passenger details, and occupancy status</li>
        </ul>
        
        <h4>🔧 Technical Implementation:</h4>
        <ul>
            <li><strong>Django Framework:</strong> Python-based web framework for rapid development</li>
            <li><strong>Database Management:</strong> SQLite/PostgreSQL for storing bus, route, and booking data</li>
            <li><strong>User Authentication:</strong> Login/signup system for passengers and admin access</li>
            <li><strong>Responsive Design:</strong> Bootstrap-based frontend for mobile and desktop compatibility</li>
        </ul>
        
        <h4>📋 System Workflow:</h4>
        <ul>
            <li>Admin adds buses with seat numbers, routes, and schedules</li>
            <li>Users search for buses based on departure/arrival locations and travel date</li>
            <li>Seat selection and booking confirmation with passenger information</li>
            <li>Email notifications for booking confirmation</li>
            <li>Cancellation system with refund processing</li>
        </ul>
    `,
    technologies: ['Python', 'Django', 'SQLite', 'Bootstrap', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
        { icon: 'fas fa-users-cog', text: 'Role-Based Access' },
        { icon: 'fas fa-envelope', text: 'Email Automation' }
    ],
    imageUrl: 'assets/images/projects/bus-reservation.png',
    imageAlt: 'Bus Reservation System'
},

'vehicle-detection': {
    title: 'AI Vehicle Detection and Classification',
    period: '2024',
    category: ['ai-ml'],
    shortDescription: 'High-performance vehicle detection model using YOLO architecture, achieving real-time traffic monitoring and classification for enhanced traffic management.',
    fullDescription: `
        <p>Advanced computer vision system for intelligent traffic monitoring and vehicle classification using state-of-the-art YOLO architecture, enabling real-time traffic analysis and smart city applications.</p>
        
        <h4>🚗 Detection Capabilities:</h4>
        <ul>
            <li><strong>Multi-Class Classification:</strong> Cars, trucks, motorcycles, buses, bicycles, and pedestrians</li>
            <li><strong>Real-time Processing:</strong> 30+ FPS performance on standard hardware configurations</li>
            <li><strong>High Accuracy Detection:</strong> 95%+ accuracy across different weather and lighting conditions</li>
            <li><strong>Size Estimation:</strong> Vehicle dimension analysis for load monitoring and compliance</li>
            <li><strong>Speed Detection:</strong> Real-time speed calculation using consecutive frame analysis</li>
        </ul>
        
        
        <h4>🔬 Technical Implementation:</h4>
        <ul>
            <li><strong>YOLO Architecture:</strong> YOLOv8 implementation optimized for vehicle detection</li>
            <li><strong>Custom Training:</strong> Fine-tuned on Indian traffic scenarios and vehicle types</li>
            <li><strong>OpenCV Integration:</strong> Advanced image processing and video stream handling</li>
            <li><strong>Multi-Camera Support:</strong> Simultaneous processing from multiple traffic cameras</li>
            <li><strong>Edge Computing:</strong> Optimized for deployment on traffic monitoring hardware</li>
        </ul>
        
        
        <h4>📈 Performance Metrics:</h4>
        <ul>
            <li>95%+ detection accuracy across all vehicle categories</li>
            <li>Real-time processing at 30-60 FPS on GPU-enabled systems</li>
            <li>24/7 continuous monitoring capability with 99.5% uptime</li>
            <li>Support for 4K video streams with minimal latency</li>
        </ul>
        
        <h4>🌐 Integration & Deployment:</h4>
        <ul>
            <li>REST API for integration with smart city platforms</li>
            <li>Real-time data streaming to traffic management centers</li>
            <li>Mobile app integration for citizen traffic updates</li>
            <li>Cloud deployment with scalable processing capabilities</li>
        </ul>
    `,
    technologies: ['YOLO', 'Python', 'OpenCV', 'Computer Vision', 'TensorFlow', 'NumPy', 'PyTorch'],
    highlights: [
        { icon: 'fas fa-car', text: 'Real-time Detection' },
        { icon: 'fas fa-traffic-light', text: 'Traffic Management' }
    ],
    imageUrl: 'assets/images/projects/vehicle-detection.jpg',
    imageAlt: 'Vehicle Detection'
},

'covid-analysis': {
    title: 'COVID-19 Vaccine Analysis',
    period: '2023',
    category: ['research'],
    shortDescription: 'In-depth data analysis of vaccination trends using Python, providing actionable insights through effective data visualization and interactive dashboards.',
    fullDescription: `
        <p>Comprehensive epidemiological data analysis project examining COVID-19 vaccination patterns, effectiveness metrics, and public health outcomes through advanced statistical analysis and interactive visualization techniques.</p>
        
        <h4>📊 Analysis Components:</h4>
        <ul>
            <li><strong>Vaccination Rate Analysis:</strong> Demographic breakdowns by age, gender, location, and socioeconomic factors</li>
            <li><strong>Efficacy Comparison:</strong> Statistical evaluation of different vaccine types and their effectiveness rates</li>
            <li><strong>Geographic Distribution:</strong> Spatial analysis of vaccination coverage and regional disparities</li>
            <li><strong>Time-Series Analysis:</strong> Temporal trends in vaccination adoption and hesitancy patterns</li>
            <li><strong>Breakthrough Case Analysis:</strong> Post-vaccination infection rates and severity assessment</li>
        </ul>
        
        <h4>📈 Data Processing & Methodology:</h4>
        <ul>
            <li><strong>Data Sources:</strong> Integration of multiple healthcare databases and government registries</li>
            <li><strong>Statistical Analysis:</strong> Regression analysis, correlation studies, and significance testing</li>
            <li><strong>Data Cleaning:</strong> Comprehensive preprocessing pipeline for missing data and outlier handling</li>
            <li><strong>Predictive Modeling:</strong> Machine learning models for vaccination uptake prediction</li>
        </ul>
        
        <h4>📊 Interactive Visualizations:</h4>
        <ul>
            <li><strong>Dynamic Dashboards:</strong> Real-time updating charts with user-controlled filtering</li>
            <li><strong>Geographic Heat Maps:</strong> Interactive maps showing vaccination coverage by region</li>
            <li><strong>Trend Analysis Charts:</strong> Time-series visualizations with forecasting capabilities</li>
            <li><strong>Comparative Analysis:</strong> Side-by-side vaccine effectiveness and safety comparisons</li>
            <li><strong>Demographic Insights:</strong> Interactive population-based analysis tools</li>
        </ul>
        
        <h4>🔬 Research Findings & Impact:</h4>
        <ul>
            <li><strong>Vaccine Effectiveness:</strong> Quantified protection rates across different demographics</li>
            <li><strong>Optimal Dosing Intervals:</strong> Analysis of spacing between vaccine doses for maximum efficacy</li>
            <li><strong>Herd Immunity Thresholds:</strong> Population-level vaccination requirements for community protection</li>
            <li><strong>Public Health Recommendations:</strong> Evidence-based policy suggestions for vaccination campaigns</li>
        </ul>
        
        <h4>📚 Technical Implementation:</h4>
        <ul>
            <li><strong>Data Processing:</strong> Pandas and NumPy for large-scale data manipulation</li>
            <li><strong>Statistical Analysis:</strong> SciPy and Statsmodels for advanced statistical testing</li>
            <li><strong>Visualization Framework:</strong> Matplotlib, Seaborn, and Plotly for comprehensive charting</li>
            <li><strong>Interactive Dashboards:</strong> Jupyter notebooks with ipywidgets for user interaction</li>
        </ul>
        
        <h4>📈 Project Outcomes:</h4>
        <ul>
            <li>Identified key factors influencing vaccination hesitancy across demographics</li>
            <li>Developed predictive models with 85%+ accuracy for vaccination uptake</li>
            <li>Created actionable insights for public health policy optimization</li>
            <li>Generated comprehensive reports adopted by local health authorities</li>
        </ul>
    `,
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Plotly', 'Jupyter', 'Seaborn', 'SciPy', 'NumPy'],
    highlights: [
        { icon: 'fas fa-chart-bar', text: 'Data Visualization' },
        { icon: 'fas fa-virus', text: 'Healthcare Analytics' }
    ],
    imageUrl: 'assets/images/projects/covid.png',
    imageAlt: 'COVID Analysis'
},

'gesture-control': {
    title: 'Gesture-Controlled Scrolling System',
    period: '2024',
    category: ['ai-ml'],
    shortDescription: 'AI-driven gesture-control system using OpenCV and MediaPipe for seamless scrolling, achieving hands-free navigation through intuitive hand-tracking.',
    fullDescription: `
        <p>Revolutionary hands-free computer interaction system utilizing advanced computer vision and machine learning for intuitive gesture recognition, enabling seamless navigation and accessibility improvements for diverse user needs.</p>
        
        <h4>✋ Gesture Recognition Capabilities:</h4>
        <ul>
            <li><strong>Real-time Hand Tracking:</strong> MediaPipe-powered 21-point hand landmark detection</li>
            <li><strong>Multi-Gesture Support:</strong> Scroll, click, zoom, swipe, and custom gesture commands</li>
            <li><strong>Gesture Intensity Mapping:</strong> Variable speed control based on hand movement dynamics</li>
            <li><strong>Bi-directional Control:</strong> Vertical and horizontal scrolling with precision control</li>
            <li><strong>Custom Gesture Training:</strong> User-defined gesture creation and calibration system</li>
        </ul>
        
        <h4>🔧 Technical Architecture:</h4>
        <ul>
            <li><strong>Computer Vision Pipeline:</strong> OpenCV-based image processing and hand detection</li>
            <li><strong>MediaPipe Integration:</strong> Google's MediaPipe framework for robust hand tracking</li>
            <li><strong>Real-time Processing:</strong> Optimized algorithms for low-latency gesture recognition</li>
            <li><strong>Adaptive Calibration:</strong> Machine learning-based user adaptation and personalization</li>
            <li><strong>Cross-Platform Support:</strong> Compatible with Windows, macOS, and Linux systems</li>
        </ul>
        
        <h4>🎯 Advanced Features:</h4>
        <ul>
            <li><strong>User Calibration System:</strong> Personalized gesture sensitivity and recognition training</li>
            <li><strong>Noise Filtering:</strong> Advanced algorithms to reduce false positives and improve accuracy</li>
            <li><strong>Multi-Application Support:</strong> Works with browsers, documents, media players, and custom applications</li>
            <li><strong>Fatigue Detection:</strong> Intelligent detection of user fatigue with automatic sensitivity adjustment</li>
        </ul>
        
        <h4>♿ Accessibility & User Experience:</h4>
        <ul>
            <li><strong>Accessibility Enhancement:</strong> Designed for users with mobility limitations and repetitive strain injuries</li>
            <li><strong>Ergonomic Design:</strong> Reduces physical strain from traditional input devices</li>
            <li><strong>Learning Curve Optimization:</strong> Intuitive gesture design for quick user adoption</li>
            <li><strong>Visual Feedback:</strong> Real-time gesture recognition indicators and status updates</li>
        </ul>
        
        <h4>📊 Performance Metrics:</h4>
        <ul>
            <li>95%+ gesture recognition accuracy in controlled environments</li>
            <li>Sub-50ms latency from gesture detection to system response</li>
            <li>Continuous operation for 8+ hours without performance degradation</li>
            <li>Support for gesture recognition in varying lighting conditions</li>
            <li>Compatible with standard webcams (720p minimum resolution)</li>
        </ul>
        
        <h4>🚀 Applications & future Use Cases:</h4>
        <ul>
            <li><strong>Content Consumption:</strong> Hands-free scrolling through social media, articles, and videos</li>
            <li><strong>Presentation Control:</strong> Remote presentation navigation and slide control</li>
            <li><strong>Gaming Integration:</strong> Gesture-based game controls and interaction</li>
            <li><strong>Medical Applications:</strong> Sterile environment control for healthcare professionals</li>
            <li><strong>Smart Home Integration:</strong> Gesture control for IoT devices and home automation</li>
        </ul>
    `,
    technologies: ['OpenCV', 'MediaPipe', 'Python', 'Computer Vision', 'NumPy', 'Machine Learning'],
    highlights: [
        { icon: 'fas fa-hand-paper', text: 'Hand Tracking' },
        { icon: 'fas fa-mobile-alt', text: 'Seemless User Experience' }
    ],
    imageUrl: 'assets/images/projects/gesture-control.jpg',
    imageAlt: 'Gesture Control'
}

        };
    }

    // ================================================================
    // RESPONSIVE HANDLING - NEW ADDITION
    // ================================================================
    
    setupResponsiveHandling() {
        console.log('📱 Setting up Projects responsive handling...');
        
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
        console.log('📐 Handling projects resize...');
        
        // Refresh project layouts
        this.refreshLayout();
        
        // Re-trigger project animations if needed
        this.refreshProjectAnimations();
        
        setTimeout(() => {
            this.isResizing = false;
        }, 300);
    }
    
    refreshLayout() {
        const projectsGrid = document.querySelector('.projects-grid');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (projectsGrid) {
            // Force grid recalculation
            projectsGrid.style.display = 'none';
            projectsGrid.offsetHeight; // Force reflow
            projectsGrid.style.display = '';
        }
        
        // Reset card states and force layout recalculation
        projectCards.forEach(card => {
            // Clear any stuck mobile styles
            card.style.transform = '';
            card.style.width = '';
            card.style.flexBasis = '';
            
            // Force layout recalculation
            card.style.display = 'none';
            card.offsetHeight; // Force reflow
            card.style.display = '';
            
            // Add transition back
            card.style.transition = 'all 0.3s ease';
        });
        
        console.log('🔄 Project layouts refreshed');
    }
    
    refreshProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (this.isElementVisible(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Re-trigger tech tag animations
                const techTags = card.querySelectorAll('.tech-tag');
                techTags.forEach(tag => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'scale(1)';
                });
                
                // Re-trigger highlight animations
                const highlights = card.querySelectorAll('.highlight-item');
                highlights.forEach(highlight => {
                    highlight.style.opacity = '1';
                    highlight.style.transform = 'translateX(0)';
                });
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
    // PROJECT IMAGES HANDLING - ENHANCED
    // ================================================================
    
    initializeProjectImages() {
        const projectImages = document.querySelectorAll('.project-img');
        
        projectImages.forEach((img, index) => {
            this.setupProjectImage(img, index);
        });
        
        console.log(`📸 Project images initialized: ${projectImages.length} images`);
    }
    
    setupProjectImage(img, index) {
    // Set initial transition
    img.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
    
    // FIX: Check if image is already loaded (critical for images with src in HTML!)
    if (img.complete && img.naturalHeight !== 0) {
        // Image already loaded before JavaScript ran
        img.style.opacity = '1';
        img.classList.add('loaded');
        this.loadedImages.add(img.src);
        console.log(`✅ Project image already loaded: ${img.alt}`);
    } else {
        // Image not loaded yet, set opacity to 0 and wait for load
        img.style.opacity = '0';
        
        // Handle successful load
        img.addEventListener('load', () => {
            setTimeout(() => {
                img.style.opacity = '1';
                img.classList.add('loaded');
                this.loadedImages.add(img.src);
                console.log(`✅ Project image loaded: ${img.alt}`);
            }, index * 100);
        });
    }
    
    // Handle load errors
    img.addEventListener('error', () => {
        console.warn(`⚠️ Project image failed: ${img.src}`);
        this.handleImageError(img);
    });
    
    // Add hover effects - PRESERVED
    this.addImageHoverEffects(img);
    
    // Setup lazy loading
    this.setupImageLazyLoading(img);
}

    handleImageError(img) {
        console.log(`⚠️ Project image failed to load: ${img.alt}`);
        
        // Create fallback gradient background with icon
        img.style.background = 'var(--gradient-primary)';
        img.style.opacity = '0.8';
        img.alt = 'Project Image - Loading...';
        
        // Add loading icon overlay
        const parent = img.closest('.project-image');
        if (parent) {
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = `
                <div class="fallback-content">
                    <i class="fas fa-image"></i>
                    <p>Project Screenshot</p>
                </div>
            `;
            fallback.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--gradient-primary);
                color: white;
                text-align: center;
                z-index: 2;
            `;
            
            parent.appendChild(fallback);
        }
    }
    
    addImageHoverEffects(img) {
        const projectCard = img.closest('.project-card');
        
        if (projectCard) {
            projectCard.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.1)';
                img.style.filter = 'brightness(1.1) contrast(1.1)';
            });
            
            projectCard.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1) contrast(1)';
            });
        }
    }
    
    setupImageLazyLoading(img) {
        if (!('IntersectionObserver' in window)) {
            this.loadImage(img);
            return;
        }
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px'
        });
        
        imageObserver.observe(img);
        this.observers.push(imageObserver);
    }
    
    loadImage(img) {
        // If image has data-src, use lazy loading
        if (img.dataset.src && !img.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        // Force load if src exists but image hasn't loaded
        if (img.src && !img.complete && !this.loadedImages.has(img.src)) {
            const newImg = new Image();
            newImg.onload = () => {
                img.src = newImg.src;
                this.loadedImages.add(img.src);
            };
            newImg.onerror = () => {
                this.handleImageError(img);
            };
            newImg.src = img.src;
        }
    }

    // ================================================================
    // FILTER SYSTEM - YOUR WORKING VERSION PRESERVED
    // ================================================================
    
    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const filter = button.getAttribute('data-filter');
                this.applyFilter(filter, button);
                
                console.log(`🔧 Filter applied: ${filter}`);
                this.trackEvent('project_filter_changed', { filter });
            });
        });
        
        console.log(`✅ Project filters initialized: ${filterButtons.length} buttons`);
    }
    
    applyFilter(filter, activeButton) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
        
        // Filter projects with smooth animations
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category') || '';
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                setTimeout(() => {
                    this.showProject(card);
                }, index * 100);
            } else {
                this.hideProject(card);
            }
        });
        
        // Update stats
        this.updateProjectStats(filter);
        
        this.currentFilter = filter;
    }
    
    showProject(card) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.9)';
        
        // Trigger reflow
        card.offsetHeight;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 50);
    }
    
    hideProject(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px) scale(0.9)';
        
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    }

    // ================================================================
    // PROJECT CARDS INTERACTION - YOUR WORKING VERSION
    // ================================================================
    
    initializeProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            // Setup hover effects - PRESERVED
            this.setupCardHoverEffects(card);
            
            // Setup click handlers - PRESERVED
            this.setupCardClickHandlers(card);
            
            // Setup scroll animations - PRESERVED
            this.setupCardScrollAnimation(card, index);
        });
        
        console.log(`✅ Project cards initialized: ${projectCards.length} cards`);
    }
    
    setupCardHoverEffects(card) {
        card.addEventListener('mouseenter', () => {
            // Enhanced card hover with image effects
            card.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Animate tech tags
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                    tag.style.opacity = '1';
                }, index * 50);
            });
            
            // Animate highlights
            const highlights = card.querySelectorAll('.highlight-item');
            highlights.forEach((highlight, index) => {
                setTimeout(() => {
                    highlight.style.transform = 'translateX(0)';
                    highlight.style.opacity = '1';
                }, index * 75);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            // Reset tech tags
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });
    }
    
    setupCardClickHandlers(card) {
        // PRESERVED: Card click for viewing details
        card.addEventListener('click', (e) => {
            // Prevent double-click issues
            if (e.detail > 1) return;
            
            const projectTitle = card.querySelector('h3')?.textContent;
            const projectId = this.getProjectIdFromTitle(projectTitle);
            
            // Add click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            console.log(`📸 Project card clicked: ${projectTitle}`);
            
            // Show project details
            if (projectId && this.projectDatabase[projectId]) {
                this.showProjectModal(projectId);
            }
            
            this.trackEvent('project_card_clicked', { 
                project: projectTitle,
                projectId: projectId 
            });
        });
        
        // Add visual feedback for clickable cards
        card.style.cursor = 'pointer';
        card.setAttribute('title', 'Click to view project details');
    }
    
    getProjectIdFromTitle(title) {
        // Find project ID based on title
        for (const [id, project] of Object.entries(this.projectDatabase)) {
            if (project.title === title) {
                return id;
            }
        }
        return null;
    }
    
    setupCardScrollAnimation(card, index) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedProjects.has(card)) {
                    setTimeout(() => {
                        this.animateProjectCard(entry.target);
                        this.animatedProjects.add(card);
                    }, index * 150);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        observer.observe(card);
        this.observers.push(observer);
    }
    
    animateProjectCard(card) {
        card.style.transition = 'all 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Animate internal elements with stagger
        const highlights = card.querySelectorAll('.highlight-item');
        highlights.forEach((highlight, index) => {
            highlight.style.opacity = '0';
            highlight.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                highlight.style.transition = 'all 0.4s ease';
                highlight.style.opacity = '1';
                highlight.style.transform = 'translateX(0)';
            }, 300 + (index * 100));
        });
        
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.3s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
            }, 500 + (index * 50));
        });
    }

    // ================================================================
    // MODAL SYSTEM - YOUR WORKING VERSION PRESERVED
    // ================================================================
    
    showProjectModal(projectId) {
        const project = this.projectDatabase[projectId];
        if (!project) {
            console.error(`❌ Project not found: ${projectId}`);
            return;
        }
        
        // Create modal
        const modal = this.createProjectModal(project);
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        console.log(`📝 Modal opened for project: ${project.title}`);
        this.trackEvent('project_modal_opened', { projectId, title: project.title });
    }
    
    createProjectModal(project) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-body">
                    ${this.generateModalContent(project)}
                </div>
            </div>
        `;
        
        // Setup close functionality
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.body.classList.remove('modal-open');
            }, 300);
        };
        
        overlay.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);
        
        // Escape key handling
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        document.body.classList.add('modal-open');
        
        return modal;
    }
    
   generateModalContent(project) {
    console.log('🔧 Generating modal content for:', project.title);
    
    // Generate technologies with unique modal classes
    const techTags = project.technologies ? project.technologies.map(tech => 
        `<span class="modal-tech-tag">${tech}</span>`
    ).join('') : '<p>No technologies listed</p>';
    
    // Generate highlights with unique modal classes
    const highlights = project.highlights ? project.highlights.map(highlight => 
        `<div class="modal-highlight-item">
            <i class="${highlight.icon}"></i>
            <span>${highlight.text}</span>
        </div>`
    ).join('') : '<p>No highlights available</p>';

    return `
        <div class="modal-project">
            <!-- Modal Header -->
            <div class="modal-header">
                <div class="modal-badges">
                    ${project.featured ? '<span class="status-badge featured">Featured</span>' : ''}
                    ${project.new ? '<span class="status-badge new">New</span>' : ''}
                </div>
                <h2>${project.title}</h2>
                <p class="modal-period">${project.period}</p>
            </div>

            <!-- Modal Content Body -->
            <div class="modal-content-body">
                ${project.imageUrl ? `
                    <div class="modal-image">
                        <img src="${project.imageUrl}" alt="${project.imageAlt || project.title}" class="modal-project-img">
                    </div>
                ` : ''}
                
                <div class="modal-description">
                    ${project.fullDescription}
                </div>

                <!-- FIXED: Key Highlights Section with unique classes -->
                <div class="modal-highlights-section">
                    <h4><i class="fas fa-star"></i> Key Highlights</h4>
                    <div class="modal-highlights-grid">
                        ${highlights}
                    </div>
                </div>

                <!-- FIXED: Technologies Section with unique classes -->
                <div class="modal-tech-section">
                    <h4><i class="fas fa-tools"></i> Technologies Used</h4>
                    <div class="modal-tech-tags">
                        ${techTags}
                    </div>
                </div>
            </div>
        </div>
    `;
}


    // ================================================================
    // ALL OTHER METHODS - PRESERVED FROM YOUR VERSION
    // ================================================================
    
    initializeStats() {
        const statItems = document.querySelectorAll('.project-stats .stat-item');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsContainer = document.querySelector('.project-stats');
        if (statsContainer) {
            statsObserver.observe(statsContainer);
            this.observers.push(statsObserver);
        }
        
        console.log(`✅ Project stats initialized: ${statItems.length} stats`);
    }
    
    animateStats() {
        const statNumbers = document.querySelectorAll('.project-stats .stat-number');
        
        statNumbers.forEach((stat, index) => {
            const finalText = stat.textContent;
            const hasPlus = finalText.includes('+');
            const hasPercent = finalText.includes('%');
            let targetValue = parseFloat(finalText.replace(/[+%]/g, ''));
            
            if (isNaN(targetValue)) return;
            
            setTimeout(() => {
                this.animateNumber(stat, 0, targetValue, 1500, hasPlus, hasPercent);
            }, index * 200);
        });
        
        console.log('📊 Project stats animation completed');
    }
    
    updateProjectStats(filter) {
        // Update stats based on current filter
        const visibleProjects = document.querySelectorAll(
            filter === 'all' 
                ? '.project-card[style*="opacity: 1"], .project-card:not([style*="display: none"])' 
                : `.project-card[data-category*="${filter}"][style*="opacity: 1"], .project-card[data-category*="${filter}"]:not([style*="display: none"])`
        );
        
        const totalStat = document.querySelector('.project-stats .stat-item:first-child .stat-number');
        if (totalStat) {
            const count = Math.max(visibleProjects.length, 1);
            this.animateNumber(totalStat, 0, count, 500, true, false);
        }
    }

    setupScrollAnimations() {
        // Animate section header
        const sectionHeader = document.querySelector('#projects .section-header');
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
        const badge = document.querySelector('#projects .section-badge');
        const title = document.querySelector('#projects .section-title');
        const line = document.querySelector('#projects .section-line');
        const subtitle = document.querySelector('#projects .section-subtitle');
        
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

    animateNumber(element, start, end, duration, hasPlus = false, hasPercent = false) {
        const startTime = Date.now();
        const range = end - start;
        
        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * easeOutCubic);
            
            let displayValue = Math.floor(current).toString();
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        updateNumber();
    }
    
    trackEvent(eventName, eventData = {}) {
        console.log(`📊 Projects Event tracked: ${eventName}`, eventData);
        // Integration point for analytics
    }

    setupEventListeners() {
        // UPDATED: Removed the direct resize handler (now in setupResponsiveHandling)
        console.log('✅ Projects event listeners setup complete');
    }

    // ================================================================
    // PUBLIC METHODS - YOUR WORKING VERSION PRESERVED
    // ================================================================
    
    addProject(projectId, projectData) {
        this.projectDatabase[projectId] = projectData;
        console.log(`✅ Project added: ${projectId}`);
    }
    
    removeProject(projectId) {
        delete this.projectDatabase[projectId];
        console.log(`🗑️ Project removed: ${projectId}`);
    }
    
    updateProject(projectId, updates) {
        if (this.projectDatabase[projectId]) {
            Object.assign(this.projectDatabase[projectId], updates);
            console.log(`📝 Project updated: ${projectId}`);
        }
    }
    
    getProject(projectId) {
        return this.projectDatabase[projectId];
    }
    
    getAllProjects() {
        return this.projectDatabase;
    }
    
    refreshProjects() {
        console.log('🔄 Refreshing projects display...');
        this.applyFilter(this.currentFilter, document.querySelector('.filter-btn.active'));
    }
    
    destroy() {
        console.log('🗑️ Destroying projects section...');
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        
        // Disconnect observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        // Clear timeouts
        clearTimeout(this.resizeTimeout);
        
        this.isInitialized = false;
    }
}

// ================================================================
// INITIALIZATION - PRESERVED
// ================================================================

// Initialize Projects Section
window.projectsSection = new ProjectsSection();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsSection;
}

console.log('💼 Complete Projects System loaded successfully');
