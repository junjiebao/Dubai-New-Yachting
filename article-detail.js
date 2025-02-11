class ArticleDetail {
    constructor(articleId) {
        this.articleId = articleId;
        this.init();
    }

    async init() {
        await this.loadArticle();
        this.initShare();
    }

    async loadArticle() {
        try {
            const response = await fetch(`/api/articles/${this.articleId}`);
            const { article, relatedArticles } = await response.json();
            
            this.renderArticle(article);
            this.renderRelatedArticles(relatedArticles);
        } catch (error) {
            console.error('Error loading article:', error);
        }
    }

    renderArticle(article) {
        document.title = `${article.title} - 迪拜新游艇`;
        
        // 更新文章内容
        document.querySelector('.article-header h1').textContent = article.title;
        document.querySelector('.article-body').innerHTML = article.content;
        
        // 更新元数据
        document.querySelector('.date').textContent = new Date(article.publishDate).toLocaleDateString();
        document.querySelector('.source').textContent = `来源：${article.source}`;
        document.querySelector('.views').textContent = `阅读：${article.viewCount}`;
        
        // 更新标签
        const tagsContainer = document.querySelector('.tags');
        tagsContainer.innerHTML = article.tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join('');
    }

    renderRelatedArticles(articles) {
        const container = document.querySelector('.related-articles');
        const html = articles.map(article => `
            <div class="related-article">
                <img src="${article.images[0]}" alt="${article.title}">
                <div class="related-article-info">
                    <h4>${article.title}</h4>
                    <span class="date">${new Date(article.publishDate).toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
        
        container.innerHTML += html;
    }

    initShare() {
        const shareButtons = document.querySelectorAll('.share-button');
        shareButtons.forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.dataset.platform;
                this.shareArticle(platform);
            });
        });
    }

    shareArticle(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        switch(platform) {
            case 'wechat':
                // 显示微信分享二维码
                break;
            case 'weibo':
                window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${title}`);
                break;
            // 添加其他分享平台
        }
    }
} 