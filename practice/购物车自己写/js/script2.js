class UIGoods {
  constructor(goods) {
    this.data = goods;
    this.choose = 0;
  }

  getTotalPrice() {
    if (
      !this.data ||
      typeof this.data.price !== "number" ||
      isNaN(this.data.price)
    ) {
      console.log("price 不对劲");
    } else {
      return this.data.price * this.choose;
    }
  }
  isChoose() {
    if (typeof this.choose !== "number" || isNaN(this.choose)) {
      console.log("choose 不对劲");
    } else {
      return this.choose > 0;
    }
  }
  increase() {
    if (typeof this.choose !== "number" || isNaN(this.choose)) {
      console.log("choose 不对劲");
    } else {
      return this.choose++;
    }
  }

  decrease() {
    if (
      !this.choose ||
      typeof this.choose !== "number" ||
      isNaN(this.choose) ||
      this.choose === 0 ||
      this.choose < 0
    ) {
      console.log("choose 不对劲");
    } else {
      return this.choose--;
    }
  }
}
// 测试用例1：正常情况（price和choose都符合要求）
// const normalGoods = new UIGoods({ price: 100 }); // price是有效数字
// normalGoods.choose = 2; // choose是正数字
// console.log("测试正常商品的总价：", normalGoods.getTotalPrice()); // 预期：200
// console.log("测试正常商品的选择状态：", normalGoods.isChoose()); // 预期：true

// // 测试用例2：price异常（price是字符串）
// const invalidPrice1 = new UIGoods({ price: "不是数字" });
// invalidPrice1.choose = 3;
// console.log("测试price为字符串时的总价：", invalidPrice1.getTotalPrice()); // 预期："这件商品的price不对劲"
// console.log(
//   "测试price异常时的选择状态（choose正常）：",
//   invalidPrice1.isChoose()
// ); // 预期：true

// 测试用例3：price是NaN
// const invalidPrice2 = new UIGoods({ price: NaN });
// invalidPrice2.choose = 1;
// console.log("测试price为NaN时的总价：", invalidPrice2.getTotalPrice()); // 预期："这件商品的price不对劲"

// // 测试用例4：data不存在（null/undefined）
// const noDataGoods = new UIGoods(null); // 构造函数传入null，this.data为null
// noDataGoods.choose = 5;
// console.log("测试无data时的总价：", noDataGoods.getTotalPrice()); // 预期："这件商品的price不对劲"

// // 测试用例5：choose异常（choose是字符串）
// const invalidChoose1 = new UIGoods({ price: 50 });
// invalidChoose1.choose = "3"; // choose是字符串
// console.log("测试choose为字符串时的选择状态：", invalidChoose1.isChoose()); // 预期："choose 不对劲"
// console.log(
//   "测试choose异常时的总价（price正常）：",
//   invalidChoose1.getTotalPrice()
// ); // 预期：50 * "3" → 但因为choose是字符串，这里实际会返回NaN？不，注意：getTotalPrice只校验price，不校验choose！

// // 测试用例6：choose是0（合法但未选择）
// const chooseZero = new UIGoods({ price: 200 });
// chooseZero.choose = 0; // choose是0（数字）
// console.log("测试choose为0时的选择状态：", chooseZero.isChoose()); // 预期：false（因为0>0不成立）
// console.log("测试choose为0时的总价：", chooseZero.getTotalPrice()); // 预期：200 * 0 = 0

// // 测试用例7：choose是负数
// const chooseNegative = new UIGoods({ price: 30 });
// chooseNegative.choose = -2; // 负数（合法数字）
// console.log("测试choose为负数时的选择状态：", chooseNegative.isChoose()); // 预期：false（-2>0不成立）

// // 测试用例8：choose是NaN
// const chooseNaN = new UIGoods({ price: 10 });
// chooseNaN.choose = NaN;
// console.log("测试choose为NaN时的选择状态：", chooseNaN.isChoose()); // 预期："choose 不对劲"

