import React, { useState } from 'react';

export default function GameChoice(props) {
    
    const [ChoiceText, setChoiceText] = useState(props.escolhas);
    //let ChoiceText = props.escolhas;
    return(
        {ChoiceText}
    )
}