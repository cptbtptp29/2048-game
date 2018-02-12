$(document).ready(function(){
	var position = [0,0,2,0,
	                0,4,2,2,
	                2,2,2,0,
	                0,2,4,2];

    Score = 0;

	newGame(position);
	//alert(position);
	//newGame(position);
	//alert(position);
	//newCell(position);

	$(document).keydown(function(event){
		var code = event.keyCode;
		//alert(code);
		var isMove = false;
		if(code == 37){
			//alert("left");
			//alert(Score);
			moveLeft(position,isMove);
		}
		else if(code == 38){
			//alert("top");
			//alert(Score);
			moveTop(position,isMove);
		}
		else if(code == 39){
			//alert("right");
			//alert(Score);
			moveRight(position,isMove);
		}
		else if(code == 40){
			//alert("bottom");
			//alert(Score);
			moveBottom(position,isMove);
		}
		//alert(position);
		setTimeout(function(){
			newCell(position);
		},210);
		//alert(position);
		//newCell(position);
	})

	$("button").click(function(event){
		if(event&&event.preventDefault){
			event.preventDefault();
		}
		else{
			window.event.returnValue = false;
            return false;
		}
		newGame(position);
	});
	//moveTop(position);
	//moveRight(position);
	//moveBottom(position);
	//isOver(position);
	//alert(position);
})

function newGame(position){ //新开始一个游戏需要初始化
	for(var i=0;i<16;i++){ //棋盘清零
		position[i] = 0;
	}
	//Score = 0;
	//alert(Score);
	getScore(0);
	$(".game").remove();
	var new_position1 = newPosition(); //初始化位置
	var new_position2 = newPosition();
	if(new_position2 == new_position1){
		newGame(position);
	}
	else{
		var new_value1 = newValue(); //初始化值
		var new_value2 = newValue();
		position[new_position1] = new_value1; //写入棋盘
		position[new_position2] = new_value2;
		newCell_animate(new_position1,new_value1);
		newCell_animate(new_position2,new_value2);
	}
}

function newCell(position){
	var is_over = isOver(position);
	if(is_over == true){
		Gameover();
	}
	else{
		var new_position = newPosition();
		var new_value = newValue();
		if(position[new_position] != 0){
			newCell(position);
		}
		else{
			position[new_position] = new_value;
			newCell_animate(new_position,new_value);
		}
	}
}

function newCell_animate(position,value){
	var i = parseInt(position/4);
	var j = position - parseInt(position/4)*4;
	var class_position = "position-" + i + "-" + j;
	var class_value = "value-" + value;
	var className = "game " + class_position + " " + class_value;
	var newcell = $('<div></div>');
	newcell.addClass(className);
	newcell.text(value);
	$(".Game").append(newcell);
}

function newPosition(){ //生成一个随机位置
	var new_position = Math.floor(Math.random()*100%16);
	return new_position;
}

function newValue(){ //随机生成一个2或4
	var new_value = (Math.floor(Math.random()*100%2)+1)*2;
	//var new_value = 2;
	return new_value;
}

function moveLeft(position,isMove){
	for(var i=0;i<16;i++){
		if(i%4 != 0){
			if(position[i] != 0 ){
				var k = i - parseInt(i/4)*4; //在这一行，某个小模块左边有几个格子
				var step = 0; //储存这个格子一共需要走几步，为动画做准备
				var isDouble = false; //判断是否加和，为动画做准备
				var value = position[i];
				for(var j=1;j<=k;j++){
					if(position[i-j] == 0 ){
						position[i-j] = position[i-j+1];
						position[i-j+1] = 0;
						step = step + 1;
					}
				}
				if(step+1 <=k){
					if(position[i-step-1] == position[i-step]){
						position[i-step-1] = position[i-step-1]*2;
						//Score = Score + position[i-step-1];
						position[i-step] = 0;
						step = step +1;
						isDouble = true;
					}
				}
				if(step != 0 ){
					isMove = true;
					moveLeftAnimate(step,i,isDouble,value,Score);
				}
			}
		}
	}
}

