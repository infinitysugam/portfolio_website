// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
  // Get saved theme or default to professional
  const savedTheme = localStorage.getItem('theme') || 'professional';
  
  // Apply saved theme
  document.body.setAttribute('data-theme', savedTheme);
  
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = `
    <span class="theme-icon">${savedTheme === 'professional' ? '🎨' : '💼'}</span>
    <span class="theme-label">${savedTheme === 'professional' ? 'Futuristic' : 'Professional'}</span>
  `;
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  document.body.appendChild(themeToggle);
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'professional' ? 'futuristic' : 'professional';
    
    // Update theme
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button
    themeToggle.innerHTML = `
      <span class="theme-icon">${newTheme === 'professional' ? '🎨' : '💼'}</span>
      <span class="theme-label">${newTheme === 'professional' ? 'Futuristic' : 'Professional'}</span>
    `;
    
    // Add animation
    themeToggle.classList.add('theme-switching');
    setTimeout(() => {
      themeToggle.classList.remove('theme-switching');
    }, 300);
  });
  
  // Disable/enable effects based on theme
  const particleCanvas = document.getElementById('particleCanvas');
  const scanLine = document.querySelector('.scan-line');
  
  function updateEffects() {
    const theme = document.body.getAttribute('data-theme');
    if (theme === 'professional') {
      if (particleCanvas) particleCanvas.style.opacity = '0';
      if (scanLine) scanLine.style.display = 'none';
    } else {
      if (particleCanvas) particleCanvas.style.opacity = '1';
      if (scanLine) scanLine.style.display = 'block';
    }
  }
  
  updateEffects();
  
  // Listen for theme changes
  const observer = new MutationObserver(updateEffects);
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
});
