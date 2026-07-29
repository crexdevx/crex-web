module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    // Public review submissions require a writable database to persist.
    // Connect a DB (e.g. Vercel KV, Postgres) and update this function
    // to save incoming reviews. Until then, submissions return 501.
    return res.status(501).json({
      error: 'Review submissions require a database. Connect a DB and update this endpoint to save reviews.',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
