      // 立即执行函数 (IIFE) 与 闭包
        // 作用：创建一个独立的作用域，保护内部变量 flag、timer 不污染全局环境
        (function () {
            const codeBtn = document.querySelector('.code-btn');
            let flag = true; // 状态锁：防止用户在倒计时期间重复点击
            
            // 绑定点击事件
            codeBtn.addEventListener('click', function () {
                if (!flag) return; // 如果正在倒计时，则直接返回
                flag = false;
                let i = 30;
                codeBtn.textContent = `0${i}秒后重新获取`;
                
                // 使用 setInterval 创建一个每 1000ms 执行一次的循环
                const timer = setInterval(() => {
                    i--;
                    codeBtn.textContent = `0${i}秒后重新获取`;
                    if (i === 0) {
                        // 当倒计时结束，必须清除以释放内存
                        clearInterval(timer);
                        codeBtn.textContent = '重新获取';
                        flag = true; // 解锁
                    }
                }, 1000);
            });
        })();

        // ---------- 表单验证 ----------
        // 批量获取表单元素
        const username = document.querySelector('[name=username]');
        const phone = document.querySelector('[name=phone]');
        const codeInput = document.querySelector('[name=code]');
        const password = document.querySelector('[name=password]');
        const confirm = document.querySelector('[name=confirm]');
        const querenIcon = document.querySelector('.icon-queren');
        const form = document.getElementById('registerForm');

        // 用户名验证
        // 使用change事件，当输入框内容改变且失去焦点时触发验证
        username.addEventListener('change', verifyName);
        // 封装用户名验证函数
        function verifyName() {
            //指向了这个专用于显示错误信息的 <span> 作为提示元素
            const span = username.nextElementSibling;
            // 定义正则表达式
            const reg = /^[a-zA-Z0-9-_]{6,10}$/;
            // 如果不匹配，则显示错误信息
            if (!reg.test(username.value)) {
                span.textContent = '输入不合法，请输入6~10位字母数字或下划线';
                return false;
            }
            // 如果匹配，则清空提示信息
            span.textContent = '';
            return true;
        }

        // 手机号验证
        // 使用change事件，当输入框内容改变且失去焦点时触发验证
        phone.addEventListener('change', verifyPhone);
        // 封装手机号验证函数
        function verifyPhone() {
           //指向了这个专用于显示错误信息的 <span> 作为提示元素
            const span = phone.nextElementSibling;
            // 严格校验 11 位中国大陆手机号
            const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
            if (!reg.test(phone.value)) {
                span.textContent = '请输入正确的11位手机号码';
                return false;
            }
            // 如果匹配，则清空提示信息
            span.textContent = '';
            return true;
        }

        // 验证码验证
        // 使用change事件，当输入框内容改变且失去焦点时触发验证
        // 封装验证码验证函数
        codeInput.addEventListener('change', verifyCode);
        function verifyCode() {
            //指向了这个专用于显示错误信息的 <span> 作为提示元素
            const span = codeInput.nextElementSibling;
            const reg = /^\d{6}$/;
            if (!reg.test(codeInput.value)) {
                span.textContent = '验证码为6位数字';
                return false;
            }
            span.textContent = '';
            return true;
        }

        // 密码验证
        // 使用change事件，当输入框内容改变且失去焦点时触发验证
        // 封装密码验证函数
        password.addEventListener('change', verifyPwd);
        function verifyPwd() {
            //指向了这个专用于显示错误信息的 <span> 作为提示元素
            const span = password.nextElementSibling;
            const reg = /^[a-zA-Z0-9-_]{6,20}$/;
            if (!reg.test(password.value)) {
                span.textContent = '密码为6~20位字母、数字或符号';
                return false;
            }
            // 如果匹配，则清空提示信息
            span.textContent = '';
            return true;
        }

        // 确认密码验证
        // 使用change事件，当输入框内容改变且失去焦点时触发验证
        // 封装确认密码验证函数
        confirm.addEventListener('change', verifyConfirm);
        function verifyConfirm() {
            //指向了这个专用于显示错误信息的 <span> 作为提示元素
            const span = confirm.nextElementSibling;
            // 比较两次密码输入的值是否绝对相等
            if (confirm.value !== password.value) {
                span.textContent = '两次密码输入不一致';
                return false;
            }
            // 如果匹配，则清空提示信息
            span.textContent = '';
            return true;
        }

        // 协议勾选 点击事件
        querenIcon.addEventListener('click', function () {
            // 使用 classList.toggle() 实现类的添加/移除切换
            this.classList.toggle('icon-queren2');
        });

        // 表单提交 进行注册验证
        // 注册表单的 submit 事件
        form.addEventListener('submit', function (e) {
            if (!querenIcon.classList.contains('icon-queren2')) {
                alert('请勾选同意协议');
                // 阻止表单向服务器的默认跳转提交行为
                e.preventDefault();
                return;
            }
            // 依次验证用户名、手机号、验证码、密码、确认密码
            // 若有任何一项失败，均阻止提交
            if (!verifyName() || !verifyPhone() || !verifyCode() || !verifyPwd() || !verifyConfirm()) {
                e.preventDefault();
            }
        });