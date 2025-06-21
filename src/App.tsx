import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 5 });
  return (
    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image key={image} id={image} />
      ))}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 h-2 bottom-0 bg-red-500"
      />
    </>
  );
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const useParalax = (value: MotionValue<number>, distance: number) => {
    return useTransform(value, [0, 1], [-distance, distance]);
  };
  const y = useParalax(scrollYProgress, 300);
  return (
    <figure className="h-screen w-sm md:w-md flex justify-center items-center snap-start relative">
      <img ref={ref} className="w-72 h-96" src={`/${id}.jpg`} />
      <motion.h2
        style={{ y }}
        className="text-5xl font-extrabold text-red-500 absolute top-1/2 right-24"
      >{`#00${id}`}</motion.h2>
    </figure>
  );
}
