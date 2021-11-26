import './index.css';
// * 圆形动画
(() => {
  'use strict';
  function initRound(dom, l1 = 20, l2 = 16) {
    let container;
    let dq = selector => document.querySelector(selector);
    if (dom instanceof HTMLElement) {
      container = dom;
    } else {
      container = dq(dom);
    }
    if (!container) {
      throw new Error('Invalid DOM element，请检查你的Dom是否存在！');
    }
    let w = window.innerWidth;
    let h = window.innerHeight;
    const itemLength = l1;
    const itemsLength = l2;
    let itemArr = [];

    let timer = null;
    window.onresize = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        w = window.innerWidth;
        h = window.innerHeight;
        console.log(itemArr);
        init(w, h);
      }, 100);
    };

    function init(w, h) {
      if (itemArr.length > 0) {
        let width = (w - 200) / itemArr.length;
        container.style.setProperty('--width', `${width}px`);

        itemArr.forEach((v, i) => {
          v.parent.style.setProperty('--left', i);
        });
      }
    }

    let frm = document.createDocumentFragment();
    for (let i = 0; i < itemLength; i++) {
      let item = document.createElement('div');
      item.style.setProperty('--rotate', `${(360 / itemLength) * i}deg`);
      let itemsObj = {
        parent: item,
        children: [],
      };
      for (let j = 0; j < itemsLength; j++) {
        let items = document.createElement('div');
        items.classList.add('items');
        items.classList.add('round');
        items.style.setProperty('--rotate', `${(180 / itemsLength) * j + 90}deg`);
        item.appendChild(items);
        itemsObj.children.push(items);
      }
      itemArr.push(itemsObj);
      item.setAttribute('class', 'item');
      frm.appendChild(item);
    }

    container.appendChild(frm);
    init(w, h);
  }
  window.initRound = initRound;
  // return initRound;
})();
