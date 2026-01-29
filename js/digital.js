// Digital Marketing Services JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Digital Marketing Script loaded');

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
            strings: ['Brand Awareness', 'Engagement', 'Leads', 'Sales', 'Growth'],
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

    // Service Data for Digital Marketing
    const servicesData = {
        'social-media-smm': {
            title: 'Social Media Marketing (SMM)',
            desc: 'Strategic social media management to build brand presence, engage audiences, and drive conversions across all major platforms.',
            features: [
                'Social media strategy development',
                'Content creation & calendar management',
                'Community engagement & management',
                'Social media advertising campaigns',
                'Performance analytics & reporting'
            ],
            tags: ['Social Media', 'SMM', 'Community Management', 'Content Creation']
        },
        'email-marketing': {
            title: 'Email Marketing',
            desc: 'Targeted email campaigns to nurture leads, retain customers, and drive consistent revenue growth.',
            features: [
                'Email list building & segmentation',
                'Newsletter design & development',
                'Automated email sequences',
                'A/B testing & optimization',
                'Campaign performance tracking'
            ],
            tags: ['Email Marketing', 'Newsletters', 'Automation', 'Lead Nurturing']
        },
        'affiliate-marketing': {
            title: 'Affiliate Marketing',
            desc: 'Performance-based marketing strategies to expand your reach through partnerships and influencer collaborations.',
            features: [
                'Affiliate program setup & management',
                'Influencer partnership development',
                'Commission structure optimization',
                'Performance tracking & reporting',
                'Affiliate recruitment & training'
            ],
            tags: ['Affiliate Marketing', 'Influencers', 'Partnerships', 'Commission']
        },
        'content-marketing': {
            title: 'Content Marketing',
            desc: 'Strategic content creation and distribution to attract, engage, and retain your target audience.',
            features: [
                'Content strategy development',
                'Blog content creation & optimization',
                'Content calendar management',
                'Content distribution & promotion',
                'Performance measurement & ROI analysis'
            ],
            tags: ['Content Marketing', 'Blogging', 'Content Strategy', 'SEO Content']
        },
        'content-writing': {
            title: 'Content Writing',
            desc: 'Professional writing services for blogs, articles, website content, and digital publications.',
            features: [
                'SEO-optimized blog posts',
                'Website content writing',
                'Product descriptions',
                'Case studies & whitepapers',
                'Editing & proofreading services'
            ],
            tags: ['Content Writing', 'Blog Writing', 'SEO Writing', 'Copy']
        },
        'copywriting': {
            title: 'Copywriting',
            desc: 'Persuasive writing that converts visitors into customers and drives business growth.',
            features: [
                'Sales page copywriting',
                'Landing page optimization',
                'Email campaign copy',
                'Social media ad copy',
                'Product description writing'
            ],
            tags: ['Copywriting', 'Sales Copy', 'Conversion', 'Persuasive Writing']
        }
    };

    // Tools Data for Digital Marketing
    const toolsData = [
        {
            name: 'Hootsuite',
            desc: 'Social media management and scheduling platform',
            icon: 'fas fa-crow'
        },
        {
            name: 'Mailchimp',
            desc: 'Email marketing and automation platform',
            icon: 'fas fa-envelope'
        },
        {
            name: 'SEMrush',
            desc: 'Content marketing and SEO toolkit',
            icon: 'fas fa-search'
        },
        {
            name: 'Canva',
            desc: 'Graphic design and content creation tool',
            icon: 'fas fa-paint-brush'
        },
        {
            name: 'Google Analytics',
            desc: 'Website traffic and performance analytics',
            icon: 'fas fa-chart-line'
        },
        {
            name: 'Buffer',
            desc: 'Social media scheduling and analytics',
            icon: 'fas fa-share-alt'
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

        // Set icon based on service type
        const modalIcon = document.getElementById('modalServiceIcon');
        const iconMap = {
            'social-media-smm': 'fas fa-hashtag',
            'email-marketing': 'fas fa-envelope',
            'affiliate-marketing': 'fas fa-handshake',
            'content-marketing': 'fas fa-newspaper',
            'content-writing': 'fas fa-pen',
            'copywriting': 'fas fa-feather-alt'
        };
        if (modalIcon) {
            modalIcon.innerHTML = `<i class="${iconMap[serviceType] || 'fas fa-bullhorn'}"></i>`;
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

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    console.log('Theme toggle found:', themeToggle);

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check saved theme first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            console.log('Dark mode loaded from localStorage');
        }

        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            
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

    // Add CSS for animations
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