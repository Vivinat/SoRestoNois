import GameChoice from "./GameChoice";
export default function GameChoices() {
    let numberOfChoices = 1;
    let choices = []

    for (let index = 0; index < numberOfChoices; index++) {
        choices.push(<GameChoice/>);   
    }
    return(
        <>
            <section className="GameChoices">
                    {choices}
            </section>
            
        </>
    )
}