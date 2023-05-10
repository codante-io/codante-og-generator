export default function handler(req, res) {
  const allSegments = req.query.name;

  res.end(JSON.stringify({ allSegments }))
}
