// Paid Marketing Services JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded - Debugging enabled');

    // Typed.js Animation for Hero Section
    if (document.querySelector('.typed-text')) {
        console.log('Typed text found');
        if (typeof Typed === 'undefined') {
            console.log('Loading Typed.js');
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12';
            script.onload = initTyped;
            document.head.appendChild(script);
        } else {
            initTyped();
        }
    }

    function initTyped() {
        console.log('Initializing Typed.js');
        new Typed('.typed-text', {
            strings: ['ROI', 'Conversions', 'Traffic', 'Sales', 'Leads'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Animated Counter for Stats
    const counters = document.querySelectorAll('.stat-number');
    console.log('Counters found:', counters.length);

    const startCounter = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const speed = 200;
            const increment = target / speed;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 1);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Intersection Observer for Counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Stats section in view');
                startCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.animated-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Service Data for Paid Marketing
    const servicesData = {
        'ppc-management': {
            title: 'PPC Management',
            desc: 'End-to-end Pay-Per-Click campaign management across all major platforms.',
            features: [
                'Comprehensive campaign setup & optimization',
                'Daily bid management & budget optimization',
                'A/B testing & conversion rate optimization',
                'Performance tracking & detailed reporting',
                'Competitor analysis & strategy adjustment'
            ],
            tags: ['PPC', 'Campaign Management', 'ROI Optimization', 'Bid Management']
        },
        'google-ads': {
            title: 'Google Ads Management',
            desc: 'Maximize your visibility on Google Search, Display, and Shopping networks.',
            features: [
                'Search campaign setup & optimization',
                'Google Display Network targeting',
                'Shopping feed optimization',
                'Remarketing strategies',
                'Quality score improvement'
            ],
            tags: ['Google Ads', 'Search Ads', 'Display Network', 'Shopping Ads']
        },
        'facebook-ads': {
            title: 'Facebook & Instagram Ads',
            desc: 'Targeted social media advertising on Facebook and Instagram platforms.',
            features: [
                'Audience research & targeting',
                'Creative ad design & copywriting',
                'Conversion tracking setup',
                'Lookalike audience creation',
                'Campaign scaling strategies'
            ],
            tags: ['Facebook Ads', 'Instagram Ads', 'Social Media', 'Targeting']
        },
        'linkedin-ads': {
            title: 'LinkedIn Advertising',
            desc: 'B2B focused advertising on the world\'s largest professional network.',
            features: [
                'Company page optimization',
                'Sponsored Content campaigns',
                'Message Ads for direct outreach',
                'Account-based marketing',
                'Lead generation forms'
            ],
            tags: ['LinkedIn Ads', 'B2B Marketing', 'Professional Network', 'Lead Gen']
        },
        'youtube-ads': {
            title: 'YouTube Advertising',
            desc: 'Video advertising on the world\'s largest video platform.',
            features: [
                'TrueView in-stream & discovery ads',
                'Bumper ad creation',
                'Video production guidance',
                'Audience targeting strategies',
                'YouTube analytics optimization'
            ],
            tags: ['YouTube Ads', 'Video Marketing', 'TrueView', 'Video Content']
        },
        'amazon-ads': {
            title: 'Amazon PPC Advertising',
            desc: 'Maximize product visibility and sales on Amazon marketplace.',
            features: [
                'Sponsored Products campaigns',
                'Sponsored Brands setup',
                'Amazon DSP advertising',
                'Product targeting optimization',
                'Amazon ACoS management'
            ],
            tags: ['Amazon Ads', 'E-commerce', 'Sponsored Products', 'Marketplace']
        }
    };

    // Tools Data for Paid Marketing
    const toolsData = [
        {
            name: 'Google Ads Editor',
            desc: 'Bulk editing and campaign management tool',
            icon: 'fab fa-google'
        },
        {
            name: 'Facebook Ads Manager',
            desc: 'Comprehensive Facebook advertising platform',
            icon: 'fab fa-facebook'
        },
        {
            name: 'LinkedIn Campaign Manager',
            desc: 'B2B advertising management platform',
            icon: 'fab fa-linkedin'
        },
        {
            name: 'Amazon Advertising Console',
            desc: 'Amazon marketplace PPC management',
            icon: 'fab fa-amazon'
        },
        {
            name: 'Google Analytics 4',
            desc: 'Advanced tracking and analytics platform',
            icon: 'fas fa-chart-pie'
        },
        {
            name: 'SEMrush',
            desc: 'Competitor research and PPC intelligence',
            icon: 'fas fa-search-dollar'
        }
    ];

    // Service Card Click Event
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');

    console.log('Service cards found:', serviceCards.length);
    console.log('Service modal:', serviceModal);

    if (serviceCards.length > 0 && serviceModal) {
        serviceCards.forEach(card => {
            card.addEventListener('click', function(e) {
                console.log('Card clicked');
                const serviceType = this.getAttribute('data-service');
                console.log('Service type:', serviceType);
                const service = servicesData[serviceType];
                
                if (service) {
                    openServiceModal(service, serviceType);
                }
            });
        });
    }

    // Open Service Modal Function
    function openServiceModal(service, serviceType) {
        console.log('Opening modal for:', service.title);
        
        document.getElementById('modalServiceTitle').textContent = service.title;
        document.getElementById('modalServiceDesc').textContent = service.desc;
        document.getElementById('modalServiceTag').textContent = service.title;
        
        // Set image
        const cardImage = document.querySelector(`[data-service="${serviceType}"] img`);
        if (cardImage && document.getElementById('modalServiceImage')) {
            document.getElementById('modalServiceImage').src = cardImage.src;
            document.getElementById('modalServiceImage').alt = service.title;
        }

        // Set icon
        const modalIcon = document.getElementById('modalServiceIcon');
        const iconMap = {
            'ppc-management': 'fas fa-chart-line',
            'google-ads': 'fab fa-google',
            'facebook-ads': 'fab fa-facebook',
            'linkedin-ads': 'fab fa-linkedin',
            'youtube-ads': 'fab fa-youtube',
            'amazon-ads': 'fab fa-amazon'
        };
        if (modalIcon) {
            modalIcon.innerHTML = `<i class="${iconMap[serviceType] || 'fas fa-search-dollar'}"></i>`;
        }

        // Add features
        const featuresList = document.getElementById('modalFeaturesList');
        if (featuresList) {
            featuresList.innerHTML = '';
            service.features.forEach(feature => {
                const featureItem = document.createElement('div');
                featureItem.className = 'feature-item';
                featureItem.innerHTML = `
                    <div class="feature-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <span>${feature}</span>
                `;
                featuresList.appendChild(featureItem);
            });
        }

        // Add tags
        const tagsContainer = document.getElementById('modalServiceTags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            service.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'service-tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
        }

        // Show modal
        if (serviceModal) {
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Modal shown');
        }
    }

    // Close Service Modal
    function closeServiceModal() {
        if (serviceModal) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeServiceModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeServiceModal);
    }

    // Escape key close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && serviceModal && serviceModal.classList.contains('active')) {
            closeServiceModal();
        }
    });

    // Tools Modal Functionality
    const toolsBtn = document.getElementById('toolsBtn');
    const toolsModal = document.getElementById('toolsModal');
    const toolsModalClose = document.getElementById('toolsModalClose');
    const toolsOverlays = document.querySelectorAll('.modal-overlay');
    const toolsGrid = document.getElementById('toolsGrid');

    console.log('Tools button:', toolsBtn);
    console.log('Tools modal:', toolsModal);

    // Populate Tools Grid
    if (toolsGrid) {
        toolsGrid.innerHTML = '';
        toolsData.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <h3 class="tool-name">${tool.name}</h3>
                <p class="tool-desc">${tool.desc}</p>
            `;
            toolsGrid.appendChild(toolCard);
        });
    }

    // Open Tools Modal
    if (toolsBtn && toolsModal) {
        toolsBtn.addEventListener('click', function(e) {
            console.log('Tools button clicked');
            e.stopPropagation();
            toolsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Tools Modal
    function closeToolsModal() {
        if (toolsModal) {
            toolsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (toolsModalClose) {
        toolsModalClose.addEventListener('click', closeToolsModal);
    }
    
    if (toolsOverlays.length > 1) {
        toolsOverlays[1].addEventListener('click', closeToolsModal);
    }

    // Escape key close for tools
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && toolsModal && toolsModal.classList.contains('active')) {
            closeToolsModal();
        }
    });

    // ========== DARK/LIGHT MODE FIXED CODE ==========
    // Theme Toggle Functionality - FIXED
    const themeToggle = document.getElementById('themeToggle');
    console.log('Theme toggle found:', themeToggle);

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check saved theme first - FIXED CLASS NAME
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode'); // Use 'dark-mode' not 'dark-theme'
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            console.log('Dark mode loaded from localStorage');
        }

        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            
            // Toggle 'dark-mode' class (CSS mein yehi class hai)
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
                console.log('Dark mode activated');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
                console.log('Light mode activated');
            }
        });
    }
    // ========== DARK/LIGHT MODE FIX END ==========

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navRight = document.querySelector('.nav-right');

    if (mobileToggle && navRight) {
        mobileToggle.addEventListener('click', function() {
            navRight.classList.toggle('active');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-right') && !e.target.closest('.mobile-toggle') && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navRight && navRight.classList.contains('active')) {
                    navRight.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Add hover effect for service cards
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Add animation to result cards
    const resultCards = document.querySelectorAll('.result-card');
    if (resultCards.length > 0) {
        const resultObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate result numbers
                    const numberElement = entry.target.querySelector('.result-number');
                    if (numberElement && numberElement.getAttribute('data-count')) {
                        const target = +numberElement.getAttribute('data-count');
                        const increment = target / 100;
                        let current = 0;

                        const updateNumber = () => {
                            if (current < target) {
                                current += increment;
                                numberElement.textContent = Math.ceil(current);
                                setTimeout(updateNumber, 10);
                            } else {
                                numberElement.textContent = target;
                            }
                        };

                        updateNumber();
                    }
                }
            });
        }, { threshold: 0.3 });

        resultCards.forEach(card => resultObserver.observe(card));
    }

    // Add CSS for animations - FIXED DARK MODE VARIABLES
    const style = document.createElement('style');
    style.textContent = `
        .service-card {
            transition: transform 0.3s ease;
        }
        
        .tool-card {
            transition: transform 0.3s ease;
        }
        
        .tool-card:hover {
            transform: translateY(-5px);
        }
        
        .service-modal,
        .tools-modal {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .service-modal.active,
        .tools-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .service-modal .modal-container,
        .tools-modal .modal-container {
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }
        
        .service-modal.active .modal-container,
        .tools-modal.active .modal-container {
            transform: translateY(0);
        }
        
        .nav-right.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--primary-bg);
            padding: 1rem;
            box-shadow: var(--shadow-nav);
            z-index: 1000;
        }
        
        .dark-mode .nav-right.active {
            background: rgba(10, 10, 10, 0.95);
        }
        
        .result-card.animated {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Tooltip styles */
        .tooltip {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-color);
            color: var(--primary-bg);
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            pointer-events: none;
            z-index: 100;
        }
        
        .tooltip:before {
            content: '';
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 0 5px 5px 5px;
            border-style: solid;
            border-color: transparent transparent var(--accent-color) transparent;
        }
        
        .nav-icon {
            position: relative;
        }
        
        .nav-icon:hover .tooltip {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(style);
});