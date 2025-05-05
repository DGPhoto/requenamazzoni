document.addEventListener('DOMContentLoaded', function() {
    // Toggle side menu
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const closeMenu = document.getElementById('close-menu');

    if (menuToggle && sideMenu && closeMenu) {
        menuToggle.addEventListener('click', function() {
            sideMenu.classList.add('open');
        });

        closeMenu.addEventListener('click', function() {
            sideMenu.classList.remove('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!sideMenu.contains(event.target) && event.target !== menuToggle) {
                sideMenu.classList.remove('open');
            }
        });
    }

    // Toggle side dropdowns
    const dropdownToggles = document.querySelectorAll('.side-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            
            if (dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                this.querySelector('i').classList.remove('fa-chevron-up');
                this.querySelector('i').classList.add('fa-chevron-down');
            } else {
                dropdown.classList.add('open');
                this.querySelector('i').classList.remove('fa-chevron-down');
                this.querySelector('i').classList.add('fa-chevron-up');
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formFields = contactForm.querySelectorAll('input[required], textarea[required]');
            
            formFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, just show a success message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-success';
                formMessage.textContent = 'Gràcies pel teu missatge. Et contactarem aviat.';
                
                contactForm.appendChild(formMessage);
                contactForm.reset();
                
                // Remove the message after 5 seconds
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            }
        });
    }
});