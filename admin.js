class YachtAdmin {
    constructor() {
        // 检查登录状态
        if (!this.checkLogin()) {
            window.location.href = 'file:///D:/NewYachtingFZE/admin-login.html';
            return;
        }

        this.currentTab = 'rent';
        this.rentYachts = [];
        this.saleYachts = [];
        this.init();
    }

    checkLogin() {
        return sessionStorage.getItem('adminLoggedIn') === 'true';
    }

    async init() {
        this.loadYachts();
        this.bindEvents();
        this.renderYachts();
    }

    loadYachts() {
        // 加载租赁游艇数据
        this.rentYachts = JSON.parse(localStorage.getItem('rentalYachts')) || [];
        // 加载出售游艇数据
        this.saleYachts = JSON.parse(localStorage.getItem('saleYachts')) || [];
    }

    bindEvents() {
        // 标签切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentTab = e.target.dataset.tab;
                this.updateActiveTab();
                this.renderYachts();
            });
        });

        // 添加游艇
        document.querySelector('.add-yacht-btn').addEventListener('click', () => {
            this.showYachtForm();
        });

        // 搜索功能
        document.querySelector('.search-input').addEventListener('input', (e) => {
            this.filterYachts(e.target.value);
        });
    }

    updateActiveTab() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === this.currentTab);
        });
    }

    renderYachts() {
        const yachts = this.currentTab === 'rent' ? this.rentYachts : this.saleYachts;
        const container = document.querySelector('.yacht-list');
        
        container.innerHTML = yachts.map(yacht => `
            <div class="yacht-item" data-id="${yacht.id}">
                <img src="${yacht.image}" alt="${yacht.name}">
                <div class="yacht-info">
                    <h3>${yacht.name}</h3>
                    <p>${yacht.description}</p>
                    <p>价格: ${this.formatPrice(yacht)}</p>
                </div>
                <div class="yacht-actions">
                    <button class="edit-btn" onclick="yachtAdmin.editYacht(${yacht.id})">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                    <button class="delete-btn" onclick="yachtAdmin.deleteYacht(${yacht.id})">
                        <i class="fas fa-trash"></i> 删除
                    </button>
                </div>
            </div>
        `).join('');
    }

    formatPrice(yacht) {
        if (this.currentTab === 'rent') {
            return `每小时: AED ${yacht.hourlyPrice.toLocaleString()}`;
        }
        return `AED ${yacht.price.toLocaleString()}`;
    }

    showYachtForm(yacht = null) {
        // 显示添加/编辑游艇的表单
        // ... 实现表单逻辑
    }

    editYacht(id) {
        const yachts = this.currentTab === 'rent' ? this.rentYachts : this.saleYachts;
        const yacht = yachts.find(y => y.id === id);
        if (yacht) {
            this.showYachtForm(yacht);
        }
    }

    deleteYacht(id) {
        if (!confirm('确定要删除这艘游艇吗？')) return;

        if (this.currentTab === 'rent') {
            this.rentYachts = this.rentYachts.filter(y => y.id !== id);
            localStorage.setItem('rentalYachts', JSON.stringify(this.rentYachts));
        } else {
            this.saleYachts = this.saleYachts.filter(y => y.id !== id);
            localStorage.setItem('saleYachts', JSON.stringify(this.saleYachts));
        }
        this.renderYachts();
    }

    filterYachts(query) {
        // 实现搜索过滤功能
        // ... 实现搜索逻辑
    }

    // 添加登出方法
    logout() {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'file:///D:/NewYachtingFZE/admin/admin-login.html';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.yachtAdmin = new YachtAdmin();
}); 