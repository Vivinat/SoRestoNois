export default function GameText() {
    let GameText = 'A luz escapa por uma janela quebrada. Estática, som e ruídos preenchem a atmosfera inquieta. Uma voz familiar escapa da televisão.. "Então, é algum tipo de vírus? Como o influenza?" Pergunta Ana Maria, que morreria algumas semanas depois. "Trata-se de um inimigo que erroneamente julgamos ser inofensivo..." Explica o pesquisador. Se ele ainda estava vivo nos dias atuais, pouco importava. "Um fungo. Um maldito e devastador fungo. Eu e meus colegas da UIFEI o chamamos de Mofo."'
    return(
        <>
            <section className="GameText">
                <p>
                    {GameText}
                </p>
            </section>            
        </>
    )
}