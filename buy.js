class YachtManager {
    constructor() {
        this.yachts = [];
        this.loadYachts();
        this.bindEvents();
        this.renderYachts();
    }

    async loadYachts() {
        // 清除localStorage中的旧数据
        localStorage.removeItem('buyYachts');
        
        // 从localStorage加载游艇数据
        this.yachts = JSON.parse(localStorage.getItem('buyYachts')) || [];
        
        // 确保默认数据和新添加的数据都存在
        const defaultYachts = [
            {
                id: 1,
                name: '2014 M/Y Queen Alla',
                brand: 'Benetti',
                length: '43',
                price: 17000000,
                condition: 'used',
                year: 2014,
                description: '豪华43米超级游艇，抢眼配色，内饰豪华',
                image: 'images/yacht1.jpg',
                specs: {
                    beam: '8.6m',
                    speed: '16 kn',
                    tonnage: '381',
                    guests: 10,
                    crew: 8
                }
            },
            {
                id: 2,
                name: '2021 Riva 100 Corsaro',
                brand: 'Riva',
                length: '29.9',
                price: 9250000,
                condition: 'used',
                year: 2021,
                description: '意大利丽娃100尺，豪华超级游艇',
                image: 'images/yacht2.jpg',
                specs: {
                    beam: '6.70m',
                    speed: '28 kn',
                    tonnage: '120',
                    guests: 10,
                    crew: 3
                }
            },
            {
                id: 3,
                name: '2025 Majesty T100',
                brand: 'Majesty',
                length: '43.12',
                price: 11800000,
                condition: 'new',
                year: 2025,
                description: '2025年即将交付的全新游艇，外部和内部设计时尚宽敞，戛纳游艇展后可以交付给新船东',
                image: 'images/majesty T100.jpg',
                specs: {
                    beam: '8.23m',
                    speed: '18 kn',
                    tonnage: '398',
                    guests: 12,
                    crew: 9
                }
            },
            {
                id: 4,
                name: '2026 Numarine 32XP',
                brand: 'Numarine',
                length: '32.63',
                price: 13900000,
                currency: 'EUR',
                condition: 'new',
                year: 2026,
                description: '2026年交付的32XP游艇，土耳其建造的探险游艇。',
                image: 'images/32XP.jpg',
                specs: {
                    beam: '8.00m',
                    speed: '14 kn',
                    tonnage: '297',
                    guests: 10,
                    crew: 2
                }
            },
            {
                id: 5,
                name: '2024 KING BENJI',
                brand: 'Dunya Yachts',
                length: '46.70',
                price: 45000000,
                condition: 'new',
                year: 2024,
                description: '这艘名为KING BENJI的Dunya Yachts豪华探险游艇建造于2024年，外观设计师为Gregory C. Marshall Naval Architect，内部装潢由Design Unlimited设计。',
                image: 'images/KING BENJI.jpg',
                specs: {
                    beam: '8.88m',
                    speed: '15 kn',
                    tonnage: '491',
                    guests: 12,
                    crew: 2
                }
            },
            {
                id: 6,
                name: '2018 Sunseeker 95 (最近有降价)',
                brand: 'Sunseeker',
                length: '28.07',
                price: 6900000 to 5950000,
                condition: 'used',
                year: 2018,
                description: '这艘2018年建造的Sunseeker 95游艇，内部装潢豪华，配备了两台MTU 12V 2000 M96L发动机。',
                image: 'images/2018 sunseeker 95.jpg',
                specs: {
                    beam: '6.58m',
                    speed: '26 kn',
                    tonnage: '84.7',
                    guests: 8,
                    crew: 2
                }
            },
            {
                id: 7,
                name: '2026 Damen Yacht Support YS 53',
                brand: 'Damen',
                length: '53.25',
                price: 28000000,
                currency: 'EUR',
                condition: 'new',
                year: 2026,
                description: '53米超级游艇支援艇，她不仅能够满足普通游艇的豪华休闲生活方式，还能支持多元化的活动需求。',
                image: 'images/yacht support YS53.jpeg',
                specs: {
                    beam: '9.2m',
                    speed: '19 kn',
                    tonnage: '499',
                    guests: 16,
                    crew: 11
                }
            },
            {
                id: 8,
                name: '2027 Nomad 101',
                brand: 'Nomad',
                length: '30.34',
                price: 9500000,
                condition: 'new',
                year: 2027,
                description: '30米休闲长航超级游艇，支持私人定制内饰，最具性价比的三层超艇选择。',
                image: 'images/Nomad 101.jpg',
                specs: {
                    beam: '7.35m',
                    speed: '21 kn',
                    tonnage: '135',
                    guests: 10,
                    crew: 6
                }
            },
            {
                id: 9,
                name: '2024 Azimut 30m Magellano white',
                brand: 'Azimut',
                length: '30',
                price: 9600000,
                currency: 'EUR',
                condition: 'undelivered',
                year: 2024,
                description: '30米Azimut麦哲伦超级游艇，船东由于个人原因，此游艇未交付，仍旧在意大利船厂，适合私用或者商业租赁运营。',
                image: 'images/2024-Azimut-Grande-Magellano-30M.jpg',
                specs: {
                    beam: '7.06m',
                    speed: '24 kn',
                    tonnage: '136',
                    guests: 12,
                    cabin: 5
                }
            },
            {
                id: 10,
                name: '2023 Admiral 55M',
                brand: 'Admiral',
                length: '55.2',
                price: 35000000,
                condition: 'new',
                year: 2023,
                description: '55米意大利ADMIRAL超级定制游艇，内饰由阿玛尼和CASA定制设计，全铝合金船体轻盈节能。',
                image: 'images/Admiral 55m Silver star.jpg',
                specs: {
                    beam: '8.6m',
                    speed: '18 kn',
                    tonnage: '499',
                    guests: 12,
                    crew: 11
                }
            },
            {
                id: 11,
                name: '2007 Sensation 50M',
                brand: 'Sensation',
                length: '49.9',
                price: 0, // 价格面议
                condition: 'used',
                year: 2007,
                description: '50米超级定制游艇，内饰富丽堂皇，全铝合金船体轻盈节能，航速较高。游艇停泊在迪拜。',
                image: 'images/2007 Sensation 50M.jpg',
                specs: {
                    beam: '8.5m',
                    speed: '20 kn',
                    tonnage: '499',
                    guests: 10,
                    crew: 9
                }
            },
            {
                id: 12,
                name: '2021 CRN 62M Voice',
                brand: 'CRN',
                length: '62',
                price: 65000000,
                condition: 'used',
                year: 2021,
                description: '62米超级定制游艇，内饰由Nuvolari Lenard设计，钢铝结构船身稳定可靠，游艇停泊在迪拜。',
                image: 'images/2021 CRN 62M Voice.jpg',
                specs: {
                    beam: '11.19m',
                    speed: '16.5 kn',
                    tonnage: '1288',
                    guests: 13,
                    crew: 17
                }
            },
            {
                id: 13,
                name: '2020 San Lorenzo 44.5M Kamakasa',
                brand: 'San Lorenzo',
                length: '44.5',
                price: 22900000,
                condition: 'used',
                year: 2020,
                description: '44.5米圣劳伦佐超级游艇，内饰现代豪华，全铝结构船身轻盈，游艇停泊在美国佛罗里达州。',
                image: 'images/2020 sanlorenzo 44.5 kamakasa.jpg',
                specs: {
                    beam: '9.3m',
                    speed: '22 kn',
                    tonnage: '483',
                    guests: 11,
                    crew: 9
                }
            },
            {
                id: 14,
                name: '2022 San lorenzo 88 Fouz',
                brand: 'San Lorenzo',
                length: '26.7',
                price: 6100000,
                condition: 'used',
                year: 2022,
                description: '2022年圣劳伦佐88尺超级游艇，迪拜注册并已经完税，由先进的船体稳定系统，迪拜海域家庭私人使用首选。',
                image: 'images/2022 san lorenzo 88 fouz.jpg',
                specs: {
                    beam: '7.21m',
                    speed: '23 kn',
                    tonnage: '87',
                    guests: 8,
                    crew: 3
                }
            },
            {
                id: 15,
                name: '2023 Custom Line Navetta 42',
                brand: 'Custom Line',
                length: '41.8',
                price: 22000000,
                condition: 'new',
                year: 2023,
                description: '2023年意大利Custom Line品牌定制款超级游艇，目前停泊在迪拜，半排水船体搭配船体稳定系统，迪拜海域家庭、商务休闲使用首选。',
                image: 'images/2023 Custom Line Navetta 42.jpg',
                specs: {
                    beam: '8.1m',
                    speed: '17 kn',
                    tonnage: '348',
                    guests: 10,
                    crew: 7
                }
            },
            {
                id: 16,
                name: '2025 Damen Xplorer 60',
                brand: 'Damen',
                length: '60',
                price: 75000000,
                currency: 'EUR',
                condition: 'new',
                year: 2025,
                description: '这艘60米探险超级游艇将于2025年春季交付，配备混合动力推进系统。巡航范围达5000-6000海里，可在极地和热带水域自如航行。由Azure Yacht Design设计外观，H2 Yacht Design设计内饰，完美融合探险性能与奢华体验。',
                image: 'images/Damen Xplorer 6001.jpg',
                specs: {
                    beam: '11.00m',
                    speed: '14.5 kn',
                    tonnage: '1160',
                    guests: 12,
                    crew: 16
                }
            }
        ];
        
        // 合并默认数据和用户添加的数据
        const existingIds = this.yachts.map(y => y.id);
        const newDefaultYachts = defaultYachts.filter(y => !existingIds.includes(y.id));
        this.yachts = [...this.yachts, ...newDefaultYachts];
        
        // 更新存储
        localStorage.setItem('buyYachts', JSON.stringify(this.yachts));
    }

    bindEvents() {
        // 绑定筛选事件
        document.querySelectorAll('.filter-group select').forEach(select => {
            select.addEventListener('change', () => this.filterYachts());
        });
    }

    filterYachts() {
        const brand = document.getElementById('brand').value;
        const length = document.getElementById('length').value;
        const price = document.getElementById('price').value;
        const condition = document.getElementById('condition').value;

        let filteredYachts = this.yachts;

        // 品牌筛选
        if (brand) {
            filteredYachts = filteredYachts.filter(yacht => yacht.brand === brand);
        }

        // 长度筛选
        if (length) {
            const [min, max] = length.split('-').map(Number);
            filteredYachts = filteredYachts.filter(yacht => {
                const yachtLength = parseFloat(yacht.length);
                if (max) {
                    return yachtLength >= min && yachtLength < max;
                } else {
                    return yachtLength >= min;
                }
            });
        }

        // 价格筛选（单位：百万美元）
        if (price) {
            const [min, max] = price.split('-').map(Number);
            filteredYachts = filteredYachts.filter(yacht => {
                const yachtPrice = yacht.price / 1000000; // 转换为百万
                if (max) {
                    return yachtPrice >= min && yachtPrice < max;
                } else {
                    return yachtPrice >= min;
                }
            });
        }

        // 状态筛选
        if (condition) {
            filteredYachts = filteredYachts.filter(yacht => {
                // 处理特殊状态 "undelivered"
                if (condition === 'new') {
                    return yacht.condition === 'new' || yacht.condition === 'undelivered';
                }
                return yacht.condition === condition;
            });
        }

        this.renderYachts(filteredYachts);
    }

    renderYachts(yachts = this.yachts) {
        const container = document.querySelector('.yacht-grid');
        container.innerHTML = yachts.map(yacht => this.createYachtCard(yacht)).join('');
    }

    formatPrice(price, currency = 'EUR') {
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        return formatter.format(price);
    }

    createYachtCard(yacht) {
        return `
            <div class="yacht-card">
                <img src="${yacht.image}" alt="${yacht.name}" class="yacht-image">
                <div class="yacht-info">
                    <h3>${yacht.name}</h3>
                    <p>长度: ${yacht.length}米</p>
                    <p>价格: ${this.formatPrice(yacht.price, yacht.currency)}</p>
                    <p>状态: ${this.getConditionText(yacht.condition)}</p>
                    <p>年份: ${yacht.year}</p>
                    <div class="yacht-buttons">
                        <button onclick="contactUs('${yacht.name}')">联系我们</button>
                        <button onclick="viewDetails(${yacht.id})">查看详情</button>
                    </div>
                </div>
            </div>
        `;
    }

    getConditionText(condition) {
        const conditionMap = {
            'new': '全新',
            'used': '二手',
            'undelivered': '未交付'
        };
        return conditionMap[condition] || condition;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.yachtManager = new YachtManager();
});