function moveLeftAnimate(step,position,isDouble,value){
	var i = parseInt(position/4);
	var j = position - parseInt(position/4)*4;
	var positionClass = ".position-" + i + "-" + j;
	var left_value = 9 + j*111 - step*111 + "px";

	var OldPosition = "position-" + i + "-" + j;
	var OldValue = "value-" + value;
	var New_j = j-step;
	var newPosition = "position-" + i + "-" + New_j;
	var NewValue;
	var NewText = value*2;
	var CleanPosition = ".position-" + i + "-" + New_j;
	var CleanValue = ".value-" + value;
	var Score = parseInt($(".score").find("span").text());
	Score = Score + NewText;
	if(isDouble == true){
		NewValue = "value-" + NewText;
		$(positionClass).animate({left:left_value},200,function(){
		$(CleanPosition).remove(CleanValue);
		$(positionClass).text(NewText);
		$(positionClass).removeClass(OldPosition).removeClass(OldValue).addClass(newPosition).addClass(NewValue);
		//Score  = Score + 1;
		//alert(Score);
		getScore(Score);
	});
	}
	else if(isDouble == false){
		NewValue = OldValue;
		$(positionClass).animate({left:left_value},200,function(){
		$(positionClass).removeClass(OldPosition).removeClass(OldValue).addClass(newPosition).addClass(NewValue);
	});
	}
}

function moveTop(position,isMove){
	for(var i=0;i<16;i++){
		if(i>3){
			if(position[i] != 0){
				var k = parseInt(i/4);
				var step = 0;
				var isDouble = false;
				var value = position[i];
				for(var j=1;j<=k;j++){
					if(position[i-j*4] == 0){
						position[i-j*4] = position[i-j*4+4];
						position[i-j*4+4] = 0;
						step = step +1;
					}
				}
				if(step+1 <=k){
					if(position[i-step*4-4]==position[i-step*4]){
						position[i-step*4-4] = position[i-step*4-4]*2;
						Score = Score + position[i-step*4-4];
						position[i-step*4] = 0;
						step = step +1;
						isDouble = true;
					}
				}
				if(step!=0){
					isMove = true;
					moveTopAnimate(step,i,isDouble,value);
				}
			}
		}
	}
}

function moveTopAnimate(step,position,isDouble,value){
	var i = parseInt(position/4);
	var j = position - parseInt(position/4)*4;
	var positionClass = ".position-" + i + "-" + j;
	var top_value = 9 + i*111 - step*111 + "px";
	var OldPosition = "position-" + i + "-" + j;
	var OldValue = "value-" + value;
	var New_i = i-step;
	var newPosition = "position-" + New_i + "-" + j;
	var NewValue;
	var NewText = value*2;
	var CleanPosition = ".position-" + New_i + "-" + j;
	var CleanValue = ".value-" + value;
	var Score = parseInt($(".score").find("span").text());
	Score = Score + NewText;
	if(isDouble == true){
		NewValue = "value-" + NewText;
		$(positionClass).animate({top:top_value},200,function(){
		$(CleanPosition).remove(CleanValue);
		$(positionClass).text(NewText);
		$(positionClass).removeClass(OldPosition).removeClass(OldValue).addClass(newPosition).addClass(NewValue);
		getScore(Score);
	});
	}
	else if(isDouble == false){
		NewValue = OldValue;
		$(positionClass).animate({top:top_value},200,function(){
		$(positionClass).removeClass(OldPosition).removeClass(OldValue).addClass(newPosition).addClass(NewValue);
	});
	}
}

function moveRight(position,isMove){
	for(var i =15;i>=0;i--){
		if((i+1)%4 !=0){
			if(position[i]!=0){
				var k = 3 - i +parseInt(i/4)*4;
				var step = 0;
				var isDouble = false;
				var value = position[i];
				for(var j = 1;j<=k;j++){
					if(position[i+j]==0){
						position[i+j] = position[i+j-1];
						position[i+j-1] = 0;
						step = step+1;
					}
				}
				if(step+1 <=k){
					if(position[i+step+1] == position[i+step]){
						position[i+step+1] = position[i+step+1]*2;
						Score = Score + position[i+step+1];
						position[i+step] = 0;
						step = step+1;
						isDouble = true;
					}
				}
				if(step!=0){
					isMove = true;
					moveRightAnimate(step,i,isDouble,value);
				}
			}
		}
	}
}

