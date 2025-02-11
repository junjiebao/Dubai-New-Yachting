class BlogManager {
    constructor() {
        this.articles = [];
        this.quill = null;
        this.init();
    }

    async init() {
        // 初始化 Quill 编辑器
        this.quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['link', 'image'],
                    ['clean']
                ],
                clipboard: {
                    matchVisual: false
                }
            },
            bounds: document.querySelector('#editor'),
            strict: true,
            placeholder: '请输入文章内容...'
        });

        // 禁用编辑器的自动检查
        this.quill.root.setAttribute('spellcheck', false);
        
        // 设置编辑器的内容类型
        this.quill.root.setAttribute('contenteditable', 'true');
        this.quill.root.setAttribute('data-gramm', 'false');

        // 当编辑器内容改变时，更新隐藏的input
        this.quill.on('text-change', () => {
            document.getElementById('content').value = this.quill.root.innerHTML;
        });

        // 其他初始化代码...
    }

    showArticleForm(article = null) {
        const form = document.getElementById('articleForm');
        const dialog = document.getElementById('articleFormDialog');
        
        if (article) {
            // 编辑现有文章
            document.getElementById('articleId').value = article.id;
            document.getElementById('title').value = article.title;
            document.getElementById('category').value = article.category;
            this.quill.root.innerHTML = article.content;
            document.getElementById('image').value = article.image || '';
            document.getElementById('source').value = article.source || '';
            document.getElementById('tags').value = article.tags?.join(', ') || '';
        } else {
            // 添加新文章
            form.reset();
            document.getElementById('articleId').value = '';
            this.quill.root.innerHTML = '';
        }

        dialog.style.display = 'block';
    }

    saveArticle() {
        const articleId = document.getElementById('articleId').value;
        const article = {
            id: articleId ? articleId : Date.now().toString(),
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            content: this.quill.root.innerHTML,
            image: document.getElementById('image').value,
            source: document.getElementById('source').value,
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            date: new Date().toISOString()
        };

        // 保存文章逻辑...
    }
} 