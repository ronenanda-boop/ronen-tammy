"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent
} from "react";
import clsx from "classnames";

const GRID_SIZE = 20;
const INITIAL_SPEED = 160;
const MIN_SPEED = 70;
const SPEED_STEP = 6;
const SCORE_INCREMENT = 10;

interface Point {
  x: number;
  y: number;
}

type GameStatus = "ready" | "running" | "paused" | "over";

const INITIAL_DIRECTION: Point = { x: 1, y: 0 };

function createInitialSnake(): Point[] {
  const startX = Math.floor(GRID_SIZE / 2);
  const startY = Math.floor(GRID_SIZE / 2);
  return [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY }
  ];
}

function generateFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (snake.some((segment) => segment.x === food.x && segment.y === food.y));
  return food;
}

function isOppositeDirection(a: Point, b: Point) {
  return a.x + b.x === 0 && a.y + b.y === 0;
}

const directionMap: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 }
};

function normaliseKey(key: string) {
  if (key.startsWith("Arrow")) {
    return key;
  }
  return key.toLowerCase();
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(() => createInitialSnake());
  const [food, setFood] = useState<Point>(() => generateFood(createInitialSnake()));
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const directionRef = useRef<Point>(direction);
  const [status, setStatus] = useState<GameStatus>("ready");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("snakeHighScore");
    if (stored) {
      const parsed = Number.parseInt(stored, 10);
      if (!Number.isNaN(parsed)) {
        setHighScore(parsed);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("snakeHighScore", highScore.toString());
  }, [highScore]);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    const interval = window.setInterval(() => {
      setSnake((currentSnake) => {
        const currentDirection = directionRef.current;
        const newHead = {
          x: currentSnake[0].x + currentDirection.x,
          y: currentSnake[0].y + currentDirection.y
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setStatus("over");
          return currentSnake;
        }

        const willEat = newHead.x === food.x && newHead.y === food.y;
        const bodyToCheck = willEat ? currentSnake : currentSnake.slice(0, -1);

        if (bodyToCheck.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setStatus("over");
          return currentSnake;
        }

        const nextSnake = [newHead, ...currentSnake];

        if (willEat) {
          setFood(generateFood(nextSnake));
          setScore((prev) => {
            const nextScore = prev + SCORE_INCREMENT;
            setHighScore((prevHigh) => (nextScore > prevHigh ? nextScore : prevHigh));
            return nextScore;
          });
          setSpeed((prev) => Math.max(MIN_SPEED, prev - SPEED_STEP));
          return nextSnake;
        }

        nextSnake.pop();
        return nextSnake;
      });
    }, speed);

    return () => {
      window.clearInterval(interval);
    };
  }, [status, speed, food]);

  useEffect(() => {
    if (status === "over") {
      setHighScore((prev) => (score > prev ? score : prev));
    }
  }, [status, score]);

  const startNewGame = useCallback(
    (directionOverride?: Point) => {
      const initialSnake = createInitialSnake();
      const desiredDirection =
        directionOverride && !isOppositeDirection(directionOverride, INITIAL_DIRECTION)
          ? directionOverride
          : INITIAL_DIRECTION;
      setSnake(initialSnake);
      setFood(generateFood(initialSnake));
      setScore(0);
      setSpeed(INITIAL_SPEED);
      setDirection(desiredDirection);
      directionRef.current = desiredDirection;
      setStatus("running");
      requestAnimationFrame(() => {
        boardRef.current?.focus();
      });
    },
    []
  );

  const startWithCurrentDirection = useCallback(() => {
    const current = directionRef.current;
    startNewGame(isOppositeDirection(current, INITIAL_DIRECTION) ? undefined : current);
  }, [startNewGame]);

  const level = Math.floor(score / (SCORE_INCREMENT * 5)) + 1;
  const statusLabel: Record<GameStatus, string> = {
    ready: "בהמתנה",
    running: "במשחק",
    paused: "מושהה",
    over: "נגמר"
  };

  const handleDirectionChange = useCallback(
    (vector: Point) => {
      if (status === "ready" || status === "over") {
        startNewGame(vector);
        return;
      }

      const currentDirection = directionRef.current;
      if (isOppositeDirection(vector, currentDirection)) {
        return;
      }

      directionRef.current = vector;
      setDirection(vector);

      if (status === "paused") {
        setStatus("running");
      }
    },
    [startNewGame, status]
  );

  const togglePause = useCallback(() => {
    setStatus((prev) => {
      if (prev === "running") return "paused";
      if (prev === "paused") return "running";
      return prev;
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const normalised = normaliseKey(event.key);
      const directionCandidate = directionMap[normalised];

      if (directionCandidate) {
        event.preventDefault();
        handleDirectionChange(directionCandidate);
        return;
      }

      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        if (status === "ready" || status === "over") {
          startNewGame();
        } else {
          togglePause();
        }
        return;
      }

      if (normalised === "p" || normalised === "escape") {
        event.preventDefault();
        togglePause();
      }
    },
    [handleDirectionChange, startNewGame, status, togglePause]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touchStart = touchStartRef.current;
      if (!touchStart) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      touchStartRef.current = null;

      if (Math.abs(deltaX) < 24 && Math.abs(deltaY) < 24) {
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        handleDirectionChange(deltaX > 0 ? directionMap.ArrowRight : directionMap.ArrowLeft);
      } else {
        handleDirectionChange(deltaY > 0 ? directionMap.ArrowDown : directionMap.ArrowUp);
      }
    },
    [handleDirectionChange]
  );

  const cells = useMemo(() => {
    const snakeLookup = new Map<string, number>();
    snake.forEach((segment, index) => {
      snakeLookup.set(`${segment.x}-${segment.y}`, index);
    });

    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      const key = `${x}-${y}`;
      const snakeIndex = snakeLookup.get(key);
      const isHead = snakeIndex === 0;
      const isBody = typeof snakeIndex === "number" && snakeIndex > 0;
      const isFood = food.x === x && food.y === y;
      const isEven = (x + y) % 2 === 0;

      return { key, isHead, isBody, isFood, isEven };
    });
  }, [snake, food]);

  const overlayContent = useMemo(() => {
    if (status === "running") return null;

    const base = {
      ready: {
        title: "מוכנים להתחיל?",
        description: "אכלו את אור הפיקסלים, התחמקו מהזנב והמשיכו לנוע.",
        primary: "התחל משחק"
      },
      paused: {
        title: "המשחק בהפסקה",
        description: "לחצו על המשך או מקש הרווח כדי לחזור לפעולה.",
        primary: "המשך"
      },
      over: {
        title: "נגמר!",
        description: `צברתם ${score} נקודות. מוכנים לסיבוב נוסף?`,
        primary: "שחקו שוב"
      }
    } as const;

    return base[status];
  }, [score, status]);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">ניקוד</p>
            <p className="text-3xl font-semibold text-foreground">{score}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">שיא</p>
            <p className="text-3xl font-semibold text-foreground">{highScore}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">רמה</p>
            <p className="text-3xl font-semibold text-foreground">{level}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">מצב</p>
            <p className="text-base font-semibold text-foreground">{statusLabel[status]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => startNewGame()}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {status === "ready" ? "התחל משחק" : status === "over" ? "שחקו שוב" : "אתחול"}
          </button>
          <button
            type="button"
            onClick={togglePause}
            disabled={status === "ready" || status === "over"}
            className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-5 py-2 text-sm font-semibold text-foreground transition hover:border-accent/60 hover:text-accent disabled:cursor-not-allowed disabled:border-foreground/10 disabled:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {status === "paused" ? "המשך" : "השהה"}
          </button>
        </div>
      </div>

      <div
        ref={boardRef}
        role="application"
        tabIndex={0}
        aria-label="משחק סנייק"
        className="relative mx-auto aspect-square w-full max-w-3xl overflow-hidden rounded-[2rem] border border-foreground/10 bg-background shadow-xl focus:outline-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
          }}
        >
          {cells.map((cell) => (
            <div
              key={cell.key}
              className={clsx(
                "relative flex items-center justify-center border border-foreground/5 transition-colors duration-150",
                cell.isEven ? "bg-foreground/[0.03]" : "bg-foreground/[0.05]",
                (cell.isHead || cell.isBody) && "border-foreground/0",
                cell.isHead && "bg-accent text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
                cell.isBody && "bg-accent/80",
                cell.isFood && !cell.isHead && !cell.isBody && "bg-emerald-500/90"
              )}
            >
              {cell.isHead && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/80" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-white/80" aria-hidden="true" />
                  </div>
                </div>
              )}
              {cell.isFood && !cell.isHead && !cell.isBody && (
                <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_12px_rgba(16,185,129,0.8)]" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {overlayContent && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/80 p-6 text-center backdrop-blur">
            <h2 className="text-2xl font-semibold text-foreground">{overlayContent.title}</h2>
            <p className="max-w-sm text-sm text-foreground/70">{overlayContent.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={() => {
                  if (status === "paused") {
                    setStatus("running");
                  } else {
                    startNewGame();
                  }
                }}
              >
                {overlayContent.primary}
              </button>
              {(status === "over" || status === "ready") && (
                <button
                  type="button"
                  className="rounded-full border border-foreground/20 px-5 py-2 text-sm font-semibold text-foreground transition hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  onClick={startWithCurrentDirection}
                >
                  התחילו עם הכיוון הנוכחי
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-3 text-center sm:hidden">
        <div />
        <button
          type="button"
          onClick={() => handleDirectionChange(directionMap.ArrowUp)}
          className="rounded-full border border-foreground/20 bg-background/80 px-4 py-3 text-lg font-semibold text-foreground shadow-sm transition active:scale-95"
        >
          ↑
        </button>
        <div />
        <button
          type="button"
          onClick={() => handleDirectionChange(directionMap.ArrowLeft)}
          className="rounded-full border border-foreground/20 bg-background/80 px-4 py-3 text-lg font-semibold text-foreground shadow-sm transition active:scale-95"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => handleDirectionChange(directionMap.ArrowDown)}
          className="rounded-full border border-foreground/20 bg-background/80 px-4 py-3 text-lg font-semibold text-foreground shadow-sm transition active:scale-95"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={() => handleDirectionChange(directionMap.ArrowRight)}
          className="rounded-full border border-foreground/20 bg-background/80 px-4 py-3 text-lg font-semibold text-foreground shadow-sm transition active:scale-95"
        >
          →
        </button>
      </div>

      <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-5 text-sm leading-relaxed text-foreground/70">
        <h3 className="mb-2 text-base font-semibold text-foreground">טיפים לניקוד גבוה</h3>
        <ul className="space-y-2 pr-5">
          <li className="list-disc">החזיקו כיוון פתוח ולא להיתקע בזנב.</li>
          <li className="list-disc">כל נגיסה מאיצה את הקצב – חפשו מסלולים רחבים.</li>
          <li className="list-disc">פאוזה זמינה עם מקש הרווח או הכפתור למעלה.</li>
        </ul>
      </div>
    </div>
  );
}
