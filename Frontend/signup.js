document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5001/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (data.success) {
            alert('Signup successful!');
            window.location.href = 'login.html'; // Redirect to login.html after successful signup
        } else {
            alert('Signup failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