class UIData {
  constructor() {
    const uiGoods = [];
    for (let i = 0; i < goods.length; i++) {
      let uig = new UIGoods(goods[i]);
      uiGoods.push(uig);
    }
    this.uiGoods = uiGoods;

    this.deliveryThreshold = 20;

    this.deliveryPrice = 5;
  }
  getAllTotalPrice() {
    let sum = 0;
    for (let i = 0; i < this.uiGoods.length; i++) {
      let g = this.uiGoods[i];

      sum += g.getTotalPrice();
    }
    return sum;
  }

  increase(index) {
    this.uiGoods[index].increase();
  }

  decrease(index) {
    this.uiGoods[index].decrease();
  }

  getAllTotalChoose() {
    let choosenSum = 0;
    for (let i = 0; i < this.uiGoods.length; i++) {
      choosenSum += this.uiGoods[i].choose;
    }
    return choosenSum;
  }

  isItemInCart() {
    return this.getAllTotalChoose() > 0;
  }

  isMeetDeliveryThreshold() {
    return this.getAllTotalPrice() >= this.deliveryThreshold;
  }

  isThisItemChoose(index) {
    return this.uiGoods[index].isChoose();
  }
}

class UI {
  constructor() {
    this.uiData = new UIData();
    this.doms = {
      // cartContent: document.querySelector(".cart_content"),
      productList: document.querySelector(".product_list"),
      // productItemNumber: document.querySelector(".product_button_number"),
      deliveryPrice: document.querySelector(".shopping_cart_threshold_number"),
      shoppingCartButton: document.querySelector(".shopping_cart_button"),
      shoppingCartInnerSpan: document.querySelector(
        ".shopping_cart_button span"
      ),
      totalPrice: document.querySelector(".shopping_cart_price_number"),
      shoppingCart: document.querySelector(".shopping_cart_photo"),
      shoppingCartNumber: document.querySelector(".shopping_cart_number"),
      tabs: document.querySelectorAll(".tab_item"), // 新增：所有标签
      contentItems: document.querySelectorAll(".content_item"), // 新增：所有内容容器
    };

    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("product_button_plus")) {
        // 从按钮的 data-index 获取原始索引
        const index = +e.target.getAttribute("data-index");
        this.increase(index); // 调用 UI 的 increase 方法
      } else if (e.target.classList.contains("product_button_minus")) {
        const index = +e.target.getAttribute("data-index");
        this.decrease(index); // 调用 UI 的 decrease 方法
      }
    });
    // this.createHtml();
    this.renderByCategory("all");
    this.updateShoppingCart();
    this.bindTabEventsWithDelegation();
  }

  createProductHtml(good, originalIndex) {
    return `
      <div class="product_item ${good.choose > 0 ? "active" : ""}">
        <img src="${good.data.picture}" class="product_img" alt="${
      good.data.title
    }">
        <div class="product_info">
          <div class="product_name">${good.data.title}</div>
          <div class="product_price">¥${good.data.price.toFixed(2)}</div>
          <div class="product_button">
            <i class="product_sellNumber">月售 ${good.data.sellNumber}</i>
            <i class="product_favorRate">好评 ${good.data.favorRate}%</i>
            <button data-index="${originalIndex}" class="product_button_minus">-</button>
            <div class="product_button_number">${good.choose}</div>
            <button data-index="${originalIndex}" class="product_button_plus">+</button>
          </div>
        </div>
      </div>
    `;
  }
  // 按分类渲染商品（调用公共方法）
  renderByCategory(category) {
    // 1. 筛选商品
    const filteredGoods =
      category === "all"
        ? this.uiData.uiGoods
        : this.uiData.uiGoods.filter((good) => good.data.category === category);

    // 2. 生成HTML（调用公共方法）
    let html = "";
    filteredGoods.forEach((good) => {
      const originalIndex = this.uiData.uiGoods.indexOf(good); // 原始索引
      html += this.createProductHtml(good, originalIndex); // 复用公共方法
    });

    // 3. 渲染到对应分类的容器
    const targetContainer = document.querySelector(
      `#${category} .product_list`
    );
    if (targetContainer) {
      targetContainer.innerHTML = html;
    } else {
      console.error("未找到分类容器：", category);
    }
  }

  // 渲染所有商品（调用公共方法，可选保留）
  // createHtml() {
  //   let html = "";
  //   this.uiData.uiGoods.forEach((good, originalIndex) => {
  //     html += this.createProductHtml(good, originalIndex); // 复用公共方法
  //   });
  //   // 渲染到默认容器（如果需要）
  //   if (this.doms.productList) {
  //     this.doms.productList.innerHTML = html;
  //   }
  // }

  // 根据分类渲染商品（优化后）
  // renderByCategory(category) {
  //   // 1. 筛选符合当前分类的商品
  //   const filteredGoods =
  //     category === "all"
  //       ? this.uiData.uiGoods // 全部商品
  //       : this.uiData.uiGoods.filter((good) => good.data.category === category); // 按分类筛选

  //   // 2. 生成筛选后商品的HTML
  //   let html = "";
  //   filteredGoods.forEach((good, index) => {
  //     // 注意：这里的index是筛选后数组的索引，如需原始数据索引需额外处理
  //     html += `
  //     <div class="product_item ${good.choose > 0 ? "active" : ""}">
  //       <img src="${good.data.picture}" class="product_img" alt="${
  //       good.data.title
  //     }">
  //       <div class="product_info">
  //         <div class="product_name">${good.data.title}</div>
  //         <div class="product_price">¥${good.data.price}</div>
  //         <div class="product_button">
  //           <i class="product_sellNumber">月售 ${good.data.sellNumber} </i>
  //           <i class="product_favorRate"> 好评 ${good.data.favorRate}%</i>
  //           <button index="${this.uiData.uiGoods.indexOf(
  //             good
  //           )}" class="product_button_minus">-</button>
  //           <div class="product_button_number">${good.choose}</div>
  //           <button index="${this.uiData.uiGoods.indexOf(
  //             good
  //           )}" class="product_button_plus">+</button>
  //         </div>
  //       </div>
  //     </div>
  //   `;
  //   });

  //   // 3. 渲染到对应分类的容器中
  //   const targetContainer = document.querySelector(
  //     `#${category} .product_list`
  //   );
  //   if (targetContainer) {
  //     targetContainer.innerHTML = html;
  //   }
  // }

  // 新增：绑定标签点击事件
  // bindTabEvents() {
  //   this.doms.tabs.forEach((tab) => {
  //     tab.addEventListener("click", () => {
  //       // 切换标签激活状态
  //       this.doms.tabs.forEach((t) => t.classList.remove("active"));
  //       tab.classList.add("active");

  //       // 切换内容容器显示
  //       const targetCategory = tab.getAttribute("data-tab");
  //       this.doms.contentItems.forEach((item) => {
  //         item.classList.remove("active");
  //       });
  //       document.getElementById(targetCategory).classList.add("active");

  //       // 渲染对应分类的商品
  //       this.renderByCategory(targetCategory);
  //     });
  //   });
  // }

  // 在bindTabEventsWithDelegation方法中添加关键日志
  bindTabEventsWithDelegation() {
    document.body.addEventListener("click", (e) => {
      const clickedTab = e.target.closest(".tab_item");
      if (!clickedTab) return;

      console.log(
        "当前点击的标签data-tab值:",
        clickedTab.getAttribute("data-tab")
      ); // 新增日志

      // 切换标签激活状态
      this.doms.tabs.forEach((t) => t.classList.remove("active"));
      clickedTab.classList.add("active");

      // 切换内容容器显示
      const targetCategory = clickedTab.getAttribute("data-tab");
      console.log("目标内容容器ID:", targetCategory); // 新增日志

      this.doms.contentItems.forEach((item) => {
        item.classList.remove("active");
      });
      const targetContent = document.getElementById(targetCategory);
      if (targetContent) {
        targetContent.classList.add("active");
        this.renderByCategory(targetCategory); // 确保渲染对应分类
      } else {
        console.error("未找到ID为", targetCategory, "的内容容器");
      }
    });
  }

  // createHtml() {
  //   let html = "";
  //   for (let i = 0; i < this.uiData.uiGoods.length; i++) {
  //     let g = this.uiData.uiGoods[i];
  //     // console.log(g);
  //     html += `<div class="product_item">
  //                 <img src="${g.data.picture}" class="product_img" alt="汉堡">
  //                 <div class="product_info">
  //                           <div class="product_name">${g.data.title}</div>
  //                           <div class="product_price">¥${g.data.price}</div>
  //                           <div class="product_button">
  //                               <i class="product_sellNumber">月售 ${g.data.sellNumber} </i>
  //                               <i class="product_favorRate"> 好评 ${g.data.favorRate}%</i>
  //                               <button index="${i}" class="product_button_minus">-</button>
  //                               <div class="product_button_number">${g.choose}</div>
  //                               <button index="${i}" class="product_button_plus">+</button>
  //                           </div>
  //                  </div>
  //                </div>
  //                   `;
  //   }
  //   // this.doms.cartContent.innerHTML = html;
  //   this.doms.productList.innerHTML = html;
  //   // this.doms.productItem.innerHTML = html;
  // }

  // 在createHtml方法中确保使用原始索引
  // createHtml() {
  //   let html = "";
  //   this.uiData.uiGoods.forEach((g, originalIndex) => {
  //     // 使用原始索引
  //     html += `
  //     <div class="product_item">
  //       <button index="${originalIndex}" class="product_button_plus">+</button>
  //       <!-- 其他HTML结构 -->
  //     </div>
  //   `;
  //   });
  //   this.doms.productList.innerHTML = html;
  // }

  increase(index) {
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateShoppingCart();
  }

  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateShoppingCart();
  }

  updateGoodsItem(index) {
    let goodsDom = this.doms.productList.children[index];
    if (this.uiData.isThisItemChoose(index)) {
      goodsDom.classList.add("active");
    } else {
      goodsDom.classList.remove("active");
    }
    let Number = goodsDom.querySelector(".product_button_number");
    // console.log(Number);
    Number.textContent = this.uiData.uiGoods[index].choose;
  }
  updateShoppingCart() {
    let total = this.uiData.getAllTotalPrice();
    this.doms.deliveryPrice.textContent = `${this.uiData.deliveryPrice}`;

    if (this.uiData.isMeetDeliveryThreshold()) {
      this.doms.shoppingCartButton.classList.add("active");
      this.doms.shoppingCartInnerSpan.textContent = `去结算`;
    } else {
      this.doms.shoppingCartButton.classList.remove("active");
      //   四舍五入

      let dis = this.uiData.deliveryThreshold - total;

      // console.log(dis);

      dis = Math.round(dis);

      this.doms.shoppingCartInnerSpan.textContent = `还差${dis}元起送`;
    }
    // 设置总价 保留两位小数
    this.doms.totalPrice.textContent = total.toFixed(2);

    if (this.uiData.isItemInCart()) {
      this.doms.shoppingCart.classList.add("active");
    } else {
      this.doms.shoppingCart.classList.remove("active");
    }
    // 购物车数量
    this.doms.shoppingCartNumber.textContent = this.uiData.getAllTotalChoose();
  }
}

