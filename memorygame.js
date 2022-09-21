const section = document.querySelector('section')
const playerLivesCount =document.querySelector('span')
let playerLives = 30; //can change later

playerLivesCount.textContent = playerLives

//generate the data
//{} in [] will return the array, imgSrc==<img src= >
const getData = () => [
    {imgSrc: './images/alien.jpg', name: 'alien'},
    {imgSrc: './images/coconut.jpg', name: 'coconut'},
    {imgSrc: './images/dance.jpg', name: 'dance'},
    {imgSrc: './images/drawing.jpg', name: 'drawing'},
    {imgSrc: './images/elvis.jpg', name: 'elvis'},
    {imgSrc: './images/grumpy.jpg', name: 'grumpy'},
    {imgSrc: './images/guitar.jpg', name: 'guitar'},
    {imgSrc: './images/icecream.jpg', name: 'icecream'},
    {imgSrc: './images/irritation.jpg', name: 'irritation'},
    {imgSrc: './images/lick.jpg', name: 'lick'},
    {imgSrc: './images/ohana.jpg', name: 'ohana'},
    {imgSrc: './images/pajama.jpg', name: 'pajama'},
    {imgSrc: './images/recordplayer.jpg', name: 'recordplayer'},
    {imgSrc: './images/sunglass.jpg', name: 'sunglass'},
    {imgSrc: './images/surprise.jpg', name: 'surprise'},
    {imgSrc: './images/alien.jpg', name: 'alien'}, //another identical set of cards
    {imgSrc: './images/coconut.jpg', name: 'coconut'},
    {imgSrc: './images/dance.jpg', name: 'dance'},
    {imgSrc: './images/drawing.jpg', name: 'drawing'},
    {imgSrc: './images/elvis.jpg', name: 'elvis'},
    {imgSrc: './images/grumpy.jpg', name: 'grumpy'},
    {imgSrc: './images/guitar.jpg', name: 'guitar'},
    {imgSrc: './images/icecream.jpg', name: 'icecream'},
    {imgSrc: './images/irritation.jpg', name: 'irritation'},
    {imgSrc: './images/lick.jpg', name: 'lick'},
    {imgSrc: './images/ohana.jpg', name: 'ohana'},
    {imgSrc: './images/pajama.jpg', name: 'pajama'},
    {imgSrc: './images/recordplayer.jpg', name: 'recordplayer'},
    {imgSrc: './images/sunglass.jpg', name: 'sunglass'},
    {imgSrc: './images/surprise.jpg', name: 'surprise'}
] 

//Randomize
const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() - 0.5)
    return cardData
}

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize()
    //Generate the HTML, item = each imgSrc in the array
    cardData.forEach((item) => {
        //generate cards
        const card = document.createElement('div')
        const face = document.createElement('img')
        const back = document.createElement('div')
        card.classList = 'card'
        face.classList = 'face'
        back.classList = 'back'

        //attach img file to the cards
        face.src = item.imgSrc

        //add img name to card div
        card.setAttribute('name', item.name)

        //attach the cards to the section, attach front&back to the card
        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener('click', (e) =>{
            card.classList.toggle('toggleCard')
            checkCards(e)
        })
    })
}

//check cards
const checkCards = (e) => {
    const clickedCard = e.target //when click, capture target==cards clicked
    clickedCard.classList.add('flipped') //when clicked add 'flipped' to the card's class
    const flippedCards = document.querySelectorAll('.flipped') //save flipped cards into const flippedCards
    const toggleCard = document.querySelectorAll('.toggleCard')
    
    //compare & match
    if (flippedCards.length === 2) {
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            console.log('match')
            flippedCards.forEach((card) => {
                card.classList.remove('flipped') //matching = remove 'flipped' from the class
                card.style.pointerEvents = 'none' //make matching cards unclickable
            })
        } else {
            console.log('wrong')
            flippedCards.forEach((card) => {
                card.classList.remove('flipped') //not matching = remove 'flipped' from the class
                setTimeout(() => card.classList.remove('toggleCard'), 1000) //cancel 'toggleCard' after 1000ms when cards are not matching
            })
            playerLives-- //take 1 off for wrong
            playerLivesCount.textContent = playerLives
            if (playerLives === 0){
                restart('Try Again')
            }
        }
    }
    //check if player won, === total num of cards
    if (toggleCard.length === 30) {
        restart('You won')
    }
}

//Restart the game
const restart = (text) => {
    let cardData = randomize()
    let faces = document.querySelectorAll('.face')
    let cards = document.querySelectorAll('.card')
    section.style.pointerEvents = 'none' //unclickable until game completely resets
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard') //flip all cards back to start position
        
        //randomize after all cards are flipped back
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all' //reset pointer events from 'none' to 'all'==clickable
            faces[index].src = item.imgSrc //update image
            cards[index].setAttribute('name', item.name) //update name
            section.style.pointerEvents = 'all' //clickable again after reset
        }, 1000);
        
    })
    playerLives = 30
    playerLivesCount.textContent = playerLives //reset lives
    setTimeout(() => window.alert(text), 1000)
}



cardGenerator()