window.onload = function () {
    //開いた時に実行される
    Init();
    Start();
}
const height = 22;
const width = 10;

//各種変数
let nowRotate = 0;
let nowMino = Mino.Z;
let nextMino = Mino.Z;
let holdMino = Mino.Z;

let field = [[0]];
let bufferField = [[0]];

let minoX = 0;
let minoY = 0;


// 時間処理
var timer    = null;
var Start = function() {
    Init();
	if (!timer) timer = setInterval(Update, 1000);   
}

var Update = function() {
    //接地されているならFieldにミノを転写
    
	if (isHit(minoX, minoY + 1, nowMino,nowRotate))
        {
            MinoPutField();
        }
        else
        {
            ++minoY;
        }
    displayTable();
    console.log("Lord");
}


var Exit = function() {
	// setIntervalの停止
	clearInterval(timer);
	time = null;

}

function displayTable () {
    //Fieldを転写
    for (let i = 0; i < height; i++)
    {
        bufferField[i] = [0]
        for (let j = 0; j < width; j++)
        {
            bufferField[i][j] = field[i][j];
        }
    }
    //現在のミノをBufferに書き込み
    MinoBakeField(minoX,minoY,nowMino,nowRotate,bufferField);
    //Tableに反映
    let table =document.getElementById('myTBR');  
    for (let i = 0; i < height; i++)
    {
        //console.log(bufferField[i]);
        for (let j = 0; j < width; j++)
        {
            if(bufferField[i][j] === 0){
                table.rows[i].cells[j].style.backgroundColor = '#FFFFFF'
            }
            else{
            table.rows[i].cells[j].style.backgroundColor = Color(bufferField[i][j]);
            }
        }

    }
}

//所定の座標のminoを所定の配列に書き込み
function MinoBakeField(x,y,mino,rotate,array){
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if((MinoShape(mino,rotate)[i][j]!=0)&&(array[y + i][x + j] === 0)){
                array[y + i][x + j] = mino;
            }
        }
    }
}

function MinoPutField(){
    MinoBakeField(minoX,minoY,nowMino,nowRotate,field);
    //ライン消去
    for (let i = 0; i < height; i++)
    {
        let isLineFilled = true;
        for (let j = 0; j < width; j++)
        {
            if (field[i][j] === 0)
            {
                isLineFilled = false;
            }
        }

        if (isLineFilled === true)
        {
            console.log("clear");
            for (let k = i; k > 0; k--)
            {
                field[k] = [...field[k-1]];
            }
        }
    }
    reloadMino();
}

// キー処理
document.addEventListener('keypress',
    event => {
        //ボタン処理
        if (event.key === 'q' ) {
            Update();
        }
        if (event.key === 'w' ) {
            if (!isHit(minoX, minoY - 1, nowMino,nowRotate))
            {
                console.log("W");
                minoY--;
            }
        }
        if (event.key === 'a' ) {
            if (!isHit(minoX - 1, minoY, nowMino,nowRotate))
                {
                    minoX--;
                }
         }
         if (event.key === 's' ) {
            if (!isHit(minoX, minoY + 1, nowMino,nowRotate))
                {
                    minoY++;
                }
            
         }
         if (event.key === 'd' ) {
            if (!isHit(minoX + 1, minoY, nowMino,nowRotate))
                {
                    minoX++;
                }
            
         }
         if (event.key === 'c' ) {
            if (!isHit(minoX, minoY, nowMino,nowRotate +1))
                {
                    nowRotate++;
                    if(nowRotate > 4) nowRotate = nowRotate % 4;
                }
         }

         if (event.key === 'r' ) {
            for (let k = height-1; k > 0; k--)
            {
                field[k] = [...field[k-1]];
            }
         }
         displayTable();
    });

function Init() {

    //配列の延長
    for (let i = 0; i < height; i++)
    {
        field[i] = [0];
        bufferField[i] = [0];
        for (let j = 0; j < width; j++)
        {
            field[i][j] = 0;
            bufferField[i][j] = 0;
        }
    }
    //最初のミノのみ代入
    nowMino = Math.floor( Math.random() * 6 ) + 1;
    }

function reloadMino()
    {
        //新たなミノを補充
        minoX = 3;
        minoY = 0;
        nowMino = nextMino;
        nextMino = Math.floor( Math.random() * 6 ) + 1;
    }

//接触処理
function isHit(x, y,mino,rotate)
{
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if((MinoShape(mino,rotate)[i][j] === 0)) 
            {
                continue;
            }

            if ((y + i < 0)||(y + i >= height))
            {
                return true;
            }
            if ((x + j < 0)|| (x + j >= width))
            {
                return true;
            }
            if (field[y + i][x + j] != 0)
            {
                return true;
            }
        }
    }
    return false;
}