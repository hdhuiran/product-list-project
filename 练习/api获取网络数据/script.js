async function getData() {
  const container = document.getElementById("product-container");

  container.innerHTML = `<p>正在努力加载商品数据中....</p>`;
  try {
    // 1. 使用 fetch 请求 API 地址，并用 await 等待响应
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
        // 如果请求不成功（比如404），就手动抛出一个错误
            // 这样代码就会直接跳转到 catch 块
      throw new Error("服务器未能成功响应");
    }

    // 2. 将响应解析为 JSON 格式，并用 await 等待解析完成
    const data = await response.json();
    // 3. 在控制台打印出最终拿到的数据
    console.log(data);

    // const container = document.getElementById('product-container');

    const productsArray = data.products;

    container.innerHTML = ``;

    productsArray.forEach((product) => {
      const productHTML = `
            <div class ="product_card">
               <h3>${product.title}</h3>
               <p>价格：$${product.price}</p>
            </div>  `;

      container.innerHTML += productHTML;
    });
  } catch (error) {
    console.error("获取数据失败", error);

    // const container = document.getElementById('product-container');

    container.innerHTML = `
        <div class="error-message">
           <p>商品加载失败</p>
           <p>请检查您的网络连接或稍后再试</p>
        </div>   `;
  }
}
getData();
