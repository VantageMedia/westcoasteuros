/**
 * Black Friday Countdown Timer
 * Creates an engaging countdown experience for Black Friday sales
 */

class BlackFridayCountdown {
  constructor() {
    this.countdownElements = document.querySelectorAll('.black-friday-countdown');
    this.init();
  }

  init() {
    this.countdownElements.forEach(element => {
      this.setupCountdown(element);
    });
  }

  setupCountdown(element) {
    const countdownDate = element.dataset.countdownDate;
    if (!countdownDate) return;

    const targetDate = new Date(countdownDate).getTime();
    const now = new Date().getTime();
    
    // If countdown has already ended
    if (targetDate <= now) {
      this.showExpiredMessage(element);
      return;
    }

    // Start the countdown
    this.updateCountdown(element, targetDate);
    
    // Update every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      if (targetDate <= now) {
        clearInterval(interval);
        this.showExpiredMessage(element);
      } else {
        this.updateCountdown(element, targetDate);
      }
    }, 1000);
  }

  updateCountdown(element, targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the display
    const daysElement = element.querySelector('[data-days]');
    const hoursElement = element.querySelector('[data-hours]');
    const minutesElement = element.querySelector('[data-minutes]');
    const secondsElement = element.querySelector('[data-seconds]');

    if (daysElement) daysElement.textContent = this.padZero(days);
    if (hoursElement) hoursElement.textContent = this.padZero(hours);
    if (minutesElement) minutesElement.textContent = this.padZero(minutes);
    if (secondsElement) secondsElement.textContent = this.padZero(seconds);

    // Add urgency effects when time is running low
    this.addUrgencyEffects(element, days, hours, minutes);
  }

  addUrgencyEffects(element, days, hours, minutes) {
    const totalMinutes = (days * 24 * 60) + (hours * 60) + minutes;
    
    // Add pulse effect when less than 1 hour remaining
    if (totalMinutes < 60) {
      element.classList.add('countdown-urgent');
      this.addPulseEffect(element);
    }
    
    // Add shake effect when less than 10 minutes remaining
    if (totalMinutes < 10) {
      element.classList.add('countdown-critical');
      this.addShakeEffect(element);
    }
  }

  addPulseEffect(element) {
    const countdownItems = element.querySelectorAll('.countdown-item');
    countdownItems.forEach((item, index) => {
      item.style.animation = `pulse 1s ease-in-out infinite ${index * 0.1}s`;
    });
  }

  addShakeEffect(element) {
    const countdownItems = element.querySelectorAll('.countdown-item');
    countdownItems.forEach((item, index) => {
      item.style.animation = `shake 0.5s ease-in-out infinite ${index * 0.1}s`;
    });
  }

  showExpiredMessage(element) {
    element.innerHTML = `
      <div class="countdown-expired">
        <h3>Sale Ended!</h3>
        <p>Don't worry, we have great deals year-round!</p>
        <a href="/collections/all" class="button button-primary">Shop Now</a>
      </div>
    `;
  }

  padZero(num) {
    return num.toString().padStart(2, '0');
  }
}

/**
 * Black Friday Product Hover Effects
 * Adds engaging hover effects to product cards
 */
class BlackFridayProductEffects {
  constructor() {
    this.productCards = document.querySelectorAll('.card-product');
    this.init();
  }

  init() {
    this.productCards.forEach(card => {
      this.addHoverEffects(card);
    });
  }

  addHoverEffects(card) {
    const image = card.querySelector('.card-media-image');
    const badge = card.querySelector('.badge-sale');
    
    if (!image) return;

    card.addEventListener('mouseenter', () => {
      // Add glow effect to sale badges
      if (badge) {
        badge.style.animation = 'glow 1s ease-in-out infinite alternate';
      }
      
      // Add subtle image zoom
      image.style.transform = 'scale(1.05)';
      image.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
      // Remove glow effect
      if (badge) {
        badge.style.animation = '';
      }
      
      // Reset image zoom
      image.style.transform = 'scale(1)';
    });
  }
}

