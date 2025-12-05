import bgImage from '../../../assets/second_step.png';
import fillOne from '../../../assets/filling_one.png';
import fillTwo from '../../../assets/filling_two.png';
import ball from '../../../assets/ball.png';
import plank from '../../../assets/planks.png';
import { useAnimate } from 'framer-motion';
import { motion } from "framer-motion"
import type { Choice } from '../types';

type Props = {
    question: string,
    choices: Choice[],
    handle_choice: (arg0: Choice) => void
}

function AnimationSecond({ question, choices, handle_choice } : Props) {
    document.body.style.overflow = 'hidden';

    let first_down = false;
    let first_passed = false;
    let second_down = false;
    let second_passed = false;

    const [scope_ball, animate_ball] = useAnimate();
    const ball_sequence = async () => {
        await animate_ball([
            [scope_ball.current, { x: -320, y: 300, rotate: -45 }, { duration: 1 }],
            [scope_ball.current, { x: -250, y: 350, rotate: -90 }, { duration: 1 }],
            [scope_ball.current, { x: 0, y: 350, rotate: -90 }, { duration: 2 }],
        ])
        first_passed = true
        if (!first_down) {
            await animate_ball([
                [scope_ball.current, { x: 125, y: 350, rotate: -90 }, { duration: 1 }],
                [scope_ball.current, { x: 125, y: 350, rotate: 0 }, { duration: .5 }],
                [scope_ball.current, { x: 125, y: 800, rotate: 0 }, { duration: 2 }],
            ])
            handle_choice(choices[0])
        }
        else {
            await animate_ball([
                [scope_ball.current, { x: 250, y: 350, rotate: -90 }, { duration: 2 }],
            ])
            second_passed = true
            if (!second_down) {
                await animate_ball([
                    [scope_ball.current, { x: 250, y: 350, rotate: 0 }, { duration: .5 }],
                    [scope_ball.current, { x: 250, y: 800, rotate: 0 }, { duration: 2 }],
                ])
                handle_choice(choices[1])
            }
            else {
                await animate_ball([
                    [scope_ball.current, { x: 365, y: 350, rotate: -90 }, { duration: 2 }],
                    [scope_ball.current, { x: 365, y: 350, rotate: 0 }, { duration: .5 }],
                    [scope_ball.current, { x: 365, y: 800, rotate: 0 }, { duration: 2 }],
                ])
                handle_choice(choices[2])
            }
        }

    }


    const [scope_left, animate_left] = useAnimate();
    const [scope_right, animate_right] = useAnimate();

    const sequence_left = () => {
        if (!first_passed) {
            first_down = true;
            animate_left([
                [scope_left.current, { y: 200 }, { duration: 1 }]
            ])
        }
    }

    const sequence_right = () => {
        if (!second_passed) {
            second_down = true;
            animate_right([
                [scope_right.current, { y: 200 }, { duration: 1 }]
            ])
        }
    }


    return (
        <div style={{ backgroundColor: `white` }} className="h-screen w-screen bg-center bg-no-repeat">
            <div style={{ backgroundImage: `url(${fillOne})` }} className="h-50 w-screen bg-center bg-no-repeat -translate-x-99.5">
                <div style={{ backgroundImage: `url(${fillTwo})` }} className="h-screen w-screen bg-center bg-no-repeat translate-x-162">
                    <div style={{ backgroundImage: `url(${bgImage})` }} className="h-screen w-screen bg-center bg-no-repeat flex flex-col items-center -translate-x-62.5">
                        <motion.img initial={{ x: -400, y: -80 }} animate={{ y: 200 }} transition={{ duration: 10 }} onAnimationComplete={() => ball_sequence()} src={ball}
                            className="" ref={scope_ball}>
                        </motion.img>
                        <div className="flex justify-center w-full translate-y-60">
                            <motion.img style={{ originY: .8 }} src={plank} className="translate-x-46 -translate-y-265" ref={scope_left} onClick={sequence_left}>
                            </motion.img>
                            <motion.img style={{ originY: .8 }} src={plank} className="translate-x-45 -translate-y-265" ref={scope_right} onClick={sequence_right}>
                            </motion.img>
                        </div>
                        <div className="flex justify-center w-full -translate-y-140 translate-x-60 text-black">
                            <div className="w-28">{choices[0].label}</div>
                            <div className="w-28">{choices[1].label}</div>
                            <div className="w-28">{choices[2].label}</div>
                        </div>
                        <div className="-translate-y-275 -translate-x-25 text-black">{question}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimationSecond
