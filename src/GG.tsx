import React, { useState } from 'react';
import SS from './Component/SS';

const GG = () => {
    const [count, setCount] = useState(0);

    const sendBtn = (i) => {
        setCount( i )
    }

    function test(num){
        return 5;
    }
    return (
        <div>
            안녕안녕
            <div>
                {count}
            </div>
            <SS
                addBtn={() => setCount(count + 1)}
                minusBtn={() => setCount(count - 1)}
                // sendBtn={(i) => sendBtn(i)}
                sendBtn={(i) => setCount(i)}
            />
        </div>
    )
}

export default GG