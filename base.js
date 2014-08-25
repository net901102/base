//获取样式表样式
function getStyle(obj, attr){
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, 0)[attr];
	}
}

//样式的获取或赋值(2参数为获取，3参数为赋值)
function css(obj, attr, val){
	if(arguments.length==2){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,0)[attr];
	}else{
		obj.style[attr]=val;
	}
}

//通过class获取对象集合（第一个参数为存在该class的父元素，第二个参数为获取的class名）
function getClass(oParent,sClass){
	var classAry = [];
	var aEle = oParent.getElementsByTagName('*');
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			classAry.push(aEle[i]);
		}
	}
	return classAry;
}

//获取第一个子节点
function first(obj){
	return obj.firstElementChild || obj.firstChild;
}

//获取最后一个子节点
function last(obj){
	return obj.lastElementChild || obj.lastChild;
}

//获取下一个兄弟节点
function next(obj){
	return obj.nextElementSibling || obj.nextSibling;
}

//获取上一个兄弟节点
function prev(obj){
	return obj.previousElementSibling || obj.previousSibling;
}

//获取浏览器当前区域的宽
function viewWidth(){
	return document.documentElement.clientWidth;
}

//获取浏览器当前区域的高
function viewHeight(){
	return document.documentElement.clientHeight;
}

//获取滚动条当前离顶部的高度
function scrollY(){
	return document.documentElement.scrollTop || document.body.scrollTop;
}

//获取整个文档对象内容的高度（取整个body的高度和浏览器当前区域的高度的最大值）
function documentHeight(){
	return Math.max(document.body.offsetHeight,document.documentElement.clientHeight);
}

//获取对象距离屏幕左侧的距离（不论父元素是否为定位元素）
function posLeft(obj){
	var left = 0;
	while(obj){
		left += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return left;
}

//获取对象距离屏幕顶部的距离（不论父元素是否为定位元素）
function posTop(obj){
	var top = 0;
	while(obj){
		top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return top;
}

//自定义绑定事件（参数1：对象；参数2：绑定的事件名[不带on]；参数3：绑定的函数名）
function bindEvent(obj,ev,fn){
	if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}
	else{
		obj.attachEvent('on'+ev,function(){
			fn.call(obj);
		});
	}
}

//删除绑定事件
function delEvent(obj,ev,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(ev,fn,false);
	}
	else{
		obj.detachEvent('on'+ev,fn);
	}
}

//判断字符串是否为空
function IsEmpty(value) { 
	return /^\s*$/g.test(value);
}

//过滤字符串里的tag，空白等
function removeHTMLTag(str) {
	str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
	str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
	//str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
	str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
	return str;
}

//计算字符数
function txtLen(str){ 
     var i,sum;
     sum=0;
     for(i=0;i<str.length;i++){
         if ((str.charCodeAt(i)>=0) && (str.charCodeAt(i)<=255))
             sum=sum+1;
         else
             sum=sum+2;
     }
     return sum;
}

//封装后插函数（对应insertBefore）
function insertAfter(newElement,targetElement) { 
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		//如果最后的节点是目标元素，则直接添加。
		parent.appendChild(newElement);
	}else {
		//如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面。
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//完美拖拽加磁性吸附（参数1：id；参数2：磁性吸附触发距离）
function drag(id,adsorption_len){ 
	var obj = document.getElementById(id);
	var disX = 0;
	var disY = 0;
	obj.onmousedown = function(ev){
		var ev = ev || window.event;
		disX = ev.clientX - obj.offsetLeft;
		disY = ev.clientY - obj.offsetTop;
		if(obj.setCapture){
			obj.setCapture(); //全局捕获
		}
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			if(L<adsorption_len){   //磁性吸附
				L = 0;
			}
			else if(L>document.documentElement.clientWidth - obj.offsetWidth){
				L = document.documentElement.clientWidth - obj.offsetWidth;
			}
			
			if(T<0){
				T = 0;
			}
			else if(T>document.documentElement.clientHeight - obj.offsetHeight){
				T = document.documentElement.clientHeight - obj.offsetHeight;
			}
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			if(obj.releaseCapture){
				obj.releaseCapture(); //释放全局捕获
			}
		};
		return false;
	};
}

