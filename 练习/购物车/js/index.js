// console.log(goods);

// 单件商品数据的构造函数
class UIGoods {
  constructor(g) {
    this.data = g;
    // 选择数量
    this.choose = 0;
  }
  //   获取单个商品总价
  getTotalPrice() {
    return this.data.price * this.choose;
  }
  //   是否选中了此商品
  isChoose() {
    return this.choose > 0;
  }
  // 选择的数量+1 方便库存拓展
  increase() {
    this.choose++;
  }
  //选择的数量-1 防止负数
  decrease() {
    if (this.choose === 0) {
      return;
    }
    this.choose--;
  }
}

// 整个界面的数据逻辑  ui.uiGoods是数组
class UIData {
  constructor() {
    var uiGoods = [];
    for (var i = 0; i < goods.length; i++) {
      var uig = new UIGoods(goods[i]);
      uiGoods.push(uig);
    }
    this.uiGoods = uiGoods;
    // 起送门槛 硬编码
    this.deliveryThreshold = 10;
    // 配送费
    this.deliveryPrice = 5;
    // console.log(goods);
  }

  getTotalPrice() {
    var sum = 0;
    for (var i = 0; i < this.uiGoods.length; i++) {
      var g = this.uiGoods[i];
      //   console.log(g.getTotalPrice());
      sum += g.getTotalPrice();
    }
    return sum;
  }
  //   增加某件商品的选中数量
  increase(index) {
    this.uiGoods[index].increase();
  }
  // 减少某件商品的选中数量
  decrease(index) {
    this.uiGoods[index].decrease();
  }
  // 总共选择的数量
  getTotalChooseNumber() {
    var sum = 0;
    for (var i = 0; i < this.uiGoods.length; i++) {
      sum += this.uiGoods[i].choose;
    }
    return sum;
  }
  // 检测购物车中是否有商品
  hasGoodsInCar() {
    return this.getTotalChooseNumber() > 0;
  }
  // 是否满足起送门槛
  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold;
  }
  isChoose(index) {
    return this.uiGoods[index].isChoose();
  }
}

// 界面动画逻辑
class UI {
  constructor() {
    this.uiData = new UIData();
    this.doms = {
      goodsContainer: document.querySelector(".goods_list"),
      deliveryPrice: document.querySelector(".footer_car_tip"),
      footerPay: document.querySelector(".footer_pay"),
      footerPayInnerSpan: document.querySelector(".footer_pay span"),
      totalPrice: document.querySelector(".footer_car_total"),
      footerCar: document.querySelector(".footer_car"),
      carBadge: document.querySelector(".footer_car_badge"),
    };
    // 计算购物车方位 方便跳跃动画
    var carRect = this.doms.footerCar.getBoundingClientRect();
    // console.log(carRect);
    var jumpTarget = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5,
    };
    this.jumpTarget = jumpTarget;

