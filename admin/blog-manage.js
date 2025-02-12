async function saveArticle() {
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.querySelector('#editor').querySelector('.ql-editor').innerHTML;
    const source = document.getElementById('source').value;
    const tags = document.getElementById('tags').value;
    const imageFile = document.getElementById('image').files[0];
    
    try {
        // 创建文章数据
        const articleData = {
            title,
            category,
            content,
            source,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            date: new Date().toISOString()
        };

        if (imageFile) {
            // 处理图片上传
            const imageBase64 = await convertImageToBase64(imageFile);
            articleData.image = imageBase64;
        }

        // 发送到服务器
        const response = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleData)
        });

        if (!response.ok) {
            throw new Error('Failed to save article');
        }

        // 重新加载文章列表
        loadArticles();
        hideArticleForm();
    } catch (error) {
        console.error('Error saving article:', error);
        alert('保存文章失败，请重试');
    }
}

function deleteArticle(articleId) {
    if (confirm('确定要删除这篇文章吗？')) {
        // 从localStorage获取文章列表
        let articles = JSON.parse(localStorage.getItem('blogPosts')) || [];
        
        // 过滤掉要删除的文章
        articles = articles.filter(article => article.id !== articleId);
        
        // 保存更新后的文章列表
        localStorage.setItem('blogPosts', JSON.stringify(articles));
        
        // 重新加载文章列表
        loadArticles();
    }
}

async function loadArticles() {
    try {
        const response = await fetch('/api/articles');
        if (!response.ok) throw new Error('Failed to load articles');
        const articles = await response.json();
        
        const container = document.querySelector('.article-list');
        
        if (articles.length === 0) {
            container.innerHTML = '<div class="no-articles">暂无文章</div>';
            return;
        }
        
        container.innerHTML = articles.map(article => `
            <div class="article-item">
                <div class="article-info">
                    <h3>${article.title}</h3>
                    <div class="article-meta">
                        <span class="category">${getCategoryName(article.category)}</span>
                        <span class="date">${new Date(article.date).toLocaleDateString('zh-CN')}</span>
                    </div>
                </div>
                <div class="article-actions">
                    <button class="btn btn-danger" onclick="deleteArticle('${article.id}')">
                        <i class="fas fa-trash"></i> 删除
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading articles:', error);
        alert('加载文章失败，请刷新页面重试');
    }
}

function getCategoryName(category) {
    const categories = {
        news: '行业新闻',
        reviews: '游艇评测',
        shows: '展会动态',
        lifestyle: '游艇生活'
    };
    return categories[category] || category;
} 