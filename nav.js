document.addEventListener('DOMContentLoaded', function() {
    // 获取导航栏元素
    const nav = document.querySelector('nav');
    const toggle = nav.querySelector('.mobile-nav-toggle');
    const links = nav.querySelector('.nav-links');
    
    // 处理移动端菜单点击事件
    if (toggle && links) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 切换导航菜单的显示状态
            links.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-nav-toggle')) {
            if (links) {
                links.classList.remove('active');
            }
            if (toggle) {
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // 监听滚动事件
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > nav.offsetHeight && scrollTop > lastScrollTop) {
            // 向下滚动时显示固定导航栏
            nav.classList.add('nav-fixed', 'show');
        } else {
            // 向上滚动或回到顶部时隐藏固定导航栏
            nav.classList.remove('nav-fixed', 'show');
        }
        
        lastScrollTop = scrollTop;
    });
}); 