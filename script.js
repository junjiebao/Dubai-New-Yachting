// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  setupForm();
  setupSmoothScrolling();
  shuffleYachtCards();
  sortRentalYachtsByPrice();
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

// 设置新建游艇表单
function setupForm() {
  const form = document.getElementById('custom-yacht-form');
  form.innerHTML = `
    <div class="form-group">
      <label for="yacht-brand">游艇品牌</label>
      <input type="text" id="yacht-brand" name="yacht-brand" required>
    </div>
    <div class="form-group">
      <label for="yacht-model">游艇型号</label>
      <input type="text" id="yacht-model" name="yacht-model" required>
    </div>
    <div class="form-group">
      <label for="yacht-year">建造年代</label>
      <input type="number" id="yacht-year" name="yacht-year" min="1900" max="2024" required>
    </div>
    <button type="submit" class="btn">联系提交</button>
  `;

  form.addEventListener('submit', handleFormSubmit);
}

// 处理表单提交
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  // 修改提交内容的格式
  const requestDetails = `游艇品牌: ${data['yacht-brand']}, 游艇型号: ${data['yacht-model']}, 建造年代: ${data['yacht-year']}`;
  navigator.clipboard.writeText(requestDetails).then(() => {
    alert('您的出售信息已复制: ' + requestDetails);
    
    // 选择联系的方式
    const contactMethod = confirm("您想通过 WhatsApp 还是 微信 联系我们？点击确定转到 WhatsApp，取消转到微信。");
    if (contactMethod) {
      window.open("https://wa.me/971561018837", "_blank");
    } else {
      copyAndRedirect();
    }
  }).catch(err => {
    console.error("复制失败: ", err);
  });
}

// 显示游艇详情
// function showDetails(id) {
//   const yacht = yachts.find(y => y.id === id);
//   if (yacht) {
//     const message = `
//       游艇详情：
//       ${yacht.name}
//       价格：${yacht.price}
//       ${yacht.description}
//     `;
//     alert(message);
//   }
// }

// 添加随机排序函数
function shuffleYachtCards() {
  const yachtGrid = document.querySelector('.yacht-grid');
  const yachtCards = Array.from(yachtGrid.children);
  
  // 获取今天的日期作为随机种子
  const today = new Date().toDateString();
  
  // Fisher-Yates 洗牌算法，使用日期作为种子
  for (let i = yachtCards.length - 1; i > 0; i--) {
    // 使用日期字符串生成伪随机数
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const j = Math.floor((seed * (i + 1)) % (i + 1));
    
    // 交换元素位置
    [yachtCards[i], yachtCards[j]] = [yachtCards[j], yachtCards[i]];
  }
  
  // 清空并重新添加排序后的卡片
  yachtGrid.innerHTML = '';
  yachtCards.forEach(card => yachtGrid.appendChild(card));
}

// 添加租赁游艇价格排序函数
function sortRentalYachtsByPrice() {
  const rentOptions = document.querySelector('.rent-options');
  const rentalCards = Array.from(rentOptions.children);
  
  // 按价格排序（从低到高）
  rentalCards.sort((a, b) => {
    // 获取价格文本
    const priceA = a.querySelector('.specs p:nth-child(3)').textContent;
    const priceB = b.querySelector('.specs p:nth-child(3)').textContent;
    
    // 提取数字部分
    const numA = parseInt(priceA.match(/\d+/)[0]);
    const numB = parseInt(priceB.match(/\d+/)[0]);
    
    // 升序排列（从低到高）
    return numA - numB;
  });
  
  // 清空并重新添加排序后的卡片
  rentOptions.innerHTML = '';
  rentalCards.forEach(card => rentOptions.appendChild(card));
}

document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航栏控制
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // 切换图标
            const icon = mobileNavToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});
