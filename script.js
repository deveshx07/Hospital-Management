// Search Functionality
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');

// Sample data for suggestions
const data = [
    'John Doe',
    'Jane Smith',
    'Dr. Alice Johnson',
    'Dr. Robert Brown',
    'Cardiology Department',
    'Neurology Department',
    'Orthopedics Department',
    'General Medicine',
    'Genetics Department',
    // Add more as needed
];

// Debounce function to limit the rate of function calls
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

searchInput.addEventListener('input', debounce(function() {
    const input = this.value.toLowerCase();
    suggestionsBox.innerHTML = '';
    if (input) {
        const filtered = data.filter(item => item.toLowerCase().includes(input));
        if (filtered.length > 0) {
            filtered.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.addEventListener('click', () => {
                    searchInput.value = item;
                    suggestionsBox.innerHTML = '';
                    suggestionsBox.style.display = 'none';
                    // Implement search action here
                    alert(`You selected: ${item}`);
                });
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else {
            const div = document.createElement('div');
            div.textContent = 'No results found';
            suggestionsBox.appendChild(div);
            suggestionsBox.style.display = 'block';
        }
    } else {
        suggestionsBox.style.display = 'none';
    }
}, 300));

// Hide suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = 'none';
    }
});

// Expandable Panels
const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {
    const header = panel.querySelector('h3');
    header.addEventListener('click', () => {
        panel.classList.toggle('active');
        // Close other panels if you want only one open at a time
        // panels.forEach(otherPanel => {
        //     if (otherPanel !== panel) {
        //         otherPanel.classList.remove('active');
        //     }
        // });
    });
});

// Floating Footer on Scroll
window.addEventListener('scroll', function() {
    const footer = document.querySelector('.footer');
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});

// Form Submission (Placeholder)
const form = document.querySelector('.patient-form form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement form submission logic here (e.g., send data to backend)
    alert('Form submitted successfully!');
    form.reset();
});
