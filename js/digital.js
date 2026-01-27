// Digital Marketing JavaScript - Updated for 6 services

document.addEventListener('DOMContentLoaded', function() {
    console.log('Digital Marketing Page Loaded');
    
    // 1. Set Current Year in Footer
    const currentYearElement = document.getElementById('currentYear');
    if(currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // 2. Theme Toggle Function
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    function setTheme(theme) {
        document.body.className = `theme-${theme}`;
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
    }
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Toggle theme on click
    if(themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
    // 3. Dropdown Functionality
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedCategory = document.getElementById('selectedCategory');
    const menuItems = document.querySelectorAll('.menu-item');
    const serviceContents = document.querySelectorAll('.service-content');
    
    // Toggle dropdown
    if(dropdownBtn) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
            dropdownBtn.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (dropdownBtn && dropdownMenu && 
            !dropdownBtn.contains(e.target) && 
            !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
            dropdownBtn.classList.remove('active');
        }
    });
    
    // 4. Service Switching Function
    function switchService(category) {
        console.log('Switching to:', category);
        
        // Hide all service contents
        serviceContents.forEach(content => {
            content.classList.remove('active');
            content.classList.add('hidden');
        });
        
        // Show selected service
        const targetService = document.getElementById(category);
        if (targetService) {
            targetService.classList.add('active');
            targetService.classList.remove('hidden');
        }
        
        // Update selected category text
        const selectedItem = document.querySelector(`.menu-item[data-category="${category}"]`);
        if (selectedItem && selectedCategory) {
            const categoryName = selectedItem.querySelector('span').textContent;
            selectedCategory.textContent = categoryName;
        }
        
        // Update active state in menu
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.category === category) {
                item.classList.add('active');
            }
        });
        
        // Close dropdown
        if(dropdownMenu) dropdownMenu.classList.remove('active');
        if(dropdownBtn) dropdownBtn.classList.remove('active');
        
        // Smooth scroll to service
        setTimeout(() => {
            const serviceSection = document.querySelector('.service-section');
            if(serviceSection) {
                serviceSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);
    }
    
    // 5. Menu Item Click Events
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            switchService(category);
        });
    });
    
    // 6. Stats Counter Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const originalText = stat.textContent;
            const target = parseInt(originalText.replace('+', '').replace('%', ''));
            let count = 0;
            const increment = target / 30;
            const hasPlus = originalText.includes('+');
            const hasPercent = originalText.includes('%');
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target + (hasPercent ? '%' : (hasPlus ? '+' : ''));
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(count) + (hasPercent ? '%' : (hasPlus ? '+' : ''));
                }
            }, 30);
        });
    }
    
    // Trigger stats animation when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // 7. Image Loading with Fallback
    const images = document.querySelectorAll('.service-image img');
    images.forEach(img => {
        // Add error handling
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            const serviceName = this.alt || 'Digital Marketing';
            this.src = `https://via.placeholder.com/1200x400/2563eb/ffffff?text=${encodeURIComponent(serviceName)}`;
        });
        
        // Smooth loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Force load check
        if(img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // 8. Initialize first service as active
    switchService('smm');
    
    // 9. Add hover effects to service images
    const serviceImages = document.querySelectorAll('.service-image');
    serviceImages.forEach(container => {
        const img = container.querySelector('img');
        if(img) {
            container.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });
            
            container.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        }
    });
    
    console.log('Digital Marketing functionality initialized successfully');
});