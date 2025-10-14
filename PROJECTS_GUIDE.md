# Projects Section Guide

## Overview
The projects section showcases your work with interactive cards displaying project summaries, technologies used, and demo links.

## What's Been Implemented

### 1. **Projects Page** (`templates/projects.html`)
- Grid layout with responsive project cards
- Each card includes:
  - Project icon and category badge
  - Project title and description
  - Technology tags
  - Demo and GitHub links
- "Add more projects" placeholder card

### 2. **Styling** (`static/css/styles.css`)
- Futuristic design matching your portfolio theme
- Hover effects with glowing borders
- Responsive design for mobile devices
- Technology tag animations

### 3. **Backend Setup**
- View function: `projects()` in `views.py`
- URL route: `/projects/`
- Navigation link updated in `base.html`

## How to Add New Projects

### Option 1: Edit the HTML Template Directly

Open `templates/projects.html` and add a new project card before the "Add more projects" card:

```html
<div class="project-card">
  <div class="project-header">
    <div class="project-icon">🎯</div>  <!-- Choose an emoji icon -->
    <div class="project-badge">Category</div>  <!-- e.g., AI/ML, Data Engineering, Web Dev -->
  </div>
  <h3 class="project-title">Your Project Name</h3>
  <p class="project-description">
    Brief description of your project (2-3 sentences explaining what it does and its impact).
  </p>
  <div class="project-tech">
    <span class="tech-tag">Python</span>
    <span class="tech-tag">Django</span>
    <span class="tech-tag">React</span>
    <!-- Add more technology tags -->
  </div>
  <div class="project-links">
    <a href="/your-demo-url/" class="project-link demo-link">
      <span class="link-icon">🚀</span>
      <span>View Demo</span>
    </a>
    <a href="https://github.com/yourusername/repo" target="_blank" class="project-link github-link">
      <span class="link-icon">💻</span>
      <span>GitHub</span>
    </a>
  </div>
</div>
```

### Option 2: Create a Dynamic Projects System (Future Enhancement)

For easier management, you could:
1. Create a `Project` model in Django
2. Store projects in the database
3. Pass projects to the template via context
4. Add an admin interface to manage projects

Example model structure:
```python
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=10)
    category = models.CharField(max_length=50)
    technologies = models.JSONField()
    demo_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
```

## Current Projects Displayed

1. **Graph RAG Forecasting System**
   - Category: AI/ML
   - Demo: Links to your GraphRAG dashboard
   - Technologies: Python, Graph RAG, ARIMA, Django

2. **High-Performance ETL Pipeline**
   - Category: Data Engineering
   - Status: Private project (no demo link)
   - Technologies: Apache Spark, HDFS, AWS, Python

3. **Video Comprehension System**
   - Category: Research
   - Status: Coming soon
   - Technologies: PyTorch, Computer Vision, Deep Learning, NLP

## Customization Tips

### Change Colors
Edit the CSS variables in `styles.css`:
- `--primary-glow`: Main accent color (currently cyan)
- `--secondary-glow`: Secondary accent (currently purple)

### Modify Card Layout
Adjust grid columns in `.projects-grid`:
```css
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
```

### Add Project Status Badges
You can add status indicators like "In Progress", "Completed", "Live":
```html
<div class="project-badge status-live">Live</div>
```

### Link Types
- **Demo Link**: Use `demo-link` class (cyan theme)
- **GitHub Link**: Use `github-link` class (purple theme)
- **Disabled Link**: Add `disabled` class to gray out

## File Structure
```
personal_website/
├── templates/
│   └── projects.html          # Projects page template
├── static/
│   └── css/
│       └── styles.css         # Includes projects styling
├── personal_website/
│   ├── views.py              # Contains projects() view
│   └── urls.py               # URL routing
```

## Testing
1. Start the development server: `python manage.py runserver`
2. Navigate to: `http://127.0.0.1:8000/projects/`
3. Test the GraphRAG demo link
4. Verify responsive design on mobile

## Next Steps
1. Add more of your actual projects
2. Update project descriptions with real metrics
3. Add GitHub repository links
4. Create demo pages for other projects
5. Consider adding project screenshots/images
6. Add filtering by category (optional)

## Notes
- The GraphRAG project links to your existing `/graphrag/` dashboard
- Private projects show a "Private Project" badge
- "Coming Soon" projects have placeholder demo links
- All styling matches your futuristic portfolio theme
