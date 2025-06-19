// Portfolio Application JavaScript

// Language data
const languageData = {
    en: {
        skills: ["Analytical Tools", "Data Visualization", "Programming", "Project Management", "Communication", "Leadership"],
        companies: ["OAO Rudensk", "OAO INTEGRAL", "Belarusian Metallurgical Works", "Minsk Tractor Works", "OAO BelAZ", "Gomel Chemical Plant", "OAO Naftan", "OAO Grodno Azot", "OAO Belshina", "OAO Atlant"],
        cvFile: "english-cv.pdf"
    },
    ru: {
        skills: ["Аналитические инструменты", "Визуализация данных", "Программирование", "Управление проектами", "Коммуникация", "Лидерство"],
        companies: ["ОАО «Руденск»", "ОАО «ИНТЕГРАЛ»", "Белорусский металлургический завод", "Минский тракторный завод", "ОАО «БелАЗ»", "Гомельский химический завод", "ОАО «Нафтан»", "ОАО «Гродно Азот»", "ОАО «Белшина»", "ОАО «Атлант»"],
        cvFile: "russian-cv.pdf"
    }
};

// Skills and profitability data from JSON
const skillsValues = [95, 90, 85, 80, 90, 85];
const profitabilityData = [16, 14, 10, 8, 7, 6, 5, 4, 3, 2];

// Chart instances
let radarChart = null;
let barChart = null;
let profitabilityChart = null;

// Current language - CRITICAL: START WITH ENGLISH
let currentLanguage = 'en';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    // ВАЖНО: Сначала устанавливаем английский язык
    currentLanguage = 'en';
    
    // Инициализируем компоненты
    initializeLanguageToggle();
    initializeCVDownload();
    initializeSmoothScrolling();
    initializeScrollEffects();
    initializeHoverEffects();
    initializeProfessionalPhoto();
    
    // Устанавливаем правильное содержимое для английского языка
    updateLanguageContent();
    
    // Инициализируем диаграммы с задержкой
    setTimeout(() => {
        initializeCharts();
    }, 300);
});

// Language switching functionality
function initializeLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const langCurrent = langToggle.querySelector('.lang-current');
    const langOther = langToggle.querySelector('.lang-other');
    
    // Устанавливаем начальное состояние кнопки для английского языка
    langCurrent.textContent = 'EN';
    langOther.textContent = 'RU';
    
    langToggle.addEventListener('click', function() {
        console.log('Language toggle clicked, current:', currentLanguage);
        
        // Переключаем язык
        currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
        
        // Обновляем текст кнопки
        if (currentLanguage === 'en') {
            langCurrent.textContent = 'EN';
            langOther.textContent = 'RU';
        } else {
            langCurrent.textContent = 'RU';
            langOther.textContent = 'EN';
        }
        
        // Обновляем весь контент
        updateLanguageContent();
        
        // Обновляем диаграммы
        updateCharts();
        
        // Визуальная обратная связь
        langToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            langToggle.style.transform = 'scale(1)';
        }, 100);
        
        console.log('Language switched to:', currentLanguage);
    });
}

// Update all text content based on current language
function updateLanguageContent() {
    const elements = document.querySelectorAll('[data-en][data-ru]');
    
    elements.forEach(element => {
        const enText = element.getAttribute('data-en');
        const ruText = element.getAttribute('data-ru');
        
        if (currentLanguage === 'en') {
            element.textContent = enText;
        } else {
            element.textContent = ruText;
        }
    });
    
    // Обновляем заголовок документа и язык
    document.documentElement.lang = currentLanguage;
    if (currentLanguage === 'en') {
        document.title = 'Aleksey Goroshko - Data Analyst Portfolio';
    } else {
        document.title = 'Алексей Горошко - Портфолио Дата-аналитика';
    }
}

// КРИТИЧЕСКИ ВАЖНАЯ ФУНКЦИЯ CV DOWNLOAD
function initializeCVDownload() {
    const cvDownloadBtn = document.getElementById('cvDownload');
    
    cvDownloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        console.log('Download CV clicked, current language:', currentLanguage);
        
        // Определяем имя файла в зависимости от текущего языка
        const filename = currentLanguage === 'ru' ? 'russian-cv.pdf' : 'english-cv.pdf';
        
        console.log('Downloading file:', filename);
        
        // Показываем уведомление с информацией о файле
        const message = currentLanguage === 'en' 
            ? `CV download started! File: ${filename}` 
            : `Загрузка резюме началась! Файл: ${filename}`;
        
        showNotification(message);
        
        // Создаем временный элемент ссылки для скачивания
        const link = document.createElement('a');
        link.href = filename;
        link.download = filename;
        link.style.display = 'none';
        
        // Добавляем в DOM, кликаем и удаляем
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Визуальная обратная связь на кнопке
        cvDownloadBtn.style.transform = 'scale(0.95)';
        cvDownloadBtn.style.opacity = '0.8';
        
        setTimeout(() => {
            cvDownloadBtn.style.transform = 'scale(1)';
            cvDownloadBtn.style.opacity = '1';
        }, 200);
    });
}

