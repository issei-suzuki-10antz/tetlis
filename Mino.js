var Mino = {
    I : 1,//#00FFFF
    O : 2,//#FFFF00
    S : 3,//#7CFC00
    Z : 4,//#FF0000
    J : 5,//#0000FF
    L : 6,//#FFA500
    T : 7 //#9400D3
};

function Color(mino){
    switch (mino) {
        case Mino.I:
            return '#00FFFF';
        case Mino.O:
            return '#FFFF00';
        case Mino.S:
            return '#7CFC00';
        case Mino.Z:
            return '#FF0000';
        case Mino.J:
            return '#0000FF';
        case Mino.L:
            return '#FFA500';
        case Mino.T:
            return '#9400D3';
        default:
            return '#000000';
      }
}


function MinoShape(mino,rotateNumber){ 
    let minoShape = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    switch (mino) {
        case Mino.I:
            minoShape = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
            break;
        case Mino.O:
            minoShape = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            break;
        case Mino.S:
            minoShape = [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
            break;
        case Mino.Z:
            minoShape = [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            break;
        case Mino.J:
            minoShape = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            break;
        case Mino.L:
            minoShape = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            break;
        case Mino.T:
            minoShape = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
            break;
        default:
          console.log("undefined shape");
          return;
      }
      if(rotateNumber === 0){
        return minoShape;
      }
      
      let product = [... minoShape];
      for(let i = 1 ; i <= rotateNumber ;i++){
        let bufferProduct = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (r = 0; r < 4; r++)
        {
            for (c = 0; c < 4; c++)
            {
                bufferProduct[r][c] = product[3 - c][r];
            }
        }
        product = [... bufferProduct];
      }
      return product;

}