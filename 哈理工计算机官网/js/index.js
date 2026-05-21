// 1. 顶部主轮播图（大 Banner）
let index = 0; // 当前显示的图片索引
let imglist = document.querySelectorAll('.banner__images a img'); // 获取所有轮播图片
let time; // 自动播放定时器
let leftbtn = document.querySelector('.banner__btn--prev'); // 左箭头按钮
let rightbtn = document.querySelector('.banner__btn--next'); // 右箭头按钮

autoplay(); // 页面加载后立即开始自动播放


//   选中当前索引对应的图片，移除其他图片的激活状态
 
function selectimglist() {
    // 先清除所有图片的激活类
    for (let i = 0; i < imglist.length; i++) {
        imglist[i].classList.remove('is-active');
    }
    // 再给当前索引的图片添加激活类
    imglist[index].classList.add('is-active');
}

//   自动播放函数：每隔3秒切换到下一张  
 
function autoplay() {
    time = setInterval(function () {
        // 判断是否到最后一张，是则回到第一张，否则索引+1
        index == imglist.length - 1 ? index = 0 : index++;
        selectimglist(); // 切换显示
    }, 3000);
}

// 左箭头点击事件：先停掉自动播放，切换到上一张，再恢复自动播放
leftbtn.onclick = function () {
    clearInterval(time);
    index == 0 ? index = imglist.length - 1 : index--; // 如果是第一张，跳到最后一张
    selectimglist();
    autoplay(); // 重新开启自动播放
}

// 右箭头点击事件：同理，切换到下一张
rightbtn.onclick = function () {
    clearInterval(time);
    index == imglist.length - 1 ? index = 0 : index++;
    selectimglist();
    autoplay();
}


// 2. 新闻区小轮播（左侧图片 + 标题 + 底部指示器）
let index1 = 0; // 当前显示的图片索引
let imglist1 = document.querySelectorAll('.news-carousel .carousel__images a img'); // 新闻轮播图片
let titlelist = document.querySelectorAll('.news-carousel .carousel__captions a'); // 对应的标题链接
let time1; // 自动播放定时器
let leftbtn1 = document.querySelector('.news-carousel .carousel__btn--prev'); // 左箭头
let rightbtn1 = document.querySelector('.news-carousel .carousel__btn--next'); // 右箭头
// 底部小圆点指示器
let imgnavbtn = document.querySelectorAll('.news-carousel .carousel__images .carousel__indicators span');

autoplay1(); // 启动自动播放
imgnav(); // 初始化指示器点击事件

// 切换新闻轮播的显示：图片、标题、指示器同步
function selectimglist1() {
    // 清除所有图片的激活状态
    for (let i = 0; i < imglist1.length; i++) {
        imglist1[i].classList.remove('is-active');
    }
    // 清除所有标题的激活状态
    for (let i = 0; i < titlelist.length; i++) {
        titlelist[i].classList.remove('is-active');
    }
    // 清除所有指示器的激活状态
    for (let i = 0; i < imgnavbtn.length; i++) {
        imgnavbtn[i].classList.remove('is-active');
    }
    // 给当前索引对应的标题、图片、指示器同时加上激活类 实现同步显示
    titlelist[index1].classList.add('is-active');
    imglist1[index1].classList.add('is-active');
    imgnavbtn[index1].classList.add('is-active');
}


 // 新闻轮播自动播放
function autoplay1() {
    time1 = setInterval(function () {
        index1 == imglist1.length - 1 ? index1 = 0 : index1++;
        selectimglist1();
    }, 3000);
}

// 左箭头点击：暂停，切到上一张，再继续自动播放
leftbtn1.onclick = function () {
    clearInterval(time1);
    index1 == 0 ? index1 = imglist1.length - 1 : index1--;
    selectimglist1();
    autoplay1();
}

// 右箭头点击：暂停，切到下一张，再继续自动播放
rightbtn1.onclick = function () {
    clearInterval(time1);
    index1 == imglist1.length - 1 ? index1 = 0 : index1++;
    selectimglist1();
    autoplay1();
}


    // 底部指示器点击事件：点击哪个小圆点，就跳到对应的图片
function imgnav() {
    for (let i = 0; i < imgnavbtn.length; i++) {
        imgnavbtn[i].onclick = function() {
            clearInterval(time1);      // 暂停自动播放
            index1 = i;                // 切换到点击的索引
            selectimglist1();          // 更新显示
            autoplay1();               // 重新开启自动播放
        }
    }
}

// 3. 底部师生风采滚动展示
// 获取整个风采展示的列表容器
let list = document.querySelector('.showcase--teachers .showcase__list');

// 鼠标进入时暂停动画滚动
list.onmouseenter = function () {
    list.style.animationPlayState = "paused";
}

// 鼠标离开时恢复动画滚动
list.onmouseleave = function () {
    list.style.animationPlayState = "running";
}
