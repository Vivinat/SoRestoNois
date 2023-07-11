import React, { useEffect, useState } from 'react';


export default function GameText(props) {
    
    let GameText = props.texto;


    return(
        <>
            <section className="GameText">
                
                    {GameText} 
                
            </section>            
        </>
    )
}