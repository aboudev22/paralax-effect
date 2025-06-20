import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import "./index.css";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="h-screen snap-start flex justify-center items-center relative">
      <div
        ref={ref}
        className="w-96 h-[400px] m-5 bg-gray-100 overflow-hidden
          sm:w-[150px] sm:h-[200px] snap-y snap-start"
      >
        <img
          src={`/${id}.jpg`}
          alt="A London skyscraper"
          className="w-full h-full object-cover"
        />
      </div>
      <motion.h2
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
        className="text-[#8df0cc] m-0 font-mono font-extrabold text-[50px] leading-tight tracking-tight
          absolute top-1/2 left-[calc(50%+120px)] -translate-y-1/2"
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  );
}

export default function Parallax() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div id="example" className="scroll-snap-y-mandatory">
      {[1, 2, 3, 4, 5].map((image) => (
        <Image key={image} id={image} />
      ))}
      <motion.div
        className="fixed left-0 right-0 bottom-[50px] h-[5px] bg-[#8df0cc] origin-left scale-x-0"
        style={{ scaleX }}
      />
    </div>
  );
}
