document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    var usernameError = document.getElementById('username-error');
    var emailError = document.getElementById('email-error');
    var passwordError = document.getElementById('password-error');
    var confirmPasswordError = document.getElementById('confirm-password-error');

    var hasError = false;

    if (username === '') {
        usernameError.textContent = 'Please enter your username';
        hasError = true;
    } else {
        usernameError.textContent = '';
    }

    if (email === '') {
        emailError.textContent = 'Please enter your email';
        hasError = true;
    } else {
        emailError.textContent = '';
    }

    if (password === '') {
        passwordError.textContent = 'Please enter your password';
        hasError = true;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password should be at least 8 characters long';
        hasError = true;
    } else {
        passwordError.textContent = '';
    }

    if (confirmPassword === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
        hasError = true;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match';
        hasError = true;
    } else {
        confirmPasswordError.textContent = '';
    }

    if (hasError) {
        return;
    }

    fetch('http://localhost:5001/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign up successful!');
            window.location.href = 'login.html';
        } else {
            alert('Sign up failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