function moveRightAnimate(step,position,isDouble,value){
	//alert("aaa");
	var i = parseInt(position/4);
	var j = position - parseInt(position/4)*4;
	var positionClass = ".position-" + i + "-" + j;
	var left_value = 9 + j*111 + step*111 + "px";
	var OldPosition = "position-" + i + "-" + j;
	var OldValue = "value-" + value;
	var New_j = j+step;
	var newPosition = "position-" + i + "-" + New_j;
	var NewValue;
	var NewText = value*2;
	var CleanPosition = ".position-" + i + "-" + New_j;
	var CleanValue = ".value-" + value;
	var Score = parseInt($(".score").find("span").text());
	Score = Score + NewText;
	if(isDouble == true){
		NewValue = "value-" + NewText;
		$(positionClass).animate({left:left_value},200,function(){
		$(CleanPosition).remove(CleanValue);
		$(positionClass).text(NewText);
		$(positionClass).removeClass(OldPosition).removeClass(OldValue).addClass(newPosition).addClass(NewValue);
		getScore(Score);
	});
	}
	else if(isDouble == false){
		NewValue = OldValue;
		$(positionClass).animate({left:left_value},200,function(){
		$(positionClass).removeClass(OldPosition).removeClass(OldValue).addClass(newPosition).addClass(NewValue);
	});
	}
}

function moveBottom(position,isMove){
	//alert("aaa");
	for(var i=15;i>=0;i--){
		if(i<12){
			if(position[i]!=0){
				//alert(i);
				var k = parseInt((15-i)/4);
				var step = 0;
				var isDouble = false;
				var value = position[i];
				for(var j=1;j<=k;j++){
					if(position[i+j*4]==0){
						position[i+j*4] = position[i+j*4-4];
						position[i+j*4-4] = 0;
						step = step +1;
					}
				}
				if(step+1 <=k){
					if(position[i+step*4+4]==position[i+step*4]){
						position[i+step*4+4] = position[i+step*4+4]*2;
						Score = Score + position[i+step*4+4];
						//alert(Score);
						position[i+step*4] = 0;
						step = step+1;
						isDouble = true;
					}
				}
				if(step!=0){
	 				isMove = true;
	 				moveBottomStep(step,i,isDouble,value);
	 			}
			}
		}
	}
}

function moveBottomStep(step,position,isDouble,value){
	var i = parseInt(position/4);
	var j = position - parseInt(position/4)*4;
	var positionClass = ".position-" + i + "-" + j;
	var top_value = 9 + i*111 + step*111 + "px";
	var OldPosition = "position-" + i + "-" + j;
	var OldValue = "value-" + value;
	var New_i = i+step;
	var newPosition = "position-" + New_i + "-" + j;
	var NewValue;
	var NewText = value*2;
	var CleanPosition = ".position-" + New_i + "-" + j;
	var CleanValue = ".value-" + value;
	var Score = parseInt($(".score").find("span").text());
	Score = Score + NewText;
	if(isDouble == true){
		NewValue = "value-" + NewText;
		$(positionClass).animate({top:top_value},200,function(){
		$(CleanPosition).remove(CleanValue);
		$(positionClass).text(NewText);
		$(positionClass).removeClass(OldPosition).removeClass(OldValue).addClass(newPosition).addClass(NewValue);
		getScore(Score);
	});
	}
	else if(isDouble == false){
		NewValue = OldValue;
		$(positionClass).animate({top:top_value},200,function(){
		$(positionClass).removeClass(OldPosition).removeClass(OldValue).addClass(newPosition).addClass(NewValue);
	});
	}
}

function getScore(Score){
	$(".score").find("span").text(Score);
}

function isOver(position){
	var pro = 1;
	for(var i=0;i<16;i++){
		pro = pro*position[i];
	}
	if(pro == 0){
		return false;
	}
	else{
		return true;
	}
}

function Gameover(){
	alert("Gameover");
}
