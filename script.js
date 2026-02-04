// ==========================================
// ELITETOM GADGETS - JAVASCRIPT
// Interactive Features & Animations
// ==========================================

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initFlashPopup();
    initSmoothScroll();
    initNavbarScroll();
    initProductHover();
    initRippleEffect();
});

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// === FLASH SALE POPUP ===
function initFlashPopup() {
    const popup = document.getElementById('flashPopup');
    
    // Show popup after 3 seconds
    setTimeout(() => {
        popup.classList.add('active');
    }, 3000);
}

function closeFlashPopup() {
    const popup = document.getElementById('flashPopup');
    popup.classList.remove('active');
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('flashPopup');
    if (e.target === popup) {
        closeFlashPopup();
    }
});

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to products function
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = productsSection.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// === NAVBAR SCROLL EFFECT ===
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// === PRODUCT HOVER GLOW ===
function initProductHover() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const glow = card.querySelector('.product-glow');
        
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 107, 53, 0.4), transparent 70%)`;
        });
    });
}

// === RIPPLE EFFECT ON BUTTONS ===
function initRippleEffect() {
    const buttons = document.querySelectorAll('.liquid-glass-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles dynamically
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to stylesheet dynamically
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// === PARALLAX EFFECT ON HERO ===
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// === WHATSAPP BUTTON ANIMATION ===
const whatsappBtn = document.getElementById('floatingWhatsApp');
if (whatsappBtn) {
    let isVisible = false;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > 300 && !isVisible) {
            whatsappBtn.style.transform = 'scale(1)';
            whatsappBtn.style.opacity = '1';
            isVisible = true;
        } else if (scrollPosition <= 300 && isVisible) {
            whatsappBtn.style.transform = 'scale(0)';
            whatsappBtn.style.opacity = '0';
            isVisible = false;
        }
    });
    
    // Initial state
    whatsappBtn.style.transform = 'scale(0)';
    whatsappBtn.style.opacity = '0';
    whatsappBtn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}

// === INTERACTIVE PRODUCT CARDS ===
const productBtns = document.querySelectorAll('.product-btn');
productBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Simulate product details view
        const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
        
        // Create a subtle notification
        showNotification(`Viewing details for: ${productTitle}`);
        
        // Scroll to contact section
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = contactSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 1000);
    });
});

// === NOTIFICATION SYSTEM ===
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, rgba(10, 31, 68, 0.95), rgba(26, 58, 107, 0.95));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: slideInRight 0.4s ease-out, slideOutRight 0.4s ease-out 2.6s;
        font-family: var(--font-primary);
    `;
    
    document.body.appendChild(notification);
    
    // Add animations
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// === GRADIENT CURSOR FOLLOW (Optional Enhancement) ===
let cursorGlow = null;
function initCursorGlow() {
    cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 107, 53, 0.1), transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', function(e) {
        cursorGlow.style.display = 'block';
        cursorGlow.style.left = (e.clientX - 150) + 'px';
        cursorGlow.style.top = (e.clientY - 150) + 'px';
    });
}

// Uncomment to enable cursor glow effect
// initCursorGlow();

// === IMAGE LAZY LOADING ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('.product-image');
    images.forEach(img => imageObserver.observe(img));
}

// === PERFORMANCE OPTIMIZATION ===
// Throttle scroll events
function throttle(func, wait) {
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

// === PREVENT LAYOUT SHIFT ===
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// === ANALYTICS TRACKING (Placeholder) ===
function trackEvent(category, action, label) {
    // Add your analytics tracking code here
    console.log('Event tracked:', category, action, label);
}

// Track button clicks
document.querySelectorAll('.liquid-glass-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.querySelector('.btn-text')?.textContent || 'Unknown';
        trackEvent('Button', 'Click', buttonText);
    });
});

// === ACCESSIBILITY ENHANCEMENTS ===
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFlashPopup();
    }
});

// Focus management for popup
const popup = document.getElementById('flashPopup');
if (popup) {
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeFlashPopup();
        }
    });
}

// === CONSOLE BRANDING ===
console.log('%c Elitetom Gadgets ', 'background: linear-gradient(135deg, #0A1F44, #FF6B35); color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
console.log('%c Shop Now, Flex Now 🔥 ', 'background: #FF6B35; color: white; font-size: 14px; padding: 5px 10px; border-radius: 4px;');
console.log('%c Premium Gadgets in Lagos | Visit us in Lekki & Ajah ', 'color: #0A1F44; font-size: 12px;');

// Export functions for global access
window.scrollToProducts = scrollToProducts;
window.closeFlashPopup = closeFlashPopup;
