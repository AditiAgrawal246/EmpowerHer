// document.addEventListener('DOMContentLoaded', () => {
//     const token = localStorage.getItem('token');
//     const userName = localStorage.getItem('userName');

//     if (!token) {
//         // No token found, user is not logged in
//         alert('You are not logged in. Redirecting to login page.');
//         window.location.href = 'login.html';
//     } else {
//         // Token found, user is logged in
//         console.log('User is logged in');
        
//         // Display the user's name
//         const userNameElement = document.getElementById('userName');
//         if (userNameElement && userName) {
//             userNameElement.textContent = `Welcome, ${userName}!`;
//         }

//         // You can now use this token for authenticated requests to your backend
//     }
// });

// // Logout functionality
// document.getElementById('logout-button').addEventListener('click', function() {
//     // Clear user data
//     localStorage.removeItem('userName');
//     localStorage.removeItem('token');

//     // Redirect to login page
//     window.location.href = 'login.html';
// });

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        // No token found, user is not logged in
        alert('You are not logged in. Redirecting to login page.');
        window.location.href = 'login.html';
    }

    // handleFormSubmissions();
    // setupSearchFunctionality();
    // // setupBudgetCalculator();
    // // setupPostForm();
    // // fetchSuccessStories();
    // // setupWebinarRegistration();
    // // setupFeedbackForm();
    // // setupBuyNowButtons();
    // setupCategoryFilter();
});

// Logout functionality
document.getElementById('logout-button').addEventListener('click', function() {
    // Clear user data
    localStorage.removeItem('userName');
    localStorage.removeItem('token');

    // Redirect to login page
    window.location.href = 'login.html';
});

// function setupCategoryFilter(filterSelectId, itemClass) {
//     const categorySelect = document.getElementById(filterSelectId);
//     if (!categorySelect) {
//         console.error('Category select element not found!');
//         return;
//     }

//     const items = document.querySelectorAll(`.${itemClass}`); // Use backticks for template literals
//     if (items.length === 0) {
//         console.error(`No items found with class ${itemClass}!`);
//         return;
//     }

//     function filterItems(category) {
//         items.forEach(item => {
//             const itemCategory = item.getAttribute('data-category');
//             item.style.display = category === 'all' || itemCategory === category ? 'block' : 'none';
//         });
//     }

//     categorySelect.addEventListener('change', () => {
//         const selectedCategory = categorySelect.value;
//         filterItems(selectedCategory);
//     });

//     // Initial call to display all items
//     filterItems(categorySelect.value);
// }

// document.addEventListener('DOMContentLoaded', function() {
//     setupCategoryFilter('category-select', 'success-story');
//     setupCategoryFilter('category-select', 'navigation-card');
//     setupCategoryFilter('category-select', 'webinar-card');
//     setupCategoryFilter('category-select', 'networking-card');
//     // Add more setupCategoryFilter calls for other sections
// });