interface Points {
    [x: number]: {
        [y: number]: boolean
    }
}

const points: Points = {}

export const map = (): Points => points

export const add = (x: number, y: number): void => {
    points[x] = points[x] || {}
    points[x][y] = true
}

export const remove = (x: number, y: number): void => {
    delete points[x][y]
}

export const exists = (x: number, y: number): boolean => {
    return (x in points) && (y in points[x])
}

export const all = (): [number, number][] => {
    return Object.keys(points)
    .reduce((acc, valX) => [
        ...acc, ...Object.keys(points[valX])
            .reduce((acc, valY) => [
                ...acc, [ valX, valY]
            ], [])
    ], [])
}

