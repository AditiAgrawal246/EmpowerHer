function setupCategoryFilter(filterSelectId, itemClass, noItemsMessageId) {
    const categorySelect = document.getElementById(filterSelectId);
    const items = document.querySelectorAll(`.${itemClass}`);
    const noItemsMessage = document.getElementById(noItemsMessageId);

    if (!categorySelect || items.length === 0) {
        console.error('Category select element or items not found!');
        return;
    }

    function filterItems(category) {
        let hasVisibleItem = false;
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                hasVisibleItem = true;
            } else {
                item.style.display = 'none';
            }
        });
        if (noItemsMessage) {
            noItemsMessage.style.display = hasVisibleItem ? 'none' : 'block';
        }
    }

    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        filterItems(selectedCategory);
    });

    // Initial call to display all items
    filterItems(categorySelect.value);
}

document.addEventListener('DOMContentLoaded', function() {
    // Call setupCategoryFilter for each page with the appropriate parameters

    if (document.getElementById('webinar-category-select')) {
        setupCategoryFilter('webinar-category-select', 'webinar-card', 'no-webinars-message');
    }

    if (document.getElementById('success-stories-category-select')) {
        setupCategoryFilter('success-stories-category-select', 'success-story');
    }

    if (document.getElementById('networking-category-select')) {
        setupCategoryFilter('networking-category-select', 'networking-card', 'no-networking-items-message');
    }

    if (document.getElementById('resource-category-select')) {
        setupCategoryFilter('resource-category-select', 'navigation-card', 'no-resources-message');
    }
});

