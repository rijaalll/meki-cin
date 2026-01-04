export default function sitemap() {
  const baseUrl = 'https://drakorchina.vercel.app'; // Replace with actual domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // We can add dynamic routes here by fetching data if needed
  ];
}
