// * 文字动画特效
import "./index.css";

let fn = null; // 用来存储最后的 动画

// 输入时候，添加文字。
oInput.addEventListener('input', (function () {
  let timer = null;
  return function (ev) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      render(this.value, oBody, letterSpaceNum);
    }, 500);
  }
})());

// 渲染文本到网页上
/*
    str 输入的文字
    parentNode 要添加到哪里
    letterSpace 字间距
*/
function render([...str], parentNode, letterSpace) {
  // 删除之前的元素。
  removeText(oBody, '.textItem');
  // 创建 Document 对象实例
  let oFrm = document.createDocumentFragment();
  // 创建标签
  str.forEach((v, i) => {
    let text = document.createElement('text');
    text.innerText = v;
    text.classList.add('textItem');
    if (!i) {
      text.classList.add('moveText');
    }
    oFrm.appendChild(text);
  })
  parentNode.appendChild(oFrm);

  // 创建完成之后，开启设置项目，用来开启动画、设置字间距等
  let { moveText, resize } = typeSetting(".textItem", letterSpace);

  // 第一次运行的时候。
  resize(true);

  // 开启动画
  animate(resize);

  // 点击的时候判断是不是红色的字体，并开启可以移动的状态
  document.addEventListener('mousedown', ev => {
    if (moveText && ev.target === moveText) {
      moveText.dataset.toggle = 'true';
    }
  });
  // 鼠标移动的时候，移动位置
  document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
    if (moveText && moveText.dataset.toggle) {
      moveText.style.cssText = `left:${x}px;top:${y}px`;
    }
  });
  // 鼠标抬起的时候，关闭移动
  document.addEventListener('mouseup', ev => {
    if (moveText) {
      moveText.dataset.toggle = '';
    }
  });
}

// 删除之前的数据
function removeText(parent, childrenClass) {
  parent.querySelectorAll(childrenClass).forEach(v => v.remove());
}

// 添加完毕之后的操作。
function typeSetting(className, num) {
  let aText = document.querySelectorAll(className);
  return {
    moveText: aText[0], // 用来存储可以点击的字
    resize(toggle = false) { // 开启调整字体位置的方法。toggle表示是否是第一次加载，如果是的话，调整添加段落的间距，水平居中
      aText.forEach((v, i, a) => {
        if (toggle) {
          if (i) {
            let left = a[i - 1].offsetLeft + num;
            let top = a[i - 1].offsetTop;
            v.style.cssText = `left: ${left}px;top: ${top}px;`
          } else {
            let w = v.clientWidth;
            let windowWidth = window.innerWidth;
            let left = windowWidth / 2 - w * aText.length / 2;
            v.style.left = left + `px`;
          }
        } else {
          if (i) {
            let left = a[i - 1].offsetLeft + num;
            let top = a[i - 1].offsetTop;
            v.style.cssText = `left: ${left}px;top: ${top}px;`
          }
        }
      })
    },
  }
}

// 开启动画。
function animate(resize) {
  cancelAnimationFrame(fn);
  requestAnimationFrame(function () {
    resize();
    fn = requestAnimationFrame(arguments.callee);
  })
}

// 渲染dom
export default render ;