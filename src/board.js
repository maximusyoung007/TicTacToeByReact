import React from 'react'

//将Square定义为函数组件
function Square(props) {
    if(props.isWin === -1) {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        )
    } else if(props.isWin === 1) {
        return (
            <button className="square" onClick={props.onClick} style={{background:"yellow"}}>
                {props.value}
            </button>
        )
    }
}

class Board extends React.Component {
    renderSquare(i,isWin) {
        return <Square value={this.props.squares[i]} key={i} isWin={isWin}
                onClick={() => this.props.onClick(i)}
        />
    }

    render() {
        let winner = this.props.winner;
        let squares = this.props.squares;
        let indexArrays = [],indexArray = [];
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        if(winner != null) {
            for(var l = 0;l < squares.length;l++) {
                if(winner === 'X') {
                    if(squares[l] === 'X') {
                        indexArrays.push(l);
                    }
                }
                if(winner === "O") {
                    if(squares[l] === 'O') {
                        indexArrays.push(l);
                    }
                }
            }
            for(var m = 0;m < lines.length;m++) {
                var line = lines[m];
                var n;
                for(n = 0;n < line.length;n++) {
                    if(indexArrays.indexOf(line[n]) !== -1) {
                        continue;
                    }
                }
                if(n === line.length) {
                    indexArray = line;
                }
            }
        }
        var k = 0;
        var board = [];
        for(var i = 0;i < 3;i++) {
            var boardRow = [];
            for(var j = 0;j < 3;j++) {
                if(indexArray.indexOf(k) === -1) {
                    boardRow.push(this.renderSquare(k,-1));
                } else if(indexArray.indexOf(k) !== -1) {
                    boardRow.push(this.renderSquare(k,1));
                }
                k++;
            }
            board.push(<div className="board-row" key={i.toString()}>{boardRow}</div>)
        }
        return(
            <div>{board}</div>
        );
    }
}
export default Board;