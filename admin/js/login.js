function handleLogin(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const correctPassword = 'your_password_here'; // 替换为实际密码
    
    if (password === correctPassword) {
        // 设置登录状态
        localStorage.setItem('adminLoggedIn', 'true');
        
        // 跳转到管理页面
        window.location.href = '/admin/blog-manage.html';
        return false;
    } else {
        alert('密码错误，请重试');
        document.getElementById('password').value = '';
        return false;
    }
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    // 如果已经登录，直接跳转到管理页面
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        window.location.href = '/admin/blog-manage.html';
    }
    
    // 确保表单提交时调用handleLogin
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
}); 