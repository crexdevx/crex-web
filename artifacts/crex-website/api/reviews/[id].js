module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'DELETE') {
    const pw = req.headers['x-admin-password'];
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || pw !== expected) return res.status(401).json({ error: 'Unauthorized' });

    return res.status(501).json({
      error: 'Write operations require a database. Connect a DB (e.g. Vercel KV) and update this function to persist data.',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