//自定义滚动条结合鼠标滚动事件（4参数分别为：oBar滚动条；oSlider滑块；oMask蒙板层；oContent内容层）
function scrollBar(oBar,oSlider,oMask,oContent){
	var disY = 0;
	var bBtn = true;
	
	oSlider.onmousedown = function(ev){
		var ev = ev || window.event;
		disY = ev.clientY - oSlider.offsetTop;
		if(oSlider.setCapture){
			oSlider.setCapture();
		}
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			var T = ev.clientY - disY;
			if(T<0){
				T = 0;
			}
			else if(T>oBar.offsetHeight - oSlider.offsetHeight){
				T = oBar.offsetHeight - oSlider.offsetHeight;
			}
			oSlider.style.top = T + 'px';
			
			var soleY = T/(oBar.offsetHeight - oSlider.offsetHeight);
			
			oContent.style.top = -soleY * (oContent.offsetHeight - oMask.offsetHeight) + 'px';
			
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			if(oSlider.releaseCapture){
				oSlider.releaseCapture();
			}
		};
		return false;
	};
	
	if(oContent.addEventListener){
		oContent.addEventListener('DOMMouseScroll',toRun,false);
	}
	oContent.onmousewheel = toRun;
	
	function toRun(ev){
		var ev = ev || window.event;
		
		if(ev.detail){
			bBtn = ev.detail>0 ? true : false; 
		}
		else{
			bBtn = ev.wheelDelta<0 ? true : false; 
		}
		
		if(bBtn){
			var T = oSlider.offsetTop + 10;
		}
		else{
			var T = oSlider.offsetTop - 10;
			
		}
		if(T<0){
			T = 0;
		}
		else if(T>oBar.offsetHeight - oSlider.offsetHeight){
			T = oBar.offsetHeight - oSlider.offsetHeight;
		}
		oSlider.style.top = T + 'px';
		
		var soleY = T/(oBar.offsetHeight - oSlider.offsetHeight);
		
		oContent.style.top = -soleY * (oContent.offsetHeight - oMask.offsetHeight) + 'px';
		
		if( ev && ev.preventDefault){
		　　//阻止默认浏览器动作(W3C) 
		　　ev.preventDefault()
		}else{
		　　//IE中阻止函数器默认动作的方式 
		　　window.event.returnValue = false;
		}
	}
	
}


//设置cookie（参数1：cookie名；参数2：cookie值；参数3：过期时间）
function setCookie(key,value,times){
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + times);
	document.cookie = key + '=' + value + ';expires=' + oDate;
}

//获取cookie（cookie名）
function getCookie(key){
	var a = document.cookie.split('; ');
	for(var i=0;i<a.length;i++){
		var b = a[i].split('=');
		if(b[0]==key){
			return b[1];
		}
	}
}

//删除cookie
function delCookie(key){
	setCookie(key,1,-1);
}

//异步加载js（jsonp方式，解决跨域）
function createJs(sUrl){
	var oScript = document.createElement('script');
	oScript.type = 'text/javascript';
	oScript.src = sUrl;
	document.getElementsByTagName('head')[0].appendChild(oScript);
}


//ajaxGet方法封装（3参数）
function ajaxGet(sUrl,fnOnSuccess,fnOnFail){
	
	//1.创建ajax对象
	var oAjax = null;
	
	if(window.ActiveXObject){
		oAjax = new ActiveXObject("Msxml2.XMLHTTP")||ActiveXObject("Microsoft.XMLHTTP");
	}
	else{
		oAjax = new XMLHttpRequest();
	}
	//2.连接服务器 第一个参数：请求方式 第二个参数：请求的地址 第三个参数：一个布尔值，如果true异步  false 同步
	oAjax.open('get',sUrl,true);
	
	//3.监听服务器数据 返回的数据:responseText
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState==4){
			if(oAjax.status == 200){
				fnOnSuccess(oAjax.responseText);
			}
			else{
				fnOnFail(oAjax.status);
			}
		}
	};
	
	//4.发送数据,一般对post方式
	
	oAjax.send();
	
}

//ajaxPost方法封装（4参数）
function ajaxPost(sUrl,data,fnOnSuccess,fnOnFail){
	
	//1.创建ajax对象
	var oAjax = null;
	if(window.ActiveXObject){
		oAjax = new ActiveXObject("Msxml2.XMLHTTP")||ActiveXObject("Microsoft.XMLHTTP");
	}
	else{
		oAjax = new XMLHttpRequest();
	}
	
	//2.连接服务器 第一个参数：请求方式 第二个参数：请求的地址 第三个参数：一个布尔值，如果true异步  false 同步
	oAjax.open('post',sUrl,true);
	
	//3.监听服务器数据 返回的数据:responseText
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState==4){
			if(oAjax.status == 200){
				fnOnSuccess(oAjax.responseText);
			}
			else{
				fnOnFail(oAjax.status);
			}
		}
	};
	
	//4.发送数据,一般对post方式
	oAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	oAjax.send(data);
}


//url拼串json格式
//weibo.php?act=add&content=xxx&t=new Data().getTime()
/*
	var url='weibo.php?'+joinUrl({
		act:		'add',
		content:	encodeURI(oTxt.value),
		t:			new Date().getTime()
	});
*/
function joinUrl(json){
	var arr=[];
	var i;
	for(i in json){
		arr.push(i+'='+json[i]);
	}
	return arr.join('&');
}


//时间戳转日期（秒数转2012-04-15 11:31）
function time2date(time){
	function toDouble(n){
		return n>10?''+n:'0'+n;
	}
	var oDate=new Date();
	oDate.setTime(time*1000);
	//2012-04-15 11:31
	return oDate.getFullYear()+'-'+toDouble(oDate.getMonth()+1)+'-'+toDouble(oDate.getDate())+' '+toDouble(oDate.getHours())+':'+toDouble(oDate.getMinutes());
}
