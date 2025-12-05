import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

type Vec3 = [number, number, number];

const GRID_SIZE = 20; // playable grid is -GRID_SIZE..GRID_SIZE on x and z
const TICK_MS = 120; // speed of the snake

function clamp(v: number, a: number, b: number) {
    return Math.max(a, Math.min(b, v));
}

function randomPos(exclude: Set<string>): Vec3 {
    // choose a random grid cell (y is 0.5 so cubes sit on ground)
    while (true) {
        const x = Math.floor((Math.random() * (GRID_SIZE * 2 + 1)) - GRID_SIZE);
        const z = Math.floor((Math.random() * (GRID_SIZE * 2 + 1)) - GRID_SIZE);
        const key = `${x},${z}`;
        if (!exclude.has(key)) return [x, 0.5, z];
    }
}

function keyToDir(key: string): Vec3 | null {
    switch (key) {
        case "ArrowUp":
        case "w":
        case "W":
            return [0, 0, -1];
        case "ArrowDown":
        case "s":
        case "S":
            return [0, 0, 1];
        case "ArrowLeft":
        case "a":
        case "A":
            return [-1, 0, 0];
        case "ArrowRight":
        case "d":
        case "D":
            return [1, 0, 0];
    }
    return null;
}

function posKey(p: Vec3) {
    return `${p[0]},${p[2]}`;
}

function equalPos(a: Vec3, b: Vec3) {
    return a[0] === b[0] && a[2] === b[2];
}

function GroundGrid() {
    // simple ground grid mesh
    const lines: JSX.Element[] = [];
    for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
        lines.push(
            <mesh key={`gx-${i}`} position={[i, 0.01, 0]}>
                <boxGeometry args={[0.02, 0.02, GRID_SIZE * 2 + 0.2]} />
                <meshStandardMaterial emissiveIntensity={0.1} metalness={0.1} roughness={1} />
            </mesh>
        );
        lines.push(
            <mesh key={`gz-${i}`} position={[0, 0.01, i]}>
                <boxGeometry args={[GRID_SIZE * 2 + 0.2, 0.02, 0.02]} />
                <meshStandardMaterial emissiveIntensity={0.1} metalness={0.1} roughness={1} />
            </mesh>
        );
    }
    return <group>{lines}</group>;
}

function SnakeMesh({ segments }: { segments: Vec3[] }) {
    return (
        <group>
            {segments.map((p, i) => (
                <mesh key={i} position={p}>
                    <boxGeometry args={[0.9, 0.9, 0.9]} />
                    <meshStandardMaterial color={i === 0 ? "#16a34a" : "#10b981"} />
                </mesh>
            ))}
        </group>
    );
}

function AppleMesh({ pos }: { pos: Vec3 }) {
    return (
        <mesh position={pos}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial color="#ef4444" metalness={0.2} roughness={0.6} />
        </mesh>
    );
}

export default function Snake3D(): JSX.Element {
    const [segments, setSegments] = useState<Vec3[]>([[0, 0.5, 0], [-1, 0.5, 0], [-2, 0.5, 0]]);
    const [dir, setDir] = useState<Vec3>([1, 0, 0]);
    const [apple, setApple] = useState<Vec3 | null>(null);
    const [running, setRunning] = useState(true);
    const [score, setScore] = useState(0);
    const lastTickRef = useRef<number>(Date.now());
    const dirRef = useRef<Vec3>(dir);
    const segmentsRef = useRef<Vec3[]>(segments);

    useEffect(() => {
        dirRef.current = dir;
    }, [dir]);

    useEffect(() => {
        segmentsRef.current = segments;
    }, [segments]);

    // spawn apple on start
    useEffect(() => {
        const exclude = new Set<string>(segments.map(posKey));
        setApple(randomPos(exclude));
    }, []);

    // keyboard handlers
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            const k = e.key;
            const maybe = keyToDir(k);
            if (maybe) {
                // prevent reversing onto itself
                const current = dirRef.current;
                if (!(maybe[0] === -current[0] && maybe[2] === -current[2])) {
                    setDir(maybe);
                }
            } else if (k === " ") {
                setRunning((r) => !r);
            } else if (k === "r" || k === "R") {
                restart();
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    function restart() {
        setSegments([[0, 0.5, 0], [-1, 0.5, 0], [-2, 0.5, 0]]);
        setDir([1, 0, 0]);
        setScore(0);
        const exclude = new Set<string>([[0, 0, 0].map(String).join(",")] as any);
        setApple(randomPos(new Set(segmentsRef.current.map(posKey))));
        setRunning(true);
    }

    // game loop
    useEffect(() => {
        let mounted = true;
        function tick() {
            if (!mounted) return;
            const now = Date.now();
            if (!running) {
                lastTickRef.current = now;
                return;
            }
            if (now - lastTickRef.current >= TICK_MS) {
                lastTickRef.current = now;
                setSegments((prev) => {
                    const newHead: Vec3 = [prev[0][0] + dirRef.current[0], 0.5, prev[0][2] + dirRef.current[2]];

                    // check wall collision
                    if (Math.abs(newHead[0]) > GRID_SIZE || Math.abs(newHead[2]) > GRID_SIZE) {
                        // game over
                        setRunning(false);
                        return prev;
                    }

                    // check self collision
                    for (let i = 0; i < prev.length; i++) {
                        if (equalPos(newHead, prev[i])) {
                            setRunning(false);
                            return prev;
                        }
                    }

                    const ate = apple && equalPos(newHead, apple);

                    const next = [newHead, ...prev];
                    if (!ate) next.pop();

                    if (ate) {
                        setScore((s) => s + 1);
                        // place new apple avoiding snake body
                        const exclude = new Set<string>(next.map(posKey));
                        setApple(randomPos(exclude));
                    }

                    return next;
                });
            }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        return () => {
            mounted = false;
        };
    }, [running, apple]);

    return (
        <div className="w-full h-screen bg-slate-900 text-white flex flex-col">
            <div className="p-3 flex items-center justify-between">
                <div className="text-lg font-semibold">Snake 3D (TypeScript + r3f)</div>
                <div className="flex gap-4 items-center">
                    <div>Score: <span className="font-bold">{score}</span></div>
                    <div className="text-sm opacity-80">Arrow keys / WASD — Space to pause — R to restart</div>
                </div>
            </div>

            <div className="flex-1 relative">
                <Canvas camera={{ position: [10, 18, 20], fov: 50 }}>
                    <ambientLight intensity={0.35} />
                    <directionalLight position={[10, 20, 10]} intensity={0.8} />

                    <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 4} />

                    <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
                        <planeGeometry args={[GRID_SIZE * 2 + 6, GRID_SIZE * 2 + 6]} />
                        <meshStandardMaterial color="#0f172a" metalness={0.1} roughness={0.9} />
                    </mesh>

                    <GroundGrid />

                    <SnakeMesh segments={segments} />

                    {apple && <AppleMesh pos={apple} />}

                    {/* simple floating UI using Html from drei */}
                    {!running && (
                        <Html center>
                            <div className="bg-black/70 backdrop-blur-sm border border-white/10 rounded-md p-4 text-center">
                                <div className="text-2xl font-bold">Game Over</div>
                                <div className="mt-2">Score: <span className="font-semibold">{score}</span></div>
                                <div className="mt-3 text-sm opacity-80">Press R to restart</div>
                            </div>
                        </Html>
                    )}
                </Canvas>
            </div>

            <div className="p-2 text-xs opacity-80 text-center">Built with React + TypeScript + @react-three/fiber</div>
        </div>
    );
}
