function logout() {
    // 清除登录状态
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminToken'); // 清除可能存在的token
    sessionStorage.clear(); // 清除会话存储
    // 跳转到登录页面
    window.location.replace('/admin-login.html');
} 