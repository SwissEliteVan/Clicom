/**
 * Main JavaScript — Clic COM
 *
 * Fonctionnalités:
 * - Navigation mobile toggle
 * - FAQ Accordion
 * - Sticky CTA mobile
 * - Scroll effects (navbar shadow)
 * - Form validation client-side
 * - Smooth scroll (optionnel)
 *
 * Budget: < 25KB non minifié
 */

(function() {
    'use strict';

    // ============================================
    // NAVIGATION MOBILE
    // ============================================

    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    const iconMenu = document.querySelector('.icon-menu');
    const iconClose = document.querySelector('.icon-close');

    if (navbarToggle && navbarNav) {
        navbarToggle.addEventListener('click', function() {
            const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';

            navbarToggle.setAttribute('aria-expanded', !isExpanded);
            navbarNav.classList.toggle('active');

            // Toggle icons
            if (iconMenu && iconClose) {
                iconMenu.style.display = isExpanded ? 'block' : 'none';
                iconClose.style.display = isExpanded ? 'none' : 'block';
            }
        });

        // Close menu on click outside
        document.addEventListener('click', function(e) {
            if (!navbarToggle.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarToggle.setAttribute('aria-expanded', 'false');
                navbarNav.classList.remove('active');
                if (iconMenu && iconClose) {
                    iconMenu.style.display = 'block';
                    iconClose.style.display = 'none';
                }
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbarNav.classList.contains('active')) {
                navbarToggle.setAttribute('aria-expanded', 'false');
                navbarNav.classList.remove('active');
                if (iconMenu && iconClose) {
                    iconMenu.style.display = 'block';
                    iconClose.style.display = 'none';
                }
                navbarToggle.focus();
            }
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================

    const navbar = document.querySelector('.navbar');

    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            const answer = question.nextElementSibling;

            // Close all other FAQs (optional: single-open mode)
            // Uncomment below to enable single-open mode
            /*
            faqQuestions.forEach(function(q) {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.setAttribute('aria-hidden', 'true');
                }
            });
            */

            // Toggle current FAQ
            question.setAttribute('aria-expanded', !isExpanded);
            answer.setAttribute('aria-hidden', isExpanded);
        });
    });

    // ============================================
    // STICKY CTA MOBILE
    // ============================================

    const stickyCTA = document.querySelector('.sticky-cta');
    const stickyCTAClose = document.querySelector('.sticky-cta-close');
    const STICKY_CTA_STORAGE_KEY = 'clicom_sticky_cta_dismissed';

    if (stickyCTA) {
        // Check if user has dismissed the CTA
        const isDismissed = localStorage.getItem(STICKY_CTA_STORAGE_KEY) === 'true';

        if (!isDismissed) {
            // Show CTA after scrolling 50vh
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const viewportHeight = window.innerHeight;

                // Don't show on /contact/ or /merci/
                const currentPath = window.location.pathname;
                if (currentPath.includes('/contact') || currentPath.includes('/merci')) {
                    return;
                }

                if (scrollTop > viewportHeight * 0.5) {
                    stickyCTA.classList.add('active');
                } else {
                    stickyCTA.classList.remove('active');
                }
            }, { passive: true });
        }

        // Close button
        if (stickyCTAClose) {
            stickyCTAClose.addEventListener('click', function() {
                stickyCTA.classList.remove('active');
                localStorage.setItem(STICKY_CTA_STORAGE_KEY, 'true');
            });
        }
    }

    // ============================================
    // FORM VALIDATION (Client-side)
    // ============================================

    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        // Set timestamp when form loads (anti-bot)
        const timestampField = contactForm.querySelector('input[name="form_timestamp"]');
        if (timestampField) {
            timestampField.value = Date.now();
        }

        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const errors = [];

            // Clear previous errors
            const errorElements = contactForm.querySelectorAll('.form-error');
            errorElements.forEach(function(el) {
                el.remove();
            });

            // Validate name
            const nameField = contactForm.querySelector('input[name="name"]');
            if (nameField && nameField.value.trim().length < 2) {
                isValid = false;
                errors.push({ field: nameField, message: 'Veuillez entrer votre nom complet.' });
            }

            // Validate email
            const emailField = contactForm.querySelector('input[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && !emailRegex.test(emailField.value.trim())) {
                isValid = false;
                errors.push({ field: emailField, message: 'Veuillez entrer une adresse email valide.' });
            }

            // Validate message
            const messageField = contactForm.querySelector('textarea[name="message"]');
            if (messageField && messageField.value.trim().length < 10) {
                isValid = false;
                errors.push({ field: messageField, message: 'Votre message doit contenir au moins 10 caractères.' });
            }

            // Check honeypot (should be empty)
            const honeypot = contactForm.querySelector('input[name="website"]');
            if (honeypot && honeypot.value !== '') {
                isValid = false;
                e.preventDefault();
                return false;
            }

            // Display errors
            if (!isValid) {
                e.preventDefault();

                errors.forEach(function(error) {
                    const errorEl = document.createElement('span');
                    errorEl.className = 'form-error';
                    errorEl.textContent = error.message;
                    errorEl.setAttribute('role', 'alert');

                    error.field.parentNode.appendChild(errorEl);
                    error.field.focus();
                });

                return false;
            }

            // If valid, form will submit naturally
        });
    }

    // ============================================
    // SMOOTH SCROLL (Optionnel, si liens anchor #)
    // ============================================

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = link.getAttribute('href');

            // Skip if href is just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Check for reduced motion preference
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                if (prefersReducedMotion) {
                    targetElement.scrollIntoView();
                } else {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Set focus for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });

    // ============================================
    // CALENDLY IFRAME LAZY LOAD (Optionnel)
    // ============================================

    const calendlyIframe = document.querySelector('iframe[src*="calendly.com"]');

    if (calendlyIframe && 'IntersectionObserver' in window) {
        calendlyIframe.setAttribute('loading', 'lazy');

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Iframe is visible, no action needed (browser loads it)
                    observer.unobserve(calendlyIframe);
                }
            });
        });

        observer.observe(calendlyIframe);
    }

    // ============================================
    // UTILITIES
    // ============================================

    /**
     * Debounce function (performance)
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Check if user prefers reduced motion
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

})();
