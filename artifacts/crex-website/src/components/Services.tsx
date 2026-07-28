import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="services" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col items-center mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white/50 text-sm font-mono uppercase tracking-widest mb-4 block">What we do</span>
          <h2 className="font-heading text-4xl md:text-6xl text-white font-bold tracking-tighter">Our Services</h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Basic Card */}
          <motion.div 
            variants={itemVariants}
            className="group border border-white/10 p-10 md:p-14 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500 relative overflow-hidden"
          >
            {/* Subtle top border glow on hover */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            
            <h3 className="font-heading text-3xl text-white font-semibold mb-4">Basic</h3>
            <p className="text-gray-400 mb-8 h-12">Simple, clean website for small businesses or personal brands. Good for getting started online.</p>
            
            <ul className="space-y-4 mb-12">
              {[
                "Clean single-page layout",
                "Mobile responsive",
                "Contact form integration",
                "1 week delivery"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-300">
                  <Check className="w-5 h-5 text-white/50 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => {
                const el = document.querySelector("#contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full border border-white/20 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Inquire
            </button>
          </motion.div>

          {/* Standard Card */}
          <motion.div 
            variants={itemVariants}
            className="group border border-white/20 p-10 md:p-14 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden"
          >
            {/* Subtle top border glow on hover */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            
            <div className="absolute top-10 right-10 flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-widest font-mono bg-white text-black px-3 py-1 font-bold">Popular</span>
            </div>

            <h3 className="font-heading text-3xl text-white font-semibold mb-4">Standard</h3>
            <p className="text-gray-400 mb-8 h-12">Advanced and professional website with better layout, animations, and business-focused design.</p>
            
            <ul className="space-y-4 mb-12">
              {[
                "Multi-page layout",
                "Custom animations",
                "Advanced sections & CMS",
                "SEO-ready structure",
                "2 week delivery"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-300">
                  <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => {
                const el = document.querySelector("#contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-white py-4 text-sm font-bold uppercase tracking-widest text-black hover:bg-gray-200 transition-all duration-300"
            >
              Inquire
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
