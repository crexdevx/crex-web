import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ────────────────────────────────────────────────────────────────────
interface Review {
  id: string; author: string; role: string; body: string; rating: number; createdAt: string;
}
interface PortfolioItem {
  id: string; title: string; client: string; description: string; tags: string[]; imageUrl: string | null; link: string; createdAt: string;
}

const storedPw = () => sessionStorage.getItem("crex_admin") ?? "";

// ── Small helpers ────────────────────────────────────────────────────────────
function Stars({ n }: { n: number }) {
  return <span className="text-white/50 text-sm">{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs text-white/40 uppercase tracking-widest font-mono">
      {label}
      {children}
    </label>
  );
}

const inputCls = "bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors normal-case";

// ── Reviews tab ──────────────────────────────────────────────────────────────
function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ author: "", role: "", body: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    const r = await fetch("/api/reviews"); setReviews(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault(); setMsg("");
    if (!form.author.trim() || !form.body.trim()) { setMsg("Name and review are required."); return; }
    setSubmitting(true);
    const r = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": storedPw() },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (r.ok) { setForm({ author: "", role: "", body: "", rating: 5 }); setMsg("✓ Added"); load(); }
    else setMsg("Failed.");
  }

  async function del(id: string) {
    if (!confirm("Delete this review?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE", headers: { "x-admin-password": storedPw() } });
    load();
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Add form */}
      <section className="border border-white/10 p-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-5">Add a Review</h3>
        <form onSubmit={add} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Client name *"><input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="e.g. Rohit Sharma" className={inputCls} /></Field>
            <Field label="Role / Company"><input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. Founder, Acme" className={inputCls} /></Field>
          </div>
          <Field label="Review text *">
            <textarea rows={4} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Write the review here…" className={inputCls + " resize-none"} />
          </Field>
          <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-mono">
            Rating:
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
                className={`text-xl transition-opacity ${n <= form.rating ? "opacity-100" : "opacity-20"}`}>★</button>
            ))}
          </div>
          {msg && <p className={`text-xs ${msg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>{msg}</p>}
          <button type="submit" disabled={submitting} className="bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors disabled:opacity-50 self-start px-8">
            {submitting ? "Adding…" : "Add Review"}
          </button>
        </form>
      </section>

      {/* List */}
      <section>
        <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-5">Published ({reviews.length})</h3>
        <AnimatePresence>
          {reviews.map(r => (
            <motion.div key={r.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="border border-white/10 p-5 mb-3 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-semibold text-sm">{r.author}</span>
                  {r.role && <span className="text-white/30 text-xs">{r.role}</span>}
                  <Stars n={r.rating} />
                </div>
                <p className="text-white/55 text-sm leading-relaxed line-clamp-3">{r.body}</p>
              </div>
              <button onClick={() => del(r.id)} className="text-white/20 hover:text-red-400 transition-colors text-xs shrink-0">Delete</button>
            </motion.div>
          ))}
        </AnimatePresence>
        {reviews.length === 0 && <p className="text-white/20 text-sm">No reviews yet.</p>}
      </section>
    </div>
  );
}

// ── Portfolio tab ─────────────────────────────────────────────────────────────
function PortfolioTab() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState({ title: "", client: "", description: "", tags: "", link: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const r = await fetch("/api/portfolio"); setItems(await r.json());
  }
  useEffect(() => { load(); }, []);

  function pickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function add(e: React.FormEvent) {
    e.preventDefault(); setMsg("");
    if (!form.title.trim()) { setMsg("Title is required."); return; }
    setSubmitting(true);

    let imageBase64: string | null = null;
    let imageType: string | null = null;
    if (imageFile) {
      imageType = imageFile.type;
      imageBase64 = await new Promise<string>(resolve => {
        const r = new FileReader();
        r.onload = ev => resolve((ev.target?.result as string).split(",")[1]);
        r.readAsDataURL(imageFile);
      });
    }

    const body = {
      title: form.title.trim(),
      client: form.client.trim(),
      description: form.description.trim(),
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      link: form.link.trim(),
      imageBase64,
      imageType,
    };

    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": storedPw() },
      body: JSON.stringify(body),
    });
    setSubmitting(false);
    if (res.ok) {
      setForm({ title: "", client: "", description: "", tags: "", link: "" });
      setImageFile(null); setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      setMsg("✓ Added");
      load();
    } else {
      setMsg("Failed to add project.");
    }
  }

  async function del(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE", headers: { "x-admin-password": storedPw() } });
    load();
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Add form */}
      <section className="border border-white/10 p-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-5">Upload Work</h3>
        <form onSubmit={add} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Project title *"><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Sharma Bakery Website" className={inputCls} /></Field>
            <Field label="Client name"><input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="e.g. Vijay Sharma" className={inputCls} /></Field>
          </div>
          <Field label="Description">
            <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description of the project…" className={inputCls + " resize-none"} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tags (comma separated)"><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="Web Design, SEO, Landing Page" className={inputCls} /></Field>
            <Field label="Live URL (optional)"><input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://…" className={inputCls} /></Field>
          </div>

          {/* Image upload */}
          <Field label="Screenshot / Image">
            <div
              onClick={() => fileRef.current?.click()}
              className="border border-dashed border-white/15 p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-white/30 transition-colors"
            >
              {preview ? (
                <img src={preview} alt="preview" className="max-h-40 object-contain" />
              ) : (
                <>
                  <p className="text-white/30 text-xs">Click to upload screenshot</p>
                  <p className="text-white/15 text-[10px]">JPG, PNG, WebP</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={pickImage} className="hidden" />
          </Field>

          {msg && <p className={`text-xs ${msg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>{msg}</p>}
          <button type="submit" disabled={submitting} className="bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors disabled:opacity-50 self-start px-8">
            {submitting ? "Uploading…" : "Add Project"}
          </button>
        </form>
      </section>

      {/* List */}
      <section>
        <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-5">Projects ({items.length})</h3>
        {items.length === 0 && <p className="text-white/20 text-sm">No projects yet.</p>}
        <div className="grid grid-cols-2 gap-4">
          {items.map(item => (
            <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="border border-white/10 overflow-hidden">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
              )}
              <div className="p-4 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{item.title}</p>
                  {item.client && <p className="text-white/30 text-xs">{item.client}</p>}
                </div>
                <button onClick={() => del(item.id)} className="text-white/20 hover:text-red-400 transition-colors text-xs shrink-0">Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Main Admin page ───────────────────────────────────────────────────────────
export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("crex_admin"));
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<"reviews" | "portfolio">("reviews");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); setAuthError("");
    const res = await fetch("/api/reviews/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
    });
    if (res.ok) { sessionStorage.setItem("crex_admin", password); setAuthed(true); }
    else setAuthError("Wrong password.");
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div className="w-full max-w-sm" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-8 text-center">Crex Admin</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="password" placeholder="Admin password" value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
              autoFocus />
            {authError && <p className="text-red-400 text-xs">{authError}</p>}
            <button type="submit" className="bg-white text-black py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">Enter</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Crex Admin</h1>
          <p className="text-white/30 text-sm mt-1">Manage your reviews and portfolio</p>
        </div>
        <button onClick={() => { sessionStorage.removeItem("crex_admin"); setAuthed(false); }}
          className="text-white/30 text-xs hover:text-white/60 transition-colors">Log out</button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8 gap-6">
        {(["reviews", "portfolio"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 text-sm font-medium uppercase tracking-widest transition-colors border-b-2 -mb-px ${tab === t ? "border-white text-white" : "border-transparent text-white/30 hover:text-white/60"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "reviews" ? <ReviewsTab /> : <PortfolioTab />}
    </div>
  );
}
