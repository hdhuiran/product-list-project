/**
 * 解析歌词字符串
 * 得到歌词对象数组
 * 对象：｛time：开始时间，words：歌词内容｝
 */
function parseLyric() {
  var lines = lrc.split("\n");
  // 歌词数组
  var result = [];
  //   console.log(lines);
  for (var i = 0; i < lines.length; i++) {
    var str = lines[i];
    var parts = str.split("]");
    // 去掉第一个[
    var timeStr = parts[0].substring(1);

    // console.log(timeStr);

    var obj = {
      time: parseTime(timeStr),
      words: parts[1],
    };
    // console.log(str);
    // console.log(parts);
    // console.log(obj);
    result.push(obj);
  }
  return result;
}
/**
 *将时间字符串转化为数字秒数
 *
 *
 */
function parseTime(timeStr) {
  var parts = timeStr.split(":");
  //   分钟乘60=秒钟，然后+号是转成数字
  //   console.log(+parts[0] * 60 + +parts[1]);
  return +parts[0] * 60 + +parts[1];
}

// 歌词数组
var lrcData = parseLyric();

// console.log(lrcData);
// 播放器对象
var doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".container ul"),
  container: document.querySelector(".container"),
};

/**
 * 计算出当前播放器 放到第几秒的情况下
 * lrcData数组应该高亮显示哪句歌词
 * 如果没有歌词需要显示，则得到-1，比如还未开始播放
 *  */
function findIndex() {
  // 播放器当前时间

  var curTime = doms.audio.currentTime;
  //   console.log(doms.audio.currentTime);
  for (var i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return i - 1;
    }
  }
  //   播放到最后一句，为了避免输出undefined，强制显示最后一句歌词
  return lrcData.length - 1;
}
// findIndex();

/**
 * 创建歌词li
 */

function creatLrcElements() {
  // 因为会对dom树做频繁改动，此处优化
  // 文档片段
  var frag = document.createDocumentFragment();
  for (var i = 0; i < lrcData.length; i++) {
    var li = document.createElement("li");
    li.textContent = lrcData[i].words;
    // doms.ul.appendChild(li);
    frag.appendChild(li);
  }
  doms.ul.appendChild(frag);
}
creatLrcElements();
// 容器高度
var containerHeight = doms.container.clientHeight;
// 歌词行高
var liHeight = doms.ul.children[0].clientHeight;
// 歌词结尾最大偏移量
var maxOffset = doms.ul.clientHeight - containerHeight;
/**
 * 设置歌词ul的偏移量
 */
function setOffset() {
  var index = findIndex();
  var offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  //   边界判定
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  //   ES6模板字符串
  doms.ul.style.transform = `translateY(-${offset}px)`;

  //去除之前的active样式
  var li = doms.ul.querySelector(".active");
  if (li) {
    li.classList.remove("active");
  }

  //  高亮歌词 没有高亮歌词时不高亮 防止出现-1
  li = doms.ul.children[index];
  if (li) {
    li.classList.add("active");
  }

  //   console.log(offset);
}

//element.addEventListener(eventType, callbackFunction, useCapture);
//addEventListener方法的第二个参数需要传递一个函数引用，而不是直接调用函数
doms.audio.addEventListener("timeupdate", function () {
  //   console.log("播放时间变化了" );
  setOffset();
});
