let goods = [
  {
    id: 1,
    // 图标
    picture: "https://picsum.photos/60/60?random=1",
    //   名称
    title: "麦辣鸡腿汉堡",
    //   描述
    desc: `麦辣鸡腿汉堡的描述`,
    //   月售
    sellNumber: "100",
    //   好评率
    favorRate: "95",
    //   价格
    price: 20,
    category: "hamburger", // 汉堡类
  },
  {
    id: 2,
    // 图标
    picture: "https://picsum.photos/60/60?random=2",
    //   名称
    title: "麦辣鸡翅",
    //   描述
    desc: `麦辣鸡翅的描述`,
    //   月售
    sellNumber: "101",
    //   好评率
    favorRate: "95",
    //   价格
    price: 14,
    category: "snack", // 小吃类
  },
  {
    id: 3,
    // 图标
    picture: "https://picsum.photos/60/60?random=3",
    //   名称
    title: "大薯条",
    //   描述
    desc: `大薯条的描述`,
    //   月售
    sellNumber: "102",
    //   好评率
    favorRate: "98",
    //   价格
    price: 14,
    category: "snack", // 小吃类
  },
  {
    id: 4,
    picture: "https://picsum.photos/60/60?random=4",
    title: "麦旋风",
    desc: `麦旋风的描述`,
    sellNumber: "50",
    favorRate: "90",
    price: 13.5,
    category: "drink", // 饮品类类（示例）
  },
];
// function renderByCategory(category, products) {
//   const productList = document.querySelector(`#${category} .product_list`);
//   if (!productList) return; // 避免DOM元素不存在时报错
//   productList.innerHTML = ""; // 清空现有内容

//   // 筛选当前分类的商品（匹配goods数组的category字段）
//   const filteredProducts = products.filter(
//     (item) => item.category === category || category === "all"
//   );

//   // 直接遍历筛选后的数组（去掉TS的类型断言和多余的filtered函数）
//   filteredProducts.forEach((product) => {
//     const productItem = document.createElement("div");
//     productItem.className = "product_item";
//     productItem.dataset.id = product.id; // 绑定商品id

//     // 修正字段匹配：用picture作为图片地址，title作为名称，处理价格显示
//     productItem.innerHTML = `
//       <img src="${product.picture}" class="product_img" alt="${product.title}">
//       <div class="product_info">
//         <div class="product_name">${product.title}</div>
//         <div class="product_desc">${product.desc}</div> <!-- 补充描述显示 -->
//         <div class="product_price">¥${product.price.toFixed(
//           2
//         )}</div> <!-- 价格保留两位小数 -->
//         <div class="product_button">
//           <i class="product_sellNumber">月售 ${product.sellNumber} </i>
//           <i class="product_favorRate"> 好评 ${product.favorRate}%</i>
//           <button class="product_button_minus">-</button>
//           <div class="product_button_number">0</div>
//           <button class="product_button_plus">+</button>
//         </div>
//       </div>
//     `;
//     productList.appendChild(productItem);
//   });
// }

// // 调用时使用实际的商品数组goods（之前的allProducts是笔误）
// renderByCategory("all", goods);
