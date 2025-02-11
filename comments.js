// 评论功能
class CommentSystem {
    constructor() {
        this.commentForm = document.querySelector('.comment-form');
        this.commentsList = document.querySelector('.comments-list');
        this.submitButton = document.querySelector('.submit-comment');
        
        this.init();
    }
    
    init() {
        this.loadComments();
        this.bindEvents();
    }
    
    bindEvents() {
        this.submitButton.addEventListener('click', () => this.submitComment());
    }
    
    submitComment() {
        const text = document.getElementById('commentText').value.trim();
        const name = document.getElementById('commentName').value.trim();
        
        if (!text || !name) {
            alert('请填写评论内容和称呼');
            return;
        }
        
        const comment = {
            author: name,
            content: text,
            date: new Date().toISOString(),
            articleId: getArticleId() // 从 article.js 中获取
        };
        
        this.saveComment(comment);
    }
    
    saveComment(comment) {
        // 这里应该发送到服务器
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then(response => response.json())
        .then(data => {
            this.addCommentToList(data);
            this.clearForm();
        })
        .catch(error => {
            console.error('Error saving comment:', error);
            alert('评论提交失败，请稍后重试');
        });
    }
    
    loadComments() {
        const articleId = getArticleId();
        fetch(`/api/comments?articleId=${articleId}`)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => this.addCommentToList(comment));
            });
    }
    
    addCommentToList(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${this.formatDate(comment.date)}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
        `;
        this.commentsList.insertBefore(commentElement, this.commentsList.firstChild);
    }
    
    clearForm() {
        document.getElementById('commentText').value = '';
        document.getElementById('commentName').value = '';
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// 初始化评论系统
document.addEventListener('DOMContentLoaded', () => {
    new CommentSystem();
}); 