// Initialize all charts
function initializeCharts() {
    console.log('Initializing charts...');
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    try {
        createRadarChart();
        createBarChart();
        createProfitabilityChart();
        console.log('All charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Create radar chart
function createRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) {
        console.error('Radar chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    if (radarChart) {
        radarChart.destroy();
    }
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: languageData[currentLanguage].skills,
            datasets: [{
                label: currentLanguage === 'en' ? 'Skills Level' : 'Уровень навыков',
                data: skillsValues,
                backgroundColor: 'rgba(82, 100, 29, 0.2)',
                borderColor: '#52641D',
                borderWidth: 3,
                pointBackgroundColor: '#52641D',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    min: 0,
                    grid: {
                        color: '#333333'
                    },
                    angleLines: {
                        color: '#333333'
                    },
                    pointLabels: {
                        color: '#ffffff',
                        font: {
                            size: 11,
                            weight: '500'
                        }
                    },
                    ticks: {
                        color: '#808080',
                        backdropColor: 'transparent',
                        stepSize: 20
                    }
                }
            }
        }
    });
    
    console.log('Radar chart created');
}

// Create bar chart
function createBarChart() {
    const canvas = document.getElementById('barChart');
    if (!canvas) {
        console.error('Bar chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    if (barChart) {
        barChart.destroy();
    }
    
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: languageData[currentLanguage].skills,
            datasets: [{
                label: currentLanguage === 'en' ? 'Skills Level (%)' : 'Уровень навыков (%)',
                data: skillsValues,
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                borderColor: '#52641D',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#333333'
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            weight: '500'
                        }
                    }
                },
                x: {
                    grid: {
                        color: '#333333'
                    },
                    ticks: {
                        color: '#ffffff',
                        maxRotation: 45,
                        font: {
                            weight: '500',
                            size: 11
                        }
                    }
                }
            }
        }
    });
    
    console.log('Bar chart created');
}

// Create profitability chart
function createProfitabilityChart() {
    const canvas = document.getElementById('profitabilityChart');
    if (!canvas) {
        console.error('Profitability chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    if (profitabilityChart) {
        profitabilityChart.destroy();
    }
    
    profitabilityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: languageData[currentLanguage].companies,
            datasets: [{
                label: currentLanguage === 'en' ? 'Profitability (%)' : 'Рентабельность (%)',
                data: profitabilityData,
                backgroundColor: '#52641D',
                borderColor: '#6b7f2a',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#333333'
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            weight: '500'
                        }
                    }
                },
                x: {
                    grid: {
                        color: '#333333'
                    },
                    ticks: {
                        color: '#ffffff',
                        maxRotation: 45,
                        font: {
                            weight: '500',
                            size: 10
                        }
                    }
                }
            }
        }
    });
    
    console.log('Profitability chart created');
}

// Update charts when language changes
function updateCharts() {
    console.log('Updating charts for language:', currentLanguage);
    
    if (radarChart) {
        radarChart.data.labels = languageData[currentLanguage].skills;
        radarChart.data.datasets[0].label = currentLanguage === 'en' ? 'Skills Level' : 'Уровень навыков';
        radarChart.update('active');
    }
    
    if (barChart) {
        barChart.data.labels = languageData[currentLanguage].skills;
        barChart.data.datasets[0].label = currentLanguage === 'en' ? 'Skills Level (%)' : 'Уровень навыков (%)';
        barChart.update('active');
    }
    
    if (profitabilityChart) {
        profitabilityChart.data.labels = languageData[currentLanguage].companies;
        profitabilityChart.data.datasets[0].label = currentLanguage === 'en' ? 'Profitability (%)' : 'Рентабельность (%)';
        profitabilityChart.update('active');
    }
}

// Initialize smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Show notification message
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    
    let bgColor = '#52641D';
    if (type === 'warning') bgColor = '#A84B2F';
    if (type === 'error') bgColor = '#C0152F';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, ${bgColor}, ${bgColor}dd);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-size: 14px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Удаление через 4 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add scroll effects for header
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.8)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = 'none';
        }
    });
}

// Add hover effects for achievement cards
function initializeHoverEffects() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced contact item interactions
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        
        item.addEventListener('click', function(e) {
            if (e.target !== link) {
                link.click();
            }
        });
        
        // Add ripple effect on click
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(82, 100, 29, 0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Professional photo handling
function initializeProfessionalPhoto() {
    const photoContainer = document.querySelector('.photo-container');
    const placeholder = document.querySelector('.photo-placeholder');
    
    // Check if professional photo exists
    const img = new Image();
    img.onload = function() {
        // Photo exists, replace placeholder
        placeholder.style.display = 'none';
        const professionalPhoto = document.createElement('img');
        professionalPhoto.src = 'professional-photo.jpg';
        professionalPhoto.alt = currentLanguage === 'en' ? 'Aleksey Goroshko' : 'Алексей Горошко';
        professionalPhoto.className = 'professional-photo';
        photoContainer.appendChild(professionalPhoto);
    };
    img.onerror = function() {
        // Photo doesn't exist, keep placeholder
        console.log('Professional photo not found, using placeholder');
    };
    img.src = 'professional-photo.jpg';
}

// Handle window resize for charts
window.addEventListener('resize', function() {
    if (radarChart) radarChart.resize();
    if (barChart) barChart.resize();
    if (profitabilityChart) profitabilityChart.resize();
});

// Make sure Chart.js is loaded before initializing
window.addEventListener('load', function() {
    if (typeof Chart !== 'undefined' && (!radarChart || !barChart || !profitabilityChart)) {
        console.log('Chart.js loaded, re-initializing charts...');
        initializeCharts();
    }
});