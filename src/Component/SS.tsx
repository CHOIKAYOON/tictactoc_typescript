import React, { useState } from 'react';

interface IAProps {
    addBtn: () => void;
    minusBtn: () => void;
    sendBtn : (data : any) => void;
}

const SS = (props : IAProps) => {
    const [data ,setData] = useState('')
    return (
        <>
            <input type='text'  onChange ={ (e) =>{setData ( e.target.value); }}/>
            <button onClick={props.sendBtn.bind(null, data)}>클릭</button>
            <button onClick={() =>props.sendBtn(data)}>클릭</button>

            <button onClick={props.addBtn}>{'+'}</button>
            <button onClick={props.minusBtn}>{'-'}</button>
        </>
    )
}
export default SS
