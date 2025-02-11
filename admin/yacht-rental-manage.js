class YachtRentalManager {
    constructor() {
        this.yachts = [];
        this.init();
    }

    async init() {
        await this.loadYachts();
        this.bindEvents();
        this.renderYachts();
    }

    async loadYachts() {
        // 从localStorage加载租赁游艇数据
        this.yachts = JSON.parse(localStorage.getItem('rentalYachts')) || [];
    }

    bindEvents() {
        document.getElementById('yachtForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit(e.target);
        });

        document.getElementById('image').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
    }

    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const preview = document.querySelector('.image-preview');
        preview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="预览图">`;
    }

    async handleSubmit(form) {
        // 处理表单提交
        const formData = new FormData(form);
        const yacht = {
            id: Date.now(),
            name: formData.get('name'),
            brand: formData.get('brand'),
            length: formData.get('length'),
            dailyPrice: formData.get('dailyPrice'),
            weeklyPrice: formData.get('weeklyPrice'),
            year: formData.get('year'),
            description: formData.get('description'),
            availability: formData.get('availability'),
            location: formData.get('location'),
            specs: {
                beam: formData.get('beam'),
                speed: formData.get('speed'),
                tonnage: formData.get('tonnage'),
                guests: formData.get('guests'),
                crew: formData.get('crew')
            }
        };

        // 保存游艇数据
        this.yachts.push(yacht);
        localStorage.setItem('rentalYachts', JSON.stringify(this.yachts));
        
        // 刷新显示
        this.renderYachts();
        hideYachtForm();
    }

    renderYachts() {
        const container = document.querySelector('.yacht-list');
        container.innerHTML = this.yachts.map(yacht => this.createYachtCard(yacht)).join('');
    }

    createYachtCard(yacht) {
        return `
            <div class="yacht-card">
                <img src="${yacht.image || 'images/default-yacht.jpg'}" alt="${yacht.name}">
                <div class="yacht-info">
                    <h3>${yacht.name}</h3>
                    <div class="specs">
                        <p><strong>长度:</strong> ${yacht.length}米</p>
                        <p><strong>日租价格:</strong> $${yacht.dailyPrice}</p>
                        <p><strong>周租价格:</strong> $${yacht.weeklyPrice}</p>
                        <p><strong>位置:</strong> ${yacht.location}</p>
                    </div>
                    <div class="actions">
                        <button onclick="editYacht(${yacht.id})">编辑</button>
                        <button onclick="deleteYacht(${yacht.id})">删除</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.yachtRentalManager = new YachtRentalManager();
});

// 辅助函数
function showAddYachtForm() {
    document.querySelector('.yacht-form-modal').style.display = 'flex';
}

function hideYachtForm() {
    document.querySelector('.yacht-form-modal').style.display = 'none';
} 