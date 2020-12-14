import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

// class Square extends React.Component {
//     render() {
//         return(
//             //每次点击，触发handleClick，重新set sequare，并将对应位置的值返回给Squares
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {/**通过prop把父组件的值传给子组件 */}
//                 {this.props.value}
//             </button>
//         )
//     }
// }

//将Square定义为函数组件
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares:Array(9).fill(null),
    //         xIsNext: true
    //     }
    // }
    renderSquare(i) {
        return <Square value={this.props.squares[i]} key={i}
                onClick={() => this.props.onClick(i)}
        />
    }

    render() {
        var k = 0;
        var board = [];
        for(var i = 0;i < 3;i++) {
            var boardRow = [];
            for(var j = 0;j < 3;j++) {
                boardRow.push(this.renderSquare(k));
                k++;
            }
            board.push(<div className="board-row" key={i.toString()}>{boardRow}</div>)
        }
        return(
            <div>{board}</div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares:Array(10).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            fontWeightNormal: "normal",
            fontWeightBold: "bold"
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        squares[9] = i;
        this.setState({
            //concat 方法 拼接数组
            history: history.concat([{
                squares:squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    reverseOrder() {
        alert("改变顺序");
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        /**
         * const numbers = [1, 2, 3];
           const doubled = numbers.map(x => x * 2); // [2, 4, 6]
         */
        //通过map方法，把历史步骤映射为代表按钮的react元素
        const moves = history.map((step,move) => {
            let stepArray = step.squares;
            var coordinate;
            switch(stepArray[9]) {
                case 0 : coordinate = "(0,0)";break;
                case 1 : coordinate = "(0,1)";break;
                case 2 : coordinate = "(0,2)";break;
                case 3 : coordinate = "(1,0)";break;
                case 4 : coordinate = "(1,1)";break;
                case 5 : coordinate = "(1,2)";break;
                case 6 : coordinate = "(2,0)";break;
                case 7 : coordinate = "(2,1)";break;
                case 8 : coordinate = "(2,2)";break;
                default: break;
            }
            const desc = move ? 'Go to move #' + move + ",moved in" + coordinate : 'Go to game start';
            if(this.state.stepNumber === move) {
                return (
                    //条件渲染
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)} style={{fontWeight:this.state.fontWeightBold}}>{desc}</button>
                    </li>
                )
            } else {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)} style={{fontWeight:this.state.fontWeightNormal}}>{desc}</button>
                    </li>
                )
            }
        })

        let status;
        if(winner) {
            status = 'Winner:' + winner;
        } else {
            status = "Next player is " + (this.state.xIsNext ? 'X' : 'O');
        }
        return(
            <div className="game">
                <div className="game-board">
                    <div>{status}</div>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <button onClick={() => this.reverseOrder()}>改变历史记录顺序</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
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
    for(let i = 0;i < lines.length;i++) {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
)