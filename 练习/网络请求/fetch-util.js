/**
 * 通用 HTTP 请求工具
 * @param {string} url - 请求地址
 * @param {string} method - 请求方法（GET/POST/PUT/DELETE 等）
 * @param {object|FormData|null} data - 请求数据
 * @param {object} customHeaders - 自定义请求头
 * @returns {Promise} - 返回请求结果
 */
async function request(url, method = 'GET', data = null, customHeaders = {}) {
  // 基础配置
  const config = {
    method: method.toUpperCase(),
    headers: {
      'Accept': 'application/json',
      ...customHeaders // 合并自定义头
    }
  };

  // 处理请求数据
  if (data) {
    if (data instanceof FormData) {
      // 文件上传：不设置 Content-Type，由浏览器处理
      config.body = data;
    } else {
      // JSON 数据：设置 Content-Type
      config.body = JSON.stringify(data);
      config.headers['Content-Type'] = 'application/json';
    }
  }

  try {
    const response = await fetch(url, config);
    
    // 处理 HTTP 错误
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(`${errorData?.message || '请求失败'} (${response.status})`);
    }

    // 处理响应数据（兼容空响应）
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();

  } catch (error) {
    console.error(`[${method}] ${url} 失败:`, error.message);
    throw error; // 抛出错误让调用方处理
  }
}

// 使用示例
// 1. GET 请求
request('https://jsonplaceholder.typicode.com/posts')
  .then(data => console.log('文章列表:', data))
  .catch(err => alert(err.message));

// 2. POST 请求（JSON 数据）
request('https://jsonplaceholder.typicode.com/posts', 'POST', {
  title: '测试标题',
  body: '测试内容'
})
.then(data => console.log('创建结果:', data))
.catch(err => alert(err.message));

// 3. 文件上传
document.getElementById('fileInput').addEventListener('change', async (e) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);
  
  try {
    const result = await request('/upload', 'POST', formData);
    console.log('上传结果:', result);
  } catch (err) {
    alert(err.message);
  }
});
