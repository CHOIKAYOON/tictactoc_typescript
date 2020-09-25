import React, { Component } from 'react';
import Board from './Component/Board';
import './App.css';

type HistoryType = { square: (string | null)[] }[];
type SquareTYpe =  { square: (string | null)[] } ;

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

    jumpTo(index: number): void {
        this.setState({
            stepNum: index,
            changeNext: (index % 2) === 0
        })
    }

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