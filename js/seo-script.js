// SEO Services JavaScript - Simple & Working

document.addEventListener('DOMContentLoaded', function() {
    console.log('SEO Services Page Loaded');
    
    // 1. Set Current Year in Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
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
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    // 3. Dropdown Functionality
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedCategory = document.getElementById('selectedCategory');
    const menuItems = document.querySelectorAll('.menu-item');
    const serviceContents = document.querySelectorAll('.service-content');
    const serviceLinks = document.querySelectorAll('.service-link');
    
    // Toggle dropdown
    dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
        dropdownBtn.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
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
        dropdownMenu.classList.remove('active');
        dropdownBtn.classList.remove('active');
        
        // Smooth scroll to service
        setTimeout(() => {
            document.querySelector('.service-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
    
    // 5. Menu Item Click Events
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            switchService(category);
        });
    });
    
    // 6. Footer Service Links
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            switchService(category);
        });
    });
    
    // 7. Stats Counter Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let count = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(count) + (stat.textContent.includes('%') ? '%' : '+');
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
    
    // 8. Image Loading Animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });
    
    // 9. Initialize first service as active
    switchService('local');
    
    console.log('All functionality initialized successfully');
});