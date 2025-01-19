// 游艇数据
const yachts = [
  {
    id: 1,
    name: '2021 Pershing 8X',
    price: '$6,800,000',
    image: 'images/yahct1.jpg',
    description: '豪华83尺超级游艇，极速48节'
  },
  {
    id: 2,
    name: 'Riva 102 Corsaro',
    price: '$15,500,000',
    image: 'images/yacht2.webp',
    description: '意大利丽娃102尺，豪华超级游艇'
  }
];

// 租赁游艇数据
const rentalYachts = [
  {
    id: 1,
    name: 'Mr. & Mrs. Smith - 98ft Yacht',
    price: '4000 AED每小时',
    image: 'images/Smith Yacht.webp',
    description: '98英尺豪华游艇，4间客舱，可容纳25人'
  },
  {
    id: 2,
    name: 'Icon - 110ft Yacht',
    price: '5000 AED每小时',
    image: 'images/Icon.webp',
    description: '110英尺豪华游艇，4间客舱，可容纳50人'
  },
  {
    id: 3,
    name: 'Stardom - 140ft Super Yacht',
    price: '10000 AED每小时',
    image: 'images/Stardom.webp',
    description: '140英尺超级游艇，5间客舱，可容纳100人'
  },
  {
    id: 4,
    name: 'Encore - 131ft Super Yacht',
    price: '12500 AED每小时',
    image: 'images/Encore.webp',
    description: '131英尺超级游艇，5间客舱，可容纳30人'
  },
  {
    id: 5,
    name: 'Behike - 150ft Super Yacht',
    price: '15000 AED每小时',
    image: 'images/Behike.webp',
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
  yachtGrid.innerHTML = yachts.map(yacht => `
    <div class="yacht-card">
      <img src="${yacht.image}" alt="${yacht.name}">
      <h3>${yacht.name}</h3>
      <p>${yacht.description}</p>
      <div class="price">${yacht.price}</div>
      <button class="btn" onclick="showYachtDetail(${yacht.id})">查看详情</button>
    </div>
  `).join('');
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
  console.log('Custom Yacht Request:', data);
  alert('您的定制需求已提交，我们将尽快与您联系！');
}

// 显示游艇详情
function showYachtDetail(id) {
  const yacht = yachts.find(y => y.id === id);
  if (yacht) {
    alert(`游艇详情：
名称：${yacht.name}
价格：${yacht.price}
描述：${yacht.description}`);
  }
}

// 选择租赁选项
function selectRental(id) {
  const option = rentalOptions.find(o => o.id === id);
  if (option) {
    alert(`您已选择：
套餐：${option.name}
价格：${option.price}
时长：${option.duration}`);
  }
}
