import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Plus } from "lucide-react";

// ─── ADD YOUR PROJECTS HERE ──────────────────────────────────────────────────
// To add a project: copy one of the objects below, fill in your details, and
// add the image path (import it at the top of this file or paste a URL).
//
// Example with a local image:
//   import myProject from "@assets/my-project-screenshot.png";
//   { id: 5, title: "My Project", client: "Client Name", description: "...", tags: ["Web Design"], image: myProject }
// ─────────────────────────────────────────────────────────────────────────────
const projects: {
  id: number;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: string | null;
}[] = [
  {
    id: 1,
    title: "Project Title",
    client: "Client Name",
    description: "A short description of what you built for this client.",
    tags: ["Web Design", "Development"],
    image: null,
  },
  {
    id: 2,
    title: "Project Title",
    client: "Client Name",
    description: "A short description of what you built for this client.",
    tags: ["Landing Page"],
    image: null,
  },
  {
    id: 3,
    title: "Project Title",
    client: "Client Name",
    description: "A short description of what you built for this client.",
    tags: ["Standard Website", "SEO"],
    image: null,
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border border-white/10 overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500"
    >
      {/* Image / placeholder */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/[0.04]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-white/15 m-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Plus size={18} className="text-white/30" />
            </div>
            <p className="text-white/25 text-xs font-mono tracking-widest uppercase text-center px-4">
              Add your project screenshot
            </p>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <ExternalLink size={22} className="text-white" />
        </motion.div>

        {/* Top border glow on hover */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>

      {/* Card body */}
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
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">
          {project.client}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Upload dropzone for quick image swap hint ────────────────────────────────
function UploadHint() {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-16 border border-dashed border-white/15 p-10 flex flex-col items-center gap-4 text-center max-w-xl mx-auto"
    >
      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
        <Plus size={20} className="text-white/40" />
      </div>
      <p className="text-white/60 text-sm tracking-wide">
        Want to add a new project?
      </p>
      <p className="text-white/30 text-xs font-mono leading-relaxed max-w-sm">
        Upload your screenshots to the project, then add them to the{" "}
        <span className="text-white/50">projects</span> array inside{" "}
        <span className="text-white/50">Portfolio.tsx</span>. Each project takes
        a title, client name, description, tags, and an image.
      </p>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" />
      <button
        onClick={() => fileRef.current?.click()}
        className="mt-2 border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
      >
        Upload Screenshot
      </button>
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            A selection of websites we have built for clients. Every project is
            crafted to help businesses grow online.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <UploadHint />
      </div>
    </section>
  );
}
