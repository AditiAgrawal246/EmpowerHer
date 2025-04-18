document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        console.log('Attempting to fetch...');
        const response = await fetch('http://localhost:5001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        console.log('Fetch response received:', response);
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Response is OK, attempting to parse JSON...');
        const result = await response.json();
        console.log('Parsed result:', result);

        if (result.success) {
            console.log('Login successful, showing alerts...');
            alert('Login successful!');
            alert('Welcome');
            console.log('Redirecting to home page...');
            // Store the token in localStorage
            localStorage.setItem('token', result.token);
            localStorage.setItem('userName', result.name);
            window.location.href = 'home.html';
        } else {
            console.log('Login failed:', result.message);
            alert(result.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please check the console for more details.');
    }
});