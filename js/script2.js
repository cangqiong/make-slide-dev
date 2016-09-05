/**
 *
 *
 *HTML5幻灯片脚本
 *
 *
 **/

if (!window.console) {
    window.console = {
        log: function() {}
    };
}

var currentPage = 0;
var maxPage = 1;
maxPage = $(".slide").length;

// -------------------- 翻页控制 --------------------

/**
    翻到指定页面。
    对于用户输入的页码，需要进行类型和范围的容错判断。
    如果用户输入的页码无效或等于当前页码，则不做任何处理。
 */

function gotoPage(page) {
    page = page - 0 || 0;

    if (page > maxPage) {
        return;
    }
    if (page < 1) {
        return;
    }
    if (currentPage == page) {
        return;
    }

    $('#slide' + currentPage).removeClass("current");
    currentPage = page;
    $('#slide' + currentPage).addClass("current");
    location = '#slide' + currentPage;
    window.scrollX = 0;
    window.scrollY = 0;
}



/**
    刷新当前页面。
 */

function refreshCurrentPage() {
    gotoPage(currentPage);
}


/**
    翻到后一页或显示下一个动画。
    播放动画时，会寻找当前页面内class为before的元素，
    并将其中的第一个的class改为after。
 */

function gotoNext(needCheckActions) {

    var currentAction = $('#slide' + currentPage).find('.before')[0];

    if (needCheckActions && currentAction) {
        $(currentAction).addClass('after').removeClass('before');
    } else {
        if (currentPage > maxPage) {
            return;
        }
        if (currentPage < 1) {
            currentPage = 1;
        }

        gotoPage(currentPage - (-1));
    }
}


/**
    翻到前一页
 */

function gotoPrev() {
    if (currentPage < 1) {
        return;
    }
    if (currentPage > maxPage) {
        currentPage = maxPage;
    }

    gotoPage(currentPage - 1);
}



// -------------------- 事件绑定 --------------------


/**
    根据用户的键盘操作匹配翻页、显示动画等操作
 */

function keydown(evt) {
    var DISABLED_NODENAME_MAP = {
        INPUT: true,
        SELECT: true,
        TEXTAREA: true,
        A: true
    };

    // 特殊元素内不触发快捷键事件
    if (DISABLED_NODENAME_MAP[evt.target.nodeName]) {
        return;
    }

    // 根据按键匹配操作
    switch (evt.keyCode) {
        case 13:
            evt.preventDefault();
            toggleFullScreen();
            break;
        case 27:
            evt.preventDefault();
            exitShowSlide();
            break;
        case 32:
            evt.preventDefault();
            gotoNext(true);
            break;
        case 33:
            evt.preventDefault();
            gotoPrev();
            break;
        case 34:
            evt.preventDefault();
            gotoNext();
            break;
        case 35:
            evt.preventDefault();
            gotoPage(maxPage);
            break;
        case 36:
            evt.preventDefault();
            gotoPage(1);
            break;
        case 37:
            evt.preventDefault();
            gotoPrev();
            break;
        case 38:
            evt.preventDefault();
            gotoPrev();
            break;
        case 39:
            evt.preventDefault();
            gotoNext(true);
            break;
        case 40:
            evt.preventDefault();
            gotoNext(true);
            break;
        case 13:
            evt.preventDefault();
            toggleFullScreen();
            break;
        case 71:
            if (evt.ctrlKey || evt.shiftKey) {
                evt.preventDefault();
                gotoPage(prompt('请输入您想要到达的页码：', currentPage));
            }
        default:
            ;
    }
}

function getAttr(attrName) {
    return this.attrs && this.attrs[attrName.toLowerCase()];
}

function setAttr(attrName, attrVal) {
    if (!attrName) {
        delete this.attrs;
        return;
    }
    if (!this.attrs) {
        this.attrs = {};
    }
    if (utils.isObject(attrName)) {
        for (var a in attrName) {
            if (!attrName[a]) {
                delete this.attrs[a]
            } else {
                this.attrs[a.toLowerCase()] = attrName[a];
            }
        }
    } else {
        if (!attrVal) {
            delete this.attrs[attrName]
        } else {
            this.attrs[attrName.toLowerCase()] = attrVal;
        }

    }
}
//退出演示

function exitShowSlide() {
    document.getElementById("main").classList.remove("none");
    document.getElementById("head").classList.remove("none");
    document.getElementById("sidebar").classList.remove("none");
    document.getElementById("foot").classList.remove("none");
    document.getElementById("player").classList.add("none");
    window.location.hash = '';
}

function inputRule(root) {
    isSetColored = false;
    utils.each(root.getNodesByTagName('p'), function(p) {
        var styles = p.getAttr('data-background');
        if (styles) {
            isSetColored = true;
            setBackground(stringToObj(styles));
            p.parentNode.removeChild(p);
        }
    })
}

function stringToObj(str) {
    var obj = {}, styles = str.split(';');
    utils.each(styles, function(v) {
        var index = v.indexOf(':'),
            key = utils.trim(v.substr(0, index)).toLowerCase();
        key && (obj[key] = utils.trim(v.substr(index + 1) || ''));
    });
    return obj;
}

function setBackground(obj) {
    if (obj) {
        var styles = [];
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                styles.push(name + ":" + obj[name] + '; ');
            }
        }
        utils.cssRule(cssRuleId, styles.length ? ('body{' + styles.join("") + '}') : '', me.document);
    } else {
        utils.cssRule(cssRuleId, '', me.document)
    }
}

function initStyle() {
    //解析幻灯片样式
    var len = $('.slide').length;
    for (var i = 1; i <= len; i++) {
        uParse('#slide' + i, {
            rootPath: '../'
        })
    }
}

// -------------------- 程序初始化 --------------------
// 根据浏览器尺寸调整页面大小，
// 根据location中的hash值设置默认显示的幻灯片(#slideX)

function init() {
    // 初始化页面尺寸，绑定键盘事件
    $('body').keydown(keydown);
    var i = 0;
    maxPage = $('#player > .slide').each(function(i, slide) {
        slide.id = 'slide' + (i - (-1));
    }).length;
    // 初始化默认显示幻灯片的编号
    var pageTarget = location.hash.match(/^\#slide(\d+)$/);

    // 翻页到默认显示的幻灯片
    if (!pageTarget || !(pageTarget[1] - 0) ||
        pageTarget[1] < 0 || pageTarget[1] > maxPage) {
        gotoPage(1);
    } else {
        currentPage = pageTarget[1];

        // hack the refresh problem in firefox/opera
        location = '#slide0';
        location = '#slide' + currentPage;
    }
    initStyle();
    $('#slide' + currentPage).addClass("current");
}

$(function() {
    init();
});
