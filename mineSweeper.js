
var Mine;//用来记录每个小方块应对应的值
var markNum=8;//用来记录用户标记的数目
var mainFrame = document.getElementById('mine-game');
var markFrame = document.getElementById('markFrame');


/**
 * 布局游戏界面 size是布局大小，number是布雷数
 */
function Interface(x,y,number){
  markNum=number;
  markFrame.innerHTML=markNum;//显示剩余雷的数量
  mainFrame.innerText="";
  var mine=new Array(x);//创建二维数组
  for(var i=0;i<x;i++){
    mine[i]=new Array(y || x);
  }
  mine=randomNumber(mine,number);//随机布雷，获得的是二维数组，值为数字和雷
  Mine=mine;
  for(var i=0;i<x;i++){
    mainFrame.appendChild(createRow(i,y,mine));//一行一行地创建dom元素方格
  }
}

/**
 * randomNumber布雷与数字提示
 * 参数mine,num分别表示一个二维数组和布雷的数目 
 */
function randomNumber(mine,num) {
  var x=mine.length;
  var y=mine[0].length;
  var i=0;
  var row;
  var col;

  //完成布雷工作
  while(i<num){
    row=Math.floor((x*Math.random()));//随机选行
    col=Math.floor((y*Math.random()));//随机选列
    if(mine[row][col]!="雷"){//如果该位置没有雷，就填一个雷，循环+1
      mine[row][col]="雷";
      // console.log(mine[row][col]+row+col);
      i++;
    }
  }
  
  //完成雷数提示工作（在雷的周围填数字）
  for(var i=0;i<x;i++){
      for(var j=0;j<y;j++){//遍历每个格，在检查它周围一圈有多少雷，然后填上雷数
        var mineNum=0;
        //判断左上
        if((i-1>=0)&&(j-1>=0)){//避免越界
          if(mine[i-1][j-1]=="雷")
          mineNum++;
        }
        //判断正上
        if(i>=1){
          if(mine[i-1][j]=="雷")
          mineNum++;
        }
        //判断右上
        if((i-1>=0)&&(j<=y-2)){
          if(mine[i-1][j+1]=="雷")
          mineNum++;
        }
        //判断左边
        if(j>=1){
          if(mine[i][j-1]=="雷")
          mineNum++;
        }
        //判断右边 
        if(j<=y-2){
          if(mine[i][j+1]=="雷")
          mineNum++;
        }
        //判断左下
        if((i<=x-2)&&(j-1>=0)){
          if(mine[i+1][j-1]=="雷")
          mineNum++;
        }
        //判断正下
        if(i<=x-2){
          if(mine[i+1][j]=="雷")
          mineNum++;
        }
        //判断右下
        if((i<=x-2)&&(j<=y-2)){
          if(mine[i+1][j+1]=="雷")
          mineNum++;
        }

        if(mine[i][j]!="雷"){
        mine[i][j]=mineNum;
        }
      }
  }
  return mine;
}


/**
 * 创建行
 */
function createRow(row,len,mine){
  var tr=document.createElement("tr");
  for(var i=0;i<len;i++){
    var td=document.createElement("td");
    var font=document.createElement("font");
    font.id=row+"."+i;//给每一格绑定唯一ID，值为它的位置坐标


    font.onclick=function (){//左键 翻开当前格
      getValue(this);//检验当前格的值，是雷就炸，是数字就展现数字
      if(this.innerHTML==0){//此时innerHTML可能为0,1,2,3...当为零时，展开
        this.className='space';
        var id=this.id;
        var row=parseInt(id.split(".")[0]);
        var col=parseInt(id.split(".")[1]);
        showSpace(row,col);//则翻开周围所有的空
      }
      // this.oncontextmenu=function (){
      //   return false;
      // }
       judge();
    };


    font.oncontextmenu=function (){//右键 标记雷
      if(this.innerHTML=="*"){
        this.innerHTML="?";
                markNum++;
        markFrame.innerHTML=markNum;       
      }else if(this.innerHTML=="?"){
        this.innerHTML="";
      }else if(this.innerHTML==""){//标记
        this.innerHTML="*";
        markNum--;
        markFrame.innerHTML=markNum;
        judge();
      }
    }


    td.appendChild(font);
    tr.appendChild(td);
  }
  return tr;
}  

/**
 * 当点击的是数字或者是触动雷的时候调用下面的函数
 */
function getValue(object){
    var x = Mine.length;
    var y = Mine[0].length;
    var id=object.id;
    var row=id.split(".")[0];
    var col=id.split(".")[1];

    if(Mine[row][col] != "雷"){//如果不是雷，显示当前数字
      object.innerHTML=Mine[row][col]; 
    }else{//点中雷时
      for(var i=0;i<x;i++)
        for(var j=0;j<y;j++){//展现所有雷
          if(Mine[i][j]=="雷"){
            var marked=document.getElementById(i+"."+j);
            marked.innerHTML="雷";
          }
        }
      alert("你触雷了，游戏结束！");
      if(confirm("重新开始？")){
        window.location.reload();
      }
    }
}

/**
 * 当点击的区域为空白区域时递归调用将与该区域相连的空白区域都显示出来
 */
function showSpace(i,j){
  var x=Mine.length;
  var y=Mine[0].length;
  var btn=document.getElementById(i+"."+j);

        if (i < 0 || i >= x || j < 0 || j >= y){//越界
            return;
        }
        if (Mine[i][j]==0){ 
            btn.className='space';//通过改变样式实现打开效果；这和前面的添加class名不冲突，这主要是针对周围的空白格
            Mine[i][j] = -1;//已打开
            showSpace(i - 1, j - 1);//打开左上
            showSpace(i - 1, j);//打开正左
            showSpace(i - 1, j + 1);//打开左下
            showSpace(i + 1, j - 1);//打开右上
            showSpace(i + 1, j);//打开右正
            showSpace(i + 1, j + 1);//打开右下
            showSpace(i, j + 1);//打开正下
            showSpace(i, j - 1);//打开正上
        }else{
          btn.innerHTML=Mine[i][j];
        }

}

/**
* 判断是否所有的雷是否都是正确的找出来了
*/
function judge(){
  var x=Mine.length;
  var y=Mine[0].length;
  var allTrue=true;
    for(var i=0;i<x;i++)
        for(var j=0;j<y;j++){
          var button = document.getElementById(i+"."+j);
           
          if(Mine[i][j]=="雷" && button.innerHTML!="*"){//雷上没标记
               allTrue=false;
          }
          // else if(Mine[i][j]!="雷" && button.innerHTML!=Mine[i][j] && Mine[i][j]!="-1"){
          //   allTrue=false;
          // }
          //不知道这个判断条件是什么意思，但阻止了游戏胜利的触发
    }
    if(allTrue){
      alert("全部雷已经挖出，你胜利了!")
      if(confirm("重新开始?")){
        window.location.reload();
      }
    }
}


  /**
  * 选择难度
  */
function selectLevel(level){
  switch (level) {
    case "1" :
      Interface(8,8,6);
      break;
    case "2" :
      Interface(12,15,30);
      break;
    case "3" :
      Interface(18,25,70);
      break;
    case "customize" :

  }
}

function customize(){
  var column = parseInt(document.getElementById('col').value);
  var rower = parseInt(document.getElementById('row').value);
  var number = parseInt(document.getElementById('num').value);
  Interface(column,rower,number);
}
