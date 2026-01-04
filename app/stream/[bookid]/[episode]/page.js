import StreamPage from '@/src/views/streamPage';

async function getStreamData(bookId, episode) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    // Construct the URL: NEXT_PUBLIC_API_URL/internet/dramabox/stream?bookId=...&episode=...&apikey=NEXT_PUBLIC_API_KEY
    const res = await fetch(`${apiUrl}/internet/dramabox/stream?bookId=${bookId}&episode=${episode}&apikey=${apiKey}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('Failed to fetch stream data', res.status);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Error fetching stream data:', error);
    return null;
  }
}

async function getDramaDetail(bookId) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    // Fetch detail to get episode list and metadata
    const res = await fetch(`${apiUrl}/internet/dramabox/detail?bookId=${bookId}&apikey=${apiKey}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('Failed to fetch drama detail', res.status);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Error fetching drama detail:', error);
    return null;
  }
}

export default async function Page({ params }) {
  const { bookid, episode } = await params;
  
  // Parallel data fetching
  const [streamData, detailData] = await Promise.all([
    getStreamData(bookid, episode),
    getDramaDetail(bookid)
  ]);

  if (!streamData || !detailData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Stream Unavailable</h1>
          <p className="text-gray-400">Could not load the requested episode.</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <StreamPage 
        streamData={streamData} 
        detailData={detailData} 
        currentEpisode={episode}
        bookId={bookid}
      />
    </main>
  );
}
