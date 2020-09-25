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