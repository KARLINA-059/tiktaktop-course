// assets/js/script.js - ENHANCED VERSION

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('TikTakTop Course - Enhanced Script Loaded');
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty or external links
            if (href === '#' || href.startsWith('http')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > 100) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== ANIMATED COUNTERS =====
    function initCounters() {
        const counterElements = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(counter => observer.observe(counter));
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target >= 1000 ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
            }
        }, stepTime);
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== RIPPLE EFFECT FOR BUTTONS =====
    function initRippleEffect() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', createRipple);
        });
    }
    
    function createRipple(e) {
        const btn = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = btn.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }
        
        btn.appendChild(circle);
    }

    // ===== COURSE CARD HOVER EFFECTS =====
    function initCourseCards() {
        const courseCards = document.querySelectorAll('.course-card, .card');
        
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }

    // ===== TESTIMONIAL CAROUSEL =====
    function initTestimonialCarousel() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        if (testimonialCards.length > 0) {
            // Show first testimonial
            testimonialCards[0].classList.add('active');
            
            // Auto rotate testimonials
            setInterval(() => {
                testimonialCards[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                testimonialCards[currentIndex].classList.add('active');
            }, 5000);
        }
    }

    // ===== NEWSLETTER FORM =====
    function initNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-section form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const submitBtn = this.querySelector('button[type="submit"]');
                const email = emailInput.value.trim();
                
                // Basic email validation
                if (!email || !isValidEmail(email)) {
                    showMessage('Please enter a valid email address', 'error');
                    return;
                }
                
                // Disable button and show loading
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Subscribing...';
                
                // Simulate API call
                setTimeout(() => {
                    // Success simulation
                    showMessage('Successfully subscribed to newsletter!', 'success');
                    emailInput.value = '';
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success state temporarily
                    submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Subscribed!';
                    submitBtn.classList.remove('btn-light');
                    submitBtn.classList.add('btn-success');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.classList.add('btn-light');
                    }, 3000);
                }, 1500);
            });
        }
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(message, type) {
        // Remove existing messages
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();
        
        // Create new message element
        const msgElement = document.createElement('div');
        msgElement.className = `form-message alert alert-${type === 'error' ? 'danger' : 'success'} mt-3`;
        msgElement.textContent = message;
        msgElement.style.cssText = `
            animation: fadeIn 0.3s ease;
            border-radius: 10px;
            padding: 12px 20px;
            margin-top: 15px;
        `;
        
        // Add to form
        const form = document.querySelector('.newsletter-section form');
        if (form) {
            form.appendChild(msgElement);
            
            // Remove after 5 seconds
            setTimeout(() => {
                msgElement.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => msgElement.remove(), 300);
            }, 5000);
        }
    }

    // ===== FLOATING PARTICLES IN HERO SECTION =====
    function createFloatingParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Clear existing particles
        const existingParticles = heroSection.querySelectorAll('.particle');
        existingParticles.forEach(p => p.remove());
        
        // Create new particles
        const particleCount = 15;
        const colors = [
            'rgba(67, 97, 238, 0.3)',    // Blue
            'rgba(115, 9, 183, 0.3)',    // Purple
            'rgba(247, 37, 133, 0.3)',   // Pink
            'rgba(76, 201, 240, 0.3)'    // Cyan
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 20 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                filter: blur(${Math.random() * 3}px);
                pointer-events: none;
                z-index: 0;
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            heroSection.appendChild(particle);
        }
        
        // Add animation keyframes
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(90deg); }
                50% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(180deg); }
                75% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(270deg); }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // ===== LAZY LOAD IMAGES =====
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                        img.classList.add('loaded');
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }

    // ===== FORM VALIDATION =====
    function initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', clearFieldError);
            });
        });
    }
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        
        // Clear previous error
        clearFieldError(e);
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, `${fieldName} is required`);
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        // Phone validation (basic)
        if (field.type === 'tel' && value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        errorElement.textContent = message;
    }
    
    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('is-invalid');
        
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.remove();
        }
    }

    // ===== PROGRESS BARS ANIMATION =====
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    
                    // Animate from 0 to target width
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = width;
                        progressBar.style.transition = 'width 1.5s ease-in-out';
                    }, 100);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    // ===== INITIALIZE ALL FEATURES =====
    function initAllFeatures() {
        initCounters();
        initRippleEffect();
        initCourseCards();
        initTestimonialCarousel();
        initNewsletterForm();
        createFloatingParticles();
        initLazyLoading();
        initFormValidation();
        initProgressBars();
        
        // Add loaded class to body for CSS animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // Start initialization
    initAllFeatures();

    // ===== RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createFloatingParticles(); // Recreate particles on resize
        }, 250);
    });

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', (e) => {
        // Scroll to top with Ctrl/Cmd + Home
        if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // ===== PERFORMANCE MONITORING =====
    window.addEventListener('load', () => {
        // Log page load performance
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    });

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.message);
        // You could send this to an error tracking service here
    });
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle
    };
}