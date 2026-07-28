import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 md:py-48 px-6 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-heading text-5xl md:text-7xl text-white font-bold tracking-tighter mb-8">
            Let's Build Something Great
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
            Ready to take your business online? Get in touch and we'll create a website that works as hard as you do.
          </p>
          
          <div className="flex flex-col items-center gap-8">
            <a 
              href="mailto:bp9081012@gmail.com"
              className="group flex items-center gap-4 bg-white text-black px-10 py-6 text-lg font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300"
            >
              Contact Crex
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="mailto:bp9081012@gmail.com" 
              className="text-gray-500 hover:text-white transition-colors text-lg tracking-wide border-b border-transparent hover:border-white/30 pb-1"
            >
              bp9081012@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
