// -------------------- 全屏 --------------------
var divElement = $("#player");
//判断览器是否支持全屏模式
var fullScreen = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled ? true : false;

function toggleFullScreen() {
    //判断能否进入全屏模式
    if (true) {
        if (!document.fullscreen && !document.mozFullScreen && !document.webkitFullScreen) {
            if (divElement.requestFullscreen) {
                divElement.requestFullscreen();
            } else if (divElement.mozRequestFullScreen) {
                divElement.mozRequestFullScreen();
            } else if (divElement.webkitRequestFullscreen) {
                divElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }

        }
    }
}

function exitFullScreen() {
    if (fullScreen) {
        if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.cancelFullScreen) {
            document.cancelFullScreen();
        }
    }
}
