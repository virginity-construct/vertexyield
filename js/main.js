/**
 * VertexYield Landing Page JavaScript
 * 
 * This file contains all the interactive functionality for the VertexYield landing page,
 * including animations, scroll effects, tooltips, and dynamic content updates.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeAnimations();
    initializeScrollEffects();
    initializeTooltips();
    initializeMetricsCounter();
    initializeParticles();
    initializeCharts();
});

/**
 * Initialize animations that should run on page load
 */
function initializeAnimations() {
    // Add animation class to hero elements
    document.querySelector('.hero-title').classList.add('animate');
    document.querySelector('.hero-subtitle').classList.add('animate');
    document.querySelector('.hero-buttons').classList.add('animate');
    
    // Animate hero metrics with delay
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.classList.add('animate');
        }, 300 + (index * 150));
    });
    
    // Animate orbit in hero visual
    const orbit = document.querySelector('.orbit');
    if (orbit) {
        orbit.classList.add('animate');
    }
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
        '.cta-content'
    ];
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% visible
        rootMargin: '-50px'
    });
    
    // Observe all elements that should animate on scroll
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            observer.observe(element);
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
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
        const duration = 2000; // 2 seconds
        const decimals = metric.getAttribute('data-decimals') || 0;
        const startValue = 0;
        
        // Animation variables
        let startTime = null;
        
        function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = startValue + (progress * (targetValue - startValue));
            
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
                    requestAnimationFrame(animateCounter);
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
 * Initialize particle background effect
 * Requires particles.js library
 */
function initializeParticles() {
    // Check if particles.js is loaded
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#8C4FFF'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#8C4FFF',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('particles.js not loaded. Particle effects will not be displayed.');
    }
}

/**
 * Initialize charts for strategy tooltips
 * Requires Chart.js library
 */
function initializeCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        const chartCanvases = document.querySelectorAll('.tooltip-chart');
        
        chartCanvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            
            // Sample data - in production, this would be loaded from an API
            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Historical APY %',
                    data: [12, 19, 15, 17, 14, 18],
                    fill: true,
                    backgroundColor: 'rgba(140, 79, 255, 0.2)',
                    borderColor: 'rgba(140, 79, 255, 1)',
                    tension: 0.4
                }]
            };
            
            // Create the chart
            new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(20, 23, 38, 0.9)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: 'rgba(140, 79, 255, 0.5)',
                            borderWidth: 1,
                            padding: 10,
                            displayColors: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.5)',
                                font: {
                                    size: 10
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                                drawBorder: false
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.5)',
                                font: {
                                    size: 10
                                }
                            }
                        }
                    }
                }
            });
        });
    } else {
        console.warn('Chart.js not loaded. Strategy charts will not be displayed.');
    }
}

/**
 * Mobile navigation toggle
 */
function toggleMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.header-nav');
    
    mobileNavToggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    document.body.classList.toggle('no-scroll', nav.classList.contains('active'));
    
    // Close mobile nav when clicking outside
    if (nav.classList.contains('active')) {
        document.addEventListener('click', closeOnClickOutside);
    } else {
        document.removeEventListener('click', closeOnClickOutside);
    }
}

/**
 * Close mobile navigation when clicking outside
 */
function closeOnClickOutside(event) {
    const nav = document.querySelector('.header-nav');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    
    // If clicking outside the nav and not on the toggle button
    if (!nav.contains(event.target) && !mobileNavToggle.contains(event.target)) {
        mobileNavToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
        document.removeEventListener('click', closeOnClickOutside);
    }
}

// Add mobile nav toggle button event listener
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelectorAll('.header-nav .nav-link');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleMobileNav();
        });
    }
    
    // Close mobile nav when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('.header-nav');
            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            
            if (nav.classList.contains('active')) {
                mobileNavToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('no-scroll');
                document.removeEventListener('click', closeOnClickOutside);
            }
        });
    });
});
