import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500 border-opacity-75"></div>
    </motion.div>
  );
}
