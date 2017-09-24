# simple-mineSweeper
a simple mineSweeper

key:
  ● 以一个二维数组作为逻辑雷盘，保存每个方格的逻辑状态（空，数字或是雷）
  ● 根据这个逻辑雷盘，来创建由DOM元素组成的“实体”雷盘
  ● 扩散方法：先打开自己，检测周围八个方格（不越界的情况下），再调用自己，实现递归

interface（x,y,number)
  ● 确定雷数
  ● 创建二维数组，调用randomNumber(mine,num)给每个位置赋上实际状态（空，数字，雷），然后一式两份，一份作为状态查看，一份作为参数传进createRow(row,col,mine)创建dom元素，插入文档

在createRow中，给方格左右键个绑上事件
  ● 左：调用getvalue()展开当前内容，数字（展示），空（扩散），雷（游戏结束），并judge
  ● 右：对方格进行标记，不确定，或撤销之前的行为（三个来回循环），最后judge

judge：胜利条件：所有雷上都有标记


