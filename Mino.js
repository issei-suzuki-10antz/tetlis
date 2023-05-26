class Mino{
    constructor(color,array){
        this.Color = color;
        this.minoShape = array;
    }

    MinoRotateShape(rotateNumber) {
        if(rotateNumber === 0){
            return this.minoShape;
        }
        let product = [... this.minoShape];
        for(let i = 1 ; i <= rotateNumber ;i++){
            let bufferProduct = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            var r;
            var c;
            for (r = 0; r < 4; r++){
                for (c = 0; c < 4; c++){
                    bufferProduct[r][c] = product[3 - c][r];
                }
            }
            product = [... bufferProduct];
        }
      return product;
    }
}

const MinoI = new Mino('#00FFFF',[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]);
const MinoO = new Mino('#FFFF00',[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]);
const MinoS = new Mino('#7CFC00',[[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]]);
const MinoZ = new Mino('#FF0000',[[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]]);
const MinoJ = new Mino('#0000FF',[[0, 0, 1, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]);
const MinoL = new Mino('#FFA500',[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]]);
const MinoT = new Mino('#9400D3',[[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]]);