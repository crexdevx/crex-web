import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Resolves to artifacts/api-server/data/reviews.json regardless of cwd
const DATA_FILE = path.resolve(__dirname, "../../data/reviews.json");

export interface Review {
  id: string;
  author: string;
  role: string;       // e.g. "CEO, Acme Corp"
  body: string;
  rating: number;     // 1-5
  createdAt: string;  // ISO string
}

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function readReviews(): Review[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Review[];
  } catch {
    return [];
  }
}

export function writeReviews(reviews: Review[]): void {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), "utf-8");
}
