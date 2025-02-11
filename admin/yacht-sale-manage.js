class YachtSaleManager {
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
        // 从localStorage加载游艇数据
        this.yachts = JSON.parse(localStorage.getItem('saleYachts')) || [];
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
        const formData = new FormData(form);
        // 验证必填字段
        const requiredFields = ['name', 'brand', 'length', 'price', 'condition', 'year', 'description'];
        for (const field of requiredFields) {
            if (!formData.get(field)) {
                alert(`请填写${field}字段`);
                return;
            }
        }

        const yacht = {
            id: this.editingYachtId || Date.now(),
            name: formData.get('name'),
            brand: formData.get('brand'),
            length: formData.get('length'),
            price: Number(formData.get('price')),
            condition: formData.get('condition'),
            year: Number(formData.get('year')),
            description: formData.get('description'),
            detailLink: formData.get('detailLink'),
            specs: {
                beam: formData.get('beam') || 'N/A',
                speed: formData.get('speed') || 'N/A',
                tonnage: Number(formData.get('tonnage')) || 0,
                guests: Number(formData.get('guests')) || 0,
                crew: Number(formData.get('crew')) || 0
            }
        };

        // 处理图片
        const imageFile = formData.get('image');
        if (imageFile && imageFile.size > 0) {
            yacht.image = await this.processImage(imageFile);
        }

        if (this.editingYachtId) {
            // 更新现有游艇
            const index = this.yachts.findIndex(y => y.id === this.editingYachtId);
            if (index !== -1) {
                this.yachts[index] = yacht;
            }
            // 同步更新buyYachts中的数据
            const buyYachts = JSON.parse(localStorage.getItem('buyYachts')) || [];
            const buyIndex = buyYachts.findIndex(y => y.id === this.editingYachtId);
            if (buyIndex !== -1) {
                buyYachts[buyIndex] = yacht;
            }
            localStorage.setItem('buyYachts', JSON.stringify(buyYachts));
        } else {
            // 添加新游艇
            this.yachts.push(yacht);
            // 同步到buyYachts
            const buyYachts = JSON.parse(localStorage.getItem('buyYachts')) || [];
            buyYachts.push(yacht);
            localStorage.setItem('buyYachts', JSON.stringify(buyYachts));
        }

        localStorage.setItem('saleYachts', JSON.stringify(this.yachts));
        this.editingYachtId = null; // 重置编辑ID
        
        // 刷新显示
        this.renderYachts();
        hideYachtForm();
        form.reset();
    }

    async processImage(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }

    renderYachts() {
        const container = document.querySelector('.yacht-list');
        container.innerHTML = this.yachts.map(yacht => this.createYachtCard(yacht)).join('');
    }

    createYachtCard(yacht) {
        return `
            <div class="yacht-card">
                <div class="yacht-image">
                    <img src="${yacht.image || 'images/default-yacht.jpg'}" alt="${yacht.name}">
                </div>
                <div class="yacht-info">
                    <h3>${yacht.name}</h3>
                    <div class="yacht-specs">
                        <p><strong>品牌:</strong> ${yacht.brand}</p>
                        <p><strong>长度:</strong> ${yacht.length}米</p>
                        <p><strong>价格:</strong> $${yacht.price.toLocaleString()}</p>
                        <p><strong>状态:</strong> ${yacht.condition === 'new' ? '全新' : '二手'}</p>
                        <p><strong>年份:</strong> ${yacht.year}</p>
                    </div>
                    <div class="yacht-details">
                        <p><strong>船宽:</strong> ${yacht.specs.beam}</p>
                        <p><strong>速度:</strong> ${yacht.specs.speed}</p>
                        <p><strong>载客:</strong> ${yacht.specs.guests}人</p>
                        <p><strong>船员:</strong> ${yacht.specs.crew}人</p>
                    </div>
                    <div class="yacht-actions">
                        <button class="btn edit-btn" onclick="editYacht(${yacht.id})">
                            <i class="fas fa-edit"></i> 编辑
                        </button>
                        <button class="btn delete-btn" onclick="deleteYacht(${yacht.id})">
                            <i class="fas fa-trash"></i> 删除
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    editYacht(id) {
        const yacht = this.yachts.find(y => y.id === id);
        if (!yacht) return;

        // 标记当前正在编辑的游艇ID
        this.editingYachtId = id;
        
        // 填充表单
        const form = document.getElementById('yachtForm');
        form.name.value = yacht.name;
        form.brand.value = yacht.brand;
        form.length.value = yacht.length;
        form.price.value = yacht.price;
        form.condition.value = yacht.condition;
        form.year.value = yacht.year;
        form.description.value = yacht.description;
        form.detailLink.value = yacht.detailLink;

        // 填充规格参数
        form.querySelector('[name="beam"]').value = yacht.specs.beam;
        form.querySelector('[name="speed"]').value = yacht.specs.speed;
        form.querySelector('[name="tonnage"]').value = yacht.specs.tonnage;
        form.querySelector('[name="guests"]').value = yacht.specs.guests;
        form.querySelector('[name="crew"]').value = yacht.specs.crew;

        // 显示图片预览
        if (yacht.image) {
            document.querySelector('.image-preview').innerHTML = `
                <img src="${yacht.image}" alt="预览图">
            `;
        }

        // 显示表单
        showAddYachtForm();
    }

    deleteYacht(id) {
        if (confirm('确定要删除这艘游艇吗？')) {
            this.yachts = this.yachts.filter(y => y.id !== id);
            localStorage.setItem('saleYachts', JSON.stringify(this.yachts));
            // 同步删除buyYachts中的数据
            const buyYachts = JSON.parse(localStorage.getItem('buyYachts')) || [];
            const updatedBuyYachts = buyYachts.filter(y => y.id !== id);
            localStorage.setItem('buyYachts', JSON.stringify(updatedBuyYachts));
            this.renderYachts();
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.yachtSaleManager = new YachtSaleManager();
});

// 辅助函数
function showAddYachtForm() {
    document.querySelector('.yacht-form-modal').style.display = 'flex';
}

function hideYachtForm() {
    document.querySelector('.yacht-form-modal').style.display = 'none';
}

function editYacht(id) {
    window.yachtSaleManager.editYacht(id);
}

function deleteYacht(id) {
    window.yachtSaleManager.deleteYacht(id);
} 