let ui = new UI();

// ui.doms.productList.addEventListener("click", function (e) {
//   if (e.target.classList.contains("product_button_plus")) {
//     // 得到index
//     let index = +e.target.getAttribute("index");
//     ui.increase(index);
//   } else if (e.target.classList.contains("product_button_minus")) {
//     let index = +e.target.getAttribute("index");
//     ui.decrease(index);
//   }
// });

// document.querySelectorAll(".product_list").forEach((list) => {
//   list.addEventListener("click", function (e) {
//     if (e.target.classList.contains("product_button_plus")) {
//       const index = +e.target.getAttribute("index");
//       ui.increase(index);
//     } else if (e.target.classList.contains("product_button_minus")) {
//       const index = +e.target.getAttribute("index");
//       ui.decrease(index);
//     }
//   });
// });

// 给商品列表容器绑定事件委托，监听所有加号按钮点击
// document.querySelector(".cart_content").addEventListener("click", function (e) {
//   // 点击的是加号按钮
//   if (e.target.classList.contains("product_button_plus")) {
//     const productItem = e.target.closest(".product_item"); // 找到父级商品项
//     const numberEl = productItem.querySelector(".product_button_number");

//     // 增加数量
//     let count = parseInt(numberEl.textContent) || 0;
//     numberEl.textContent = ++count;

