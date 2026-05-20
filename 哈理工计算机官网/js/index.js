// 顶部轮播图
let index = 0;
let imglist = document.querySelectorAll('.img-list a img')
let time;
let leftbtn = document.querySelector('.leftbtn');
let rightbtn = document.querySelector('.rightbtn');

autoplay();

function selectimglist() {
    for (let i = 0; i < imglist.length; i++) {
        imglist[i].classList.remove('show');
    }
    imglist[index].classList.add('show');
}

function autoplay() {
    time = setInterval(function () {
        index == imglist.length - 1 ? index = 0 : index++;
        selectimglist();
    }, 3000);
}

leftbtn.onclick = function () {
    clearInterval(time);
    index == 0 ? index = imglist.length - 1 : index--;
    selectimglist();
    autoplay();
}

rightbtn.onclick = function () {
    clearInterval(time);
    index == imglist.length - 1 ? index = 0 : index++;
    selectimglist();
    autoplay();
}

//小轮播
let index1 = 0;
let imglist1 = document.querySelectorAll('.con1 .i1 .new .left .imglist a img');
let titlelist = document.querySelectorAll('.con1 .i1 .new .left .biaot a');
let time1;
let leftbtn1 = document.querySelector('.con1 .i1 .new .left .leftbtn');
let rightbtn1 = document.querySelector('.con1 .i1 .new .left .rightbtn');
// 底部图片导航按钮
let imgnavbtn = document.querySelectorAll('.con1 .new .left .imglist .imgnav span');

autoplay1();
imgnav();

function selectimglist1() {
    for (let i = 0; i < imglist1.length; i++) {
        imglist1[i].classList.remove('show');
    }
    for (let i = 0; i < titlelist.length; i++) {
        titlelist[i].classList.remove('show');
    }
    for (let i = 0; i < imgnavbtn.length; i++) {
        imgnavbtn[i].classList.remove('show');
    }
    titlelist[index1].classList.add('show');
    imglist1[index1].classList.add('show');
    imgnavbtn[index1].classList.add('show');
}

function autoplay1() {
    time1 = setInterval(function () {
        index1 == imglist1.length - 1 ? index1 = 0 : index1++;
        selectimglist1();
    }, 3000);
}

leftbtn1.onclick = function () {
    clearInterval(time1);
    index1 == 0 ? index1 = imglist1.length - 1 : index1--;
    selectimglist1();
    autoplay1();
}

rightbtn1.onclick = function () {
    clearInterval(time1);
    index1 == imglist1.length - 1 ? index1 = 0 : index1++;
    selectimglist1();
    autoplay1();
}

function imgnav() {
    for (let i = 0; i < imgnavbtn.length; i++) {
        imgnavbtn[i].onclick = function() {
            clearInterval(time1);
            index1 = i;
            selectimglist1();
            autoplay1();
        }
    }
}

// 底部轮播图
let list = document.querySelector('.con3 .teach .list');

list.onmouseenter = function () {
    list.style.animationPlayState = "paused";
}
list.onmouseleave = function () {
    list.style.animationPlayState = "running";
}
// let timer;
// let speed = 0.5;
// let offset = 0;
// let itemwidth = 287;

// timer = setInterval(scroll, 20);



// function scroll() {
//     offset -= speed;
//     if (Math.abs(offset) >= itemwidth) {
//         list.appendChild(list.children[0]);
//         // 重置
//         offset = 0;
//         list.style.transform = 'translateX(0)';
//     } else {
//         list.style.transform = 'translateX(' + offset + 'px)';
//     }
// }
