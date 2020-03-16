var cnStr = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
var chnUnitSection = ["", "萬", "億", "萬億", "億億"];
var cnUnit = ["", "拾", "佰", "仟"];

var numToChn = function (num) {
  var index = num.toString().indexOf(".");
  if (index != -1) {
    var str = num.toString().slice(index);
    var dot = "點";
    for (var i = 1; i < str.length; i++) {
      dot += cnStr[parseInt(str[i])];
    }
    return dot;
  } else {
    return;
  }
}

//定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
function sectionToChinese(section) {
  var str = '',
    chnstr = '',
    zero = false,
    count = 0; //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
  while (section > 0) {
    var v = section % 10; //对数字取余10，得到的数即为个位数
    if (v == 0) { //如果数字为零，则对字符串进行补零
      if (zero) {
        zero = false; //如果遇到连续多次取余都是0，那么只需补一个零即可
        chnstr = cnStr[v] + chnstr;
      }
    } else {
      zero = true; //第一次取余之后，如果再次取余为零，则需要补零
      str = cnStr[v];
      str += cnUnit[count];
      chnstr = str + chnstr;
    }
    count++;
    section = Math.floor(section / 10);
  }
  return chnstr;
}



//定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零

function TransformToChinese(num) {
  var aaa = numToChn(num);
  num = Math.floor(num);
  var unitPos = 0;
  var strIns = '',
    chnStr = '';
  var needZero = false;

  if (num === 0) {
    return cnStr[0];
  }
  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = cnStr[0] + chnStr;
    }
    strIns = sectionToChinese(section);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }


  // 数字中有小数点
  // return chnStr + aaa;

  // 数字中没有小数点
  return chnStr;
}




var bszCaller, bszTag;
! function () {
  var c, d, e, a = !1,
    b = [];
  ready = function (c) {
    return a || "interactive" === document.readyState || "complete" === document.readyState ? c.call(document) : b.push(function () {
      return c.call(this)
    }), this
  }, d = function () {
    for (var a = 0, c = b.length; c > a; a++) b[a].apply(document);
    b = []
  }, e = function () {
    a || (a = !0, d.call(window), document.removeEventListener ? document.removeEventListener("DOMContentLoaded", e, !1) : document.attachEvent && (document.detachEvent("onreadystatechange", e), window == window.top && (clearInterval(c), c = null)))
  }, document.addEventListener ? document.addEventListener("DOMContentLoaded", e, !1) : document.attachEvent && (document.attachEvent("onreadystatechange", function () {
    /loaded|complete/.test(document.readyState) && e()
  }), window == window.top && (c = setInterval(function () {
    try {
      a || document.documentElement.doScroll("left")
    } catch (b) {
      return
    }
    e()
  }, 5)))
}(), bszCaller = {
  fetch: function (a, b) {
    var c = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
    window[c] = this.evalCall(b), a = a.replace("=BusuanziCallback", "=" + c), scriptTag = document.createElement("SCRIPT"), scriptTag.type = "text/javascript", scriptTag.defer = !0, scriptTag.src = a, document.getElementsByTagName("HEAD")[0].appendChild(scriptTag)
  },
  evalCall: function (a) {
    return function (b) {
      ready(function () {
        try {
          a(b), scriptTag.parentElement.removeChild(scriptTag)
        } catch (c) {
          bszTag.hides()
        }
      })
    }
  }
}, bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", function (a) {
  bszTag.texts(a), bszTag.shows()
}), bszTag = {
  bszs: ["site_pv", "page_pv", "site_uv"],
  texts: function (a) {
    this.bszs.map(function (b) {
      var c = document.getElementById("busuanzi_value_" + b);
      c && (c.innerHTML = TransformToChinese(a[b]))
    })
  },
  hides: function () {
    this.bszs.map(function (a) {
      var b = document.getElementById("busuanzi_container_" + a);
      b && (b.style.display = "none")
    })
  },
  shows: function () {
    this.bszs.map(function (a) {
      var b = document.getElementById("busuanzi_container_" + a);
      b && (b.style.display = "inline")
    })
  }
};
