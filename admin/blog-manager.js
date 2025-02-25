class BlogManager {
    constructor() {
        // 添加登录检查
        if (!this.checkLogin()) {
            window.location.href = '../admin-login.html';
            return;
        }

        try {
            // Firebase 配置
            const firebaseConfig = {
                apiKey: "AIzaSyA9AK9xPGgfPdGYYdfFt8KS892qcuYS3bQ",
                authDomain: "newyachting-blog.firebaseapp.com",
                projectId: "newyachting-blog",
                storageBucket: "newyachting-blog.firebasestorage.app",
                messagingSenderId: "133522516860",
                appId: "1:133522516860:web:552b61326ad8ab7b7f12f9",
                measurementId: "G-12LYR4JY88"
            };

            // 确保 Firebase 只初始化一次
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            
            this.db = firebase.firestore();
            this.storage = firebase.storage();
            this.articlesRef = this.db.collection('articles');
            
            console.log('Firebase 初始化成功');
            this.init();
        } catch (error) {
            console.error('Firebase 初始化失败:', error);
            alert('系统初始化失败: ' + error.message);
        }
    }

    init() {
        this.bindEvents();
        this.loadArticles();
    }

    bindEvents() {
        const form = document.getElementById('articleForm');
        const imageInput = document.getElementById('image');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveArticle();
        });

        // 添加图片预览
        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const preview = document.querySelector('.image-preview');
                        preview.innerHTML = `<img src="${e.target.result}" style="max-width: 200px;">`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    async saveArticle() {
        try {
            const form = document.getElementById('articleForm');
            if (!form) {
                throw new Error('找不到文章表单');
            }

            if (!quill) {
                throw new Error('编辑器未初始化');
            }

            const imageFile = document.getElementById('image')?.files[0];
            
            // 准备文章数据（不包含图片）
            const article = {
                title: form.title.value || '',
                category: form.category.value || 'news',
                content: quill.root.innerHTML || '',
                source: form.source?.value || '',
                tags: form.tags?.value ? form.tags.value.split(',').map(tag => tag.trim()) : [],
                date: new Date().toISOString(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // 验证必填字段
            if (!article.title.trim()) {
                throw new Error('请输入文章标题');
            }

            if (!article.content.trim()) {
                throw new Error('请输入文章内容');
            }

            // 先保存文章内容
            const docRef = await this.articlesRef.add(article);
            console.log('文章内容已保存，ID:', docRef.id);

            // 处理图片上传
            if (imageFile) {
                // 压缩图片
                const compressedFile = await this.compressImage(imageFile);
                
                // 创建唯一的文件路径
                const timestamp = Date.now();
                const filename = `${timestamp}_${imageFile.name}`;
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(`images/${filename}`);

                // 上传压缩后的图片
                await fileRef.put(compressedFile);
                
                // 获取文件URL
                const imageUrl = await fileRef.getDownloadURL();
                
                // 更新文章记录
                await docRef.update({
                    image: imageUrl
                });
            }

            alert('文章保存成功！');
            setTimeout(() => {
                hideAddArticleForm();
                this.loadArticles(); // 重新加载文章列表
            }, 100);
        } catch (error) {
            console.error('保存失败:', error);
            alert(`保存失败: ${error.message}`);
        }
    }

    async loadArticles() {
        try {
            const snapshot = await this.articlesRef
                .orderBy('createdAt', 'desc')
                .get();

            const articles = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            this.renderArticles(articles);
        } catch (error) {
            console.error('加载文章失败:', error);
        }
    }

    renderArticles(articles) {
        const container = document.querySelector('.article-list');
        container.innerHTML = articles.map(article => `
            <div class="article-item">
                <h3>${article.title}</h3>
                <div class="article-meta">
                    <span class="category">${this.getCategoryName(article.category)}</span>
                    <span class="date">${new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div class="article-actions">
                    <button onclick="editArticle('${article.id}')" class="btn btn-edit">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                    <button onclick="deleteArticle('${article.id}')" class="btn btn-delete">
                        <i class="fas fa-trash"></i> 删除
                    </button>
                </div>
            </div>
        `).join('');
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

    // 添加图片压缩方法
    async compressImage(file) {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.8,
                maxWidth: 1920,
                maxHeight: 1080,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    }

    // 添加登录检查方法
    checkLogin() {
        return sessionStorage.getItem('adminLoggedIn') === 'true';
    }

    // 添加登出方法
    logout() {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = '../admin-login.html';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.blogManager = new BlogManager();
});

// 辅助函数
function showAddArticleForm() {
    document.querySelector('.article-form-modal').style.display = 'flex';
}

function hideAddArticleForm() {
    try {
        const modal = document.querySelector('.article-form-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        const form = document.getElementById('articleForm');
        if (form) {
            form.reset();
        }
        
        if (quill) {
            quill.setContents([]);
        }
    } catch (error) {
        console.error('关闭表单时出错:', error);
    }
}

// 添加编辑文章功能
async function editArticle(articleId) {
    try {
        const doc = await firebase.firestore()
            .collection('articles')
            .doc(articleId)
            .get();

        if (!doc.exists) {
            alert('文章不存在');
            return;
        }

        const article = doc.data();
        
        // 填充表单
        const form = document.getElementById('articleForm');
        form.title.value = article.title;
        form.category.value = article.category;
        form.source.value = article.source || '';
        
        // 加载标签
        window.loadExistingTags(article.tags || []);
        
        // 设置编辑器内容
        quill.root.innerHTML = article.content;
        
        // 显示图片预览
        if (article.image) {
            const preview = document.querySelector('.image-preview');
            preview.innerHTML = `<img src="${article.image}" style="max-width: 200px;">`;
        }
        
        // 显示表单
        document.querySelector('.article-form-modal').style.display = 'flex';
        
        // 保存文章ID用于更新
        form.dataset.articleId = articleId;
    } catch (error) {
        console.error('加载文章失败:', error);
        alert('加载文章失败');
    }
}

// 添加删除文章功能
async function deleteArticle(articleId) {
    if (!confirm('确定要删除这篇文章吗？')) {
        return;
    }

    try {
        await firebase.firestore()
            .collection('articles')
            .doc(articleId)
            .delete();
            
        alert('文章已删除');
        window.blogManager.loadArticles();
    } catch (error) {
        console.error('删除文章失败:', error);
        alert('删除文章失败');
    }
} 