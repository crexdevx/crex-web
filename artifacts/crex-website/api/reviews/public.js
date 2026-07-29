import { kv } from '@vercel/kv';
import { randomUUID } from 'node:crypto';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { author, role, body, rating } = req.body ?? {};
    if (!author?.trim() || !body?.trim())
      return res.status(400).json({ error: 'Name and review are required.' });

    const reviews = (await kv.get('reviews')) ?? [];
    const review = {
      id: randomUUID(),
      author: author.trim(),
      role: role?.trim() ?? '',
      body: body.trim(),
      rating: Number(rating) || 5,
      createdAt: new Date().toISOString(),
    };
    reviews.push(review);
    await kv.set('reviews', reviews);
    return res.status(201).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
