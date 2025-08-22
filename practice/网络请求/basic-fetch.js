// 1. GET 请求（获取数据）
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json()) // 解析 JSON
  .then(data => console.log('GET 响应:', data))
  .catch(error => console.log('GET 错误:', error));

// 2. POST 请求（提交数据）
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
  headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(data => console.log('POST 响应:', data))
.catch(error => console.log('POST 错误:', error));
