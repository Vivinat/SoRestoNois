<p align="center" width="100%">
    <img width="55%" src="https://i.imgur.com/5WJ8EoS.png">
</p>

Só Restô Nóis é um jogo de texto baseado em escolhas, desenvolvido utilizando NodeJs,HTML,CSS, MongoDB e Docker, para a aula de Programação Web ministrada pelo professor Phyllipe Lima, na Universidade Federal de Itajubá (UNIFEI)
O jogo é fortemente inspirado (E até pode ser tratada como uma paródia) do jogo The Last of Us, por também ambientar-se em uma apocalipse zumbi e possuir personagens similares. 

# 🐱‍💻 Instalação

Para executar o jogo, é necessário uma versão de Node(16x) em seu computador e do NPM (Node Package Manager). Após se certificar de que a possui, realize o clone ou download dos arquivos da branch main. Use os seguintes comandos para iniciar a conexão com o servidor:

1. Abra o terminal/prompt de comando e use cd + rota do arquivo em seu computador. A rota deve parar na pasta express, e deve ser possível visualizar o arquivo server.js. Exemplo: "C:\Users\Particular\Documents\GitHub\SoRestoNois\express"
2. As depêndencias necessárias para executar o sistema devem ser instaladas. Para isso, use:
````
npm install
````
3. Após o download bem sucedido, ainda estando dentro da pasta pelo terminal/prompt, digite:
````
node server.js
````
4. Uma mensagem informará que o servidor está aberto e executando na porta 3000. 
5. No navegador de sua escolha, insira o seguinte endereço: http://localhost:3000/ 
6. Boa jogatina!

Lembre-se de que se fechar o terminal, a comunicação com o banco de dados estará perdida e não será possível continuar jogando. Os passos acima devem ser realizados (Com exceção do passo 2) sempre que desejar executar o jogo.

# 👾 Sobre o Jogo

Assuma o papel de um sobrevivente no apocalipse zumbi, que tem sua vida pacata(?) perturbada quando ele resgata uma garota que têm um papel decisivo em reverter o apocalipse. Mas um outro e poderoso grupo de sobreviventes, os Pirilampos, desejam ela a todo custo, e estão dispostos a derramar quanto sangue for necessário. Colocado nessa jornada, qual escolha você vai tomar?

- Dê um nome ao seu sobrevivente, que é integrado na história;
- 6 finais diferentes, desde desfechos precoces até traições absurdas;
- 14 Conquistas - Seja recompensado por suas escolhas!
- Rejogabilidade: Rejogue novamente sem precisar criar outra conta. A platina está mais fácil do que nunca!
- Manejamento de recursos: Tome cuidado com suas balas e com sua vida!
- Expansividade: Por estar centrado num banco de dados, jogue novos capítulos da história sem precisar de novos downloads!

# 🧠 As Tecnologias

Foram utilizadas as seguintes tecnologias para tornar o jogo possível:

<p align="center" width="100%">
  <kbd>
    <img width="100%" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  </kbd>
</p>

O NodeJs foi utilizado para lidar com a comunicação com o servidor MongoDB, que possui os documentos para os usuários (Com seus atributos), narrações (Com suas IDs de escolhas) e escolhas (Que apontam para a próxima narração). Desta maneira, todo o jogo fica centrado no banco de dados, possibilitando que atualizações narrativas possam ser executadas sem necessitar de novos downloads por parte do usuário. 

<p align="center" width="100%">
    <img width="55%" src="https://i.imgur.com/lXankOh.png">
</p>

<hr>

<p align="center" width="100%">
  <kbd>
    <img width="100%" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  </kbd>
</p>

A comunicação com o [MongoDB](https://www.mongodb.com/) é feito por meio do framework [Express](https://expressjs.com/pt-br/). O servidor recebe as requisições do back-end em NodeJs e as devolve em formato JSON, que por sua vez, é tratado e mostrado na tela por meio de HTML e CSS.

<p align="center" width="100%">
    <img width="55%" src="https://i.imgur.com/5a8GVsN.png">
</p>

<hr>

<p align="center" width="100%">
  <kbd>
    <img width="100%" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  </kbd>
  <kbd>
    <img width="100%" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  </kbd>
</p>

Por meio do HTML, os dados são dispostos na tela e estilizados com o CSS, dando uma atmosfera centrada na leitura e sem distrações para que o jogador possa tomar sua melhor (ou pior) decisão!


<p align="center" width="100%">
    <img width="55%" src="https://i.imgur.com/G0sZcO8.png">
</p>

<hr>


#  Autores
[Vinicius Vieira Mota](https://github.com/Vivinat)              
[João Pedro Dias Prado](https://github.com/WinterDP)                
[Matheus Rodrigues Pronunciate](https://github.com/MatheusPronunciate)              


🎮👨‍🦲 Projeto desenvolvido para a disciplina XDE03 do Professor [Phyllipe Lima](https://github.com/phillima). 
