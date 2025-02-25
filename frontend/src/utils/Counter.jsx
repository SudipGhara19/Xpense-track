import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Counter = ({ value, duration = 2 }) => {
    const controls = useAnimation();
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    useEffect(() => {
        if (inView) {
            controls.start({ count: value, transition: { duration, ease: "easeOut" } });
        }
    }, [inView, controls, value, duration]);

    return (
        <motion.span
            ref={ref}
            animate={controls}
            initial={{ count: 0 }}
            onUpdate={(latest) => setCount(Math.ceil(latest.count))}
            className="animate-number"
        >
            {count}
        </motion.span>
    );
};

export default Counter;
