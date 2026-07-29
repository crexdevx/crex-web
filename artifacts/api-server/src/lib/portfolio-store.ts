import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = path.resolve(__dirname, "../../data");
const DATA_FILE = path.join(DATA_DIR, "portfolio.json");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  imageUrl: string | null;
  link: string;
  createdAt: string;
}

function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function readPortfolio(): PortfolioItem[] {
  ensureFiles();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as PortfolioItem[];
  } catch {
    return [];
  }
}

export function writePortfolio(items: PortfolioItem[]): void {
  ensureFiles();
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}
