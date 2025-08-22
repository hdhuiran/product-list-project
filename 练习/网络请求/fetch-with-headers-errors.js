// 配置通用请求头
const defaultHeaders = {
  'Accept': 'application/json',
  'Authorization': 'Bearer YOUR_TOKEN' // 示例：添加认证令牌
};

// GET 请求（带自定义头和错误处理）
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'GET',
  headers: defaultHeaders
})
.then(response => {
  // 处理 HTTP 错误状态码（4xx/5xx）
  if (!response.ok) {
    throw new Error(`请求失败: ${response.status} ${response.statusText}`);
  }
  return response.json();
})
.then(data => console.log('数据:', data))
.catch(error => {
  // 统一错误处理（网络错误 + HTTP 错误）
  console.error('请求出错:', error.message);
  // 可以在这里添加 UI 错误提示
});

// POST 请求（带动态头）
const postData = { username: 'test', email: 'test@example.com' };
fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  headers: {
    ...defaultHeaders,
    'Content-Type': 'application/json' // 覆盖默认头
  },
  body: JSON.stringify(postData)
})
.then(response => {
  if (!response.ok) throw new Error(`HTTP 错误: ${response.status}`);
  return response.json();
})
.then(data => console.log('创建结果:', data))
.catch(error => console.error('错误:', error.message));
