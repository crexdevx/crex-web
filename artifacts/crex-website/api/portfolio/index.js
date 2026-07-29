const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const dataFile = path.join(process.cwd(), 'data', 'portfolio.json');

function readData() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch {
    return [];
  }
}

function checkAdmin(req) {
  const pw = req.headers['x-admin-password'];
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return pw === expected;
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json(readData());
  }

  if (req.method === 'POST') {
    if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    // Write operations require a writable database.
    // On Vercel's read-only filesystem you must integrate a DB (e.g. Vercel KV,
    // Postgres, MongoDB) and update this function to persist data there.
    return res.status(501).json({
      error: 'Write operations require a database. Set ADMIN_PASSWORD and connect a database to enable this endpoint.',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
