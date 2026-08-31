/**
 * ========================================
 * ABDURRAHMAN.TOP - PREMIUM PORTFOLIO
 * JavaScript Functionality - Light Mode Only
 * 
 * FEATURES:
 * - Smooth Scrolling & Active Nav Links
 * - Animated Counters & Progress Bars
 * - Preloader & Scroll Effects
 * - Form Handling with AJAX & CSRF Protection
 * - Custom Cursor (Desktop)
 * - Back to Top Button
 * - Responsive Menu Handling
 * - Email Form Integration
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== CSRF TOKEN MANAGEMENT =====
    // 🔐 Fetch CSRF token from backend for form security
    async function fetchCsrfToken() {
        try {
            const response = await fetch('send-email.php?action=get_csrf');
            const data = await response.json();
            if (data.csrf_token) {
                document.getElementById('csrfToken').value = data.csrf_token;
            }
        } catch (error) {
            console.warn('Could not fetch CSRF token:', error);
        }
    }
    
    // Fetch token on page load
    fetchCsrfToken();
    
    // ===== SMOOTH SCROLLING FOR NAV LINKS =====
    // 🎯 Smooth scroll to sections when nav links are clicked
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
                
                // Smooth scroll to section with offset for fixed navbar
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    // 🎯 Highlight current section in navbar as user scrolls
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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
    
    // Use throttled scroll handler for performance
    window.addEventListener('scroll', throttle(updateActiveNav, 100));
    updateActiveNav(); // Initial call
    
    // ===== NAVBAR SCROLL EFFECT =====
    // 🎨 Add shadow to navbar when scrolled
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', throttle(handleNavbarScroll, 100));
    handleNavbarScroll(); // Initial call
    
    // ===== PRELOADER =====
    // ⏳ Hide preloader after page load with smooth transition
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Trigger animations after preloader hides
            setTimeout(initAnimations, 300);
        }, 800);
    });
    
    // ===== ANIMATED COUNTERS =====
    // 🔢 Animate numbers in stats section when visible
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds animation
            const increment = target / (duration / 16); // 60fps calculation
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            // Start animation when element is in viewport (Intersection Observer)
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // ===== ANIMATED PROGRESS BARS =====
    // 📊 Animate skill progress bars when visible
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    bar.style.width = percent + '%';
                    observer.unobserve(bar);
                }
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }
    
    // ===== SCROLL ANIMATIONS (Fade In Up) =====
    // ✨ Animate elements as they enter viewport
    function initAnimations() {
        animateCounters();
        animateProgressBars();
        
        const animateElements = document.querySelectorAll('.animate-on-scroll, .skill-card, .service-card, .project-card, .timeline-item, .achievement-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
    
    // ===== BACK TO TOP BUTTON =====
    // ⬆️ Show/hide and handle click for back-to-top button
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', throttle(toggleBackToTop, 100));
    toggleBackToTop(); // Initial call
    
    // ===== CONTACT FORM HANDLING WITH AJAX =====
    // 📧 Handle form submission via AJAX with personalized email responses
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // 🧹 Get and sanitize form values
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim(),
                csrf_token: document.getElementById('csrfToken').value
            };
            
            // ✅ Client-side validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            if (formData.message.length < 10) {
                showFormStatus('Message should be at least 10 characters.', 'error');
                return;
            }
            
            // 🔄 Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            
            try {
                // 📤 Send form data to PHP backend via Fetch API
                const response = await fetch('send-email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(formData).toString()
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // ✅ Success: Show success message
                    showFormStatus(result.message, 'success');
                    contactForm.reset();
                    
                    // 🔄 Refresh CSRF token for next submission
                    fetchCsrfToken();
                    
                } else {
                    // ❌ Error: Show error message
                    if (result.errors) {
                        // Show validation errors
                        showFormStatus(result.errors.join('<br>'), 'error');
                    } else {
                        showFormStatus(result.message || 'Something went wrong. Please try again.', 'error');
                    }
                }
                
            } catch (error) {
                // 🌐 Network error fallback
                console.error('Form submission error:', error);
                showFormStatus('Network error. Please check your connection or email me directly at Contact@AbdurRahman.Top', 'error');
                
            } finally {
                // 🔁 Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // ⏱️ Auto-hide success messages after 5 seconds
                if (formStatus.classList.contains('success')) {
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
    
    // ===== EMAIL VALIDATION HELPER =====
    // ✉️ Regex pattern for email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== SHOW FORM STATUS MESSAGE =====
    // 📢 Display success/error messages with styling
    function showFormStatus(message, type) {
        formStatus.innerHTML = message;
        formStatus.className = type;
        formStatus.style.display = 'block';
        
        // 🎨 Add animation
        formStatus.style.animation = 'fadeInUp 0.3s ease';
        
        // ⏱️ Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    // ===== CUSTOM CURSOR (Desktop Only) =====
    // 🖱️ Enhanced cursor effect for desktop users
    if (window.innerWidth >= 1024) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        // Hide cursor initially to avoid jump
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
        
        // Show cursor after short delay
        setTimeout(() => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        }, 500);
        
        // Move cursor with mouse
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline follows with slight delay for smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 100, fill: "forwards" });
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .social-icon, .project-card, .service-card, .skill-card, input, textarea, .nav-link, .form-control');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }
    
    // ===== TESTIMONIAL CAROUSEL AUTO-PLAY =====
    // 🎠 Auto-rotate testimonials with pause on hover
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 6000,
            pause: 'hover',
            wrap: true,
            touch: true // Enable touch swipe on mobile
        });
    }
    
    // ===== UPDATE COPYRIGHT YEAR =====
    // 📅 Auto-update year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // ===== MOBILE MENU CLOSE ON OUTSIDE CLICK =====
    // 📱 Close mobile menu when clicking outside
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        document.addEventListener('click', (e) => {
            if (navbarCollapse.classList.contains('show')) {
                const isClickInside = navbarCollapse.contains(e.target) || 
                                     document.querySelector('.navbar-toggler').contains(e.target);
                
                if (!isClickInside) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    }
    
    // ===== KEYBOARD ACCESSIBILITY ENHANCEMENTS =====
    // ♿ Better focus indicators for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add CSS for keyboard navigation focus
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation a:focus,
        .keyboard-navigation button:focus,
        .keyboard-navigation input:focus,
        .keyboard-navigation textarea:focus {
            outline: 2px solid var(--primary) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
    
    // ===== PERFORMANCE: Lazy load images (basic implementation) =====
    // 🖼️ Lazy load images for better performance
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ===== RESIZE HANDLER FOR RESPONSIVE FIXES =====
    // 📐 Handle window resize for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Re-initialize animations on resize if needed
            // Close mobile menu if resizing to desktop
            if (window.innerWidth >= 1024) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        }, 250);
    });
    
    // ===== CONSOLE WELCOME MESSAGE =====
    // 👋 Developer message in console
    console.log(`
    ╔════════════════════════════════════════╗
    ║  🚀 AbdurRahman.Top Portfolio Loaded  ║
    ║                                        ║
    ║  Developer: AbdurRahman Md Ghufran    ║
    ║  Role: AI Engineer & Full-Stack Dev   ║
    ║  Contact: Contact@AbdurRahman.Top     ║
    ║                                        ║
    ╚════════════════════════════════════════╝
    `);
    
}); // End DOMContentLoaded

// ===== GLOBAL UTILITY FUNCTIONS =====

// 🎯 Debounce function for scroll/resize events (performance optimization)
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

// 🎯 Throttle function for performance-critical events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ERROR HANDLING & FALLBACKS =====
// 🛡️ Global error handler for better debugging
window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== TOUCH DEVICE OPTIMIZATIONS =====
// 📱 Better touch experience for mobile users
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    // Add touch-friendly hover states
    document.body.classList.add('touch-device');
    
    // Improve form input focus on mobile
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            // Scroll to input on mobile to prevent keyboard covering
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
}