import { beep } from './sound'
import * as apples from './apples'

const canvas: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement
const context = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

const gameHeight = 100
const gameWidth = 100
let gameSpeed = 50
const cellHeight = height / gameHeight
const cellWidth = width / gameWidth

const directions = {
    NORTH: 0,
    SOUTH: 1,
    EAST: 2,
    WEST: 3
}

let direction = directions.SOUTH

const coordinates = {
    X: 0,
    Y: 1
}

let snake = [
    [50, 50],
    [50, 51],
    [50, 52],
    [50, 53],
    [50, 54],
    [50, 55],
    [50, 56],
    [50, 57],
    [50, 58],
    [50, 59]
]

const addRandomApples = (num: number = 5) => {
    for(let i = 0; i < num; i++) {
        apples.add(Math.floor(Math.random() * gameWidth), Math.floor(Math.random() * gameHeight))
    }
}

addRandomApples()

let allApples = apples.all()

// let apples = [
//     [0, 0],
//     [
        // Math.floor(Math.random() * gameWidth),
        // Math.floor(Math.random() * gameHeight)
//     ],
//     [
//         Math.floor(Math.random() * gameWidth),
//         Math.floor(Math.random() * gameHeight)
//     ],
//     [
//         Math.floor(Math.random() * gameWidth),
//         Math.floor(Math.random() * gameHeight)
//     ],
//     [gameWidth - 1, gameHeight - 1]
// ]

// let appleIndex: any = {}

// apples.forEach(([x, y]) => {
//     appleIndex[x] = appleIndex[x] || {}
//     appleIndex[x][y] = true
// })

let paused = true
let failed = false
let last = performance.now()
let lastDiff = 0
let score = 0

const updateGameState = () => {
    const now = performance.now()
    const diff = now - last + lastDiff
    last = now

    if (diff > gameSpeed) {
        if (allApples.length == 0) {
            addRandomApples()
        }
        const snakeHead = snake[snake.length - 1]
        const nextHead = [...snakeHead]

        switch (direction) {
            case directions.NORTH:
                nextHead[coordinates.Y] = (nextHead[coordinates.Y] - 1) % gameHeight
                break
            case directions.SOUTH:
                nextHead[coordinates.Y] = (nextHead[coordinates.Y] + 1) % gameHeight
                break
            case directions.EAST:
                nextHead[coordinates.X] = (nextHead[coordinates.X] + 1) % gameWidth
                break
            case directions.WEST:
                nextHead[coordinates.X] = (nextHead[coordinates.X] - 1) % gameWidth
                break
            default:
                throw new Error('invalid direction')
        }

        if (nextHead[coordinates.X] < 0) {
            nextHead[coordinates.X] = gameWidth
        }

        if (nextHead[coordinates.Y] < 0) {
            nextHead[coordinates.Y] = gameHeight
        }

        const [ x, y ] = nextHead
        let grow = false
        if (apples.exists(x, y)) {
            apples.remove(x, y)
            beep(50, 1500, 30)
            grow = true
            gameSpeed--
            score++
        } else if (!!snake.find(p => p[coordinates.X] == x && p[coordinates.Y] == y)) {
            failed = true
            beep(90, 200, 100)
            beep(90, 200, 100)
            beep(90, 200, 100)
        }

        snake = [...snake.slice(grow ? 0 : 1, snake.length), nextHead]

        lastDiff = diff - gameSpeed

    } else {
        lastDiff = diff
    }
}

const render = () => {

    context.fillStyle = '#70806C'
    context.fillRect(0, 0, width, height)

    // render snake
    for (let i = 0; i < snake.length; i++) {
        const [x, y] = snake[i]
        context.fillStyle = '#10120F'
        context.fillRect(x * cellWidth + 1, y * cellHeight + 1, cellWidth - 2, cellHeight - 2)
    }

    // render apples
    allApples = apples.all()
    for (let i = 0; i < allApples.length; i++) {
        const [x, y] = allApples[i]
        context.beginPath()
        context.fillStyle = '#10120F'
        context.arc(x * cellWidth + cellWidth / 2, y * cellHeight + cellHeight / 2, (cellWidth) / 2 - 1 , 0, 2 * Math.PI)
        context.fill()
    }

    //render score
    context.font = '50px arcade-classic'
    const scoreText = 'Score: 000' + score
    const textSize = context.measureText(scoreText)
    context.fillText(scoreText, width - textSize.width - 10, 60)

    // render pause message
    if (paused) {
        context.font = '250px arcade-classic'
        const textSize = context.measureText('PAUSED')
        context.fillText('PAUSED', width / 2 - textSize.width / 2, height / 2)
    }

    // render pause message
    if (failed) {
        context.font = '240px arcade-classic'
        const textSize = context.measureText('YOU SUCK')
        context.fillText('YOU SUCK', width / 2 - textSize.width / 2, height / 2)
    }
}

const keys = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    ENTER: 'Enter'
}

const handleInput = (event: KeyboardEvent) => {
    switch (event.key) {
        case keys.UP:
            if (direction != directions.SOUTH) {
                direction = directions.NORTH
            }
            break
        case keys.DOWN:
            if (direction != directions.NORTH) {
                direction = directions.SOUTH
            }
            break
        case keys.LEFT:
            if (direction != directions.EAST) {
                direction = directions.WEST
            }
            break
        case keys.RIGHT:
            if (direction != directions.WEST) {
                direction = directions.EAST
            }
            break
        case keys.ENTER:
            if (paused || failed) {
                paused = false
                failed = false
                last = performance.now()
            } else {
                paused = true
            }
            beep(50, 1000, 50)
            break
        default:
            console.log('unhandled keydown:', event.key)
    }


}
window.addEventListener('keydown', handleInput)

const gameLoop = () => {
    render()
    if (!paused && !failed) {
        updateGameState()
    }
    requestAnimationFrame(gameLoop)
}


gameLoop()