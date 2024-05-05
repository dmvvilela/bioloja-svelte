export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml',
		'Cache-Control': 'public, max-age=604800' // on week, in seconds
	});

	const site = 'https://bioloja.bio.br';
	const now = new Date();
	const dateNow = now.toISOString().slice(0, 19) + '+00:00';
	// now.split('T')[0]

	const response = await fetch('/api/routes');
	if (!response.ok) {
		throw new Error('Failed to fetch routes.');
	}
	const routes = await response.json();

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
			xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
						http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

<url>
	<loc>${site}</loc>
	<lastmod>${dateNow}</lastmod>
	<changefreq>daily</changefreq>
	<priority>1.00</priority>
</url>

${routes
	.map(
		(route: string) => `
<url>
	<loc>${site}${route}</loc>
	<changefreq>weekly</changefreq>
	<lastmod>${dateNow}</lastmod>
	<priority>0.80</priority>
</url>
`
	)
	.join('')}

<url>
  <loc>https://bioloja.bio.br/loja</loc>
  <lastmod>${dateNow}</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://bioloja.bio.br/carrinho</loc>
  <lastmod>2023-03-24T18:28:52+00:00</lastmod>
  <priority>0.40</priority>
</url>
<url>
  <loc>https://bioloja.bio.br/entrar</loc>
  <lastmod>2023-03-24T18:28:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://bioloja.bio.br/cadastrar</loc>
  <lastmod>2023-03-24T18:28:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://bioloja.bio.br/faq</loc>
  <lastmod>${dateNow}</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://bioloja.bio.br/sobre-nos</loc>
  <lastmod>${dateNow}</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://bioloja.bio.br/contato</loc>
  <lastmod>2023-03-24T18:28:52+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://bioloja.bio.br/politica-de-privacidade</loc>
  <lastmod>2023-03-24T18:28:52+00:00</lastmod>
  <priority>0.40</priority>
</url>
<url>
  <loc>https://bioloja.bio.br/termos-e-condicoes</loc>
  <lastmod>2023-03-24T18:28:52+00:00</lastmod>
  <priority>0.40</priority>
</url>
<url>
	<loc>https://bioloja.bio.br/esqueci-a-senha</loc>
	<lastmod>2023-03-24T18:28:52+00:00</lastmod>
	<priority>0.64</priority>
</url>

</urlset>
`;

	return new Response(sitemap);
}
