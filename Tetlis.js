$(document).ready( function () {
    //開いた時に実行される
    Init();
    Start();
}
)
const height = 22;
const width = 10;

//各種変数
let nowRotate = 0;
let nowMino = MinoZ;
let nextMinos =  null;
let holdMino = null;

let field = [[0]];

let minoX = 3;
let minoY = 0;

//操作に関わる関数
let isHolded = false;
let isGaming = false;

// 時間処理
var timer    = 0;
var updateTime =70;

var Start = function() {
    isGaming = true;
}

$(function(){
    setInterval(function(){
        if(!isGaming) return;
        timer += 1;
        if(timer >= updateTime) {
            if (isHit(minoX, minoY + 1, nowMino,nowRotate,field)){
                MinoBakeField(minoX,minoY,nowMino,nowRotate,field);
                ArratLineChack(field);
                reloadMino();
            }
            else {
                ++minoY;
            }
        displayTable(minoX,minoY,nowMino,nowRotate,field);
        timer -= updateTime;
        }
    },10);
    
});

var Exit = function() {
    isGaming = false;
}



// キー処理
document.addEventListener('keypress',
    e => {
    if(!isGaming) return;
    //ボタン処理
    if (e.key === 'q' ) {
            if(holdMino === null && !isHolded)
            {
                console.log("hey");
                holdMino = nowMino;
                reloadMino();
                minoViewTable("holdTBR",holdMino);
                isHolded = true;
                $("#audioReload").get(0).play();
            }
            if((holdMino != null)&& !isHit(minoX, minoY - 1, nowMino,nowRotate,field)&& !isHolded)
            {
                let bufMino;
                bufMino = nowMino;
                nowMino = holdMino;
                holdMino = bufMino;
                
                minoX = 3;
                minoY = 0;
                minoViewTable("holdTBR",holdMino);
                isHolded = true;
                $("#audioReload").get(0).play();
            }
    }
    if (e.key === 'a') {
            if (!isHit(minoX - 1, minoY, nowMino,nowRotate,field))
                {
                    minoX--;
                }
    }
    if (e.key === 's') {
            if (!isHit(minoX, minoY + 1, nowMino,nowRotate,field))
                {
                    minoY++;
                }
    }
    if (e.key === 'd') {
            if (!isHit(minoX + 1, minoY, nowMino,nowRotate,field))
                {
                    minoX++;
                }
    }
    if (e.key === 'w') {
            if (!isHit(minoX, minoY, nowMino,nowRotate + 1,field))
                {
                    nowRotate++;
                    if(nowRotate > 4) nowRotate = nowRotate % 4;
                }
    }
    if (e.key === ' ' ) {
            for(let i = 0; i < height; i++){
                if (!isHit(minoX, minoY + 1, nowMino,nowRotate,field))
                {
                    minoY++;
                }
                else
                {
                    MinoBakeField(minoX,minoY,nowMino,nowRotate,field);
                    ArratLineChack(field);
                    reloadMino();
                    break;
                }
            }
    }
    displayTable(minoX,minoY,nowMino,nowRotate,field);
});

function Init() {

    //配列の延長
    for (let i = 0; i < height; i++)
    {
        field[i] = [0];
        for (let j = 0; j < width; j++)
        {
            field[i][j] = 0;
        }
    }
    //nextMino用意
    nextMinos = [MinoI,MinoJ,MinoL,MinoO,MinoS,MinoT,MinoZ]
    for(i = 6; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = nextMinos[i];
        nextMinos[i] = nextMinos[j];
        nextMinos[j] = tmp;
    }
    minoViewNextTable(nextMinos.slice(0,7));

    //最初のミノのみ代入
    nowMino = [MinoI,MinoJ,MinoL,MinoO,MinoS,MinoT,MinoZ][Math.floor( Math.random() * 6 ) + 1];
}

function reloadMino()
{
    if(nextMinos.length < 8){
        let bufArray = [0];
        bufArray = [MinoI,MinoJ,MinoL,MinoO,MinoS,MinoT,MinoZ]
        for(i = 6; i > 0; i--)
        {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = bufArray[i];
            bufArray[i] = bufArray[j];
            bufArray[j] = tmp;
        }
        nextMinos = nextMinos.concat(bufArray);
    }
    //新たなミノを補充
    if(isHit(3,0,nextMinos[0],0,field)){
        let notice =document.getElementById('notice'); 
        notice.innerText = 'GameOver!';
        Exit();
    }
    minoX = 3;
    minoY = 0;
    nowRotate = 0;
    nowMino = nextMinos[0]
    nextMinos.shift();
    minoViewNextTable(nextMinos.slice(0,7));
    isHolded = false;
}
