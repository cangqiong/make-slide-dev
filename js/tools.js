/*
 *
 *
 *工具类
 *
 *
 */

var htmlArr = [];
var newEditorObject = UE.getEditor('editor0');
var objArr = [];
objArr.push(newEditorObject);
var countSlide = 0;

//添加幻灯片页面

function addSlide() {
    var current, id, text;
    countSlide++;
    current = getCurrent();
    id = countSlide;

    var script = document.createElement("script");
    script.setAttribute('id', 'editor' + id);
    script.setAttribute('class', 'tag');
    script.setAttribute('type', 'text/plain');
    script.setAttribute('style', 'width:65%; height: 33.4em');

    $(script).insertAfter(document.getElementsByClassName('tag')[current]);
    gotoSlide(current + 1);

    text = 'editor' + id;
    newEditorObject = UE.getEditor(text);
    objArr.splice((current + 1), 0, newEditorObject);
    showPageNumber();
    var dom = $(".edui-for-template")[current + 1];
    var ID = dom.id;
    ID += "_body";
    $("#" + ID).click();
}

Array.prototype.remove = function(dx)　 {　　
    if (isNaN(dx) || dx > this.length) {
        return false;
    }　　
    for (var i = 0, n = 0; i < this.length; i++)　　 {　　　　
        if (this[i] != this[dx])　　　　 {　　　　　　
            this[n++] = this[i]　　　　
        }　　
    }　
    if (this.length != 0) this.length -= 1　
}

//删除当前页面

function deleteThisSlide() {
    var current, id, tempArr;
    current = getCurrent();
    tempArr = document.getElementsByClassName('tag');
    if (current == 0 && tempArr.length == 1) {
        alert("当前页不可删除");
        return;
    }

    id = tempArr[current].id;
    UE.getEditor(id).destroy();
    document.getElementById(id).parentNode.removeChild(document.getElementById(id));
    objArr.remove(current);
    if (current == 0) {
        tempArr[0].style.display = 'block';
    } else {
        tempArr[current - 1].style.display = 'block';
    }
    showPageNumber();
}

//保存当前幻灯片页面的HTML代码

function saveSlides() {
    var j, k, current, index, htmlStr;
    var tempArr = document.getElementsByClassName('tag');
    var j = 0;
    for (var i = 0, l = tempArr.length; i < l; i++) {
        htmlStr = objArr[i].getContent();
        htmlArr[j++] = htmlStr;
    }
    htmlArr.length = tempArr.length;
}

//保存数据到本地

function saveSlidesToJSON() {

}

//应用模板

var templ1, templ2, templ3, templ4, templ5, templ6;

templ1 = "<table style='border-collapse: collapse; margin: 80px 0px 0px 40px;' border='1' bordercolor='#95B3D7' height='112' width='630'><tbody><tr class='firstRow'><td style='' height='119' width='200'>此处输入文字<br/></td></tr></tbody></table><table style='border-collapse: collapse; margin: 30px 0px 0px 40px;' border='1' bordercolor='#95B3D7' height='256' width='628'><tbody><tr class='firstRow'><td style='' width='200'></td></tr></tbody></table>";
templ2 = "<table style='border-collapse: collapse; margin: 80px 0px 0px 40px;' border='1' bordercolor='#95B3D7' height='112' width='630'><tbody><tr class='firstRow'><td style='' height='119' width='200'>此处输入文字<br/></td></tr></tbody></table><table style='margin: 30px 0px 0px 40px; float: left;' border='1' bordercolor='#95B3D7' height='256' width='312'><tbody><tr class='firstRow'><td style='' width='116'></td></tr></tbody></table><table style='margin: 30px 0px 0px 40px; float: left;' border='1' bordercolor='#95B3D7' height='254' width='272'><tbody><tr class='firstRow'><td style=' ' width='236'></td></tr></tbody></table>";
templ3 = "<table style='border-collapse: collapse; margin: 80px 0px 0px 40px;' border='1' bordercolor='#95B3D7' height='112' width='630'><tbody><tr class='firstRow'><td style='' height='119' width='200'>此处输入文字<br/></td></tr></tbody></table><table style='border-collapse: collapse; margin: 30px 0px 0px 95px;' border='1' bordercolor='#95B3D7' height='141' width='511'><tbody><tr class='firstRow'><td style='' height='112' width='200'></td></tr></tbody></table>";
templ4 = "<table style='border-collapse: collapse; margin: 80px 0px 0px 40px;' border='1' bordercolor='#95B3D7' height='112' width='630'><tbody><tr class='firstRow'><td style='' height='119' width='200'>此处输入文字<br/></td></tr></tbody></table><table style='border-collapse: collapse; margin: 30px 0px 0px 95px;' border='1' bordercolor='#95B3D7' height='163' width='511'><tbody><tr class='firstRow'><td style='' height='112' width='200'></td></tr></tbody></table>";
templ5 = templ1;
templ6 = "<table style='border-collapse: collapse; margin: 80px 0px 0px 40px;' border='1' bordercolor='#95B3D7' height='112' width='630'><tbody><tr class='firstRow'><td style='' height='119' width='200'>此处输入文字<br/></td></tr></tbody></table><table style='margin: 20px 0px 0px 40px; float: left;' border='1' bordercolor='#95B3D7' height='56' width='312'><tbody><tr class='firstRow'><td style='' width='116'></td></tr></tbody></table><table style='margin: 20px 0px 0px 40px; float: left;' border='1' bordercolor='#95B3D7' height='56' width='272'><tbody><tr class='firstRow'><td style=' ' width='236'></td></tr></tbody></table><table style='margin: 20px 0px 0px 40px; float: left;' border='1' bordercolor='#95B3D7' height='208' width='312'><tbody><tr class='firstRow'><td style='' width='116'></td></tr></tbody></table><table style='margin: 20px 0px 0px 40px; float: left;' border='1' bordercolor='#95B3D7' height='204' width='272'><tbody><tr class='firstRow'><td style=' ' width='236'></td></tr></tbody></table>";

