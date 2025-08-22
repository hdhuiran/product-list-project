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
    };
    this.createHtml();
    this.updateShoppingCart();
  }

  createHtml() {
    let html = "";
    for (let i = 0; i < this.uiData.uiGoods.length; i++) {
      let g = this.uiData.uiGoods[i];
      // console.log(g);
      html += `<div class="product_item">
                  <img src="${g.data.picture}" class="product_img" alt="汉堡">
                  <div class="product_info">
                            <div class="product_name">${g.data.title}</div>
                            <div class="product_price">¥${g.data.price}</div>
                            <div class="product_button">
                                <i class="product_sellNumber">月售 ${g.data.sellNumber} </i>
                                <i class="product_favorRate"> 好评 ${g.data.favorRate}%</i>
                                <button index="${i}" class="product_button_minus">-</button>
                                <div class="product_button_number">${g.choose}</div>
                                <button index="${i}" class="product_button_plus">+</button>
                            </div>
                   </div>
                 </div>
                    `;
    }
    // this.doms.cartContent.innerHTML = html;
    this.doms.productList.innerHTML = html;
    // this.doms.productItem.innerHTML = html;
  }

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

ui.doms.productList.addEventListener("click", function (e) {
  if (e.target.classList.contains("product_button_plus")) {
    // 得到index
    let index = +e.target.getAttribute("index");
    ui.increase(index);
  } else if (e.target.classList.contains("product_button_minus")) {
    let index = +e.target.getAttribute("index");
    ui.decrease(index);
  }
});
