module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const pw = req.headers['x-admin-password'];
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return res.status(500).json({ error: 'ADMIN_PASSWORD environment variable not set.' });
    }
    if (pw === expected) {
      return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ error: 'Wrong password.' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
