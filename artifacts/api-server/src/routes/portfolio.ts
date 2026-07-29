import { Router } from "express";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  readPortfolio,
  writePortfolio,
  UPLOADS_DIR,
  type PortfolioItem,
} from "../lib/portfolio-store.js";

const router = Router();

function isAdmin(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return req.headers["x-admin-password"] === pw;
}

// GET /api/portfolio — public
router.get("/portfolio", (_req, res) => {
  res.json(readPortfolio());
});

// POST /api/portfolio — admin only, accepts base64 image
router.post("/portfolio", (req, res) => {
  if (!isAdmin(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { title, client, description, tags, imageBase64, imageType, link } =
    req.body as {
      title?: string;
      client?: string;
      description?: string;
      tags?: string[];
      imageBase64?: string;
      imageType?: string; // e.g. "image/jpeg"
      link?: string;
    };

  if (!title) { res.status(400).json({ error: "title is required" }); return; }

  let imageUrl: string | null = null;

  if (imageBase64) {
    const ext = (imageType ?? "image/jpeg").split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const filepath = path.join(UPLOADS_DIR, filename);
    const buffer = Buffer.from(imageBase64, "base64");
    fs.writeFileSync(filepath, buffer);
    imageUrl = `/api/uploads/${filename}`;
  }

  const item: PortfolioItem = {
    id: randomUUID(),
    title: String(title).trim(),
    client: client ? String(client).trim() : "",
    description: description ? String(description).trim() : "",
    tags: Array.isArray(tags) ? tags.map(String) : [],
    imageUrl,
    link: link ? String(link).trim() : "",
    createdAt: new Date().toISOString(),
  };

  const items = readPortfolio();
  items.unshift(item);
  writePortfolio(items);
  res.status(201).json(item);
});

// DELETE /api/portfolio/:id — admin only
router.delete("/portfolio/:id", (req, res) => {
  if (!isAdmin(req)) { res.status(401).json({ error: "Unauthorized" }); return; }
  const items = readPortfolio().filter((p) => p.id !== req.params.id);
  writePortfolio(items);
  res.json({ ok: true });
});

export default router;
