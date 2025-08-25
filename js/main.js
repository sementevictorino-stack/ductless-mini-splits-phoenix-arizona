// Phoenix Ductless Mini Splits - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                } else {
                    field.style.borderColor = '#e0e0e0';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Animate counters
    const counters = document.querySelectorAll('.trust-item .number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let current = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Click to call tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'engagement',
                    'event_label': 'header_phone'
                });
            }
        });
    });

    // Form submission tracking
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'quote_request'
                });
            }
        });
    });
});

// Phone number formatting
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        const intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Get quote modal
function openQuoteModal() {
    // This would integrate with your quote form
    const quoteSection = document.querySelector('#quote-form');
    if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Service area checker
function checkServiceArea(zipCode) {
    const phoenixZipCodes = [
        85001, 85002, 85003, 85004, 85005, 85006, 85007, 85008, 85009, 85010,
        85011, 85012, 85013, 85014, 85015, 85016, 85017, 85018, 85019, 85020,
        85021, 85022, 85023, 85024, 85025, 85026, 85027, 85028, 85029, 85030,
        85031, 85032, 85033, 85034, 85035, 85036, 85037, 85038, 85039, 85040,
        85041, 85042, 85043, 85044, 85045, 85046, 85048, 85050, 85051, 85053,
        85054, 85055, 85063, 85064, 85065, 85066, 85067, 85068, 85069, 85070,
        85071, 85072, 85073, 85074, 85075, 85076, 85078, 85079, 85080, 85082,
        85083, 85085, 85086, 85087, 85201, 85202, 85203, 85204, 85205, 85206,
        85207, 85208, 85209, 85210, 85212, 85213, 85214, 85215, 85224, 85225,
        85226, 85233, 85234, 85248, 85249, 85250, 85251, 85253, 85254, 85255,
        85256, 85257, 85258, 85259, 85260, 85261, 85262, 85263, 85264, 85266,
        85267, 85268, 85269, 85295, 85296, 85297, 85298, 85299
    ];
    
    return phoenixZipCodes.includes(parseInt(zipCode));
}

// Emergency service banner
function showEmergencyBanner() {
    const banner = document.createElement('div');
    banner.className = 'emergency-alert';
    banner.innerHTML = `
        <div style="background: #dc3545; color: white; padding: 10px; text-align: center; position: fixed; top: 0; left: 0; right: 0; z-index: 9999;">
            <strong>24/7 EMERGENCY SERVICE AVAILABLE</strong> - Call Now: <a href="tel:+18889189104" style="color: #FFD700; font-weight: bold;">(888) 918-9104</a>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; float: right; font-size: 18px; cursor: pointer;">&times;</button>
        </div>
    `;
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Adjust header position
    const header = document.querySelector('.header');
    if (header) {
        header.style.top = '40px';
    }
}
