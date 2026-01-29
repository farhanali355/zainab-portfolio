// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-toggle')) {
            if (navLinks) navLinks.classList.remove('active');
            if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Active nav link on scroll
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu
                if (navLinks) {
                    navLinks.classList.remove('active');
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'var(--shadow-nav)';
            navbar.style.transform = 'translate(-50%, 0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translate(-50%, -100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translate(-50%, 0)';
            navbar.style.boxShadow = 'var(--shadow-nav)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Typing animation for hero
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        const texts = [
            'Digital Presence',
            'Search Rankings',
            'Organic Traffic',
            'Business Growth'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeText, 500);
            } else {
                setTimeout(typeText, isDeleting ? 50 : 100);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeText, 1000);
    }
    
    // Animated counter for stats
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate service cards
                if (entry.target.classList.contains('service-card')) {
                    entry.target.classList.add('visible');
                }
                
                // Animate result cards
                if (entry.target.classList.contains('result-card')) {
                    entry.target.classList.add('visible');
                    
                    // Animate counters in result cards
                    const counter = entry.target.querySelector('.result-number[data-count]');
                    if (counter && !counter.hasAttribute('data-animated')) {
                        counter.setAttribute('data-animated', 'true');
                        animateCounter(counter);
                    }
                }
                
                // Animate stat counters in hero
                if (entry.target.classList.contains('hero')) {
                    const statCounters = document.querySelectorAll('.stat-number[data-count]');
                    statCounters.forEach(counter => {
                        if (!counter.hasAttribute('data-animated')) {
                            counter.setAttribute('data-animated', 'true');
                            animateCounter(counter);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.result-card').forEach(card => observer.observe(card));
    if (document.querySelector('.hero')) observer.observe(document.querySelector('.hero'));
    
    // Service data for modals
    const servicesData = {
        'local-seo': {
            title: 'Local SEO',
            tag: 'Local Optimization',
            desc: 'Dominate local search results with optimized Google Business profiles, local citations, and location-based strategies that drive customers to your physical locations.',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: 'fas fa-search-location',
            tags: ['Google My Business', 'Local Citations', 'Review Management', 'NAP Consistency', 'Local Keywords'],
            features: [
                'Google My Business optimization',
                'Local citation building and cleanup',
                'Review generation and management',
                'Local keyword research and targeting',
                'Location page optimization',
                'Local link building strategy'
            ]
        },
        'technical-seo': {
            title: 'Technical SEO',
            tag: 'Technical Optimization',
            desc: 'Optimize website infrastructure for better crawling, indexing, and overall technical health. Improve site speed, mobile responsiveness, and technical foundation.',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: 'fas fa-cogs',
            tags: ['Site Speed', 'Mobile Optimization', 'Structured Data', 'Crawlability', 'Indexing'],
            features: [
                'Website speed optimization',
                'Mobile-first optimization',
                'Schema markup implementation',
                'XML sitemap optimization',
                'Robots.txt configuration',
                'Canonical URL implementation'
            ]
        },
        'ecommerce-seo': {
            title: 'E-commerce SEO',
            tag: 'Online Store Optimization',
            desc: 'Drive qualified traffic to your online store and increase sales through strategic product page optimization, category structure improvements, and conversion optimization.',
            image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: 'fas fa-shopping-cart',
            tags: ['Product SEO', 'Category Pages', 'Conversion Rate', 'Shopify', 'WooCommerce'],
            features: [
                'Product page SEO optimization',
                'Category page structure',
                'E-commerce site architecture',
                'Product schema implementation',
                'Image optimization for products',
                'Checkout process optimization'
            ]
        },
        'content-strategy': {
            title: 'Content Strategy',
            tag: 'Content Marketing',
            desc: 'Create and optimize content that ranks, engages, and converts your target audience through comprehensive keyword research, content planning, and optimization.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: 'fas fa-chart-line',
            tags: ['Keyword Research', 'Content Creation', 'On-Page SEO', 'Blog Strategy', 'Content Planning'],
            features: [
                'Keyword research and strategy',
                'Content calendar development',
                'On-page SEO optimization',
                'Content gap analysis',
                'Competitor content analysis',
                'Content performance tracking'
            ]
        },
        'youtube-seo': {
            title: 'YouTube SEO',
            tag: 'Video Optimization',
            desc: 'Maximize video visibility and grow your channel through optimized video titles, descriptions, tags, and comprehensive content strategy for YouTube.',
            image: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: 'fab fa-youtube',
            tags: ['Video Optimization', 'Channel Growth', 'Content Planning', 'YouTube Analytics', 'Thumbnail Design'],
            features: [
                'YouTube channel optimization',
                'Video title and description SEO',
                'Video keyword research',
                'YouTube thumbnail optimization',
                'Playlist organization',
                'YouTube analytics tracking'
            ]
        },
        'ai-seo': {
            title: 'AI-Powered SEO',
            tag: 'Artificial Intelligence',
            desc: 'Leverage artificial intelligence for advanced analytics, content creation, predictive insights, and automated optimization strategies.',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: 'fas fa-robot',
            tags: ['AI Analysis', 'Predictive Analytics', 'Automated Reporting', 'Machine Learning', 'Data Insights'],
            features: [
                'AI-powered keyword research',
                'Predictive performance analytics',
                'Automated content optimization',
                'Competitor analysis with AI',
                'Trend prediction and analysis',
                'Custom AI tool development'
            ]
        }
    };
    
    // Tools data
    const toolsData = [
        {
            name: 'SEMrush',
            desc: 'Comprehensive SEO toolkit for keyword research, competitor analysis, and site auditing',
            icon: 'fas fa-chart-bar'
        },
        {
            name: 'Ahrefs',
            desc: 'Backlink analysis, keyword research, and competitor tracking platform',
            icon: 'fas fa-link'
        },
        {
            name: 'Google Analytics',
            desc: 'Website traffic analysis and user behavior tracking',
            icon: 'fab fa-google'
        },
        {
            name: 'Screaming Frog',
            desc: 'Website crawler for technical SEO analysis and auditing',
            icon: 'fas fa-spider'
        },
        {
            name: 'Google Search Console',
            desc: 'Monitor website performance in Google search results',
            icon: 'fas fa-search'
        },
        {
            name: 'Moz Pro',
            desc: 'SEO software for tracking rankings and analyzing sites',
            icon: 'fas fa-chart-line'
        },
        {
            name: 'Surfer SEO',
            desc: 'Content optimization and on-page SEO analysis tool',
            icon: 'fas fa-wave-square'
        },
        {
            name: 'Clearscope',
            desc: 'AI-powered content optimization platform',
            icon: 'fas fa-brain'
        }
    ];
    
    // Service Modal functionality
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = serviceModal.querySelector('.modal-overlay');
    const serviceCards = document.querySelectorAll('.service-card');
    
    function openServiceModal(serviceId) {
        const service = servicesData[serviceId];
        
        if (!service) return;
        
        // Update modal content
        document.getElementById('modalServiceImage').src = service.image;
        document.getElementById('modalServiceImage').alt = service.title;
        document.getElementById('modalServiceIcon').innerHTML = `<i class="${service.icon}"></i>`;
        document.getElementById('modalServiceTag').textContent = service.tag;
        document.getElementById('modalServiceTitle').textContent = service.title;
        document.getElementById('modalServiceDesc').textContent = service.desc;
        
        // Update features
        const featuresList = document.getElementById('modalFeaturesList');
        featuresList.innerHTML = '';
        service.features.forEach(feature => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${feature}</span>
            `;
            featuresList.appendChild(featureItem);
        });
        
        // Update tags
        const serviceTags = document.getElementById('modalServiceTags');
        serviceTags.innerHTML = '';
        service.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            serviceTags.appendChild(tagElement);
        });
        
        // Show modal
        serviceModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeServiceModal() {
        serviceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners for opening service modal
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const serviceId = card.getAttribute('data-service');
            openServiceModal(serviceId);
        });
    });
    
    // Close modal events
    modalClose.addEventListener('click', closeServiceModal);
    modalOverlay.addEventListener('click', closeServiceModal);
    document.querySelector('.close-modal')?.addEventListener('click', closeServiceModal);
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceModal.style.display === 'flex') {
            closeServiceModal();
        }
    });
    
    // Tools Modal functionality
    const toolsModal = document.getElementById('toolsModal');
    const toolsBtn = document.getElementById('toolsBtn');
    const toolsModalClose = document.getElementById('toolsModalClose');
    const toolsModalOverlay = toolsModal.querySelector('.modal-overlay');
    const toolsGrid = document.getElementById('toolsGrid');
    
    // Populate tools grid
    if (toolsGrid) {
        toolsData.forEach(tool => {
            const toolItem = document.createElement('div');
            toolItem.className = 'tool-item';
            toolItem.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <h4>${tool.name}</h4>
                <p>${tool.desc}</p>
            `;
            toolsGrid.appendChild(toolItem);
        });
    }
    
    function openToolsModal() {
        toolsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeToolsModal() {
        toolsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (toolsBtn) {
        toolsBtn.addEventListener('click', openToolsModal);
    }
    if (toolsModalClose) {
        toolsModalClose.addEventListener('click', closeToolsModal);
    }
    if (toolsModalOverlay) {
        toolsModalOverlay.addEventListener('click', closeToolsModal);
    }
    
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && window.innerWidth > 768) {
            heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
    
    // Initialize
    setActiveNavLink();
    
    console.log('SEO Services website initialized successfully!');
});