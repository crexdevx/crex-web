import { kv } from '@vercel/kv';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readSeedData() {
  try {
    return JSON.parse(readFileSync(join(__dirname, '../../data/reviews.json'), 'utf8'));
  } catch { return []; }
}

async function getReviews() {
  let reviews = await kv.get('reviews');
  if (!reviews) {
    reviews = readSeedData();
    await kv.set('reviews', reviews);
  }
  return reviews;
}

function checkAdmin(req) {
  const pw = req.headers['x-admin-password'];
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && pw === expected;
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json(await getReviews());
  }

  if (req.method === 'POST') {
    if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
    const { author, role, body, rating } = req.body ?? {};
    if (!author?.trim() || !body?.trim())
      return res.status(400).json({ error: 'Author and body are required.' });

    const reviews = await getReviews();
    const review = {
      id: randomUUID(),
      author: author.trim(),
      role: role?.trim() ?? '',
      body: body.trim(),
      rating: Number(rating) || 5,
      createdAt: new Date().toISOString(),
    };
    reviews.unshift(review);
    await kv.set('reviews', reviews);
    return res.status(201).json(review);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