//     // 关键：添加active类，显示减号和数量
//     productItem.classList.add("active");

//     // （可选）保存商品状态到数据中，用于切换标签时恢复
//     saveProductState(productItem, count);
//   }
// });

function addNewGood(newGood) {
  // 1. 添加到原始数据
  goods.push(newGood);
  // 2. 创建对应的 UIGoods 实例并添加到 uiData
  const newUIGood = new UIGoods(newGood);
  ui.uiData.uiGoods.push(newUIGood);
  // 3. 重新渲染当前激活的分类（比如“all”）
  const activeTab = document.querySelector(".tab_item.active");
  const currentCategory = activeTab
    ? activeTab.getAttribute("data-tab")
    : "all";
  ui.renderByCategory(currentCategory);
}

// 等待DOM加载完成
// document.addEventListener("DOMContentLoaded", function () {
//   // 标签切换功能实现
//   const tabItems = document.querySelectorAll(".tab_item");
//   const contentItems = document.querySelectorAll(".content_item");

//   tabItems.forEach((tab) => {
//     tab.addEventListener("click", function () {
//       // 移除所有标签的active类
//       tabItems.forEach((item) => item.classList.remove("active"));
//       // 给当前点击的标签添加active类
//       this.classList.add("active");

//       // 获取对应的内容ID
//       const tabId = this.getAttribute("data-tab");

