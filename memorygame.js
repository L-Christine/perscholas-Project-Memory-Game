const section = document.querySelector('section')
const attemptCount = document.querySelector('span')

let attempt = 30; //can be changed
attemptCount.textContent = attempt

//card data array
const cardArray = [
    {name: 'alien', img: './images/alien.jpg'},
    {name: 'coconut', img: './images/coconut.jpg'},
    {name: 'dance', img: './images/dance.jpg'},
    {name: 'drawing', img: './images/drawing.jpg'},
    {name: 'elvis', img: './images/elvis.jpg'},
    {name: 'grumpy', img: './images/grumpy.jpg'},
    {name: 'guitar', img: './images/guitar.jpg'},
    {name: 'icecream', img: './images/icecream.jpg'},
    {name: 'irritation', img: './images/irritation.jpg'},
    {name: 'lick', img: './images/lick.jpg'},
    {name: 'ohana', img: './images/ohana.jpg'},
    {name: 'pajama', img: './images/pajama.jpg'},
    {name: 'recordplayer', img: './images/recordplayer.jpg'},
    {name: 'sunglass', img: './images/sunglass.jpg'},
    {name: 'surprise', img: './images/surprise.jpg'},
    //another identical set of cards
    {name: 'alien', img: './images/alien.jpg'},
    {name: 'coconut', img: './images/coconut.jpg'},
    {name: 'dance', img: './images/dance.jpg'},
    {name: 'drawing', img: './images/drawing.jpg'},
    {name: 'elvis', img: './images/elvis.jpg'},
    {name: 'grumpy', img: './images/grumpy.jpg'},
    {name: 'guitar', img: './images/guitar.jpg'},
    {name: 'icecream', img: './images/icecream.jpg'},
    {name: 'irritation', img: './images/irritation.jpg'},
    {name: 'lick', img: './images/lick.jpg'},
    {name: 'ohana', img: './images/ohana.jpg'},
    {name: 'pajama', img: './images/pajama.jpg'},
    {name: 'recordplayer', img: './images/recordplayer.jpg'},
    {name: 'sunglass', img: './images/sunglass.jpg'},
    {name: 'surprise', img: './images/surprise.jpg'}
] 

//====function: randomize & sort
const randSort = () => {
    cardArray.sort(() => 0.5-Math.random())
    return cardArray
}

//====function: game start & set cards on the board
const playGame = () => {
    const cardArray = randSort()
    //create element, attach class
    cardArray.forEach((item) => {
        const card = document.createElement('div')
        card.classList = 'card'

        const front = document.createElement('img')
        front.classList = 'front'
        
        const back = document.createElement('div')
        back.classList = 'back'

        //attach img file to the cards
        front.src = item.img

        //add img name to card div
        card.setAttribute('name', item.name)

        //attach the cards to the section + attach front & back to the card
        section.appendChild(card)
        card.appendChild(front)
        card.appendChild(back)

        card.addEventListener('click', (e) =>{
            card.classList.toggle('toggle')
            checkCards(e)
        })
    })
}

//====function: check if two cards are matching
const checkCards = (e) => {
    const click = e.target //click -> capture target==cards clicked
    click.classList.add('flipped') //click -> add 'flipped' to the class
    const flip = document.querySelectorAll('.flipped') //save flipped cards into const flip
    const toggle = document.querySelectorAll('.toggle')
    
    //compare & match
    if (flip.length === 2) {
        if(flip[0].getAttribute('name') === flip[1].getAttribute('name')){
            flip.forEach((card) => {
                card.classList.remove('flipped') //matching = remove 'flipped' from the class
                card.style.pointerEvents = 'none' //make flipped matching cards unclickable
            })
        } else {
            flip.forEach((card) => {
                card.classList.remove('flipped') //not matching = remove 'flipped' from the class

                setTimeout(() => card.classList.remove('toggle'), 1000) //cancel 'toggle' after # ms when cards are not matching

            })
            attempt-- //take 1 off for two wrong cards
            attemptCount.textContent = attempt
            if (attempt === 0){
                window.alert('You Lost!')
                section.style.pointerEvents = 'none'
            }
        }
    }
    //player wins if toggled cards === total num of cards
    if (toggle.length === 30) {
        window.alert('Congralutaions! You Won')
        section.style.pointerEvents = 'none'
    }
}

//====function: reset the game
const reset = (text) => {
    let cardArray = randSort() //shuffle
    let fronts = document.querySelectorAll('.front')
    let cards = document.querySelectorAll('.card')
    
    section.style.pointerEvents = 'none' //make cards unclickable until game resets

    cardArray.forEach((item, i) => {
        cards[i].classList.remove('toggle') //undo flip
        
        //random & sort again after 1000ms when game resets
        // setTimeout(() => {
            cards[i].style.pointerEvents = 'all' //make matching cards from a previous game clickable again
            fronts[i].src = item.img //update image
            cards[i].setAttribute('name', item.name) //update name
            section.style.pointerEvents = 'all' //clickable again after reset
        // }, 1000);
        
    })
    //reset # of attempt
    attempt = 30
    attemptCount.textContent = attempt
}

//====button
const resetGame = document.querySelector('#resetGame')
resetGame.addEventListener('click', reset)

//test
playGame()