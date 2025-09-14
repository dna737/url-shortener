import { redirectUrl } from '@/services/proxy';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import NotFound from './NotFound';
import { useAppContext } from '@/context/useAppContext';
import { Preview } from '.';

export default function UrlRedirect() {
  const { url } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showNotFound, setShowNotFound] = useState(false);
  const { canShowPreview } = useAppContext();

  useEffect(() => {
    if (canShowPreview) return;

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
      } else if (response.error) {
        // Check specifically for 404 status code
        if (response.status === 404) {
          setShowNotFound(true);
        } else {
          // Handle other error status codes
          console.error('Redirect error:', response.status, response.message);
          setShowNotFound(true); // You might want different handling for other errors
        }
        setIsLoading(false);
      }
    }

    redirect();

    return () => clearTimeout(timeout);
    
  }, [url, navigate, canShowPreview]);

  if (showNotFound) {
    return <NotFound />;
  }

  if (canShowPreview) {
    return <Preview url={url} />;
  }

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
