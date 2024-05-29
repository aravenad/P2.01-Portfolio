// Search bar
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('search-box');
    input.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            // Execute the search logic here
            let filter = input.value.toUpperCase();
            let projectsContainer = document.querySelector('.projects-container'); // Adjusted to '.projects-container' if your container class changed
            let projects = projectsContainer.getElementsByClassName('project-item'); // Adjusted to 'project-item' if this is now the direct container of project details

            for (let i = 0; i < projects.length; i++) {
                let title = projects[i].getElementsByClassName('project-title')[0].textContent.toUpperCase(); // Ensure 'project-title' is the correct class for titles
                let tags = Array.from(projects[i].getElementsByClassName('tag')); // Ensure 'tag' is the correct class for tags
                let tagTexts = tags.map(tag => tag.textContent.toUpperCase());

                if (title.includes(filter) || tagTexts.some(tag => filter.includes(tag))) {
                    projects[i].classList.remove('hidden'); // Show project
                } else {
                    projects[i].classList.add('hidden'); // Hide project
                }
            }
            input.blur(); // Lose focus from the search bar to remove blur from main content
        } else if (event.key === "Escape") {
            // Clear the search bar, reset visibility of all projects, and lose focus
            input.value = '';  // Clear the input
            let projectsContainer = document.querySelector('.projects-container'); // Reused adjusted selector
            let projects = projectsContainer.getElementsByClassName('project-item'); // Adjusted to 'project-item'
            Array.from(projects).forEach(project => project.classList.remove('hidden')); // Reset display properties
            input.blur(); // Lose focus from the search bar to remove blur from main content
        }
    });
});

// Blur effect
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-box'); // Adjust the ID based on your HTML
    const mainContent = document.getElementById('main-content'); // Adjust the ID for the main content that should blur
  
    searchBar.addEventListener('focus', function() {
      mainContent.classList.add('blur-effect');
    });
  
    searchBar.addEventListener('blur', function() {
      mainContent.classList.remove('blur-effect');
    });
});

// Filter buttons
document.addEventListener('DOMContentLoaded', function() {
    const btnCompleted = document.getElementById('btn-completed');
    const btnInProgress = document.getElementById('btn-in-progress');
    const btnAlphabetical = document.getElementById('btn-alphabetical');
    const btnReset = document.getElementById('btn-reset');
    const projectsContainer = document.querySelector('.projects-container'); // Adjust this selector as needed

    btnCompleted.addEventListener('click', function() {
        sortProjectsByTag('Terminé');
    });

    btnInProgress.addEventListener('click', function() {
        sortProjectsByTag('En cours');
    });

    btnAlphabetical.addEventListener('click', function() {
        sortProjectsAlphabetically();
    });

    btnReset.addEventListener('click', function() {
        resetProjects();
    });

    let input = document.querySelector('#searchInput'); // Adjust if your input ID is different
    let filter, projects;

    input.addEventListener('keyup', function() {
        filter = input.value.toUpperCase();
        projects = Array.from(projectsContainer.getElementsByClassName('project-item'));
        
        // Filter projects based on title or tags
        for (let i = 0; i < projects.length; i++) {
            let title = projects[i].getElementsByClassName('project-title')[0].textContent.toUpperCase();
            let tags = Array.from(projects[i].getElementsByClassName('tag'));
            let tagTexts = tags.map(tag => tag.textContent.toUpperCase());

            if (title.includes(filter) || tagTexts.some(tag => filter.includes(tag))) {
                projects[i].classList.remove('hidden');
            } else {
                projects[i].classList.add('hidden');
            }
        }

        // Optional: Sort the visible projects by a specific tag if needed
        if (filter.length > 0) { // You can add more specific conditions to trigger sorting
            sortProjectsByTag(filter); // Adjust this if you want to sort by a specific tag different from the filter
        }
    });

    function sortProjectsByTag(tagName) {
        // Fetch all projects again in case they were changed by the filtering
        projects = Array.from(projectsContainer.children);
        projects.sort((a, b) => {
            let tagA = a.querySelector('.tag').textContent.toUpperCase().includes(tagName) ? 0 : 1;
            let tagB = b.querySelector('.tag').textContent.toUpperCase().includes(tagName) ? 0 : 1;
            return tagA - tagB;
        });
        projects.forEach(project => projectsContainer.appendChild(project));
    }
    

    function sortProjectsAlphabetically() {
        let projects = Array.from(projectsContainer.children);
        projects.sort((a, b) => a.querySelector('.project-title').textContent.localeCompare(b.querySelector('.project-title').textContent));
        projects.forEach(project => projectsContainer.appendChild(project));
    }

    function resetProjects() {
        // Reload the projects in their original order or simply remove any applied sorting
        location.reload(); // This is a simple way to reset, but you may prefer to reset by rearranging DOM elements based on an original order saved elsewhere
    }
});