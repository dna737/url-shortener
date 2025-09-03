export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page not found</p>
      <p className="text-gray-500">The page you're looking for doesn't exist.</p>
    </div>
  );
};
