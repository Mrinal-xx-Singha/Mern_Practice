const axios = require(axios);

async function run() {
  try {
    // 1. Login to get token cookie
    const loginRes = await axios.post(http://localhost:5000/api/auth/demo-login, { role: admin }, { withCredentials: true });
    const cookie = loginRes.headers[set-cookie][0];
    
    // 2. Create a post
    const FormData = require(form-data);
    const form = new FormData();
    form.append(title, Test
