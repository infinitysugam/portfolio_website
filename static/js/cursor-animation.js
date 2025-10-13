// Enhanced Cursor-following background animation with parallax
document.addEventListener('DOMContentLoaded', () => {
  const imageSection = document.querySelector('.image-section');
  const mainContent = document.querySelector('.main-content');
  
  // Custom cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);
  
  // Track mouse movement for parallax effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Update custom cursor position
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
    
    // Get viewport dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate percentage position (0 to 1)
    const xPercent = mouseX / windowWidth;
    const yPercent = mouseY / windowHeight;
    
    // Background parallax (stronger effect)
    const xOffset = 50 + (xPercent - 0.5) * 20;
    const yOffset = 50 + (yPercent - 0.5) * 20;
    
    if (imageSection) {
      imageSection.style.backgroundPosition = `${xOffset}% ${yOffset}%`;
    }
    
    // Content parallax (subtle effect)
    if (mainContent) {
      const contentX = (xPercent - 0.5) * 10;
      const contentY = (yPercent - 0.5) * 10;
      mainContent.style.transform = `translate(${contentX}px, ${contentY}px)`;
    }
  });
  
  // Reset to center when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    if (imageSection) {
      imageSection.style.backgroundPosition = 'center';
    }
    if (mainContent) {
      mainContent.style.transform = 'translate(0, 0)';
    }
  });
  
  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .description');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
  
  // Typing animation for greeting
  const greeting = document.querySelector('.greeting');
  if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        greeting.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 500);
  }
  
  // Stagger animation for description paragraphs
  const descriptions = document.querySelectorAll('.description');
  descriptions.forEach((desc, index) => {
    desc.style.animationDelay = `${0.2 + index * 0.1}s`;
  });
});
