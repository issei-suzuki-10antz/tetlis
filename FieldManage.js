//所定の座標のminoを所定の配列に書き込み
function MinoBakeField(x,y,mino,rotate,array){
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if((MinoShape(mino,rotate)[i][j] === 0)) 
            {
                continue;
            }

            if ((y + i < 0)||(y + i >= array.length))
            {
                continue;
            }
            if ((x + j < 0)|| (x + j >= array[0].length))
            {
                continue;
            }
            if((MinoShape(mino,rotate)[i][j]!=0)){
                array[y + i][x + j] = mino;
            }
        }
    }
}

function displayTable (x,y, mino,rotate,array) {
    //Arrayを転写
    let bufferField = [[0]];
    for (let i = 0; i < array.length; i++)
    {
        bufferField[i] = [0]
        for (let j = 0; j < array[0].length; j++)
        {
            bufferField[i][j] = field[i][j];
        }
    }
    //現在のミノをBufferに書き込み
    MinoBakeField(x,y,mino,rotate,bufferField);
    //Tableに反映
    let table =document.getElementById('myTBR'); 
    for (let i = 0; i < array.length; i++)
    {
        for (let j = 0; j < array[0].length; j++)
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

function ArratLineChack(array){
    
    //ライン消去
    for (let i = 0; i < array.length; i++)
    {
        let isLineFilled = true;
        for (let j = 0; j < array[0].length; j++)
        {
            if (array[i][j] === 0)
            {
                isLineFilled = false;
            }
        }

        if (isLineFilled === true)
        {
            for (let k = i; k > 0; k--)
            {
                array[k] = [...array[k-1]];
            }
        }
    }
}


//接触処理
function isHit(x, y,mino,rotate,array)
{
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if((MinoShape(mino,rotate)[i][j] === 0)) 
            {
                continue;
            }

            if ((y + i < 0)||(y + i >= array.length))
            {
                return true;
            }
            if ((x + j < 0)|| (x + j >= array[0].length))
            {
                return true;
            }
            if (array[y + i][x + j] != 0)
            {
                return true;
            }
        }
    }
    return false;
}