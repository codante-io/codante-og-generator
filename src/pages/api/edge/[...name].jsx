export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const allSegments = searchParams.getAll('name');

  return new Response(JSON.stringify({ allSegments }), { status: 200 });

}
