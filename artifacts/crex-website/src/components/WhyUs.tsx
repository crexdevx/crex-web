import { motion } from "framer-motion";
import { Layout, Target, Zap, Smartphone, BadgeCheck } from "lucide-react";

export function WhyUs() {
  const features = [
    {
      title: "Modern Design",
      description: "Cutting-edge aesthetics that make your brand unforgettable.",
      icon: <Layout className="w-6 h-6" />
    },
    {
      title: "Business-Focused",
      description: "Every design decision supports your business goals.",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Smooth Experience",
      description: "Fluid interactions that keep visitors engaged and exploring.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Mobile-Friendly",
      description: "Looks perfect and functions flawlessly on every screen size.",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      title: "Professional Presence",
      description: "Elevate how the world sees your brand immediately.",
      icon: <BadgeCheck className="w-6 h-6" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="why-us" className="py-32 px-6 bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-4xl md:text-6xl text-white font-bold tracking-tighter">Why Choose Crex</h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants} className="group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                {feature.icon}
              </div>
              <h3 className="font-heading text-2xl text-white font-medium mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
