//1 and -1 of no denotes X and O
var board =document.getElementById('board');
var no=1,arr=[],x=0,o=0;
var movesPlayed=0;
function makeArray() {
    let arrtp = [];
    for(let i = 0; i < 3; i++)
        arrtp.push(new Array(3));
    return arrtp;
}
arr=makeArray();
function gameOver(){
    //Code When Someone Wins
    no==1?x++:o++;
    document.getElementById('winCount').innerHTML='X: '+x+' O: '+o;
    resetBoard();
}
function draw(){
    //Code When Game is draw
    document.write("draw");
}
function reStart(){
    document.getElementById('winCount').innerHTML='X: 0 O: 0';
    resetBoard();
}
function resetBoard(){
    movesPlayed=0;
    no=1;
    arr=makeArray();
    tagArr=document.getElementsByTagName('span');
    for (let i = 0; i < tagArr.length; i++) 
        tagArr[i].innerHTML='';
}
function checkWinner(){
    for (let i = 0; i < 3; i++) {
        let countcol=0,countrow=0;
        for (let j = 0; j < 3; j++){
            if(arr[i][j]==no)
                countrow++;
            if(arr[j][i]==no)
                countcol++
        }
        if(countrow==3 || countcol==3){
            return true;
        }
    }
    let countcrossRight=0,countcrossLeft=0;
    for (let i = 0,j=2; i < 3 && j>-1; i++,j--) {
        if(arr[i][i]==no)
            countcrossRight++;
        if(arr[i][j]==no)
            countcrossLeft++;
    }
    return (countcrossLeft==3 || countcrossRight==3)?true:false;
}
function occupy(tile){
    let ind=parseInt(tile.id);
    if(tile.innerHTML.length==0){
        if(no==1)
            tile.innerHTML='X';
        else
            tile.innerHTML='O';
        arr[Math.floor(ind/10)][ind%10]=no;
        movesPlayed++;
        if(movesPlayed>4 && checkWinner()){
            gameOver();
            return;
        }
        no=-no;
    }
    if(movesPlayed==9)
        draw();
}
function createTiles(row,col){
    let tile=document.createElement('span');
    tile.id=''+(10*row+col);
    tile.className='tiles';
    board.appendChild(tile);
    tile.addEventListener('click',()=>{occupy(tile)});
}
function fullBoard(){
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            createTiles(i,j);
}
fullBoard();