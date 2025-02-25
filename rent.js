function copyAndRedirect() {
    // 复制联系方式到剪贴板
    const contact = "+971 56 101 8837";
    navigator.clipboard.writeText(contact).then(() => {
        // 复制成功后跳转到 WhatsApp
        window.location.href = "https://wa.me/971561018837";
    });
}

class YachtRentManager {
    constructor() {
        this.yachts = [];
        this.filteredYachts = [];
        this.init();
    }

    async init() {
        this.loadYachts();
        this.bindEvents();
        this.renderYachts(this.yachts);
    }

    loadYachts() {
        // 直接在代码中维护游艇数据
        this.yachts = [
            {
                id: 1,
                name: '115 Santorini',
                brand: 'Santorini',
                length: '115',
                hourlyPrice: 15000,
                dailyPrice: 180000,
                description: '115尺超级游艇，5间客舱，可容纳50人',
                image: 'images/Santorini.webp',
                specs: {
                    cabins: 5,
                    guests: 50,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cnxOB13TbQod'
            },
            {
                id: 2,
                name: '164 Benetti',
                brand: 'Benetti',
                length: '164',
                hourlyPrice: 16000,
                dailyPrice: 160000,
                description: '164尺超级游艇，5间客舱，可容纳50人',
                image: 'images/Benetti164.webp',
                specs: {
                    cabins: 5,
                    guests: 50,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/ce9jjenM8b9C'
            },
            {
                id: 3,
                name: '100 Baia Yachts',
                brand: 'Baia',
                length: '100',
                hourlyPrice: 6000,
                dailyPrice: 70000,
                description: '100尺超级游艇，4间客舱，可容纳12人',
                image: 'images/BaiaYachts.webp',
                specs: {
                    cabins: 4,
                    guests: 12,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/clf2C2xFd9ky'
            },
            {
                id: 4,
                name: '70 Galeon',
                brand: 'Galeon',
                length: '70',
                hourlyPrice: 2500,
                dailyPrice: 25000,
                description: '70尺超级游艇，4间客舱，可容纳12人',
                image: 'images/Galeon.webp',
                specs: {
                    cabins: 4,
                    guests: 12,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cqLU0rl2v4B1'
            },
            {
                id: 5,
                name: '88 Sanlorenzo',
                brand: 'Sanlorenzo',
                length: '88',
                hourlyPrice: 6500,
                dailyPrice: 78000,
                description: '88尺超级游艇，4间客舱，可容纳12人',
                image: 'images/Sanlorenzo.webp',
                specs: {
                    cabins: 4,
                    guests: 12,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cgCJrH0W0KL1'
            },
            {
                id: 6,
                name: '154 CMB Yachts',
                brand: 'CMB',
                length: '154',
                hourlyPrice: 16000,
                dailyPrice: 190000,
                description: '154尺超级游艇，5间客舱，可容纳40人',
                image: 'images/CMBYachts.webp',
                specs: {
                    cabins: 5,
                    guests: 40,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cqYhBO7FsNp2'
            },
            {
                id: 7,
                name: '108 Sunseeker Predator',
                brand: 'Sunseeker',
                length: '108',
                hourlyPrice: 5000,
                dailyPrice: 48000,
                description: '108尺超级游艇，4间客舱，可容纳20人',
                image: 'images/SunseekerPredator.webp',
                specs: {
                    cabins: 4,
                    guests: 20,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cvKRN6fJW4fN'
            },
            {
                id: 8,
                name: '90 Sunseeker',
                brand: 'Sunseeker',
                length: '90',
                hourlyPrice: 5000,
                dailyPrice: 50000,
                description: '90尺超级游艇，4间客舱，可容纳20人',
                image: 'images/Sunseeker90.webp',
                specs: {
                    cabins: 4,
                    guests: 20,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cb9Ot5p2Ao0s'
            },
            {
                id: 9,
                name: '92 Majesty',
                brand: 'Majesty',
                length: '92',
                hourlyPrice: 3800,
                dailyPrice: 57000,
                description: '92尺超级游艇，4间客舱，可容纳35人',
                image: 'images/Majesty92.webp',
                specs: {
                    cabins: 4,
                    guests: 35,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cuerqJrHm9j0'
            },
            {
                id: 10,
                name: '110 Majesty',
                brand: 'Majesty',
                length: '110',
                hourlyPrice: 4000,
                dailyPrice: 60000,
                description: '110尺超级游艇，5间客舱，可容纳50人',
                image: 'images/Majesty110.webp',
                specs: {
                    cabins: 5,
                    guests: 50,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cmGIiMaifcBp'
            },
            {
                id: 11,
                name: '82 Majesty',
                brand: 'Majesty',
                length: '82',
                hourlyPrice: 3500,
                dailyPrice: 42000,
                description: '82尺超级游艇，4间客舱，可容纳30人',
                image: 'images/Majesty82.webp',
                specs: {
                    cabins: 4,
                    guests: 30,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cjcR06Np3mDQ'
            },
            {
                id: 12,
                name: '140 Stardom',
                brand: 'Stardom',
                length: '140',
                hourlyPrice: 10000,
                dailyPrice: 115000,
                description: '140英尺超级游艇，5间客舱，可容纳100人',
                image: 'images/Stardom.webp',
                specs: {
                    cabins: 5,
                    guests: 100,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cjcR06Np3mDQ'
            },
            {
                id: 13,
                name: '131 Encore',
                brand: 'Encore',
                length: '131',
                hourlyPrice: 12500,
                dailyPrice: 155000,
                description: '131英尺超级游艇，5间客舱，可容纳30人',
                image: 'images/Encore.webp',
                specs: {
                    cabins: 5,
                    guests: 30,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cpDMmHQ8o2WN'
            },
            {
                id: 14,
                name: '131 Sunseeker',
                brand: 'Sunseeker',
                length: '131',
                hourlyPrice: 15000,
                dailyPrice: 150000,
                description: '131尺超级游艇，7间客舱，可容纳30人',
                image: 'images/Sunseeker131.webp',
                specs: {
                    cabins: 7,
                    guests: 30,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cpKfnrMFNaNf'
            },
            {
                id: 15,
                name: '115 Benetti',
                brand: 'Benetti',
                length: '115',
                hourlyPrice: 10000,
                dailyPrice: 80000,
                description: '115尺超级游艇，5间客舱，可容纳50人',
                image: 'images/Benetti115.webp',
                specs: {
                    cabins: 5,
                    guests: 50,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/ckxIYRYpTe77'
            },
            {
                id: 16,
                name: '116 Sunseeker',
                brand: 'Sunseeker',
                length: '116',
                hourlyPrice: 15000,
                dailyPrice: 180000,
                description: '116尺超级游艇，5间客舱，可容纳20人',
                image: 'images/Sunseeker116.webp',
                specs: {
                    cabins: 5,
                    guests: 20,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cnEfpI9gl7pX'
            },
            {
                id: 17,
                name: '124 Peri Yachts',
                brand: 'Peri',
                length: '124',
                hourlyPrice: 15000,
                dailyPrice: 180000,
                description: '124尺超级游艇，5间客舱，可容纳25人',
                image: 'images/PeriYachts124.webp',
                specs: {
                    cabins: 5,
                    guests: 25,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/csQLpIiYzCD9'
            },
            {
                id: 18,
                name: '105 Numarine',
                brand: 'Numarine',
                length: '105',
                hourlyPrice: 8000,
                dailyPrice: 80000,
                description: '105尺超级游艇，3间客舱，可容纳20人',
                image: 'images/Numarine105.webp',
                specs: {
                    cabins: 3,
                    guests: 20,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cbqry9iDIzE0'
            },
            {
                id: 19,
                name: '95 Sunseeker',
                brand: 'Sunseeker',
                length: '95',
                hourlyPrice: 5000,
                dailyPrice: 55000,
                description: '95尺超级游艇，4间客舱，可容纳30人',
                image: 'images/Sunseeker95.webp',
                specs: {
                    cabins: 4,
                    guests: 30,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/clscHYYBYn0m'
            },
            {
                id: 20,
                name: '78 Fairline',
                brand: 'Fairline',
                length: '78',
                hourlyPrice: 2500,
                dailyPrice: 28000,
                description: '78尺超级游艇，3间客舱，可容纳25人',
                image: 'images/Fairline78.webp',
                specs: {
                    cabins: 3,
                    guests: 25,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cje0HTf1lMkB'
            },
            {
                id: 21,
                name: '160 Sensation',
                brand: 'Sensation',
                length: '160',
                hourlyPrice: 18000,
                dailyPrice: 180000,
                description: '160尺超级游艇，4间客舱，可容纳15人',
                image: 'images/Sensation160.webp',
                specs: {
                    cabins: 4,
                    guests: 15,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cc8hebZw6IOD'
            },
            {
                id: 22,
                name: '62 Sunreef',
                brand: 'Sunreef',
                length: '62',
                hourlyPrice: 3500,
                dailyPrice: 30000,
                description: '62尺超级游艇，4间客舱，可容纳20人',
                image: 'images/Sunreef62.webp',
                specs: {
                    cabins: 4,
                    guests: 20,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cqdBKnXrvVhF'
            },
            {
                id: 23,
                name: '135 Palmer Johnson',
                brand: 'Palmer Johnson',
                length: '135',
                hourlyPrice: 15500,
                dailyPrice: 156000,
                description: '135尺超级游艇，5间客舱，可容纳30人',
                image: 'images/PalmerJohnson135.webp',
                specs: {
                    cabins: 5,
                    guests: 30,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/crpPKbZrGZRs'
            },
            {
                id: 24,
                name: '90 PR MARINE',
                brand: 'PR MARINE',
                length: '90',
                hourlyPrice: 4000,
                dailyPrice: 45000,
                description: '90尺超级游艇，4间客舱，可容纳25人',
                image: 'images/PRMARINE90.webp',
                specs: {
                    cabins: 4,
                    guests: 25,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cvJFUwuHreGg'
            },
            {
                id: 25,
                name: '50 Ferretti',
                brand: 'Ferretti',
                length: '50',
                hourlyPrice: 1000,
                dailyPrice: 20000,
                description: '50尺超级游艇，2间客舱，可容纳12人',
                image: 'images/Ferretti50.webp',
                specs: {
                    cabins: 2,
                    guests: 12,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/csblaCbG1jO0'
            },
            {
                id: 26,
                name: '164 Benetti',
                brand: 'Benetti',
                length: '164',
                hourlyPrice: 16000,
                dailyPrice: 160000,
                description: '164尺超级游艇，6间客舱，可容纳50人',
                image: 'images/Benetti164_2.webp',
                specs: {
                    cabins: 6,
                    guests: 50,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/ce9jjenM8b9C'
            },
            {
                id: 27,
                name: '82 Sunseeker',
                brand: 'Sunseeker',
                length: '82',
                hourlyPrice: 4000,
                dailyPrice: 40000,
                description: '82尺超级游艇，4间客舱，可容纳15人',
                image: 'images/Sunseeker82.webp',
                specs: {
                    cabins: 4,
                    guests: 15,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/crRB57svLJyV'
            },
            {
                id: 28,
                name: '70 Sunseeker',
                brand: 'Sunseeker',
                length: '70',
                hourlyPrice: 2500,
                dailyPrice: 25000,
                description: '70尺超级游艇，4间客舱，可容纳12人',
                image: 'images/Sunseeker70.webp',
                specs: {
                    cabins: 4,
                    guests: 12,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/clf997Mu6sjh'
            },
            {
                id: 29,
                name: '54 Pershing',
                brand: 'Pershing',
                length: '54',
                hourlyPrice: 2000,
                dailyPrice: 28000,
                description: '54尺超级游艇，2间客舱，可容纳8人',
                image: 'images/Pershing54.webp',
                specs: {
                    cabins: 2,
                    guests: 8,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cay9UcZDtYBS'
            },
            {
                id: 30,
                name: '66 Azimut Magellano',
                brand: 'Azimut',
                length: '66',
                hourlyPrice: 3000,
                dailyPrice: 30000,
                description: '66尺超级游艇，4间客舱，可容纳20人',
                image: 'images/AzimutMagellano66.webp',
                specs: {
                    cabins: 4,
                    guests: 20,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cfjvMXYhOxFC'
            },
            {
                id: 31,
                name: '43 Azimut Magellano',
                brand: 'Azimut',
                length: '43',
                hourlyPrice: 1700,
                dailyPrice: 17000,
                description: '43尺超级游艇，3间客舱，可容纳12人',
                image: 'images/AzimutMagellano43.webp',
                specs: {
                    cabins: 3,
                    guests: 12,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/ccsEH1EHY0YT'
            },
            {
                id: 32,
                name: '187 Benetti',
                brand: 'Benetti',
                length: '187',
                hourlyPrice: 20000,
                dailyPrice: 210000,
                description: '187尺超级游艇，12间客舱，可容纳35人',
                image: 'images/Benetti187.webp',
                specs: {
                    cabins: 12,
                    guests: 35,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cbEi57DEKRaa'
            },
            {
                id: 33,
                name: '167 CRN',
                brand: 'CRN',
                length: '167',
                hourlyPrice: 15000,
                dailyPrice: 110000,
                description: '167尺超级游艇，7间客舱，可容纳50-120人',
                image: 'images/CRN167.webp',
                specs: {
                    cabins: 7,
                    guests: 120,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cgb1jBaAa6et'
            },
            {
                id: 34,
                name: '78 Ferretti 780',
                brand: 'Ferretti',
                length: '78',
                hourlyPrice: 5000,
                dailyPrice: 56000,
                description: '78尺超级游艇，4间客舱，可容纳20人',
                image: 'images/Ferretti780.webp',
                specs: {
                    cabins: 4,
                    guests: 20,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cnI6cIRIoKP0'
            },
            {
                id: 35,
                name: '78 Galeon 780',
                brand: 'Galeon',
                length: '78',
                hourlyPrice: 4000,
                dailyPrice: 63000,
                description: '78尺超级游艇，4间客舱，可容纳20人',
                image: 'images/Galeon780.webp',
                specs: {
                    cabins: 4,
                    guests: 20,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/ck1puNbJ8x2Q'
            },
            {
                id: 36,
                name: '67 Ferretti 670',
                brand: 'Ferretti',
                length: '67',
                hourlyPrice: 2600,
                dailyPrice: 36400,
                description: '67尺超级游艇，3间客舱，可容纳15人',
                image: 'images/Ferretti670.webp',
                specs: {
                    cabins: 3,
                    guests: 15,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cirP6cLeqCzf'
            },
            {
                id: 37,
                name: '54 Pershing 5X',
                brand: 'Pershing',
                length: '54',
                hourlyPrice: 2400,
                dailyPrice: 33600,
                description: '54尺超级游艇，2间客舱，可容纳8人',
                image: 'images/Pershing5X.webp',
                specs: {
                    cabins: 2,
                    guests: 8,
                    minHours: 4
                },
                detailLink: 'https://kdocs.cn/l/cdvyLDhs8jmX'
            }
        ];
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

        this.filteredYachts = this.yachts.filter(yacht => {
            if (brand && yacht.brand !== brand) return false;
            
            if (length) {
                const yachtLength = Number(yacht.length);
                if (length.endsWith('+')) {
                    const min = Number(length.replace('+', '').split('-')[0]);
                    if (yachtLength < min) return false;
                } else {
                    const [min, max] = length.split('-').map(Number);
                    if (yachtLength < min || yachtLength > max) return false;
                }
            }

            if (price) {
                const yachtPrice = yacht.hourlyPrice / 1000;
                if (price.endsWith('+')) {
                    const min = Number(price.replace('+', '').split('-')[0]);
                    if (yachtPrice < min) return false;
                } else {
                    const [min, max] = price.split('-').map(Number);
                    if (yachtPrice < min || yachtPrice > max) return false;
                }
            }

            return true;
        });

        this.renderYachts(this.filteredYachts);
    }

    renderYachts(yachts) {
        const container = document.querySelector('.yacht-grid');
        if (!container) return;
        container.innerHTML = yachts.map(yacht => this.createYachtCard(yacht)).join('');
    }

    createYachtCard(yacht) {
        return `
            <div class="yacht-card">
                <img src="${yacht.image}" alt="${yacht.name}" loading="lazy">
                <h3>${yacht.name}</h3>
                <div class="specs">
                    <p><strong>船舱数:</strong> ${yacht.specs.cabins}</p>
                    <p><strong>载客人数:</strong> ${yacht.specs.guests}</p>
                    <p><strong>每小时价格:</strong> AED ${yacht.hourlyPrice.toLocaleString()}</p>
                    <p><strong>租赁时长:</strong> ${yacht.specs.minHours}小时起租</p>
                    <p><strong>按天租赁价格:</strong> AED ${yacht.dailyPrice.toLocaleString()}</p>
                </div>
                <p class="description">${yacht.description}</p>
                <div class="button-group">
                    <button class="btn" onclick="copyAndRedirect()">联系我们</button>
                    <a href="${yacht.detailLink}" target="_blank" class="btn btn-secondary">查看详情</a>
                </div>
            </div>
        `;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.yachtRentManager = new YachtRentManager();
}); 