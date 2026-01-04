import DetailPage from '@/src/views/detailPage';

async function getDramaDetail(bookId) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    // Construct the URL: NEXT_PUBLIC_API_URL/internet/dramabox/detail?bookId=...&apikey=NEXT_PUBLIC_API_KEY
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
  const { bookid } = await params;
  const detail = await getDramaDetail(bookid);

  if (!detail) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Drama Not Found</h1>
          <p className="text-gray-400">The requested drama could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <DetailPage detail={detail} />
    </main>
  );
}
