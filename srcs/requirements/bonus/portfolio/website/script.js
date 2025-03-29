// Theme Toggle
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

// Check for saved user preference, if any
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

// Switch theme function
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Event listener
toggleSwitch.addEventListener('change', switchTheme, false);

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Typing effect for profession text
const professions = ["Web Developer", "Frontend Developer", "backend Developer", "FullStack Developer", "Coder & Problem Solver"];
let professionIndex = 0;
let characterIndex = 0;
let currentText = '';
let isDeleting = false;
const typingDelay = 150;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text

function type() {
    const professionElement = document.getElementById('profession-text');
    const currentProfession = professions[professionIndex];
    
    // If deleting
    if (isDeleting) {
        currentText = currentProfession.substring(0, characterIndex - 1);
        characterIndex--;
    } else {
        // If typing
        currentText = currentProfession.substring(0, characterIndex + 1);
        characterIndex++;
    }

    professionElement.textContent = currentText;

    let typeSpeed = isDeleting ? erasingDelay : typingDelay;

    // If word is complete
    if (!isDeleting && characterIndex === currentProfession.length) {
        // Pause before starting to delete
        typeSpeed = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        professionIndex++;
        // Move to next profession, or loop back to beginning
        if (professionIndex >= professions.length) {
            professionIndex = 0;
        }
        // Pause before typing next word
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start the typing effect after page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, 1000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission (placeholder)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // alert('Message sent! (This is a demo - no actual message was sent)');
        contactForm.reset();
    });
}

// Project cards animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.project-card').forEach((card) => observer.observe(card));



// Pagination

document.addEventListener('DOMContentLoaded', function() {
    // Project data - your existing projects
    const projects = [
        {
            category: "Web App",
            title: "Chatbot_app",
            description: "A modern, responsive web-based chatbot powered by Google's Gemini AI. This chatbot features a clean, intuitive interface with real-time message handling and emoji support.",
            tags: ["HTML", "CSS", "JavaScript"],
            links: [
                { url: "https://github.com/oussamaettaqui/Chatbot_app?tab=readme-ov-file", icon: "fab fa-github", text: "Source Code" }
            ],
            image: "url(assets/Screenshot.png)",
            imagePosition: "right",
            reverse: false,
            isComingSoon: false
        },
        {
            category: "CLI Applications",
            title: "Minishell",
            description: "Minishell is a simplified command-line interpreter designed to provide a foundational understanding of shell behavior. While shells might appear straightforward, their intricate logic and precise execution demand careful attention to detail.",
            tags: ["C"],
            links: [
                { url: "https://github.com/oussamaettaqui/Minishell", icon: "fab fa-github", text: "Source Code" }
            ],
            image: "url(assets/run-minishell.png)",
            imagePosition: "center",
            reverse: true,
            isComingSoon: false
        },
        {
            category: "Web App",
            title: "Page-Transition-GSAP",
            description: "This project showcases a sophisticated page transition animation using GreenSock Animation Platform (GSAP). The transition creates a visually appealing 'reveal/conceal' effect using animated blocks when users navigate between pages.",
            tags: ["HTML", "CSS", "JavaScript", "GSAP"],
            links: [
                { url: "https://page-transition-gsap-one.vercel.app/", icon: "fas fa-external-link-alt", text: "Live Demo" },
                { url: "https://github.com/oussamaettaqui/Page-Transition-GSAP", icon: "fab fa-github", text: "Source Code" }
            ],
            // image: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
            image: "url(assets/Screenshot-page-index.png)",
            imagePosition: "center",
            reverse: false,
            isComingSoon: false
        },
        {
            category: "Future Projects",
            title: "Coming Soon",
            description: "I'm currently working on several exciting full-stack projects while learning DevOps practices. These projects help me strengthen my development skills and gain practical experience with containerization and deployment workflows. Stay tuned as I complete and share these projects in the near future!",
            tags: ["React", "NextJs", "NodeJs", "Docker", "Typescript", "Laravel"],
            links: [
                { url: "#", icon: "fas fa-hourglass-half", text: "In Development" }
            ],
            image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            imagePosition: "center",
            reverse: false,
            isComingSoon: true
        },

    ];

    // Pagination variables
    let currentPage = 1;
    const projectsPerPage = 4;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    // Get DOM elements
    const projectsGrid = document.getElementById('projectsGrid');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    // Function to render projects for current page
    function renderProjects() {
        // Clear current projects
        projectsGrid.innerHTML = '';
        
        // Calculate start and end indices
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = Math.min(startIndex + projectsPerPage, projects.length);
        
        // Render projects for current page
        for (let i = startIndex; i < endIndex; i++) {
            const project = projects[i];
            
            // Create project card
            const projectCard = document.createElement('div');
            projectCard.className = `project-card ${project.reverse ? 'reverse' : ''}`;
            let projectHTML;
                // Project content
                if (project.isComingSoon)
                { 
                    projectHTML = `
                    <div class="project-card coming-soon-card ${project.reverse ? 'reverse' : ''}">
                        <div class="project-content">
                            <span class="project-category">${project.category}</span>
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                            </div>
                            <div class="project-links">
                                ${project.links.map(link => `
                                    <a href="${link.url}" class="project-link"><i class="${link.icon}"></i> ${link.text}</a>
                                `).join('')}
                            </div>
                            
                            <div class="development-indicators">
                                <div class="indicator">
                                    <div class="progress-bar">
                                        <div class="progress-fill"></div>
                                    </div>
                                    <span>Development in Progress</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-image coming-soon-background" style="background-image: ${project.image}; background-size: cover; background-position: ${project.imagePosition};">
                            <div class="pulse-overlay"></div>
                            <div class="coming-soon-badge">Coming Soon</div>
                        </div>
                    </div>
                `;
                }
                else
                {
                    projectHTML = `
                        <div class="project-content">
                            <span class="project-category">${project.category}</span>
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                            </div>
                            <div class="project-links">
                                ${project.links.map(link => `
                                    <a href="${link.url}" class="project-link"><i class="${link.icon}"></i> ${link.text}</a>
                                `).join('')}
                            </div>
                        </div>
                        <div class="project-image" style="background-image: ${project.image}; background-size: cover; background-position: ${project.imagePosition};">
                        </div>
                    `;
                }
            
            
            projectCard.innerHTML = projectHTML;
            projectsGrid.appendChild(projectCard);
        }
        
        // Update page indicator
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        
        // Update button states
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    // Add event listeners to pagination buttons
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderProjects();
            // Scroll to top of projects section
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }
    });

    nextPageBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderProjects();
            // Scroll to top of projects section
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Initial render
    renderProjects();
});

function sendMail(){
    let parms = {
        name :document.getElementById("name").value,
        email :document.getElementById("email").value,
        subject :document.getElementById("subject").value,
        message :document.getElementById("message").value,
    }
    emailjs.send("service_jkppx0c", "template_0tab469", parms);
}