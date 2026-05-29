/* 
   localStorage 是浏览器提供的本地存储，数据会一直保存在你的电脑上
   JSON.stringify() 把 JS 对象转成字符串才能存进去
   JSON.parse()   把字符串还原成 JS 对象
*/

// 用户管理
// 获取所有已注册的用户
function getAllUsers() {
    var users = localStorage.getItem('hrbust-users');
    if (!users) {
        return [];
    }
    return JSON.parse(users);
}

// 保存新用户到 localStorage
function saveUser(user) {
    var users = getAllUsers();
    user.createdAt = new Date().toLocaleString('zh-CN');
    users.push(user);
    localStorage.setItem('hrbust-users', JSON.stringify(users));
}


// 根据用户名查找用户
function findUserByUsername(username) {
    var users = getAllUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i];
        }
    }
    return null;
}

// 检查用户名是否已被注册
function isUsernameTaken(username) {
    
    return findUserByUsername(username) !== null;
}

// 历史记录管理

// 获取所有操作历史
function getHistory() {
    var history = localStorage.getItem('hrbust-history');
    if (!history) {
        return [];
    }
    return JSON.parse(history);
}

// 添加一条操作记录
function addHistory(type, username) {
    var history = getHistory();
    history.unshift({
        type: type,
        username: username,
        time: new Date().toLocaleString('zh-CN')
    });
    localStorage.setItem('hrbust-history', JSON.stringify(history));
}

// 清空所有历史记录
function clearHistory() {
    localStorage.removeItem('hrbust-history');
}

// 渲染历史记录到页面
function renderHistory(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var history = getHistory();
    if (history.length === 0) {
        container.innerHTML = '<div class="history-empty">暂无操作记录</div>';
        return;
    }

    var html = '<ul class="history-list">';
    for (var i = 0; i < history.length; i++) {
        var item = history[i];
        var tagClass = item.type === '登录' ? 'history-tag-login' : 'history-tag-register';
        html += '<li class="history-item">';
        html += '<span class="' + tagClass + '">' + item.type + '</span>';
        html += '<span class="history-user">' + item.username + '</span>';
        html += '<span class="history-time">' + item.time + '</span>';
        html += '</li>';
    }
    html += '</ul>';
    html += '<button class="history-clear-btn" onclick="handleClearHistory()">清空记录</button>';
    container.innerHTML = html;
}

function handleClearHistory() {
    if (confirm('确定要清空所有操作记录吗？')) {
        clearHistory();
        renderHistory('history-container');
    }
}
