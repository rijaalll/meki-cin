import SearchPage from '@/src/views/searchPage';

async function getSearchResults(query) {
  if (!query) return [];
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    // Construct the URL: NEXT_PUBLIC_API_URL/internet/dramabox/search?query=...&apikey=NEXT_PUBLIC_API_KEY
    const res = await fetch(`${apiUrl}/internet/dramabox/search?query=${encodeURIComponent(query)}&apikey=${apiKey}`, {
      next: { revalidate: 0 }, // No cache for search results
    });

    if (!res.ok) {
      console.error('Failed to fetch search data', res.status);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching search data:', error);
    return [];
  }
}

export default async function Page({ searchParams }) {
  const query = (await searchParams)?.query || '';
  const results = await getSearchResults(query);

  return (
    <main>
      <SearchPage results={results} query={query} />
    </main>
  );
}
