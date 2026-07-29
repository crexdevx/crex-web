import { kv } from '@vercel/kv';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readSeedData() {
  try {
    return JSON.parse(readFileSync(join(__dirname, '../../data/portfolio.json'), 'utf8'));
  } catch { return []; }
}

async function getPortfolio() {
  let items = await kv.get('portfolio');
  if (!items) {
    items = readSeedData();
    await kv.set('portfolio', items);
  }
  return items;
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
    return res.status(200).json(await getPortfolio());
  }

  if (req.method === 'POST') {
    if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
    const { title, client, description, tags, link, imageBase64, imageType } = req.body ?? {};
    if (!title?.trim()) return res.status(400).json({ error: 'Title is required.' });

    const imageUrl = imageBase64 && imageType
      ? `data:${imageType};base64,${imageBase64}`
      : null;

    const items = await getPortfolio();
    const item = {
      id: randomUUID(),
      title: title.trim(),
      client: client?.trim() ?? '',
      description: description?.trim() ?? '',
      tags: Array.isArray(tags) ? tags : [],
      link: link?.trim() ?? '',
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    items.unshift(item);
    await kv.set('portfolio', items);
    return res.status(201).json(item);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
