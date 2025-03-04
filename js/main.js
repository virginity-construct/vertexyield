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
        }, 800); // Add a slight delay for smoother transition
    });
    
    // Initialize all components
    initializeAnimations();
    initializeScrollEffects();
    initializeTooltips();
    initializeMetricsCounter();
    initializeParticles();
    initializeCharts();
    toggleMobileNav();
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
    if (typeof particlesJS !== 'undefined') {
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
                    "value": 0.5,
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
                        "enable": true,
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
                            "opacity": 0.6
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
        console.warn('particles.js not loaded. Particle background will not be displayed.');
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
        // Get the history data from the data attribute
        const historyData = JSON.parse(card.getAttribute('data-history'));
        const chartContainer = card.querySelector('.apy-chart');
        
        if (!chartContainer) {
            // Create chart container if it doesn't exist
            const chartDiv = document.createElement('div');
            chartDiv.className = 'apy-chart-container';
            
            const canvas = document.createElement('canvas');
            canvas.className = 'apy-chart';
            canvas.height = 100;
            
            chartDiv.appendChild(canvas);
            
            // Add chart after the APY range
            const apyRange = card.querySelector('.apy-range');
            apyRange.after(chartDiv);
            
            // Create the chart
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
                        pointBorderColor: '#4F8CFF',
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
                            backgroundColor: 'rgba(20, 23, 38, 0.9)',
                            titleColor: '#FFFFFF',
                            bodyColor: '#FFFFFF',
                            borderColor: 'rgba(140, 79, 255, 0.3)',
                            borderWidth: 1,
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
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    });
}

/**
 * Toggle mobile navigation
 */
function toggleMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;
    
    if (!mobileNavToggle || !mobileNav) return;
    
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });
    
    // Close mobile nav when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
    
    // Close mobile nav when clicking outside
    mobileNavOverlay.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
    });
}
