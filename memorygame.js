const section = document.querySelector('section')
const playerLivesCount =document.querySelector('span')
const playerLives = 5; //can change later

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
    const clickedCard = e.target //when click, capture target==card clicked
    const flippedCards = document.querySelectorAll('.flipped') //save flipped card into flippedCards variable
    clickedCard.classList.add('flipped') //add 'flipped' to the card's class when clicked
    //logic
    if (flippedCards.length === 2){
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            console.log('match')

        }
    }
}


cardGenerator()