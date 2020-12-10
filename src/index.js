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
        return <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
        />
    }

    render() {
        //返回一个react元素
        return(
            <div>
                <div className="board-row">
                     {this.renderSquare(0)}
                     {this.renderSquare(1)}
                     {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares:Array(9).fill(null),
            }],
            xIsNext: true
        };
    }

    handleClick(i) {
        //创建一个square的副本
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            //concat 方法 拼接数组
            history: history.concat([{
                squares:squares
            }]),
            xIsNext: !this.state.xIsNext
        })
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        /**
         * const numbers = [1, 2, 3];
           const doubled = numbers.map(x => x * 2); // [2, 4, 6]
         */
        //通过map方法，把历史步骤映射为代表按钮的react元素
        const moves = history.map((step,move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
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