document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('projects.json');
    if (!response.ok) {
      throw new Error(`Failed to load projects.json: ${response.status}`);
    }

    const projects = await response.json();

    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) {
      throw new Error('Missing .project-grid element');
    }

    projectGrid.replaceChildren();

    projects.forEach((project) => {
      const card = document.createElement(project.url ? 'a' : 'article');
      card.className = 'card';

      if (project.image) {
        card.style.backgroundImage =
          `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${project.image}")`;
      }

      if (project.url) {
        card.href = project.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
      }

      const title = document.createElement('h3');
      title.textContent = project.title;
      const description = document.createElement('p');
      description.textContent = project.description;
      card.append(title, description);

      projectGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading projects.json:', error);
  }
});