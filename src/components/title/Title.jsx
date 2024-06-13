import { useScroll, useTransform, motion } from "framer-motion";

export default function Title({ children }) {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 0 + (typeof window !== 'undefined' ? window.innerHeight : 0)], [0, 350]);


  return (
    <motion.div style={{ x }} initial={{ x: 0 }}>
      {children}
    </motion.div>
  );
}