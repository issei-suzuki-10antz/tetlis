//所定の座標のminoを所定の配列に書き込み
function MinoBakeField(x,y,mino,rotate,array){
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if((mino.MinoRotateShape(rotate)[i][j] === 0)) 
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
            if((mino.MinoRotateShape(rotate)[i][j]!=0)){
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
    for (let i = 0; i < array.length; i++)
    {
        for (let j = 0; j < array[0].length; j++)
        {
            if(bufferField[i][j] === 0){
                $("#myTBR tr").eq(i).children("td").eq(j).css("background-color", "#000000");
            }
            else{
                $("#myTBR tr").eq(i).children("td").eq(j).css("background-color", bufferField[i][j].Color);
            }
        }

    }
}

function ArrayLineChack(array){
    var eraceLines = 0;
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
            $("#audioBomb").get(0).play();
            eraceLines += 1;
            for (let k = i; k > 0; k--)
            {
                array[k] = [...array[k-1]];
            }
        }
    }
    return eraceLines;

}


//接触処理
function isHit(x, y,mino,rotate,array)
{
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if((mino.MinoRotateShape(rotate)[i][j] === 0)) 
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

function minoViewTable(tableName,mino){
    //Tableに反映
    for (let i = 0; i < mino.MinoRotateShape(0).length; i++)
    {
        for (let j = 0; j < mino.MinoRotateShape(0)[0].length; j++)
        {
            if(mino.MinoRotateShape(0)[i][j] === 0){
                $("#" + tableName + " tr").eq(i).children("td").eq(j).css("background-color", "#000000");
            }
            else{
                $("#" + tableName + " tr").eq(i).children("td").eq(j).css("background-color", mino.Color);
            }
        }
    }
}

function minoViewNextTable(array){
    if(array.length < 7){
        console.log("array is too short");
        return;
    }
    minoViewTable("nextTBR1",array[0]);
    minoViewTable("nextTBR2",array[1]);
    minoViewTable("nextTBR3",array[2]);
    minoViewTable("nextTBR4",array[3]);
    minoViewTable("nextTBR5",array[4]);
    minoViewTable("nextTBR6",array[5]);
    minoViewTable("nextTBR7",array[6]);
}