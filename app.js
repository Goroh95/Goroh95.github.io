// Portfolio Data
const portfolioData = {
  technicalSkills: {
    labels: ["Microsoft Excel", "Анализ данных", "Power BI", "Jira", "SQL", "Python", "Английский"],
    values: [95, 90, 75, 70, 60, 55, 85]
  },
  softSkills: {
    labels: ["Коммуникация", "Оптимизация процессов", "Быстрое обучение", "Лидерство", "Решение проблем"],
    values: [95, 95, 95, 90, 90]
  },
  chartColors: ['#4A6B3A', '#6B8F52', '#8FB36D', '#B3D68A']
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initCharts();
  setupSmoothScrolling();
  setupInteractiveElements();
  
  // Observe elements as they enter viewport
  setupScrollAnimations();
  
  // Activate navbar based on scroll position
  window.addEventListener('scroll', debounce(updateActiveNavItem, 100));
});

// Initialize Charts using Chart.js
function initCharts() {
  // Bar Chart for Technical Skills
  const technicalSkillsCtx = document.getElementById('technicalSkillsChart');
  if (technicalSkillsCtx) {
    new Chart(technicalSkillsCtx, {
      type: 'bar',
      data: {
        labels: portfolioData.technicalSkills.labels,
        datasets: [{
          label: 'Уровень навыка (%)',
          data: portfolioData.technicalSkills.values,
          backgroundColor: portfolioData.chartColors[0],
          borderColor: portfolioData.chartColors[1],
          borderWidth: 1,
          borderRadius: 5,
          barThickness: 20,
          maxBarThickness: 30,
          hoverBackgroundColor: portfolioData.chartColors[2]
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
            backgroundColor: '#2A2A2A',
            titleColor: '#FFFFFF',
            bodyColor: '#D0D0D0',
            borderColor: '#4A6B3A',
            borderWidth: 1,
            cornerRadius: 6,
            padding: 10
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#D0D0D0'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#D0D0D0'
            }
          }
        }
      }
    });
  }

  // Radar Chart for Soft Skills
  const softSkillsCtx = document.getElementById('softSkillsChart');
  if (softSkillsCtx) {
    new Chart(softSkillsCtx, {
      type: 'radar',
      data: {
        labels: portfolioData.softSkills.labels,
        datasets: [{
          label: 'Уровень навыка (%)',
          data: portfolioData.softSkills.values,
          backgroundColor: 'rgba(74, 107, 58, 0.2)',
          borderColor: '#4A6B3A',
          borderWidth: 2,
          pointBackgroundColor: '#6B8F52',
          pointBorderColor: '#FFFFFF',
          pointHoverBackgroundColor: '#8FB36D',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false,
              stepSize: 20
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#D0D0D0',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#2A2A2A',
            titleColor: '#FFFFFF',
            bodyColor: '#D0D0D0',
            borderColor: '#4A6B3A',
            borderWidth: 1,
            cornerRadius: 6,
            padding: 10
          }
        }
      }
    });
  }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Adjusting for header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Update active navigation link based on scroll position
function updateActiveNavItem() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
      link.style.color = '#4A6B3A';
    } else {
      link.style.color = '#FFFFFF';
    }
  });
}

// Setup interactive elements
function setupInteractiveElements() {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.achievement-card, .gaming-card, .contact-card, .timeline-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Add click effects to achievement cards
  const achievementCards = document.querySelectorAll('.achievement-card');
  
  achievementCards.forEach(card => {
    card.addEventListener('click', function() {
      // Add pulse animation
      this.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}

// Setup animations for elements as they enter viewport
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animation
  const animatedElements = document.querySelectorAll(
    '.achievement-card, .gaming-card, .contact-card, .timeline-item, .chart-container'
  );
  
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(element);
  });
}

// Utility: Debounce function to limit the rate at which a function can fire
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

// Update fixed navbar on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(18, 18, 18, 0.98)';
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.4)';
  } else {
    navbar.style.background = 'rgba(18, 18, 18, 0.95)';
    navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
  }
});

// Error handling for chart initialization
window.addEventListener('error', function(e) {
  if (e.message && e.message.includes('Chart')) {
    console.warn('Chart loading error:', e.message);
    
    // Try to reinitialize charts
    setTimeout(() => {
      if (typeof Chart !== 'undefined') {
        console.log('Retrying chart initialization...');
        initCharts();
      }
    }, 2000);
  }
});