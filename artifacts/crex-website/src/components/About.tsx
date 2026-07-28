import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 md:py-48 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-6 mb-12">
            <h2 className="font-heading text-xl md:text-2xl text-white uppercase tracking-widest">About Crex</h2>
            <div className="h-[1px] flex-1 bg-white/20"></div>
          </div>
          
          <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white leading-tight font-medium tracking-tight">
            Crex helps businesses grow online through professional website design and development.
          </h3>
          
          <p className="mt-10 text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">
            We craft clean, modern websites tailored to your brand — built to attract customers, establish credibility, and perform beautifully on every device.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
