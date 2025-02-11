// 文章分享功能
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            switch(platform) {
                case 'wechat':
                    // 显示二维码
                    showQRCode(url);
                    break;
                case 'weibo':
                    window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${title}`);
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
                    break;
            }
        });
    });
}

// 显示二维码的函数
function showQRCode(url) {
    // 创建二维码弹窗
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-container">
            <h3>扫描二维码分享到微信</h3>
            <div id="qrcode"></div>
            <button class="close-btn">关闭</button>
        </div>
    `;
    document.body.appendChild(modal);

    // 使用 qrcode.js 生成二维码
    new QRCode(document.getElementById("qrcode"), url);

    // 关闭按钮功能
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
}

// 页面加载完成后初始化分享按钮
document.addEventListener('DOMContentLoaded', initShareButtons); 