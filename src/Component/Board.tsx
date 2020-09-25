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