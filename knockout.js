
/*Olika variabler som används i programmet. De hämtar element via ID samt skapar element.*/
let Rules = document.getElementById('main-rules');

let RollDice = document.getElementById('btn');

let RollAgain = document.createElement('button');  
RollAgain.textContent = 'ROLL AGAIN';

let SelectNumber = document.getElementById('knockoutnumber');

let CreateFirstDiceImg = document.createElement('img');

let CreateSecondDiceImg = document.createElement('img');

let Score = document.createElement('h1');
    Score.textContent = 'SCORE:';

let input = localStorage.getItem('input')


/*Första knappen på startsidan. Vid klick tar den bort regler, knockoutnummerfält, Lets play och sig själv
samt lägger till ny knapp (Roll again), lägger till bilder på tärningar och Score:. Kör Randomroll funktionen. */
RollDice.addEventListener('click', () => {

    Rules.remove();
    
    SelectNumber.remove();
    
    document.getElementById("dice").appendChild(CreateFirstDiceImg)
    document.getElementById("dice").appendChild(CreateSecondDiceImg)
    
    document.querySelector('footer').appendChild(RollAgain)

    randomroll()

    document.getElementById("counter").appendChild(Score);
    
    /*if statement som gör så att man inte kan komma vidare 
    om man inte väljer en siffra mellan 6-9 i input fältet. Då laddar sidan bara om.*/
    if(input < 6){

      alert('Choose a number between 6 and 9!');
      location.reload();

    }else if(input > 9){

      location.reload();
      alert('Choose a number between 6 and 9!');
      
    }

})



/*Funktion som lägger till ens Knockoutnummer från input fältet till variabeln inputs storage.*/
function returnNum(){

  input = document.getElementById("numselect").value;
  localStorage.setItem('input', input)
  
}



/*En array där det totala värdet av varje roll läggs till. */ 
let ScoreList = [];

/*Tre variabler som skapar html elements*/
let Retry = document.createElement('button');  
Retry.textContent = 'RETRY';

let KnockOut = document.createElement('h1');
    KnockOut.textContent = 'KNOCKOUT';

let GameOver = document.createElement('h2');
    GameOver.textContent = 'GAMEOVER';



/*Huvudfunktionen i programmet som genererar tärningskasten*/
function randomroll(){

/*Två separata tärningnar (DiceOneRoll och DiceTwoRoll) som ger ett slumpat värde mellan 1-6
  och lägger till rätt bild till respektiva värde som genereras. Numret som genereras för vardera tärning
  läggs till i bildens filnamn. Bilderna är döpta dice1.png, dice2.png etc och därmed ändras bilden när den får nytt värde.*/
  let DiceOneRoll = Math.floor(Math.random()*6) + 1;

  let FirstDiceImg = 'img/dice' + DiceOneRoll + '.png';
  
  document.querySelectorAll
    ('img')[1].setAttribute
    ('src', FirstDiceImg);

  let DiceTwoRoll = Math.floor(Math.random()*6) + 1;

  let SecondDiceImg = 'img/dice' + DiceTwoRoll + '.png';

  
  document.querySelectorAll
    ('img')[2].setAttribute
    ('src', SecondDiceImg);


  /*Räknar ihop de två tärningskasten till en total.*/
   let TotalRoll = DiceOneRoll + DiceTwoRoll;

  /*Lägger till den totala summan i Scorelist arrayen . */
  ScoreList.push(TotalRoll)
  
  /*Räknar ihop den totala summan av alla kast i ScoreList arrayen och lägger till i variabeln TotalScore*/
  let TotalScore = ScoreList.reduce((a, b) => {
    return a+b;
  });

  /*Lägger in den totala summan av Scorelist arrayen efter SCORE:*/
  Score.textContent = 'SCORE:' + TotalScore;

  /*if statement som lägger till Knockout och gameover text vid händelse att 
  summan av numret du slår är ditt knockoutnummer. 
  Samt tar bort Roll again-knapp och lägger till retry-knapp*/
  if( TotalRoll == input){

    document.getElementById("gameover").appendChild(KnockOut);

    document.getElementById("gameover").appendChild(GameOver);
    
    document.querySelector('footer').appendChild(Retry);

    RollAgain.remove()
    
  }

}
  
/*Andra knappen som bara kör funktionen Randomroll*/ 
RollAgain.addEventListener('click', () => {

  randomroll()
  
})



/*Omstartknappen som dyker upp vid händelse av knockout. Vid klick laddas sidan om. */
Retry.addEventListener('click', () => {

  location.reload();

});