function applyTemplate(templateHtml) {
    var currentPage, current, strTemp;
    currentPage = getCurrent();
    current = objArr[currentPage];
    current.execCommand("cleardoc");
    current.execCommand("inserthtml", templateHtml);
    // current.setEnabled();
    // objArr[currentPage].setContent(templateHtml);
}
//演示幻灯片

function player() {
    saveSlides();

    document.getElementById("main").classList.add("none");
    document.getElementById("head").classList.add("none");
    document.getElementById("sidebar").classList.add("none");
    document.getElementById("foot").classList.add("none");
    document.getElementById("player").classList.remove("none");
    for (var i = 0, len = htmlArr.length; i < len; i++) {
        $("<div class='slide'>" + htmlArr[i] + "</div>").appendTo("#player");
    }
    var link = document.createElement("link");
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './css/style.css');

    var script = document.createElement("script");
    // script.setAttribute('defer', 'defer');
    script.setAttribute('src', './js/script2.js');

    var full = document.createElement("script");
    // script.setAttribute('defer', 'defer');
    full.setAttribute('src', './js/fullScreen.js');
    var parse = document.createElement("script");
    // parse.setAttribute('defer', 'defer');
    parse.setAttribute('src', './ueditor.parse.js');

    document.getElementsByTagName("head")[0].appendChild(link);
    document.getElementsByTagName("head")[0].appendChild(parse);
    document.getElementsByTagName("head")[0].appendChild(full);
    document.getElementsByTagName("head")[0].appendChild(script);
}
//返回当前页

function getCurrent() {
    var current;
    var tempArr = document.getElementsByClassName('tag');
    for (var i = 0, l = tempArr.length; i < l; i++) {
        if (tempArr[i].style.display != 'none') {
            current = i;
            i = tempArr.length;
        }
    }
    return current;
}

//切换到上一页幻灯片

function beforeSlide() {
    //上一页幻灯片页码
    var current, before;
    current = getCurrent();
    before = current - 1;
    if (before >= 0) {
        gotoSlide(before);
    } else {
        alert("前面已经没有页面了");
    }
}
//跳转到某一页

function gotoSlide(slideNum) {
    var current, tempArr;
    current = getCurrent();
    tempArr = document.getElementsByClassName('tag');
    tempArr[current].style.display = 'none';
    tempArr[slideNum].style.display = 'block';
    showPageNumber();
}
//切换到下一页幻灯片

function afterSlide() {
    var current, after, tempArr;
    tempArr = document.getElementsByClassName('tag');
    current = getCurrent();
    after = current + 1;
    if (after < tempArr.length) {
        gotoSlide(after);
    } else {
        alert("后面已经没有页面了");
    }
}
//显示页码

function showPageNumber() {
    var temp = [];
    var current, tempArr;
    tempArr = document.getElementsByClassName('tag');
    current = getCurrent();
    temp[0] = current + 1;
    temp[1] = tempArr.length;
    var doc = document.getElementById("page");
    doc.innerHTML = temp[0] + "/" + temp[1];
    showSlidePage();
    return temp;
}
//添加与幻灯片对应的区块

function showSlidePage() {
    var temp, templi, current;
    temp = $("#slidePage");
    temp.empty();
    for (var i = 0, len = objArr.length; i < len; i++) {
        templi = document.createElement("li");
        templi.setAttribute("onclick", 'gotoSlide(' + i + ')');
        templi.setAttribute("id", i);
        if (i == 0) {
            templi.innerHTML = "<a href='#'>第" + 1 + "页</a>";
            $(templi).prependTo(temp);
        } else {
            current = i + 1;
            templi.innerHTML = "<a href='#'>第" + current + "页</a>";
            $(templi).appendTo(temp);
        }
    }
}

//点击变色

function dianJi(id) {
    for (var i = 0, len = objArr.length; i < len; i++) {
        if (i == id) {
            document.getElementById(i).className = 'click';
        } else {
            document.getElementById(i).className = '';
        }

    }
}
