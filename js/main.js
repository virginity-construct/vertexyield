/**
 * VertexYield Landing Page JavaScript
 * 
 * This file contains all the interactive functionality for the VertexYield landing page,
 * including animations, scroll effects, tooltips, and dynamic content updates.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Handle loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after all content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Start animations after loading screen is hidden
            setTimeout(() => {
                initializeAnimations();
            }, 300);
        }, 1200); // Slightly longer delay for a more polished transition
    });
    
    // Initialize all components
    initializeScrollEffects();
    initializeTooltips();
    initializeMetricsCounter();
    initializeParticles();
    initializeCharts();
    initializeNavbarScroll();
    toggleMobileNav();
    
    // Ensure hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.visibility = 'visible';
        heroSection.style.display = 'flex';
    }

    // Remove any scroll event listeners that might affect section visibility
    window.onscroll = null;
});

/**
 * Initialize animations that should run on page load
 */
function initializeAnimations() {
    // Add animation class to hero elements
    document.querySelector('.hero-title').classList.add('animate');
    
    setTimeout(() => {
        document.querySelector('.hero-subtitle').classList.add('animate');
    }, 200);
    
    setTimeout(() => {
        document.querySelector('.hero-cta').classList.add('animate');
    }, 400);
    
    // Animate hero metrics with delay
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.classList.add('animate');
        }, 600 + (index * 200));
    });

    // Make sure all sections and their elements are visible
    document.querySelectorAll('.strategy-card, .feature, .whitepaper-preview, .whitepaper-highlight, .whitepaper-chapter, .cta-content').forEach(element => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.transform = 'translateY(0)';
        element.classList.add('animate');
    });
}

/**
 * Initialize scroll-based animations and effects
 */
function initializeScrollEffects() {
    // Elements to animate on scroll
    const animateElements = [
        '.strategy-card',
        '.feature',
        '.whitepaper-preview',
        '.whitepaper-highlight',
        '.whitepaper-chapter',
        '.cta-content'
    ];
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: '-50px'
    });
    
    // Observe all elements that should animate on scroll
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            // Add staggered delay based on index
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Subtle parallax for background elements
        const particles = document.querySelector('#particles-js');
        if (particles) {
            particles.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
    });
}

/**
 * Initialize navbar scroll behavior
 */
function initializeNavbarScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile nav if open
                const mobileNav = document.querySelector('.mobile-nav');
                const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
                const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
                
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileNavToggle.classList.remove('active');
                    mobileNavOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize tooltips for strategy cards
 */
function initializeTooltips() {
    const strategyCards = document.querySelectorAll('.strategy-card');
    
    strategyCards.forEach(card => {
        const infoIcon = card.querySelector('.info-icon');
        const tooltip = card.querySelector('.tooltip');
        
        if (infoIcon && tooltip) {
            // Show tooltip on hover
            infoIcon.addEventListener('mouseenter', () => {
                tooltip.classList.add('visible');
            });
            
            // Hide tooltip when mouse leaves
            infoIcon.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });
        }
    });
}

/**
 * Initialize counters for metrics in hero section
 */
function initializeMetricsCounter() {
    const metrics = document.querySelectorAll('.metric-value');
    
    metrics.forEach(metric => {
        const targetValue = parseFloat(metric.getAttribute('data-value'));
        const prefix = metric.getAttribute('data-prefix') || '';
        const suffix = metric.getAttribute('data-suffix') || '';
        const duration = 2500; // 2.5 seconds
        const decimals = metric.getAttribute('data-decimals') || 0;
        const startValue = 0;
        
        // Animation variables
        let startTime = null;
        
        function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Use easeOutExpo for more natural counting animation
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const currentValue = startValue + (easeOutExpo * (targetValue - startValue));
            
            // Format the number with commas and decimal places
            const formattedValue = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(currentValue);
            
            metric.textContent = `${prefix}${formattedValue}${suffix}`;
            
            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            }
        }
        
        // Start the animation when the metric is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay before starting the counter
                    setTimeout(() => {
                        requestAnimationFrame(animateCounter);
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(metric);
    });
}

/**
 * Initialize particles.js background
 */
function initializeParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#8C4FFF"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4F8CFF",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.error("particles.js not loaded");
    }
}

/**
 * Initialize charts for strategy tooltips
 * Requires Chart.js library
 */
function initializeCharts() {
    // Get all strategy cards with data-history attribute
    const strategyCards = document.querySelectorAll('.strategy-card[data-history]');
    
    strategyCards.forEach(card => {
        // Get APY history data
        const historyData = JSON.parse(card.getAttribute('data-history'));
        const chartContainer = document.createElement('div');
        chartContainer.className = 'strategy-chart';
        
        // Create canvas for chart
        const canvas = document.createElement('canvas');
        chartContainer.appendChild(canvas);
        
        // Add chart container to card
        card.appendChild(chartContainer);
        
        // Create chart
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'APY %',
                    data: historyData,
                    borderColor: '#8C4FFF',
                    backgroundColor: 'rgba(140, 79, 255, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#4F8CFF',
                    pointBorderColor: '#FFFFFF',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(13, 15, 26, 0.9)',
                        titleColor: '#FFFFFF',
                        bodyColor: '#FFFFFF',
                        borderColor: 'rgba(140, 79, 255, 0.3)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `APY: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false,
                        min: 0
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    });
}

/**
 * Toggle mobile navigation
 */
function toggleMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile navigation
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile navigation when clicking on overlay
    mobileNavOverlay.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Close mobile navigation when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}
