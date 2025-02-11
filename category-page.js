class CategoryPage {
    constructor(category) {
        this.category = category;
        this.page = 1;
        this.loading = false;
        this.init();
    }

    async init() {
        this.container = document.querySelector(`.${this.category}-section`);
        this.loadMoreBtn = this.container.querySelector('.load-more');
        this.bindEvents();
        await this.loadArticles();
    }

    async loadArticles() {
        if (this.loading) return;
        this.loading = true;

        try {
            const response = await fetch(
                `/api/articles?category=${this.category}&page=${this.page}`
            );
            const articles = await response.json();
            
            this.renderArticles(articles);
            this.page++;
            
            // 检查是否还有更多文章
            if (articles.length < 10) {
                this.loadMoreBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading articles:', error);
        } finally {
            this.loading = false;
        }
    }

    renderArticles(articles) {
        const container = this.container.querySelector('.articles-grid');
        
        articles.forEach(article => {
            const articleElement = this.createArticleElement(article);
            container.appendChild(articleElement);
        });
    }

    createArticleElement(article) {
        const element = document.createElement('article');
        element.className = 'article-card';
        element.innerHTML = `
            <div class="article-image">
                <img src="${article.images[0]}" alt="${article.title}">
            </div>
            <div class="article-content">
                <h3>${article.title}</h3>
                <div class="article-meta">
                    <span class="date">${new Date(article.publishDate).toLocaleDateString()}</span>
                    <span class="source">${article.source}</span>
                </div>
                <p class="excerpt">${this.truncateText(article.content, 150)}</p>
                <a href="/blog/${article.id}" class="read-more">阅读全文</a>
            </div>
        `;
        return element;
    }

    truncateText(text, length) {
        return text.length > length ? text.slice(0, length) + '...' : text;
    }

    bindEvents() {
        this.loadMoreBtn.addEventListener('click', () => this.loadArticles());
    }
} 