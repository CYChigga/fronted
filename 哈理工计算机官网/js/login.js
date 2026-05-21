   
        // 获取表单相关元素
        const form = document.querySelector('#pane-account');
        const agreeCheckbox = document.getElementById('my-checkbox');
        const usernameInput = document.querySelector('[name="username"]');
        const passwordInput = document.querySelector('[name="password"]');
        const loginBtn = document.querySelector('.dl');

        // 失去焦点且内容改变时触发 change事件 进行用户名验证
        usernameInput.addEventListener('change', verifyAccount);
        function verifyAccount() {
            // 获取当前输入框的下一个兄弟节点（即错误提示 span）
            const span = usernameInput.nextElementSibling;
            const val = usernameInput.value;
            
            // 定义用户名(6-10位字母数字)和手机号(11位严格格式)的匹配规则
            const regName = /^[a-zA-Z0-9-_]{6,10}$/;
            const regPhone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
            
            // 使用 reg.test() 方法检测字符串是否符合规则
            if (!regName.test(val) && !regPhone.test(val)) {
                span.textContent = '请输入正确的用户名(6-10位)或手机号'; // 动态修改文本内容
                return false;
            }
            span.textContent = '';
            return true;
        }

        // 密码验证
        passwordInput.addEventListener('change', verifyPwd);
        function verifyPwd() {
            const span = passwordInput.nextElementSibling;
            const reg = /^[a-zA-Z0-9-_]{6,20}$/;
            if (!reg.test(passwordInput.value)) {
                span.textContent = '密码为6~20位字母、数字或符号';
                return false;
            }
            span.textContent = '';
            return true;
        }

        // 登录按钮点击事件 进行登录验证
        loginBtn.addEventListener('click', function(e) {
            // 检查是否勾选协议
            if (!agreeCheckbox.checked) {
                alert('请勾选同意协议');
                return;
            }
            
            // 主动调用验证函数，获取验证结果
            const isAccountValid = verifyAccount();
            const isPwdValid = verifyPwd();
            
            // 拦截：只要有一项不通过，就提前结束函数
            if (!isAccountValid || !isPwdValid) {
                return;
            }

            // 使用 localStorage 将用户名持久化存储在本地，供首页读取
            localStorage.setItem('hrbust-uname', usernameInput.value);
            alert('登录成功！');
            
            // 通过 location.href 实现页面跳转
            location.href = './index.html';
        });