export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center shadow-lg ${className}`}>
      <img src="/app-logo-hawa.png" alt="Hawa Logo" className="h-full w-full object-contain" />
    </div>
  );
}
