// 1. 安装 Axios
// npm install axios 或在 HTML 中引入: <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

// 2. 基础配置
import axios from 'axios'; // 模块化环境
// 或直接使用全局变量 axios（脚本引入时）

// 创建实例（推荐）
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 基础 URL
  timeout: 5000, // 超时时间
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

// 3. 基本用法
// GET 请求
api.get('/posts/1')
  .then(response => console.log('GET 响应:', response.data))
  .catch(error => console.error('GET 错误:', error.message));

// POST 请求
api.post('/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1
})
.then(response => console.log('POST 响应:', response.data))
.catch(error => console.error('POST 错误:', error.message));

// 4. 文件上传
async function uploadWithAxios() {
  const fileInput = document.getElementById('fileInput');
  const formData = new FormData();
  formData.append('avatar', fileInput.files[0]);

  try {
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('上传成功:', response.data);
  } catch (error) {
    console.error('上传失败:', error.message);
  }
}

// 5. 拦截器（Axios 特色功能）
// 请求拦截器（发送前处理）
api.interceptors.request.use(
  config => {
    // 例如：动态添加 token
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器（接收后处理）
api.interceptors.response.use(
  response => response.data, // 直接返回数据部分
  error => {
    // 统一错误处理
    const message = error.response?.data?.message || error.message;
    console.error('请求错误:', message);
    return Promise.reject(new Error(message));
  }
);

// 使用拦截器后的简化调用
api.get('/users')
  .then(users => console.log('用户列表:', users)) // 直接获取 data
  .catch(err => alert(err.message));
