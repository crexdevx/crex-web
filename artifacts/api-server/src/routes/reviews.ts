import { Router } from "express";
import { readReviews, writeReviews, type Review } from "../lib/reviews-store.js";
import { randomUUID } from "crypto";

const router = Router();

function isAdmin(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false; // No password set → deny all write access
  return req.headers["x-admin-password"] === pw;
}

// GET /api/reviews — public
router.get("/reviews", (_req, res) => {
  res.json(readReviews());
});

// POST /api/reviews/public — visitors submit their own review (no auth, goes live immediately)
router.post("/reviews/public", (req, res) => {
  const { author, role, body, rating } = req.body as Partial<Review>;
  if (!author || !body) {
    res.status(400).json({ error: "author and body are required" });
    return;
  }
  const review: Review = {
    id: randomUUID(),
    author: String(author).trim(),
    role: role ? String(role).trim() : "",
    body: String(body).trim(),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    createdAt: new Date().toISOString(),
  };
  const reviews = readReviews();
  reviews.push(review); // append (admin-added show first)
  writeReviews(reviews);
  res.status(201).json(review);
});

// POST /api/reviews/verify — check admin password (used by admin login screen)
router.post("/reviews/verify", (req, res) => {
  if (isAdmin(req)) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// POST /api/reviews — add a review (admin only)
router.post("/reviews", (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const { author, role, body, rating } = req.body as Partial<Review>;
  if (!author || !body) {
    res.status(400).json({ error: "author and body are required" });
    return;
  }
  const review: Review = {
    id: randomUUID(),
    author: String(author).trim(),
    role: role ? String(role).trim() : "",
    body: String(body).trim(),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    createdAt: new Date().toISOString(),
  };
  const reviews = readReviews();
  reviews.unshift(review); // newest first
  writeReviews(reviews);
  res.status(201).json(review);
});

// DELETE /api/reviews/:id — remove a review (admin only)
router.delete("/reviews/:id", (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const reviews = readReviews().filter((r) => r.id !== req.params.id);
  writeReviews(reviews);
  res.json({ ok: true });
});

export default router;
