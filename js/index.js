$(function(){
	
	var add = $('#add');
	var addLay = $('#add-layer');
	
	//这是默认的页码
	var dq = 1;
	
	add.click(function(){
		addLay.css('display','block')
	});
	
	//查找存储的个数,有一个就增加一个ul,然后将数据存储在ul中,如果超过七个,进入下一页
	function tianchong(ye){
		ye = (ye -1)*7;
		$('#tab').html("");
			
		var bt = "";
		bt +='	<li>编号</li>';
		bt +='	<li>学号</li>';
		bt +='	<li>姓名</li>';
		bt +='	<li>课程</li>';
		bt +='	<li>成绩</li>';
		bt +='	<li>操作</li>';
		$('#tab').append('<ul class="biaoti">'+bt+'</ul>');
		
		for(i = 0+ye;i < 7+ye && i < localStorage.length;i++){
			var s = "";
			
			var key = localStorage.key(i);
			var str = localStorage.getItem(key);
			var json = JSON.parse(str);
			
			s +='<li>'+json.bh+'</li>';
			s +='<li>'+json.xh+'</li>';
			s +='<li>'+json.xm+'</li>';
			s +='<li>'+json.kc+'</li>';
			s +='<li>'+json.cj+'</li>';
			s +='<li><input type="button" value="操作" /></li>';
			
			
			$('#tab').append('<ul>'+s+'</ul>');
		}
		
		
	}
	
	//页码控制函数
	yema(dq);
	function yema(dq){
		//计算页码
		

		var ye = Math.ceil(localStorage.length/7);
		
		$('#yema span span').html('当前是第 '+dq+' 页,共有 '+ye+' 页。跳转到第');
		
		tianchong(dq);
	}
	
	//页码跳转
	$('#tiaozhuan').click(function(){
		
		if($('#ye').val() > Math.ceil(localStorage.length/7)||$('#ye').val()<=0){
			alert("输入了不存在的页码");
			$('#ye').val("");
			return;
		}
		
		dq = $('#ye').val();
		yema(dq);
		$('#ye').val("");
	});
	
	$('#shang').click(function(){
		if(dq - 1<=0){
			alert("上一页没有了");
			return
		}
		dq = dq - 1;
		yema(dq);
	});
	$('#xia').click(function(){
		if(dq + 1>Math.ceil(localStorage.length/7)){
			alert("下一页没有了");
			return
		}
		dq = dq + 1;
		yema(dq);
	});
	
	
	
	//创建一个对象
	function Person(a,b,c,d,e){
		this.bh = a;
		this.xh = b;
		this.xm = c;
		this.kc = d;
		this.cj = e;
	}
	
	$('#queren').click(function(){
		//分配一个唯一的编号
		for(i = 1;;i++){
			if(localStorage.getItem('00'+i) == null){	
			break;
			}	
		}
		
		
		var json = new Person('00'+i,$('#add-layer input[type=text]:eq(0)').val(),$('#add-layer input[type=text]:eq(1)').val(),$('#add-layer input[type=text]:eq(2)').val(),$('#add-layer input[type=text]:eq(3)').val());
		
		var jsonStr = JSON.stringify(json);
		
		localStorage.setItem('00'+i,jsonStr);
		
		$('#add-layer input[type=text]:eq(0)').val("");
		$('#add-layer input[type=text]:eq(1)').val("");
		$('#add-layer input[type=text]:eq(2)').val("");
		$('#add-layer input[type=text]:eq(3)').val("");
		addLay.css('display','none');
		
		tianchong();//重新填充表格
	});
	
	
	$('#quxiao').click(function(){
		$('#add-layer input[type=text]:eq(0)').val("");
		$('#add-layer input[type=text]:eq(1)').val("");
		$('#add-layer input[type=text]:eq(2)').val("");
		$('#add-layer input[type=text]:eq(3)').val("");
		addLay.css('display','none');
	});
	
	
});
