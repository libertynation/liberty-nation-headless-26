export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-primary-red border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-heading font-bold text-xl uppercase tracking-wide">Loading Liberty Nation...</p>
      </div>
    </div>
  );
}
