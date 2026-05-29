// 验证码倒计时 (IIFE 保护内部变量)
(function () {
    var codeBtn = document.querySelector('.code-btn');
    var flag = true;

    codeBtn.addEventListener('click', function () {
        if (!flag) return;
        flag = false;
        var i = 30;
        codeBtn.textContent = '0' + i + '秒后重新获取';

        var timer = setInterval(function () {
            i--;
            codeBtn.textContent = '0' + i + '秒后重新获取';
            if (i === 0) {
                clearInterval(timer);
                codeBtn.textContent = '重新获取';
                flag = true;
            }
        }, 1000);
    });
})();
// 获取表单元素
var username = document.querySelector('[name=username]');
var phone = document.querySelector('[name=phone]');
var codeInput = document.querySelector('[name=code]');
var password = document.querySelector('[name=password]');
var confirm = document.querySelector('[name=confirm]');
var querenIcon = document.querySelector('.icon-queren');
var form = document.getElementById('registerForm');

// 表单验证函数
// 检查用户名是否合法（6~10位字母数字或下划线，且未被注册）
function verifyName() {
    var span = username.nextElementSibling;
    var reg = /^[a-zA-Z0-9-_]{6,10}$/;
    if (!reg.test(username.value)) {
        span.textContent = '输入不合法，请输入6~10位字母数字或下划线';
        return false;
    }
    // 额外检查：用户名是否已被注册
    if (isUsernameTaken(username.value)) {
        span.textContent = '该用户名已被注册，请换一个';
        return false;
    }
    span.textContent = '';
    return true;
}
// 检查手机号是否合法（11位数字）
function verifyPhone() {
    var span = phone.nextElementSibling;
    var reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    if (!reg.test(phone.value)) {
        span.textContent = '请输入正确的11位手机号码';
        return false;
    }
    span.textContent = '';
    return true;
}
// 检查验证码是否合法（6位数字）
function verifyCode() {
    var span = codeInput.nextElementSibling;
    var reg = /^\d{6}$/;
    if (!reg.test(codeInput.value)) {
        span.textContent = '验证码为6位数字';
        return false;
    }
    span.textContent = '';
    return true;
}
// 检查密码是否合法（6~20位字母、数字或符号）
function verifyPwd() {
    // 定义span元素来显示错误信息
    var span = password.nextElementSibling;
    var reg = /^[a-zA-Z0-9-_]{6,20}$/;
    if (!reg.test(password.value)) {
        span.textContent = '密码为6~20位字母、数字或符号';
        return false;
    }
    span.textContent = '';
    return true;
}
// 检查确认密码是否与密码一致
function verifyConfirm() {
    var span = confirm.nextElementSibling;
    if (confirm.value !== password.value) {
        span.textContent = '两次密码输入不一致';
        return false;
    }
    span.textContent = '';
    return true;
}

// 绑定验证事件
username.addEventListener('change', verifyName);
phone.addEventListener('change', verifyPhone);
codeInput.addEventListener('change', verifyCode);
password.addEventListener('change', verifyPwd);
confirm.addEventListener('change', verifyConfirm);

// 协议勾选切换
querenIcon.addEventListener('click', function () {
    this.classList.toggle('icon-queren2');
});

// 表单提交：注册用户
form.addEventListener('submit', function (e) {
    // 阻止表单默认提交
    e.preventDefault();

    // 检查协议是否勾选
    if (!querenIcon.classList.contains('icon-queren2')) {
        alert('请勾选同意协议');
        return;
    }

    // 依次验证所有字段
    if (!verifyName() || !verifyPhone() || !verifyCode() || !verifyPwd() || !verifyConfirm()) {
        return;
    }

    // 用户数据存入 localStorage
    var newUser = {
        username: username.value,
        phone: phone.value,
        password: password.value
    };
    // 存储用户数据到 localStorage
    saveUser(newUser);

    //  控制台输出：注册用户信息
    console.log(' 注册成功 ');
    console.log('用户名: ' + newUser.username);
    console.log('手机号: ' + newUser.phone);
    console.log('密码: ' + newUser.password);
    console.log('当前全部注册用户:', getAllUsers());

    // 记录注册历史
    addHistory('注册', username.value);

    alert('注册成功！即将跳转到登录页');
    location.href = './login.html';
});
