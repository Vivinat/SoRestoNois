import GameChoice from "./GameChoice";
export default function GameChoices(props) {
    let numberOfChoices = props.quantidade;
    let choices = [props.escolhas]

    for (let index = 0; index < numberOfChoices; index++) {
        choices.push(<GameChoice escolha={props.escolhas[index]}/>);   
    }
    return(
        <>
            <section className="GameChoices">
                    {choices}
            </section>
            
        </>
    )
}