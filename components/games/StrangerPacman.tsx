"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"

interface Position {
    x: number
    y: number
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

const GRID_SIZE = 15
const DEFAULT_CELL_SIZE = 28
const MAX_BOARD_SIZE = 420

const getCellSize = () =>
    typeof window !== "undefined"
        ? Math.floor(Math.min(window.innerWidth * 0.9, MAX_BOARD_SIZE) / GRID_SIZE)
        : DEFAULT_CELL_SIZE

// Create maze: 0 = path, 1 = wall, 2 = dot, 3 = power pellet
const createInitialMaze = (): number[][] => {
    const maze = Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(2))

    for (let i = 0; i < GRID_SIZE; i++) {
        maze[0][i] = 1
        maze[GRID_SIZE - 1][i] = 1
        maze[i][0] = 1
        maze[i][GRID_SIZE - 1] = 1
    }

    const walls = [
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 10],
        [2, 11],
        [2, 12],
        [4, 6],
        [4, 7],
        [4, 8],
        [6, 2],
        [6, 3],
        [6, 4],
        [6, 10],
        [6, 11],
        [6, 12],
        [8, 6],
        [8, 7],
        [8, 8],
        [10, 2],
        [10, 3],
        [10, 4],
        [10, 10],
        [10, 11],
        [10, 12],
        [12, 6],
        [12, 7],
        [12, 8],
    ]

    walls.forEach(([y, x]) => {
        if (maze[y] && maze[y][x] !== undefined) {
            maze[y][x] = 1
        }
    })

    maze[1][1] = 3
    maze[1][GRID_SIZE - 2] = 3
    maze[GRID_SIZE - 2][1] = 3
    maze[GRID_SIZE - 2][GRID_SIZE - 2] = 3
    maze[GRID_SIZE - 2][7] = 0
    maze[1][7] = 0

    return maze
}

interface Ghost {
    position: Position
    direction: Direction
    scared: boolean
}

interface CharacterOption {
    id: string
    name: string
    emoji: string
    description: string
}

const CHARACTERS: CharacterOption[] = [
    { id: "eleven", name: "Eleven", emoji: "👧", description: "Psychic powers!" },
    { id: "mike", name: "Mike", emoji: "🧑", description: "Party leader" },
    { id: "dustin", name: "Dustin", emoji: "😁", description: "The brains" },
    { id: "lucas", name: "Lucas", emoji: "🧒", description: "The warrior" },
    { id: "will", name: "Will", emoji: "👦", description: "The survivor" },
    { id: "max", name: "Max", emoji: "👩‍🦰", description: "The zoomer" },
]
const DEMON_IMAGE = "/characters/demogorgon-ghost.png"

