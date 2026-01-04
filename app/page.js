import HomePage from '@/src/views/homePage';

async function getDramaData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    // Construct the URL exactly as requested
    // NEXT_PUBLIC_API_URL/internet/dramabox/home?apikey=NEXT_PUBLIC_API_KEY
    const res = await fetch(`${apiUrl}/internet/dramabox/home?apikey=${apiKey}`, {
      next: { revalidate: 3600 }, // Clean caching strategy for better performance
    });

    if (!res.ok) {
      console.error('Failed to fetch drama data', res.status);
      return { latest: [], trending: [] };
    }

    const json = await res.json();
    return json.data || { latest: [], trending: [] };
  } catch (error) {
    console.error('Error fetching drama data:', error);
    return { latest: [], trending: [] };
  }
}

export default async function Page() {
  const data = await getDramaData();

  return (
    <main>
      <HomePage latest={data.latest} trending={data.trending} />
    </main>
  );
}
