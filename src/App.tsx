import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image key={image} id={image} />
      ))}
      <motion.div
        className="fixed left-0 right-0 bottom-0 h-2 bg-red-500"
        style={{ scaleX }}
      />
    </>
  );
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="h-screen flex-none w-sm md:w-md flex justify-center snap-start items-center relative active:cursor-grabbing">
      <div ref={ref} className="w-64 h-80 bg-gray-100 overflow-hidden">
        <img
          src={`/${id}.jpg`}
          alt="A London skyscraper"
          className="object-cover"
        />
      </div>
      <motion.h2
        style={{ y }}
        className="text-red-500 font-mono font-bold text-4xl absolute top-1/2 right-20"
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  );
}
