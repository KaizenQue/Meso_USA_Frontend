import React, { useState } from 'react'
import axios from 'axios';

function Practice() {
    let [inc, icrement] = useState(0)
    // let [dec, decrement] = useState(0)

    let counter = () => {
        inc = inc + 1
        icrement(inc)
        console.log(inc);
    }


    let decount = () => {
        // dec = inc
        inc = inc - 1
        icrement(inc)
        console.log(inc);

    }

    return (
        <div>
            <div>
                <button onClick={counter}>+</button> {inc}
                <button onClick={decount}>-</button>
            </div>
        </div>
    )
}

export default Practice