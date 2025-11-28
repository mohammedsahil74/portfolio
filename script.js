document.addEventListener('DOMContentLoaded', () => {
    // 1. Hover Effects for all cards
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // 2. Blog Integration (Dev.to)
    const blogGrid = document.getElementById('blog-grid');
    
    
    const username = ' mohammedsahil'; 

    if(blogGrid) {
        fetch(`https://dev.to/api/articles?username=${username}`)
            .then(response => response.json())
            .then(data => {
                blogGrid.innerHTML = '';
                const articles = data.slice(0, 4);

                if (articles.length === 0) {
                    blogGrid.innerHTML = '<div class="loading-text">// NO_LOGS_FOUND</div>';
                    return;
                }

                articles.forEach(article => {
                    const articleCard = document.createElement('a');
                    articleCard.href = article.url;
                    articleCard.target = '_blank';
                    articleCard.className = 'card article-card';

                    // Format date
                    const dateStr = new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                    // NEW: Check for cover image
                    // If no cover image, we can use a fallback or just not show it.
                    // Using a conditional string here.
                    const coverImageHTML = article.cover_image 
                        ? `<div class="article-cover-wrapper"><img src="${article.cover_image}" alt="${article.title}" class="article-cover"></div>` 
                        : '';

                    articleCard.innerHTML = `
                        ${coverImageHTML}
                        <div class="article-content-wrapper">
                            <div class="article-meta">
                                <span class="date">${dateStr}</span>
                                <span class="tag">DEV.TO</span>
                            </div>
                            <div class="article-content">
                                <h3>${article.title}</h3>
                                <p>${article.description || 'Click to read full article...'}</p>
                            </div>
                        </div>
                        <div class="article-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        </div>
                    `;

                    blogGrid.appendChild(articleCard);
                });
            })
            .catch(error => {
                console.error('Error fetching blog:', error);
                blogGrid.innerHTML = '<div class="loading-text" style="color:red">// ERR: API_FAIL</div>';
            });
    }

    console.log("Portfolio loaded. System Online.");
});