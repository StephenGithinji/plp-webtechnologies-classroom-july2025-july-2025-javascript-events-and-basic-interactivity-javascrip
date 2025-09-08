// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Part 1: Event Handling ---

    const clickBtn = document.getElementById('click-btn');
    const hoverBox = document.getElementById('hover-box');
    const keyInput = document.getElementById('key-input');
    const eventFeedback = document.getElementById('event-feedback');

    // 1. Click Event
    clickBtn.addEventListener('click', () => {
        eventFeedback.textContent = 'Button was clicked!';
    });

    // 2. Mouseover and Mouseout Events
    hoverBox.addEventListener('mouseover', () => {
        eventFeedback.textContent = 'Mouse is over the box!';
        hoverBox.style.backgroundColor = '#007bff';
        hoverBox.style.color = '#fff';
        hoverBox.style.transform = 'scale(1.05)';
    });

    hoverBox.addEventListener('mouseout', () => {
        eventFeedback.textContent = 'Mouse left the box.';
        hoverBox.style.backgroundColor = '#e9ecef';
        hoverBox.style.color = '#333';
        hoverBox.style.transform = 'scale(1)';
    });
    
    // 3. Keyup Event
    keyInput.addEventListener('keyup', (event) => {
        eventFeedback.textContent = `You typed: "${event.target.value}"`;
    });


    // --- Part 2: Building Interactive Elements ---

    // 1. Light/Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Optional: Change button text based on mode
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggleBtn.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });
    
    // 2. Simple Counter
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    let count = 0;

    incrementBtn.addEventListener('click', () => {
        count++;
        counterValue.textContent = count;
    });

    decrementBtn.addEventListener('click', () => {
        count--;
        counterValue.textContent = count;
    });

    // 3. Collapsible FAQ Section
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Toggle active class for styling (e.g., rotating the '+')
            question.classList.toggle('active');

            // Toggle answer visibility with a smooth animation
            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
            } else {
                answer.classList.add('open');
            }
        });
    });

    
    // --- Part 3: Form Validation ---
    
    const form = document.getElementById('signup-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const successMessage = document.getElementById('form-success-message');

    // Function to show an error message
    const showError = (input, message) => {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('success');
        inputGroup.classList.add('error');
        const errorMessage = inputGroup.querySelector('.error-message');
        errorMessage.textContent = message;
    };

    // Function to show a success state
    const showSuccess = (input) => {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('error');
        inputGroup.classList.add('success');
        const errorMessage = inputGroup.querySelector('.error-message');
        errorMessage.textContent = '';
    };

    // Function to validate email format
    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    
    // Main validation function
    const validateForm = () => {
        let isFormValid = true;
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const passwordConfirmValue = passwordConfirm.value.trim();
        
        // Validate Username
        if (usernameValue === '') {
            showError(username, 'Username is required');
            isFormValid = false;
        } else if (usernameValue.length < 5) {
            showError(username, 'Username must be at least 5 characters');
            isFormValid = false;
        } else {
            showSuccess(username);
        }

        // Validate Email
        if (emailValue === '') {
            showError(email, 'Email is required');
            isFormValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(email, 'Provide a valid email address');
            isFormValid = false;
        } else {
            showSuccess(email);
        }

        // Validate Password
        if (passwordValue === '') {
            showError(password, 'Password is required');
            isFormValid = false;
        } else if (passwordValue.length < 8) {
            showError(password, 'Password must be at least 8 characters');
            isFormValid = false;
        } else {
            showSuccess(password);
        }

        // Validate Confirm Password
        if (passwordConfirmValue === '') {
            showError(passwordConfirm, 'Please confirm your password');
            isFormValid = false;
        } else if (passwordValue !== passwordConfirmValue) {
            showError(passwordConfirm, 'Passwords do not match');
            isFormValid = false;
        } else {
            showSuccess(passwordConfirm);
        }

        return isFormValid;
    };

    // Attach event listener to the form's submit event
    form.addEventListener('submit', (event) => {
        // Prevent the form from submitting by default
        event.preventDefault();

        if (validateForm()) {
            successMessage.textContent = 'Registration successful!';
            // Here you would typically send the data to a server
            // For this example, we'll just clear the form after a short delay
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('.input-group').forEach(group => {
                    group.classList.remove('success');
                });
                successMessage.textContent = '';
            }, 2000);
        } else {
            successMessage.textContent = '';
        }
    });
});
