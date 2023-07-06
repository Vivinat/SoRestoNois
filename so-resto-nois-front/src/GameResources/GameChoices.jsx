import GameChoice from "./GameChoice";
export default function GameChoices() {
    let choicesText = ['escolha 1', 'escolha 2']
    let choices = []

    choicesText.forEach(element => {
        choices.push(<GameChoice text = {element}/>); 
    });

    return(
        <>
            <section className="GameChoices">
                    {choices}
            </section>
            
        </>
    )
}