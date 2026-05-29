// ---------- 获取表单元素 ----------
var form = document.querySelector('#pane-account');
var agreeCheckbox = document.getElementById('my-checkbox');
var usernameInput = document.querySelector('[name="username"]');
var passwordInput = document.querySelector('[name="password"]');
var loginBtn = document.querySelector('.dl');

// ---------- 用户名验证 ----------
usernameInput.addEventListener('change', verifyAccount);
function verifyAccount() {
    var span = usernameInput.nextElementSibling;
    var val = usernameInput.value;
    var regName = /^[a-zA-Z0-9-_]{6,10}$/;
    var regPhone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;

    if (!regName.test(val) && !regPhone.test(val)) {
        span.textContent = '请输入正确的用户名(6-10位)或手机号';
        return false;
    }
    span.textContent = '';
    return true;
}

// ---------- 密码验证 ----------
passwordInput.addEventListener('change', verifyPwd);
function verifyPwd() {
    var span = passwordInput.nextElementSibling;
    var reg = /^[a-zA-Z0-9-_]{6,20}$/;
    if (!reg.test(passwordInput.value)) {
        span.textContent = '密码为6~20位字母、数字或符号';
        return false;
    }
    span.textContent = '';
    return true;
}

// ---------- 登录按钮点击 ----------
loginBtn.addEventListener('click', function () {
    // 检查协议勾选
    if (!agreeCheckbox.checked) {
        alert('请勾选同意协议');
        return;
    }

    // 验证格式
    if (!verifyAccount() || !verifyPwd()) {
        return;
    }

    var inputName = usernameInput.value;
    var inputPwd = passwordInput.value;

    // ---- 控制台输出：模拟校验过程 ----
    console.log('========== 登录校验 ==========');
    console.log('输入账号: ' + inputName);
    console.log('输入密码: ' + inputPwd);
    console.log('已注册用户列表:', getAllUsers());

    // 从 localStorage 查找用户
    var user = findUserByUsername(inputName);
    console.log('查找结果:', user ? '找到用户' : '用户不存在');

    if (!user) {
        console.log('校验失败: 该账号尚未注册');
        console.log('===============================');
        usernameInput.nextElementSibling.textContent = '该用户尚未注册';
        return;
    }

    // 比对密码
    console.log('存储的密码: ' + user.password);
    console.log('输入的密码: ' + inputPwd);
    console.log('密码匹配: ' + (user.password === inputPwd ? '是' : '否'));

    if (user.password !== inputPwd) {
        console.log('校验失败: 密码错误');
        console.log('===============================');
        passwordInput.nextElementSibling.textContent = '密码错误，请重试';
        return;
    }

    // ---- 登录成功 ----
    console.log('校验通过! 登录成功');
    console.log('===============================');
    addHistory('登录', inputName);
    localStorage.setItem('hrbust-uname', inputName);

    alert('登录成功！欢迎回来，' + inputName + '！');
    location.href = './index.html';
});
