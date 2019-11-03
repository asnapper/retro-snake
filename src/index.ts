const canvas: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement
const context = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

const gameHeight = 100
const gameWidth = 100
const gameSpeed = 50
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

let last = performance.now()
let lastDiff = 0

const updateGameState = () => {
    const now = performance.now()
    const diff = now - last + lastDiff
    last = now

    if (diff > gameSpeed) {
        const snakeHead = snake[snake.length - 1]
        const nextHead = [...snakeHead]

        switch (direction) {
            case directions.NORTH:
                nextHead[coordinates.Y] = (nextHead[coordinates.Y] - 1)  % gameHeight
                break
            case directions.SOUTH:
                nextHead[coordinates.Y] = (nextHead[coordinates.Y] + 1)  % gameHeight
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
        
        snake = [...snake.slice(1, snake.length), nextHead]

        lastDiff = diff - gameSpeed

    } else {
        lastDiff = diff
    }
}

const render = () => {


    context.fillStyle = '#70806C'
    context.fillRect(0, 0, width, height)

    // render the snake
    for (let i = 0; i < snake.length; i++) {
        const [x, y] = snake[i]
        context.fillStyle = '#10120F'
        context.fillRect(x * cellWidth + 1, y * cellHeight + 1, cellWidth - 2, cellHeight - 2)
    }
}

const keys = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight'
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
        default:
            console.log('unhandled keydown:', event.key)
    }


}
window.addEventListener('keydown', handleInput)

const gameLoop = () => {
    render()
    updateGameState()
    requestAnimationFrame(gameLoop)
}


gameLoop()