/**
 * Black Friday Scroll Animations
 * Adds scroll-triggered animations for better engagement
 */
class BlackFridayScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
    this.init();
  }

  init() {
    if (this.animatedElements.length === 0) return;
    
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}

/**
 * Black Friday Urgency Notifications
 * Shows urgency messages based on user behavior
 */
class BlackFridayUrgency {
  constructor() {
    this.init();
  }

  init() {
    this.setupUrgencyMessages();
    this.trackUserBehavior();
  }

  setupUrgencyMessages() {
    // Show low stock warnings
    this.showLowStockWarnings();
    
    // Show cart abandonment messages
    this.setupCartAbandonment();
  }

  showLowStockWarnings() {
    const lowStockProducts = document.querySelectorAll('[data-stock-low]');
    lowStockProducts.forEach(product => {
      const stockCount = parseInt(product.dataset.stockCount) || 0;
      if (stockCount <= 5 && stockCount > 0) {
        this.addLowStockBadge(product, stockCount);
      }
    });
  }

  addLowStockBadge(product, stockCount) {
    const badge = document.createElement('div');
    badge.className = 'low-stock-badge';
    badge.innerHTML = `Only ${stockCount} left!`;
    badge.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: linear-gradient(135deg, #ff4444, #cc0000);
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      z-index: 10;
      animation: pulse 2s infinite;
    `;
    
    const card = product.querySelector('.card-product');
    if (card) {
      card.style.position = 'relative';
      card.appendChild(badge);
    }
  }

  setupCartAbandonment() {
    // Track when user adds items to cart
    document.addEventListener('cart:item-added', () => {
      setTimeout(() => {
        this.showCartUrgency();
      }, 30000); // Show after 30 seconds
    });
  }

  showCartUrgency() {
    const cartDrawer = document.querySelector('.cart-drawer');
    if (!cartDrawer || cartDrawer.classList.contains('open')) return;

    const urgencyBanner = document.createElement('div');
    urgencyBanner.className = 'cart-urgency-banner';
    urgencyBanner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
        z-index: 1000;
        max-width: 300px;
        animation: slideInUp 0.5s ease;
      ">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem;">⏰ Don't Miss Out!</h4>
        <p style="margin: 0 0 1rem 0; font-size: 0.9rem;">Your Black Friday deals are waiting in your cart!</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: #000;
          color: #FFD700;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 0.5rem;
        ">View Cart</button>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: transparent;
          color: #000;
          border: 1px solid #000;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        ">×</button>
      </div>
    `;
    
    document.body.appendChild(urgencyBanner);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (urgencyBanner.parentElement) {
        urgencyBanner.remove();
      }
    }, 10000);
  }

  trackUserBehavior() {
    let timeOnPage = 0;
    let scrollDepth = 0;
    
    // Track time on page
    setInterval(() => {
      timeOnPage += 1;
      if (timeOnPage === 60) { // After 1 minute
        this.showEngagementMessage();
      }
    }, 1000);
    
    // Track scroll depth
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && scrollDepth === 0) {
        scrollDepth = 50;
        this.showScrollEngagement();
      }
    });
  }

  showEngagementMessage() {
    // Show a subtle engagement message
    console.log('User has been on page for 1 minute - consider showing engagement message');
  }

  showScrollEngagement() {
    // Show scroll-based engagement
    console.log('User has scrolled 50% - consider showing engagement message');
  }
}

// Initialize all Black Friday features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BlackFridayCountdown();
  new BlackFridayProductEffects();
  new BlackFridayScrollAnimations();
  new BlackFridayUrgency();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
  
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .countdown-urgent .countdown-item {
    border-color: #ff4444 !important;
    box-shadow: 0 0 20px rgba(255, 68, 68, 0.5) !important;
  }
  
  .countdown-critical .countdown-item {
    border-color: #ff0000 !important;
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.7) !important;
    background: rgba(255, 0, 0, 0.1) !important;
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
