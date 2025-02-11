// 文章阅读量统计
function initArticleViews() {
    // 获取当前文章ID（可以从URL或其他地方获取）
    const articleId = getArticleId();
    
    // 如果是新访问，增加阅读量
    if (!hasVisited(articleId)) {
        incrementViews(articleId);
        markAsVisited(articleId);
    }
    
    // 显示阅读量
    displayViews(articleId);
}

// 获取文章ID
function getArticleId() {
    // 从URL中获取文章ID
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || window.location.pathname.split('/').pop().replace('.html', '');
}

// 检查是否已访问过
function hasVisited(articleId) {
    const visited = localStorage.getItem('visited_articles') || '[]';
    return JSON.parse(visited).includes(articleId);
}

// 标记为已访问
function markAsVisited(articleId) {
    const visited = JSON.parse(localStorage.getItem('visited_articles') || '[]');
    visited.push(articleId);
    localStorage.setItem('visited_articles', JSON.stringify(visited));
}

// 增加阅读量
function incrementViews(articleId) {
    // 这里应该发送请求到服务器增加阅读量
    fetch(`/api/articles/${articleId}/views`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log('Views updated:', data);
        })
        .catch(error => {
            console.error('Error updating views:', error);
        });
}

// 显示阅读量
function displayViews(articleId) {
    // 从服务器获取阅读量
    fetch(`/api/articles/${articleId}/views`)
        .then(response => response.json())
        .then(data => {
            const viewsElement = document.querySelector('.article-views');
            if (viewsElement) {
                viewsElement.textContent = `阅读量：${data.views}`;
            }
        });
}

// 初始化
document.addEventListener('DOMContentLoaded', initArticleViews);

class ArticleViewer {
    constructor() {
        this.article = null;
        this.init();
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (articleId) {
            await this.loadArticle(articleId);
        } else {
            this.showError('文章不存在');
        }
    }

    async loadArticle(id) {
        // 从localStorage加载文章数据
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        this.article = articles.find(a => a.id === id);

        if (this.article) {
            this.renderArticle();
        } else {
            this.showError('文章不存在');
        }
    }

    renderArticle() {
        const container = document.querySelector('.article-container');
        if (!container) return;

        // 创建文章内容
        const articleHTML = `
            <article class="blog-article">
                <header class="article-header">
                    <h1>${this.article.title}</h1>
                    <div class="article-meta">
                        <span class="date">${new Date(this.article.date).toLocaleDateString('zh-CN')}</span>
                        <span class="category">${this.getCategoryName(this.article.category)}</span>
                        ${this.article.source ? `<span class="source">来源: ${this.article.source}</span>` : ''}
                    </div>
                </header>
                ${this.article.image ? `
                    <div class="article-image">
                        <img src="${this.article.image}" 
                             alt="${this.article.title}"
                             onerror="this.parentElement.remove()">
                    </div>
                ` : ''}
                <div class="article-content">
                    ${this.article.content}
                </div>
                ${this.article.tags?.length ? `
                    <div class="article-tags">
                        ${this.article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </article>
        `;

        container.innerHTML = articleHTML;
    }

    getCategoryName(category) {
        const categories = {
            news: '行业新闻',
            reviews: '游艇评测',
            shows: '展会动态',
            lifestyle: '游艇生活'
        };
        return categories[category] || category;
    }

    showError(message) {
        const container = document.querySelector('.article-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>${message}</h2>
                    <a href="../blog.html" class="btn">返回文章列表</a>
                </div>
            `;
        }
    }
}

// 初始化文章查看器
document.addEventListener('DOMContentLoaded', () => {
    window.articleViewer = new ArticleViewer();
}); 