# SÓ RESTO NOIS

Só Resto Nóis é um jogo de aventura narrativo baseado em texto, similares aos jogos da Telltale Studios e no jogo Zork.
O jogador seleciona opções (contidas em botões na interface) para interagir com a história e influenciar seu rumo nela, que pode ter várias bifurcações e levar para diferentes experiências / finais, onde as escolhas do jogador realmente importam.
Além disso, o jogo também possuirá momentos onde o jogador deverá se atentar e ter um bom tempo de reação para executar comandos (Quicktime Events),


# Linguagens, Frameworks e Servidor

Só Resto Nóis será uma aplicação WEB sendo desenvolvida utilizando apenas HTML, CSS E JavaScript, com comunicação com um servidor em nuvem MongoDB Atlas utilizando NodeJs.
O servidor MongoDB ficará responsável pelas seguintes ações:
Salvar os dados do jogador, seus atributos, e onde ele se encontra em sua progressão no jogo (Save/Load);
Carregar estes mesmos dados e restaurar o estado do jogo (Save/Load)
Carregar e disponibilizar os textos da narração e das escolhas do jogador, de forma correta e de acordo com as solicitações recebidas.
