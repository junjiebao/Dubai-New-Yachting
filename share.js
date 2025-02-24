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

// 添加社交媒体按钮到页面
function addSocialButtons() {
    const socialButtons = document.createElement('div');
    socialButtons.className = 'social-buttons';
    socialButtons.innerHTML = `
        <a href="javascript:void(0)" class="social-button wechat" onclick="showWeChatQR()">
            <i class="fab fa-weixin"></i>
        </a>
        <a href="https://wa.me/971561018837" target="_blank" rel="noopener noreferrer" class="social-button whatsapp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;

    const modal = document.createElement('div');
    modal.id = 'wechatModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeWeChatQR()">&times;</span>
            <img src="images/WeChat QR.jpg" alt="WeChat QR Code">
        </div>
    `;

    document.body.appendChild(socialButtons);
    document.body.appendChild(modal);
}

// 显示微信二维码
function showWeChatQR() {
    document.getElementById('wechatModal').style.display = 'block';
}

// 关闭微信二维码
function closeWeChatQR() {
    document.getElementById('wechatModal').style.display = 'none';
}

// 点击弹窗外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('wechatModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// 页面加载完成后初始化分享按钮
document.addEventListener('DOMContentLoaded', initShareButtons);

// 页面加载完成后添加社交媒体按钮
document.addEventListener('DOMContentLoaded', addSocialButtons); 