    this.createHTML();
    this.updateFooter();
    this.listenEvent();
  }

  //   监听事件
  listenEvent() {
    this.doms.footerCar.addEventListener("animationend", function () {
      //   console.log("over");
      //   this指向当前注册事件的元素，也就是footerCar
      this.classList.remove("animate");
    });
  }

  //   根据商品数据创建商品列表元素
  createHTML() {
    var html = "";
    for (var i = 0; i < this.uiData.uiGoods.length; i++) {
      var g = this.uiData.uiGoods[i];
      //   console.log(g);
      html += `<div class="goods_item">
                <img src="${g.data.picture}" alt="" class="goods_pic">
                <div class="goods_info">
                    <h2 class="goods_title">${g.data.title}</h2>
                    <p class="goods_desc">${g.data.desc}</p>
                    <p class="goods_sell">
                        <span>月售${g.data.sellNumber}</span>
                        <span>好评率${g.data.favorRate}%</span>
                    </p>
                    <div class="goods_confirm">
                        <p class="goods_price">
                            <span class="goods_price_unit">￥</span>
                            <span>${g.data.price}</span>
                        </p>
                        <div class="goods_btns">
                            <i index="${i}" class="iconfont i-jianhao"></i>
                            <span>${g.choose}</span>
                            <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    this.doms.goodsContainer.innerHTML = html;
  }
  increase(index) {
    // 增加商品数量
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateFooter();
    this.jump(index);
  }
  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateFooter();
  }
  //   更新商品元素显示状态
  updateGoodsItem(index) {
    var goodsDom = this.doms.goodsContainer.children[index];
    // console.log(goodsDom);
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add("active");
    } else {
      goodsDom.classList.remove("active");
    }
    var span = goodsDom.querySelector(".goods_btns span");
    span.textContent = this.uiData.uiGoods[index].choose;
  }

  //   更新底部购物车
  updateFooter() {
    // 总价数据
    var total = this.uiData.getTotalPrice();
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费${this.uiData.deliveryPrice}`;
    // 起送费还差多少
    if (this.uiData.isCrossDeliveryThreshold()) {
      this.doms.footerPay.classList.add("active");
    } else {
      this.doms.footerPay.classList.remove("active");

      //   四舍五入
      dis = Math.round(dis);

      var dis = this.uiData.deliveryThreshold - total;
      this.doms.footerPayInnerSpan.textContent = `还差${dis}元起送`;
    }
    // 设置总价 保留两位小数
    this.doms.totalPrice.textContent = total.toFixed(2);
    // 购物车状态
    if (this.uiData.hasGoodsInCar()) {
      this.doms.footerCar.classList.add("active");
    } else {
      this.doms.footerCar.classList.remove("active");
    }
    // 购物车数量
    this.doms.carBadge.textContent = this.uiData.getTotalChooseNumber();
  }

  //   购物车动画
  carAnimate() {
    this.doms.footerCar.classList.add("animate");
  }

  //   抛物线跳跃元素
  jump(index) {
    // 找到对应商品的加号
    var btnAdd = this.doms.goodsContainer.children[index].querySelector(
      ".i-jiajianzujianjiahao"
    );
    var rect = btnAdd.getBoundingClientRect();
    var start = {
      x: rect.left,
      y: rect.top,
    };
    var div = document.createElement("div");
    div.className = "add_to_car";

    var i = document.createElement("i");
    i.className = "iconfont i-jiajianzujianjiahao";

    // 设置初始位置
    div.style.transform = `translateX(${start.x}px)`;
    i.style.transform = `translateY(${start.y}px)`;

    div.appendChild(i);
    document.body.appendChild(div);
    console.log(start, this.jumpTarget);
    // 强行渲染，否则会直接按最后一次给的方位出现，不出现在渲染主线程里
    div.clientWidth;

    // 设置结束为止
    div.style.transform = `translateX(${this.jumpTarget.x}px)`;
    i.style.transform = `translateY(${this.jumpTarget.y}px)`;

    var that = this;
    div.addEventListener(
      "transitionend",
      function () {
        div.remove();
        that.carAnimate();
        console.log("过渡结束");
      },
      {
        once: true, //事件仅触发一次，不冒泡
      }
    );
  }
}

var ui = new UI();

// 事件
ui.doms.goodsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("i-jiajianzujianjiahao")) {
    // 字符串转化成数字
    var index = +e.target.getAttribute("index");
    ui.increase(index);
  } else if (e.target.classList.contains("i-jianhao")) {
    var index = +e.target.getAttribute("index");
    ui.decrease(index);
  }
});

// var ui = new UIData();
// console.log(ui);

/**
 * 为了不改变原始数据，选择继承原始数据
 * 然后额外加上购买数量choose
 *
 */
// function createUIGoods(g) {
//   return {
//     data: g,
//     choose: 0,
//   };
// }

// var uig = createUIGoods(goods[0]);
// console.log(uig);
/**
 * 为了不改变原始数据，选择继承原始数据
 * 然后额外加上购买数量choose
 * 方法二
 */
// function UIGoods(g) {
//   this.data = g;
//   this.choose = 0;
//   //   this.totalPrice = 0;
// }

// 防止数据冗余
// UIGoods.prototype.getTotalPrice = function () {
//   return this.data.price * this.choose;
// };
// // 是否选择了此商品
// UIGoods.prototype.isChoose = function () {
//   return this.choose > 0;
// };

// var uig = new UIGoods(goods[0]);
// console.log(uig);
