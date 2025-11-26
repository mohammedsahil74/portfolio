document.addEventListener('DOMContentLoaded', () => {
    // Selects ALL cards (intro, social, projects, articles)
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Slight lift effect
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            // Return to normal
            card.style.transform = 'translateY(0)';
        });
    });

    console.log("Portfolio loaded. System Online.");
});