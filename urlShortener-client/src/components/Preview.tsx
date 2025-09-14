import { useState, useEffect } from 'react';
import { getPageDetails } from '../services/proxy';
import type { PageDetailsResponse } from '../services/interfaces';

interface PreviewProps {
  url?: string;
}

export default function Preview(props: PreviewProps) {
  const { url } = props;
  const [pageDetails, setPageDetails] = useState<PageDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageDetails = async () => {
      if (!url) {
        setError('No URL provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const details = await getPageDetails(url);
        setPageDetails(details);
        if (!details.success) {
          setError(details.message || 'Failed to fetch page details');
        }
      } catch (err) {
        setError('Failed to fetch page details');
        console.error('Error fetching page details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageDetails();
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Page Details...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!pageDetails?.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Details Found</h1>
          <p className="text-gray-600">Unable to retrieve page details for this URL.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Page Details</h1>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Original URL</h2>
              <p className="text-blue-600 break-all">{pageDetails.data.originalUrl}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Short URL</h2>
              <p className="text-green-600 break-all">{pageDetails.data.shortUrl}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