// 查看详情功能
function viewDetails(yachtId) {
    // PDF文档链接映射
    const pdfLinks = {
        1: 'https://kdocs.cn/l/cuAeevjyTxru',
        2: 'https://kdocs.cn/l/chcwgeaoMNTj',
        3: 'https://kdocs.cn/l/cgVhqUJzkkVY',
        4: 'https://kdocs.cn/l/cnweWbhQTAgQ',
        5: 'https://kdocs.cn/l/cgAhUqSbjxfk',
        6: 'https://kdocs.cn/l/ct8VAxyAFemg',
        7: 'https://kdocs.cn/l/cbdV5HSct9zY',
        8: 'https://kdocs.cn/l/cm7ZTMzMvxwe',
        9: 'https://kdocs.cn/l/chAmnP9RO6Ca',
        10: 'https://kdocs.cn/l/ciuyfnsxmZMP',
        11: 'https://kdocs.cn/l/cppu9DXqPwfn',
        12: 'https://www.kdocs.cn/l/cnmWkssj2ucK',
        13: 'https://kdocs.cn/l/cvEJwWzov1uM',
        14: 'https://kdocs.cn/l/cpEjFe4ClvWh',
        15: 'https://kdocs.cn/l/cnajy8A7PNON',
        16: 'https://kdocs.cn/l/chczjhojMv7K'
    };

    // 获取对应的PDF链接
    const pdfLink = pdfLinks[yachtId];
    
    if (pdfLink) {
        // 在新标签页中打开PDF文档
        window.open(pdfLink, '_blank');
    } else {
        // 如果没有找到对应的PDF链接，则显示详情模态框
        const yacht = window.yachtManager.yachts.find(y => y.id === yachtId);
        if (!yacht) return;

        // 构建详情内容
        const detailContent = `
            <div class="yacht-detail-modal">
                <div class="yacht-detail-content">
                    <h2>${yacht.name}</h2>
                    <img src="${yacht.image}" alt="${yacht.name}" class="detail-image">
                    <div class="detail-info">
                        <div class="specs-section">
                            <h3>基本参数</h3>
                            <p><strong>品牌:</strong> ${yacht.brand}</p>
                            <p><strong>长度:</strong> ${yacht.length}米</p>
                            <p><strong>船宽:</strong> ${yacht.specs.beam}</p>
                            <p><strong>最高速度:</strong> ${yacht.specs.speed}</p>
                            <p><strong>总吨位:</strong> ${yacht.specs.tonnage}</p>
                            <p><strong>载客人数:</strong> ${yacht.specs.guests}人</p>
                            <p><strong>船员数:</strong> ${yacht.specs.crew}人</p>
                            <p><strong>建造年份:</strong> ${yacht.year}</p>
                            <p><strong>状态:</strong> ${window.yachtManager.getConditionText(yacht.condition)}</p>
                            <p><strong>价格:</strong> ${window.yachtManager.formatPrice(yacht.price, yacht.currency)}</p>
                        </div>
                        <div class="description-section">
                            <h3>游艇描述</h3>
                            <p>${yacht.description}</p>
                        </div>
                        <div class="detail-actions">
                            <button onclick="contactUs('${yacht.name}')" class="contact-btn">联系我们</button>
                            <button onclick="closeDetails()" class="close-btn">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 创建模态框
        const modal = document.createElement('div');
        modal.id = 'yacht-detail-modal';
        modal.innerHTML = detailContent;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            overflow-y: auto;
            padding: 20px;
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .yacht-detail-content {
                background: white;
                padding: 20px;
                border-radius: 8px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }
            .detail-image {
                width: 100%;
                height: auto;
                max-height: 400px;
                object-fit: cover;
                border-radius: 4px;
                margin: 10px 0;
            }
            .detail-info {
                margin-top: 20px;
            }
            .specs-section, .description-section {
                margin-bottom: 20px;
            }
            .detail-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            .contact-btn, .close-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
            .contact-btn {
                background: #22577E;
                color: white;
            }
            .close-btn {
                background: #f5f5f5;
                color: #333;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);
    }
}

// 关闭详情模态框
function closeDetails() {
    const modal = document.getElementById('yacht-detail-modal');
    if (modal) {
        modal.remove();
    }
}

// 联系我们功能
function contactUs(yachtName) {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
} 
