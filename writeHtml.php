<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
	<title>完整demo</title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
	<link rel="stylesheet" href="css/style.css" type="text/css" media="screen">
	<!-- <link rel="stylesheet" href="css/font.css" type="text/css" media="screen"> -->

	<script charset="utf-8"  src="./js/lib/jquery.js"></script>
	<script charset="utf-8" src="./ueditor.parse.js"></script>
	<script charset="utf-8" src="./js/script.js" defer="defer"></script>
	<script charset="utf-8" src="./js/fullscreen2.js" defer="defer"></script>

	<!--[if lt IE 9]>
	<script src="./js/html5.js"></script>
	<![endif]-->

</head>
<body>
	<?php    
    //获得幻灯片信息
	$json = $_POST["json"];
	//解析
	$htmlArr = json_decode($json);
    //幻灯片页数
	$len=count($htmlArr);
	// 生成幻灯片
	for($i=0;$i<$len;$i++){
        
        echo "<div class=\"slide\">	";
		echo $htmlArr[$i];
		echo "
	<div class=\"before bu\">
		<span style=\"float:left\">
			<button onclick=\"gotoPrev()\"  class=\"orange button rounded\">上一页</button>
		</span>
		<span style=\"float:left\">
			<button onclick=\"toggleFullScreen()\"  class=\"orange button rounded\">全屏</button>
		</span>
		<span style=\"float:left\">
			<button onclick=\"exitFullScreen()\"  class=\"orange button rounded\">退出</button>
		</span>
		<span style=\"float:left\">
			<button onclick=\"gotoNext()\"  class=\"orange button rounded\">下一页</button>
		</span>
	</div>
</div>
";
	}
?>
</body>
</html>