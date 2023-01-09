const messageInfo = document.getElementById('messageInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerWeapon = document.getElementById('playerWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075047-5c77909c-e3b9-4fca-84c2-a7226cd562fe.png' 
const botWeapon = document.getElementById('botWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075047-5c77909c-e3b9-4fca-84c2-a7226cd562fe.png'       
const playerScorePara = document.getElementById('playerScore')
const botScorePara = document.getElementById('botScore')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorBtn = document.getElementById('scissorBtn')   
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('ROCK'))
paperBtn.addEventListener('click', () => handleClick('PAPER'))
scissorBtn.addEventListener('click', () => handleClick('SCISSORS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
    if (isGameOver()) {
      openEndgameModal()
      return
    }
  
    const computerSelection = getRandomChoice()
    playRound(playerSelection, computerSelection)
    updateChoices(playerSelection, computerSelection)
    updateScore()
  
    if (isGameOver()) {
      openEndgameModal()
      setFinalMessage()
    }
  }

function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
        case 'ROCK':
        document.getElementById('playerWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075047-5c77909c-e3b9-4fca-84c2-a7226cd562fe.png' 
        break
        case 'PAPER':
        document.getElementById('playerWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075134-19d958d0-5f54-4ef3-9247-091b60d5bf0e.png' 
        break
        case 'SCISSORS':
        document.getElementById('playerWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075186-c2ade7ce-96ad-4fb8-bfea-a072d3bf430a.png' 
        break
    }

    switch (computerSelection) {
        case 'ROCK':
        document.getElementById('botWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075047-5c77909c-e3b9-4fca-84c2-a7226cd562fe.png' 
        break
        case 'PAPER':
        document.getElementById('botWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075134-19d958d0-5f54-4ef3-9247-091b60d5bf0e.png' 
        break
        case 'SCISSORS':
        document.getElementById('botWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075186-c2ade7ce-96ad-4fb8-bfea-a072d3bf430a.png' 
        break
    }
}

    function updateScore() {
    if (roundWinner === 'tie') {
        messageInfo.textContent = "It's a tie!"
    } else if (roundWinner === 'player') {
        messageInfo.textContent = 'You won!'
    } else if (roundWinner === 'computer') {
        messageInfo.textContent = 'You lost!'
    }

    playerScorePara.textContent = `${playerScore}/5`
    botScorePara.textContent = `${botScore}/5`
    }

    function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'player') {
        scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
        )} beats ${computerSelection.toLowerCase()}`
        return
    }
    if (winner === 'computer') {
        scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
        )} is beaten by ${computerSelection.toLowerCase()}`
        return
    }

    scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
    )} ties with ${computerSelection.toLowerCase()}`
    }

    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }

    function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
    }

    function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
    }

    function setFinalMessage() {
    return playerScore > botScore
        ? (endgameMsg.textContent = 'You won!')
        : (endgameMsg.textContent = 'You lost...')
    }

    function restartGame() {
    playerScore = 0
    botScore = 0
    messageInfo.textContent = 'Choose your weapon'
    scoreMessage.textContent = 'First to score 5 points wins the game'
    playerScorePara.textContent = '0/5'
    botScorePara.textContent = '0/5'
    document.getElementById('playerWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075047-5c77909c-e3b9-4fca-84c2-a7226cd562fe.png' 
    document.getElementById('botWeapon').src = 'https://user-images.githubusercontent.com/109366020/211075047-5c77909c-e3b9-4fca-84c2-a7226cd562fe.png' 
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
    }

// GAME

let playerScore = 0
let botScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
if (playerSelection === computerSelection) {
    roundWinner = 'tie'
}
if (
    (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
    (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
    (playerSelection === 'PAPER' && computerSelection === 'ROCK')
) {
    playerScore++
    roundWinner = 'player'
}
if (
    (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
    (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
    (computerSelection === 'PAPER' && playerSelection === 'ROCK')
) {
    botScore++
    roundWinner = 'computer'
}
updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function getRandomChoice() {
let randomNumber = Math.floor(Math.random() * 3)
switch (randomNumber) {
    case 0:
    return 'ROCK'
    case 1:
    return 'PAPER'
    case 2:
    return 'SCISSORS'
}
}

function isGameOver() {
return playerScore === 5 || botScore === 5
}
