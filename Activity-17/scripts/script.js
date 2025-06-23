document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    var username = document.getElementById('username').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var phone = document.getElementById('phone').value.trim();

    var usernameValid = /^[a-zA-Z0-9]{5,}$/.test(username); // At least 5 characters, letters and numbers only
    var emailValid = /^[^@]+@\w+(\.\w+)+\w$/.test(email); // Simple email pattern check
    var passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password); // At least 8 chars, both lower/upper/digit

    // Phone validation: Accepts numbers with optional +country, spaces, dashes, and parentheses. Example: +81 90-1234-5678, (090)1234-5678, 09012345678
    var phoneValid = /^(\+?\d{1,4}[-\s]?)?(\(?\d{2,4}\)?[-\s]?)?\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}$/.test(phone);

    document.getElementById('usernameFeedback').style.display = usernameValid ? 'none' : 'block';
    document.getElementById('emailFeedback').style.display = emailValid ? 'none' : 'block';
    document.getElementById('passwordFeedback').style.display = passwordValid ? 'none' : 'block';
    document.getElementById('phoneFeedback').style.display = phoneValid ? 'none' : 'block';

    document.getElementById('usernameFeedback').textContent = usernameValid ? '' : 'Username should be at least 5 characters long and contain only letters and numbers.';
    document.getElementById('emailFeedback').textContent = emailValid ? '' : 'Please enter a valid email address.';
    document.getElementById('passwordFeedback').textContent = passwordValid ? '' : 'Password should be at least 8 characters long, contain numbers and both lowercase and uppercase letters.';
    document.getElementById('phoneFeedback').textContent = phoneValid ? '' : 'Please enter a valid phone number (e.g., +81 90-1234-5678).';

    var formValid = usernameValid && emailValid && passwordValid && phoneValid;

    if (formValid) {
        document.getElementById('registrationFeedback').textContent = 'Your user registration was accepted!';
        document.getElementById('registrationFeedback').style.display = 'block';
        // Here you can also handle the form submission, e.g. send data to the server
    } else {
        document.getElementById('registrationFeedback').textContent = '';
        document.getElementById('registrationFeedback').style.display = 'none';
    }
});