//       // 隐藏所有内容
//       contentItems.forEach((item) => item.classList.remove("active"));
//       // 显示对应的内容
//       document.getElementById(tabId).classList.add("active");
//     });
//   });

//   // 商品数量控制功能
//   const productList = document.querySelector(".cart_content");

//   // 使用事件委托处理加减按钮点击
//   productList.addEventListener("click", function (e) {
//     // 处理加号按钮
//     if (e.target.classList.contains("product_button_plus")) {
//       const parent = e.target.closest(".product_item");
//       const numberEl = parent.querySelector(".product_button_number");
//       const minusBtn = parent.querySelector(".product_button_minus");

//       // 显示减号和数量
//       parent.classList.add("active");
//       minusBtn.style.display = "block";
//       numberEl.style.display = "block";

//       // 增加数量
//       let count = parseInt(numberEl.textContent) || 0;
//       numberEl.textContent = count + 1;

//       // 更新购物车(这里可以添加更新购物车总数和金额的逻辑)
//       updateCart();
//     }

//     // 处理减号按钮
//     if (e.target.classList.contains("product_button_minus")) {
//       const parent = e.target.closest(".product_item");
//       const numberEl = parent.querySelector(".product_button_number");

//       let count = parseInt(numberEl.textContent) || 0;
//       if (count > 0) {
//         count--;
//         numberEl.textContent = count;

//         // 如果数量为0，隐藏减号和数量
//         if (count === 0) {
//           parent.classList.remove("active");
//           e.target.style.display = "none";
//           numberEl.style.display = "none";
//         }

//         // 更新购物车
//         updateCart();
//       }
//     }
//   });

//   // 更新购物车信息
//   function updateCart() {
//     const numberElements = document.querySelectorAll(".product_button_number");
//     let totalCount = 0;
//     let totalPrice = 0;

//     // 计算总数
//     numberElements.forEach((el) => {
//       const count = parseInt(el.textContent) || 0;
//       totalCount += count;

//       // 计算总价(这里需要根据实际价格计算)
//       if (count > 0) {
//         const priceEl = el
//           .closest(".product_info")
//           .querySelector(".product_price");
//         const price = parseFloat(priceEl.textContent.replace("¥", "")) || 0;
//         totalPrice += price * count;
//       }
//     });

//     // 更新购物车数量显示
//     document.querySelector(".shopping_cart_number").textContent = totalCount;

//     // 更新价格信息(这里可以根据实际业务逻辑完善)
//     document.querySelector(
//       ".shopping_cart_price_number"
//     ).textContent = `¥${totalPrice.toFixed(2)}`;

//     // 处理结算按钮状态
//     const settlementBtn = document.querySelector(".settlement_button");
//     if (totalCount > 0) {
//       document.querySelector(".shopping_cart_button").classList.add("active");
//       settlementBtn.disabled = false;
//       // 这里可以添加起送价相关逻辑
//     } else {
//       document
//         .querySelector(".shopping_cart_button")
//         .classList.remove("active");
//       settlementBtn.disabled = true;
//     }
//   }
// });
