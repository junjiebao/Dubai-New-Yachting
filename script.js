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
