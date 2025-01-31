// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
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
