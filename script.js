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
