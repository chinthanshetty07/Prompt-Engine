// Prompt history needs MongoDB, which the Vercel deployment does not use.
export default function handler(req, res) {
  res.status(503).json({ success: false, error: 'Prompt history is not available on this deployment.' })
}
