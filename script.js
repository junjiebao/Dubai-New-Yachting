// 游艇数据
const yachts = [
  {
    id: 1,
    name: '2021 Pershing 8X',
    price: '$6,800,000',
    image: 'images/yahct1.jpg',
    description: '豪华83尺超级游艇，极速48节',
    length: "25.55 m",
    topSpeed: "45 kn",
    gt: 96,
    crew: 2,
    delivered: 2021,
    beam: "5.86 m",
    guests: 8
  },
  {
    id: 2,
    name: 'Riva 102 Corsaro',
    price: '$15,500,000',
    image: 'images/yacht2.webp',
    description: '意大利丽娃102尺，豪华超级游艇',
    length: "30.48 m",
    topSpeed: "40 kn",
    gt: 120,
    crew: 3,
    delivered: 2020,
    beam: "6.20 m",
    guests: 10
  },
  {
    id: 3,
    name: 'Riva 110',
    price: '€13,800,000',
    image: 'images/taku.jpg',
    description: '建造于2024年的Riva 110型游艇，外部和内部设计均由Mauro Micheli完成。',
    length: "33.53 m",
    topSpeed: "26 kn",
    gt: 220,
    crew: 2,
    delivered: 2024,
    beam: "7.27 m",
    guests: 10
  },
  {
    id: 4,
    name: 'Numarine 32XP',
    price: '€13,900,000',
    image: 'images/32XP.jpg',
    description: '2026年交付的32XP游艇，土耳其建造的探险游艇。',
    length: "32.63 m",
    topSpeed: "14 kn",
    gt: 297,
    crew: 2,
    delivered: 2026,
    beam: "8.00 m",
    guests: 10
  },
  {
    id: 5,
    name: 'KING BENJI',
    price: '$45,000,000',
    image: 'images/KING BENJI.jpg',
    description: '这艘名为KING BENJI的Dunya Yachts豪华探险游艇建造于2024年，外观设计师为Gregory C. Marshall Naval Architect，内部装潢由Design Unlimited设计。',
    length: "46.70 m",
    topSpeed: "15 kn",
    gt: 491,
    crew: 2,
    delivered: 2024,
    beam: "8.88 m",
    guests: 12
  },
  {
    id: 6,
    name: 'Sunseeker 95',
    price: '$6,900,000', // 假设价格
    image: 'images/2018 sunseeker 95.jpg',
    description: '这艘2018年建造的Sunseeker 95游艇，内部装潢豪华，配备了两台MTU 12V 2000 M96L发动机。',
    length: "28.07 m",
    topSpeed: "26 kn",
    gt: 84.7, // 总重量（吨）
    crew: 2, // 假设船员数量
    delivered: 2018,
    beam: "6.58 m",
    guests: 8 // 假设可容纳人数
  }
];

// 租赁游艇数据
const rentalYachts = [
  {
    id: 1,
    name: '迪拜港Mr. & Mrs. Smith - 98ft Yacht',
    price: '4000 AED每小时',
    image: 'images/Smith Yacht.webp',
    description: '98英尺豪华游艇，4间客舱，可容纳25人'
  },
  {
    id: 2,
    name: '迪拜港Icon - 110ft Yacht',
    price: '5000 AED每小时',
    image: 'images/Icon.webp',
    description: '110英尺豪华游艇，4间客舱，可容纳50人'
  },
  {
    id: 3,
    name: '迪拜港Stardom - 140ft Super Yacht',
    price: '10000 AED每小时',
    image: 'images/Stardom.webp',
    description: '140英尺超级游艇，5间客舱，可容纳100人'
  },
  {
    id: 4,
    name: '迪拜港Encore - 131ft Super Yacht',
    price: '12500 AED每小时',
    image: 'images/Encore.webp',
    description: '131英尺超级游艇，5间客舱，可容纳30人'
  },
  {
    id: 5,
    name: '迪拜港Behike - 150ft Super Yacht',
    price: '15000 AED每小时',
    image: 'images/behike.webp',
    description: '150英尺超级游艇，5间客舱，可容纳12人'
  }
];

// 租赁选项
const rentalOptions = rentalYachts.map(yacht => ({
  id: yacht.id,
  name: yacht.name,
  price: yacht.price,
  duration: '四小时起租',
  image: yacht.image,
  description: yacht.description
}));

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  loadYachts();
  loadRentalOptions();
  setupForm();
  setupSmoothScrolling();
});

