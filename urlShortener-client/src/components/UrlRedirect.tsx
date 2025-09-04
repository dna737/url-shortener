import { redirectUrl } from '@/services/proxy';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UrlRedirect() {
  const { url } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  console.log("URL: ", url);

  useEffect(() => {
    if (!url) {
      navigate('/');
      return;
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    const redirect = async () => {
      const response = await redirectUrl(url);
      if (response.success) {
        window.location.href = response.originalUrl;
      } else {
        navigate('/');
      }
    }

    redirect();

    return () => clearTimeout(timeout);
    
  }, [url, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading && (
        <>
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
          <p className="mt-4 text-lg text-gray-600">Redirecting...</p>
        </>
      )}
    </div>
  );
}
