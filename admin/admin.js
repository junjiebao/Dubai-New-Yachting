class ArticleManager {
    constructor() {
        this.articles = JSON.parse(localStorage.getItem('articles')) || [];
        this.init();
    }

    async init() {
        await this.loadArticles();
        this.initImagePreview();
        this.initEditor();
        this.bindEvents();
    }

    bindEvents() {
        // 绑定保存按钮点击事件
        document.getElementById('saveArticleBtn').addEventListener('click', async () => {
            await this.handleSubmit(document.getElementById('articleForm'));
        });
        
        // 绑定图片上传事件
        document.getElementById('image').addEventListener('change', (e) => this.handleImageUpload(e));
    }

    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            // 压缩图片
            const compressedFile = await this.compressImage(file);
            // 预览图片
            this.previewImage(compressedFile);
            // 保存到临时存储
            this.tempImage = compressedFile;
        } catch (error) {
            console.error('图片处理失败:', error);
            alert('图片处理失败，请重试');
        }
    }

    async compressImage(file) {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.8,
                maxWidth: 1200,
                maxHeight: 1200,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    }

    previewImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.querySelector('.image-preview');
            preview.innerHTML = `<img src="${e.target.result}" alt="预览图">`;
        };
        reader.readAsDataURL(file);
    }

    async handleSubmit(form) {
        const formData = new FormData(form);

        try {
            // 检查必填字段
            if (!formData.get('title')) {
                alert('请输入文章标题');
                return;
            }

            // 获取富文本编辑器内容
            const editor = tinymce.get('content');
            const content = editor ? editor.getContent() : '';
            if (!content) {
                alert('请输入文章内容');
                return;
            }

            const article = {
                id: form.dataset.editId || Date.now().toString(),
                title: formData.get('title'),
                category: formData.get('category'),
                content: content,
                source: formData.get('source'),
                tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(Boolean),
                date: new Date().toISOString()
            };

            // 处理图片
            if (this.tempImage) {
                article.image = await this.processImage(this.tempImage);
            } else if (form.dataset.editId) {
                const existingArticle = this.articles.find(a => a.id === form.dataset.editId);
                if (existingArticle) {
                    article.image = existingArticle.image;
                }
            } else {
                // 从文章内容中提取第一张图片
                article.image = this.extractFirstImage(content);
            }

            // 保存或更新文章
            await this.saveArticle(article, !!form.dataset.editId);

            // 清理表单
            this.resetForm(form);
            hideAddArticleForm();
            alert('文章保存成功！');
            location.reload();
        } catch (error) {
            console.error('保存文章失败:', error);
            alert('保存失败，请重试');
        }
    }

    extractFirstImage(content) {
        // 默认封面图片
        const defaultImage = 'images/blog/default-cover.jpg';

        // 从内容中提取第一张图片
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) {
            // 如果是base64图片，直接使用
            if (imgMatch[1].startsWith('data:image')) {
                return imgMatch[1];
            }
            // 如果是相对路径，确保路径正确
            if (!imgMatch[1].startsWith('http')) {
                return imgMatch[1].startsWith('/') ? imgMatch[1].slice(1) : imgMatch[1];
            }
            return imgMatch[1];
        }

        return defaultImage;
    }

    async processImage(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    async saveArticle(article, isEdit) {
        try {
            console.log('开始保存文章:', article);
            if (isEdit) {
                const index = this.articles.findIndex(a => a.id === article.id);
                if (index !== -1) {
                    this.articles[index] = { ...this.articles[index], ...article };
                    console.log('更新文章成功，索引:', index);
                }
            } else {
                this.articles.unshift(article);
                console.log('添加新文章成功');
            }
            
            console.log('保存到localStorage前的文章列表:', this.articles);
            localStorage.setItem('articles', JSON.stringify(this.articles));
            console.log('保存到localStorage成功');
            
            await this.loadArticles();
            console.log('重新加载文章列表成功');
            return true;
        } catch (error) {
            console.error('保存文章时出错:', error);
            throw error;
        }
    }

    resetForm(form) {
        form.reset();
        tinymce.get('content').setContent('');
        document.querySelector('.image-preview').innerHTML = '';
        delete form.dataset.editId;
        this.tempImage = null;
    }

    async loadArticles() {
        const container = document.querySelector('.article-list');
        container.innerHTML = this.articles.map(article => this.createArticleCard(article)).join('');
    }

    createArticleCard(article) {
        return `
            <div class="article-card" data-id="${article.id}">
                <img src="${article.image}" alt="${article.title}">
                <div class="article-info">
                    <h3>${article.title}</h3>
                    <div class="article-meta">
                        <span class="category">${this.getCategoryName(article.category)}</span>
                        <span class="date">${new Date(article.date).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="article-actions">
                    <button onclick="articleManager.previewArticle('${article.id}')" title="预览">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="articleManager.editArticle('${article.id}')" title="编辑">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="articleManager.deleteArticle('${article.id}')" title="删除">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
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

    initEditor() {
        // 编辑器已在HTML中初始化
        const editor = tinymce.get('content');
        if (editor) {
            editor.on('change', () => {
                const content = editor.getContent();
                localStorage.setItem('article-draft', content);
            });
        }
    }

    initImagePreview() {
        const imageInput = document.getElementById('image');
        const preview = document.querySelector('.image-preview');

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.innerHTML = `<img src="${e.target.result}" alt="预览图">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    deleteArticle(id) {
        if (confirm('确定要删除这篇文章吗？')) {
            this.articles = this.articles.filter(article => article.id !== id);
            localStorage.setItem('articles', JSON.stringify(this.articles));
            this.loadArticles();
        }
    }

    editArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (!article) return;

        // 填充表单
        document.getElementById('title').value = article.title;
        document.getElementById('category').value = article.category;
        tinymce.get('content').setContent(article.content);
        document.getElementById('source').value = article.source;
        document.getElementById('tags').value = article.tags.join(', ');

        // 显示图片预览
        document.querySelector('.image-preview').innerHTML = `
            <img src="${article.image}" alt="预览图">
        `;

        // 修改表单标题和提交处理
        document.querySelector('.article-form h2').textContent = '编辑文章';
        const form = document.getElementById('articleForm');
        form.dataset.editId = id;

        showAddArticleForm();
    }

    previewArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (!article) return;

        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${article.title} - 预览</title>
                <link rel="stylesheet" href="../style.css">
            </head>
            <body>
                <article class="article-content">
                    <h1>${article.title}</h1>
                    <div class="article-meta">
                        <span class="category">${article.category}</span>
                        <span class="date">${new Date(article.date).toLocaleDateString()}</span>
                        <span class="source">${article.source}</span>
                    </div>
                    <div class="article-body">
                        ${article.content}
                    </div>
                </article>
            </body>
            </html>
        `);
    }
}

// 初始化
const articleManager = new ArticleManager();

// 辅助函数
function showAddArticleForm() {
    document.querySelector('.article-form-modal').style.display = 'flex';
}

function hideAddArticleForm() {
    document.querySelector('.article-form-modal').style.display = 'none';
}

// 将函数添加到全局作用域
window.showAddArticleForm = showAddArticleForm;
window.hideAddArticleForm = hideAddArticleForm; 