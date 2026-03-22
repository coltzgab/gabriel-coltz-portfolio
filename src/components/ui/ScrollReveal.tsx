import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    animation?: 'fade-up' | 'zoom-in' | 'slide-left' | 'slide-right' | 'flip' | 'blur' | 'scale-up';
    duration?: number;
    delay?: number;
    className?: string;
    width?: "fit-content" | "100%";
    once?: boolean;
    amount?: number | "all" | "some";
}

const animations: Record<string, Variants> = {
    'fade-up': {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    'zoom-in': {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    'scale-up': {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0 },
    },
    'slide-left': {
        hidden: { opacity: 0, x: -70 },
        visible: { opacity: 1, x: 0 },
    },
    'slide-right': {
        hidden: { opacity: 0, x: 70 },
        visible: { opacity: 1, x: 0 },
    },
    'flip': {
        hidden: { opacity: 0, rotateX: 60, y: 20 },
        visible: { opacity: 1, rotateX: 0, y: 0 },
    },
    'blur': {
        hidden: { opacity: 0, filter: 'blur(15px)', y: 20 },
        visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
    }
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    animation = 'fade-up',
    duration = 0.7,
    delay = 0,
    className = "",
    width = "100%",
    once = true,
    amount = 0.15
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    const selectedAnimation = animations[animation] || animations['fade-up'];

    return (
        <div ref={ref} style={{ width, position: 'relative' }} className={className}>
            <motion.div
                variants={selectedAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration, delay, ease: [0.17, 0.55, 0.55, 1] }} // smooth modern easing
            >
                {children}
            </motion.div>
        </div>
    );
};