// 设置平滑滚动
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 加载游艇列表
function loadYachts() {
  const yachtGrid = document.querySelector('.yacht-grid');
  yachts.forEach(yacht => {
    const yachtElement = document.createElement('div');
    yachtElement.classList.add('yacht-card');
    yachtElement.innerHTML = `
      <img src="${yacht.image}" alt="${yacht.name}">
      <h3>${yacht.name}</h3>
      <div class="specs">
        <p><strong>Length:</strong> ${yacht.length}</p>
        <p><strong>Top Speed:</strong> ${yacht.topSpeed}</p>
        <p><strong>GT:</strong> ${yacht.gt}</p>
        <p><strong>Crew:</strong> ${yacht.crew}</p>
        <p><strong>Delivered:</strong> ${yacht.delivered}</p>
        <p><strong>Beam:</strong> ${yacht.beam}</p>
        <p><strong>Guests:</strong> ${yacht.guests}</p>
      </div>
      <div class="description">${yacht.description}</div>
      <div class="pricing">
        <p><strong>报价:</strong> ${yacht.price}</p>
      </div>
      <button class="btn" onclick="showYachtDetail(${yacht.id})">查看详情</button>
    `;
    yachtGrid.appendChild(yachtElement);
  });
}

// 加载租赁选项
function loadRentalOptions() {
  const rentOptions = document.querySelector('.rent-options');
  rentOptions.innerHTML = rentalOptions.map(option => `
    <div class="rental-option">
      <img src="${option.image}" alt="${option.name}">
      <h3>${option.name}</h3>
      <div class="specs">
        <p><strong>价格：</strong>${option.price}</p>
        <p><strong>时长：</strong>${option.duration}</p>
      </div>
      <p class="description">${option.description}</p>
      <button class="btn" onclick="selectRental(${option.id})">选择</button>
    </div>
  `).join('');
}

// 设置新建游艇表单
function setupForm() {
  const form = document.getElementById('custom-yacht-form');
  form.innerHTML = `
    <div class="form-group">
      <label for="yacht-type">游艇类型</label>
      <select id="yacht-type" required>
        <option value="">请选择</option>
        <option value="long range cruiser yacht">长航生活游艇</option>
        <option value="Polar Expedition yacht">极地探险游艇</option>
        <option value="Global Expedition Yacht">环球探险游艇</option>
        <option value="Regional Expedition Yacht">区域探险游艇</option>
        <option value="Hoilday getway yacht">假日休闲游艇</option>
        <option value="Business Leisure Yacht">商务休闲游艇</option>
      </select>
    </div>
    <div class="form-group">
      <label for="length">长度（米）</label>
      <input type="number" id="length" min="12" max="120" required>
    </div>
    <div class="form-group">
      <label for="features">特殊功能</label>
      <textarea id="features" rows="4"></textarea>
    </div>
    <button type="submit" class="btn">提交需求</button>
  `;

  form.addEventListener('submit', handleFormSubmit);
}

// 处理表单提交
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  // 复制提交的内容
  const requestDetails = `游艇类型: ${data['yacht-type']}, 长度: ${data['length']}米, 特殊功能: ${data['features']}`;
  navigator.clipboard.writeText(requestDetails).then(() => {
    alert('您的定制需求已复制: ' + requestDetails);
    
    // 选择联系的方式
    const contactMethod = confirm("您想通过 WhatsApp 还是 微信 联系我们？点击确定转到 WhatsApp，取消转到微信。");
    if (contactMethod) {
      window.open("https://wa.me/971561018837", "_blank"); // 转到 WhatsApp
    } else {
      copyAndRedirect(); // 转到微信
    }
  }).catch(err => {
    console.error("复制失败: ", err);
  });
}

// 显示游艇详情
function showYachtDetail(id) {
  const yacht = yachts.find(y => y.id === id);
  if (yacht) {
    const message = `游艇详情：
名称：${yacht.name}
价格：${yacht.price}
描述：${yacht.description}`;
    
    if (confirm(message + "\n\n点击确定查看，点击联系跳转到联系我们模块。")) {
      // 确定按钮逻辑
    } else {
      // 联系按钮逻辑
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// 选择租赁选项
function selectRental(id) {
  const option = rentalOptions.find(o => o.id === id);
  if (option) {
    const message = `您已选择：
套餐：${option.name}
价格：${option.price}
时长：${option.duration}`;
    
    if (confirm(message + "\n\n点击确定查看，点击联系跳转到联系我们模块。")) {
      // 确定按钮逻辑
    } else {
      // 联系按钮逻辑
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  }
}