export const StrangerPacman = () => {
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover" | "won">("start")
    const [maze, setMaze] = useState<number[][]>(createInitialMaze)
    const [pacman, setPacman] = useState<Position>({ x: 7, y: GRID_SIZE - 2 })
    const [direction, setDirection] = useState<Direction>("UP")
    const [ghosts, setGhosts] = useState<Ghost[]>([
        { position: { x: 5, y: 1 }, direction: "DOWN", scared: false },
        { position: { x: 9, y: 1 }, direction: "DOWN", scared: false },
    ])
    const [score, setScore] = useState(0)
    const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0])
    const [highScore, setHighScore] = useState(0)
    const [cellSize, setCellSize] = useState(getCellSize)
    const gameRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => setCellSize(getCellSize())
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const resetGame = useCallback(() => {
        setMaze(createInitialMaze())
        setPacman({ x: 7, y: GRID_SIZE - 2 })
        setDirection("UP")
        setGhosts([
            { position: { x: 5, y: 1 }, direction: "DOWN", scared: false },
            { position: { x: 9, y: 1 }, direction: "DOWN", scared: false },
        ])
        setScore(0)
        setGameState("playing")
        gameRef.current?.focus()
    }, [])

    const countDots = useCallback((m: number[][]) => {
        let dots = 0
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                if (m[y][x] === 2 || m[y][x] === 3) dots++
            }
        }
        return dots
    }, [])

    const movePacman = useCallback(
        (dir: Direction) => {
            if (gameState !== "playing") return

            setPacman((prev) => {
                let newX = prev.x
                let newY = prev.y

                switch (dir) {
                    case "UP":
                        newY = prev.y - 1
                        break
                    case "DOWN":
                        newY = prev.y + 1
                        break
                    case "LEFT":
                        newX = prev.x - 1
                        break
                    case "RIGHT":
                        newX = prev.x + 1
                        break
                }

                if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) return prev
                if (maze[newY][newX] === 1) return prev

                if (maze[newY][newX] === 2) {
                    setScore((s) => s + 10)
                    setMaze((m) => {
                        const newMaze = m.map((row) => [...row])
                        newMaze[newY][newX] = 0
                        if (countDots(newMaze) === 0) setGameState("won")
                        return newMaze
                    })
                }

                if (maze[newY][newX] === 3) {
                    setScore((s) => s + 50)
                    setMaze((m) => {
                        const newMaze = m.map((row) => [...row])
                        newMaze[newY][newX] = 0
                        if (countDots(newMaze) === 0) setGameState("won")
                        return newMaze
                    })
                    setGhosts((g) => g.map((ghost) => ({ ...ghost, scared: true })))
                    setTimeout(() => {
                        setGhosts((g) => g.map((ghost) => ({ ...ghost, scared: false })))
                    }, 5000)
                }

                return { x: newX, y: newY }
            })

            setDirection(dir)
        },
        [gameState, maze, countDots]
    )

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== "playing") return
            switch (e.key) {
                case "ArrowUp":
                case "w":
                case "W":
                    e.preventDefault()
                    movePacman("UP")
                    break
                case "ArrowDown":
                case "s":
                case "S":
                    e.preventDefault()
                    movePacman("DOWN")
                    break
                case "ArrowLeft":
                case "a":
                case "A":
                    e.preventDefault()
                    movePacman("LEFT")
                    break
                case "ArrowRight":
                case "d":
                case "D":
                    e.preventDefault()
                    movePacman("RIGHT")
                    break
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [movePacman, gameState])

    useEffect(() => {
        if (gameState !== "playing") return
        const moveGhost = () => {
            setGhosts((prevGhosts) => {
                return prevGhosts.map((ghost) => {
                    const directions: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"]
                    const validMoves: { dir: Direction; pos: Position }[] = []

                    directions.forEach((dir) => {
                        let newX = ghost.position.x
                        let newY = ghost.position.y
                        switch (dir) {
                            case "UP":
                                newY--
                                break
                            case "DOWN":
                                newY++
                                break
                            case "LEFT":
                                newX--
                                break
                            case "RIGHT":
                                newX++
                                break
                        }
                        if (
                            newX >= 0 &&
                            newX < GRID_SIZE &&
                            newY >= 0 &&
                            newY < GRID_SIZE &&
                            maze[newY][newX] !== 1
                        ) {
                            validMoves.push({ dir, pos: { x: newX, y: newY } })
                        }
                    })

                    if (validMoves.length === 0) return ghost
                    let bestMove = validMoves[0]

                    if (ghost.scared) {
                        let maxDist = 0
                        validMoves.forEach((move) => {
                            const dist = Math.abs(move.pos.x - pacman.x) + Math.abs(move.pos.y - pacman.y)
                            if (dist > maxDist) {
                                maxDist = dist
                                bestMove = move
                            }
                        })
                    } else {
                        let minDist = Infinity
                        validMoves.forEach((move) => {
                            const dist = Math.abs(move.pos.x - pacman.x) + Math.abs(move.pos.y - pacman.y)
                            if (dist < minDist) {
                                minDist = dist
                                bestMove = move
                            }
                        })
                    }

                    if (Math.random() < 0.3) {
                        bestMove = validMoves[Math.floor(Math.random() * validMoves.length)]
                    }

                    return { ...ghost, position: bestMove.pos, direction: bestMove.dir }
                })
            })
        }
        const interval = setInterval(moveGhost, 400)
        return () => clearInterval(interval)
    }, [maze, pacman, gameState])

    useEffect(() => {
        if (gameState !== "playing") return
        ghosts.forEach((ghost, index) => {
            if (ghost.position.x === pacman.x && ghost.position.y === pacman.y) {
                if (ghost.scared) {
                    setScore((s) => s + 200)
                    const spawnX = index === 0 ? 5 : 9
                    setGhosts((g) =>
                        g.map((gh, i) =>
                            i === index ? { ...gh, position: { x: spawnX, y: 1 }, scared: false } : gh
                        )
                    )
                } else {
                    setGameState("gameover")
                    if (score > highScore) setHighScore(score)
                }
            }
        })
    }, [ghosts, pacman, gameState, score, highScore])

    useEffect(() => {
        if (gameState === "won" && score > highScore) setHighScore(score)
    }, [gameState, score, highScore])

    const renderCell = (cell: number, x: number, y: number) => {
        const isPacman = pacman.x === x && pacman.y === y
        const ghost = ghosts.find((g) => g.position.x === x && g.position.y === y)

        return (
            <div
                key={`${x}-${y}`}
                className="relative flex items-center justify-center transition-all duration-150"
                style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: cell === 1 ? "#1a1a2e" : "#0a0a0f",
                    border: cell === 1 ? "1px solid rgba(0, 255, 255, 0.2)" : "none",
                    boxShadow: cell === 1 ? "inset 0 0 10px rgba(0, 255, 255, 0.1)" : "none",
                }}
            >
                {cell === 2 && !isPacman && !ghost && (
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#0ff", boxShadow: "0 0 8px rgba(0, 255, 255, 0.6)" }}
                    />
                )}
                {cell === 3 && !isPacman && !ghost && (
                    <motion.div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: "#f0f", boxShadow: "0 0 15px rgba(255, 0, 255, 0.8)" }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                )}
                {isPacman && (
                    <motion.div
                        className="text-2xl z-10"
                        style={{
                            transform:
                                direction === "LEFT"
                                    ? "scaleX(-1)"
                                    : direction === "UP"
                                        ? "rotate(-90deg)"
                                        : direction === "DOWN"
                                            ? "rotate(90deg)"
                                            : "none",
                            filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))",
                        }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                    >
                        {selectedCharacter.emoji}
                    </motion.div>
                )}
                {ghost && (
                    <motion.img
                        src={DEMON_IMAGE}
                        alt="Demon"
                        className="z-10"
                        style={{
                            width: cellSize - 4,
                            height: cellSize - 4,
                            objectFit: "contain",
                            filter: ghost.scared
                                ? "drop-shadow(0 0 10px rgba(100, 200, 255, 0.8)) brightness(0.5)"
                                : "drop-shadow(0 0 10px rgba(255, 0, 255, 0.8))",
                        }}
                        animate={ghost.scared ? { scale: [1, 0.9, 1] } : {}}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                )}
            </div>
        )
    }

    const handleTouchMove = (dir: Direction) => {
        if (gameState === "playing") movePacman(dir)
    }

    return (
        <div
            ref={gameRef}
            tabIndex={0}
            className="flex flex-col items-center gap-6 p-4 outline-none w-full overflow-x-hidden"
        >
            {gameState === "start" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md mx-auto"
                >
                    <h3
                        className="text-2xl font-bold mb-6"
                        style={{
                            color: "#0ff",
                            fontFamily: "'Orbitron', monospace",
                            textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                        }}
                    >
                        Choose Your Character
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        {CHARACTERS.map((char) => (
                            <motion.button
                                key={char.id}
                                onClick={() => setSelectedCharacter(char)}
                                className="p-4 rounded-xl flex flex-col items-center gap-2 transition-all"
                                style={{
                                    background:
                                        selectedCharacter.id === char.id
                                            ? "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.2))"
                                            : "rgba(17, 17, 24, 0.8)",
                                    border:
                                        selectedCharacter.id === char.id
                                            ? "2px solid rgba(0, 255, 255, 0.8)"
                                            : "1px solid rgba(0, 255, 255, 0.2)",
                                    boxShadow:
                                        selectedCharacter.id === char.id
                                            ? "0 0 20px rgba(0, 255, 255, 0.4)"
                                            : "none",
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-3xl">{char.emoji}</span>
                                <span
                                    className="text-sm font-semibold text-white"
                                    style={{ fontFamily: "'Orbitron', monospace" }}
                                >
                  {char.name}
                </span>
                                <span className="text-xs text-gray-400">{char.description}</span>
                            </motion.button>
                        ))}
                    </div>
                    <motion.button
                        onClick={resetGame}
                        className="stranger-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        START GAME
                    </motion.button>
                    <p className="mt-4 text-sm text-gray-500">Use Arrow Keys or WASD to move</p>
                </motion.div>
            )}

            {(gameState === "playing" || gameState === "gameover" || gameState === "won") && (
                <>
                    <div className="flex justify-between w-full max-w-md px-4">
                        <div
                            className="text-lg font-bold"
                            style={{
                                color: "#0ff",
                                fontFamily: "'Orbitron', monospace",
                                textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                            }}
                        >
                            Score: {score}
                        </div>
                        <div className="text-lg font-bold text-gray-500" style={{ fontFamily: "'Orbitron', monospace" }}>
                            High: {highScore}
                        </div>
                    </div>

                    <div className="flex justify-center w-full overflow-x-hidden">
                        <div
                            className="relative rounded-xl overflow-hidden"
                            style={{
                                width: GRID_SIZE * cellSize,
                                border: "3px solid rgba(0, 255, 255, 0.4)",
                                boxShadow:
                                    "0 0 40px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(5, 5, 8, 0.8)",
                            }}
                        >
                            <div
                                className="grid"
                                style={{
                                    gridTemplateColumns: `repeat(${GRID_SIZE}, ${cellSize}px)`,
                                    gridTemplateRows: `repeat(${GRID_SIZE}, ${cellSize}px)`
                                }}
                            >
                                {maze.map((row, y) => row.map((cell, x) => renderCell(cell, x, y)))}
                            </div>

                            {(gameState === "gameover" || gameState === "won") && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                    style={{ backgroundColor: "rgba(10, 10, 15, 0.9)", backdropFilter: "blur(4px)" }}
                                >
                                    <motion.h2
                                        initial={{ scale: 0.5 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl font-bold mb-4"
                                        style={{
                                            fontFamily: "'Orbitron', monospace",
                                            color: gameState === "won" ? "#0f0" : "#f00",
                                            textShadow:
                                                gameState === "won"
                                                    ? "0 0 30px rgba(0, 255, 0, 0.8)"
                                                    : "0 0 30px rgba(255, 0, 0, 0.8)",
                                        }}
                                    >
                                        {gameState === "won" ? "YOU WON!" : "GAME OVER"}
                                    </motion.h2>
                                    <p className="text-xl mb-6 text-white">Final Score: {score}</p>
                                    <motion.button
                                        onClick={resetGame}
                                        className="stranger-button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Play Again
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Mobile controls - improved layout */}
                    <div className="md:hidden flex flex-col items-center gap-1 mt-2">
                        <motion.button
                            onTouchStart={(e) => {
                                e.preventDefault()
                                handleTouchMove("UP")
                            }}
                            onClick={() => handleTouchMove("UP")}
                            className="w-16 h-12 rounded-xl flex items-center justify-center text-2xl bg-primary/20 border border-primary/40 active:bg-primary/40"
                            whileTap={{ scale: 0.9 }}
                        >
                            ⬆️
                        </motion.button>
                        <div className="flex gap-1">
                            <motion.button
                                onTouchStart={(e) => {
                                    e.preventDefault()
                                    handleTouchMove("LEFT")
                                }}
                                onClick={() => handleTouchMove("LEFT")}
                                className="w-16 h-12 rounded-xl flex items-center justify-center text-2xl bg-primary/20 border border-primary/40 active:bg-primary/40"
                                whileTap={{ scale: 0.9 }}
                            >
                                ⬅️
                            </motion.button>
                            <motion.button
                                onTouchStart={(e) => {
                                    e.preventDefault()
                                    handleTouchMove("DOWN")
                                }}
                                onClick={() => handleTouchMove("DOWN")}
                                className="w-16 h-12 rounded-xl flex items-center justify-center text-2xl bg-primary/20 border border-primary/40 active:bg-primary/40"
                                whileTap={{ scale: 0.9 }}
                            >
                                ⬇️
                            </motion.button>
                            <motion.button
                                onTouchStart={(e) => {
                                    e.preventDefault()
                                    handleTouchMove("RIGHT")
                                }}
                                onClick={() => handleTouchMove("RIGHT")}
                                className="w-16 h-12 rounded-xl flex items-center justify-center text-2xl bg-primary/20 border border-primary/40 active:bg-primary/40"
                                whileTap={{ scale: 0.9 }}
                            >
                                ➡️
                            </motion.button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Swipe on game or tap buttons</p>
                    </div>
                </>
            )}
        </div>
    )
}
