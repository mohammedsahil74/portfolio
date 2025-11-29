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

   
    const commitList = document.getElementById('commit-list');
    
    const githubUsername = 'mohammedsahil74';

    if (commitList) {
        

        fetch(`https://api.github.com/users/${mohammedsahil74}/events`)
            .then(response => {
                
                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error("API Rate Limit Exceeded. Try again in an hour.");
                    }
                    throw new Error(`GitHub API Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                
                if (!Array.isArray(data)) {
                    throw new Error("Received invalid data from GitHub.");
                }

                commitList.innerHTML = ''; 
                
                
                const pushEvents = data.filter(event => event.type === 'PushEvent');
                
                if (pushEvents.length === 0) {
                    commitList.innerHTML = '<div style="color:#666; padding:10px;">> No recent public commits found.</div>';
                    return;
                }

                
                const recentPushes = pushEvents.slice(0, 10);

                recentPushes.forEach(event => {
                    
                    const repoName = event.repo.name.split('/')[1] || event.repo.name;
                    
                    // Format date
                    const dateObj = new Date(event.created_at);
                    const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    
                    
                    const commits = event.payload.commits;
                    if (commits && commits.length > 0) {
                        const commitMsg = commits[commits.length - 1].message;
                        
                        const row = document.createElement('div');
                        row.className = 'commit-row';
                        row.innerHTML = `
                            <span class="commit-prefix">></span>
                            <span class="commit-repo">${repoName}</span>
                            <span class="commit-msg">${commitMsg}</span>
                            <span class="commit-date">[${dateStr}]</span>
                        `;
                        commitList.appendChild(row);
                    }
                });
            })
            .catch(err => {
                console.error("GitHub Fetch Error:", err);
               
                commitList.innerHTML = `<div style="color:#ff5f56; padding:10px;">> ERROR: ${err.message}</div>`;
            });
    }

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