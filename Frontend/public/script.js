document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    const thankYouModal = document.getElementById('thankYouModal');
    const closeModalButton = document.getElementById('closeModal');
    const closeModalSpan = document.querySelector('.close');

    // Close modal functionality
    const closeModal = () => {
        thankYouModal.style.display = 'none';
    };

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    if (closeModalSpan) {
        closeModalSpan.addEventListener('click', closeModal);
    }

    // Form submission handling
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const rating = document.getElementById('rating').value;

        try {
            // Send data to the server
            const response = await fetch('http://localhost:5001/submit-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message, rating }),
            });            

            if (response.ok) {
                // Show thank you modal
                thankYouModal.style.display = 'block';

                // Reset form fields
                feedbackForm.reset();
            } else {
                alert('Failed to submit feedback. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
