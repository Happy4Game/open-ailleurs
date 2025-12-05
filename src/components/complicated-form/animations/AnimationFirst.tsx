import bgImage from '../../../assets/first_step.png';
import fillOne from '../../../assets/filling_one.png';
import fillTwo from '../../../assets/filling_two.png';
import selector from '../../../assets/selector.png';
import ball from '../../../assets/ball.png';
import { useAnimate } from 'framer-motion';
import { motion } from "framer-motion"

function AnimationFirst({question, choices, handle_choice}) {
    const [scope_ball, animate_ball] = useAnimate();
    let is_at_choice: boolean = false;
    const ball_sequence = async () => {
        if (is_at_choice) {
            if(!left_active && !right_active){
                await animate_ball([
                    [scope_ball.current, { y: 700 }, {duration: 3}],
                ])
                handle_choice(choices[0])
            }
            if(left_active){
                await animate_ball([
                    [scope_ball.current, { rotate: 45 }, {duration: .5}],
                    [scope_ball.current, { x: -120, y: 300 }, {duration: 1}],
                    [scope_ball.current, { rotate: 0 }, {duration: .5}],
                    [scope_ball.current, { y: 700, rotate: 0 }, {duration: 2}],
                ])
                handle_choice(choices[1])
            }
            if(right_active){
                await animate_ball([
                    [scope_ball.current, { rotate: -45 }, {duration: .5}],
                    [scope_ball.current, { x: 120, y: 300 }, {duration: 1}],
                    [scope_ball.current, { rotate: 0 }, {duration: .5}],
                    [scope_ball.current, { y: 700, rotate: 0 }, {duration: 2}],
                ])
                handle_choice(choices[2])
            }
        }
    }

    const [scope_left, animate_left] = useAnimate();
    const [scope_right, animate_right] = useAnimate();
    let left_active: boolean = false;
    let right_active: boolean = false;

    const left_sequence = () => {
        if (!is_at_choice) {
            left_active = !left_active;
            if (left_active)
                animate_left([
                    [scope_left.current, { rotate: 60 }]
                ])
            else
                animate_left([
                    [scope_left.current, { rotate: 0 }]
                ])
            animate_right([
                [scope_right.current, { rotate: 0 }]
            ])
            right_active = false
        }
    }

    const right_sequence = () => {
        if (!is_at_choice) {
            right_active = !right_active;
            if (right_active)
                animate_right([
                    [scope_right.current, { rotate: -60 }]
                ])
            else
                animate_right([
                    [scope_right.current, { rotate: 0 }]
                ])
            animate_left([
                [scope_left.current, { rotate: 0 }]
            ])
            left_active = false
        }
    }

    return (
        <div style={{ backgroundColor: `white` }} className="h-screen w-screen bg-center bg-no-repeat">
            <div style={{ backgroundImage: `url(${fillOne})` }} className="h-screen w-screen bg-center bg-no-repeat">
                <div style={{ backgroundImage: `url(${fillTwo})` }} className="h-screen w-screen bg-center bg-no-repeat">
                    <div style={{ backgroundImage: `url(${bgImage})` }} className="h-screen w-screen bg-center bg-no-repeat flex flex-col items-center">
                        <motion.img initial={{x: 0, y: -40}} animate={{ y: 200}} transition={{duration: 10}} onAnimationComplete={() => {is_at_choice = !is_at_choice; ball_sequence()}} src={ball} 
                        className="" ref={scope_ball}>
                        </motion.img>
                        <div className="flex justify-center w-full translate-y-60">
                            <motion.img style={{ originY: .8 }} src={selector} className="-translate-x-5" ref={scope_left} onClick={left_sequence}>
                            </motion.img>
                            <motion.img style={{ originY: .8 }} src={selector} className="translate-x-5" ref={scope_right} onClick={right_sequence}>
                            </motion.img>
                        </div>
                        <div className="flex justify-center w-full translate-y-80 text-black">
                            <div className="w-28">{choices[0].label}</div>
                            <div className="w-28">{choices[1].label}</div>
                            <div className="w-28">{choices[2].label}</div>
                        </div>
                        <div className="-translate-y-60 -translate-x-80 text-black">{question}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimationFirst
