# 리액트 Tic Tac Toc 게임

### 컴포넌트 구조
- Game
- Board
- Square

## TypeSciprt Interface
interface에 type를 지정해서 props에 받아서 type 선언.

## 추가 기능
1) play버튼을 클릭 했을 때, 저장된 히스토리 순서대로 보여주는 기능
2) stop버튼을 클릭 했을 때, 순서대로 진행되는 상황에서 멈춰주는 기능


## Game 컴포넌트
```
import React, { Component } from 'react';
import Board from './Component/Board';
import './App.css';

type HistoryType = { square: (string | null)[] }[];
type SquareTYpe =  { square: (string | null)[] } ;

//인터페이스 타입 선언
interface IGameState {
    changeNext: boolean;
    history: {
        square: Array<string | null>
    }[];
    stepNum: number;
    playCheck: boolean
}

export default class Game extends React.Component<{}, IGameState> { 
    state = {
        changeNext: true,
        history: [{
            square: Array(9).fill(null)
        }],
        stepNum: 0,
        playCheck: true
    }

    //우승자 함수
    winner(data: (string | null)[]): string | null {
        const liens : number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < liens.length; i++) {
            const [a, b, c] = liens[i];
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                return data[a]
            }else{

            }
        }
        return null
    }

    //버튼 클릭 함수
    handleClick(i: number) : void{
        const history : HistoryType= this.state.history.slice(0, this.state.stepNum + 1);
        const current : SquareTYpe = history[history.length - 1];
        const square : (string | null)[] = current.square.slice();
        if (this.winner(square) || square[i]) {
            return;
        }
        square[i] = this.state.changeNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                square: square
            }]),
            changeNext: !this.state.changeNext,
            stepNum: history.length
        })
    }

    //히스토리 정보 state값 변경해주는 함수
    jumpTo(index: number): void {
        this.setState({
            stepNum: index,
            changeNext: (index % 2) === 0
        })
    }

    //게임 실행하는 함수
    playClick() : void {
        const history: HistoryType = this.state.history;
        if (1 === history.length) {
            return;
        }
        let i : number = (this.state.stepNum === history.length - 1 ) ? 0 : this.state.stepNum;
        this.setState({
            playCheck: false
        })
        const playBtn : NodeJS.Timeout = setInterval(()=>{
            if (i < history.length && !this.state.playCheck) {
                this.jumpTo(i++);
                if(history.length === i){
                    this.setState({
                        playCheck: true
                    })
                }
            } else {
                clearInterval(playBtn);
            }
        }, 300)
    }

    stopBtn() : void{
        this.setState({
            playCheck: true
        })
    }

    minusBtn() : void{
        const stepNum : number = this.state.stepNum;
        let i : number = 0  ;
        if (i < stepNum) {
            this.setState({
                stepNum: stepNum - 1
            })
        }
    }

    plusBtn() : void{
        const history : HistoryType = this.state.history;
        const stepNum : number = this.state.stepNum;
        if (stepNum < history.length - 1) {
            this.setState({
                stepNum: stepNum + 1
            })
        }
    }

    render() : JSX.Element{
        const history: HistoryType= this.state.history;
        const current: SquareTYpe = history[this.state.stepNum];
        const winner : (string | null)= this.winner(current.square);
        const move : JSX.Element[] = history.map((value_, index) => {
            const desc : string  = index ? 'Go to move #' + index : 'Go to game start';
            return (
                <li key={index}>
                    <button onClick={this.jumpTo.bind(this, index)}>{desc}</button>
                </li>
            )
        })

        let status : string;
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.changeNext ? 'X' : 'O')
        }
        return (
            <div className="game-content">
                <Board
                    square={current.square}
                    onClick={this.handleClick.bind(this)}
                />
                <div className="game-info">
                    <div className="game-title">{status}</div>
                    {this.state.playCheck ? (<button onClick={this.playClick.bind(this)}>play</button>) : ((<button onClick={this.stopBtn.bind(this)}>stop</button>))}
                    <div>
                        <input type="button" className="minusBtn" value="<" onClick={this.minusBtn.bind(this)} />
                        <input type="button" className="plusBtn" value=">" onClick={this.plusBtn.bind(this)} />
                    </div>
                    <ol>{move}</ol>
                </div>
            </div>
        )
    }
}
```

### Board 컴포넌트
```
import React, { Component } from 'react';
import Square from './Square';

interface IBoardProps{
    square : (string | null)[]
    onClick :  (i : number) => void
}

export default class Board extends Component<IBoardProps> {
    renderSquarePage(i: number) {
        return (
            <Square
                value={this.props.square[i]}
                onClick={this.props.onClick.bind(this, i)}
            />
        )
    }

    render() : JSX.Element {
        return (
            <div className="board-content">
                <div className="board-row">
                    {this.renderSquarePage(0)}
                    {this.renderSquarePage(1)}
                    {this.renderSquarePage(2)}
                </div>
                <div className="board-row">
                    {this.renderSquarePage(3)}
                    {this.renderSquarePage(4)}
                    {this.renderSquarePage(5)}
                </div>
                <div className="board-row">
                    {this.renderSquarePage(6)}
                    {this.renderSquarePage(7)}
                    {this.renderSquarePage(8)}
                </div>
            </div>
        )
    }
}
```

# Square 컴포넌트
```
import React from 'react';

interface ISquareProps {
    value : string | null
    onClick : () => void
    
}

export default class Square extends React.Component<ISquareProps>{
    render() : JSX.Element{
        return (
            <div>
                <span>-</span>
                <button className="button" onClick={this.props.onClick} >
                    {this.props.value}
                </button>
            </div>        
        )
    }
}
```
