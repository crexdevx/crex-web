import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  imageUrl: string | null;
  link: string;
}

function ProjectCard({ project, index }: { project: PortfolioItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border border-white/10 overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/[0.04]">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/15 text-xs font-mono uppercase tracking-widest">
              No image
            </span>
          </div>
        )}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <ExternalLink size={22} className="text-white" />
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>

      {/* Body */}
      <div className="p-7">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase tracking-widest border border-white/15 px-2 py-1 text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-xl text-white font-semibold mb-1 tracking-tight">
          {project.title}
        </h3>
        {project.client && (
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">
            {project.client}
          </p>
        )}
        <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <>{inner}</>
  );
}

export function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="portfolio" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-center mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white/50 text-sm font-mono uppercase tracking-widest mb-4 block">
            Our work
          </span>
          <h2 className="font-heading text-4xl md:text-6xl text-white font-bold tracking-tighter mb-6">
            Latest Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            A selection of websites we've built for clients. Every project is
            crafted to help businesses grow online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ProjectCard key={item.id} project={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
