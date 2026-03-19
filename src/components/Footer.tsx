export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-50 p-4">
      <div className="flex items-center">
        <a
          href="https://www.eloquentai.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-70 flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#57288F]">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="bold">Q</text>
          </svg>
          Eloquent AI
        </a>
      </div>
    </footer>
  );
}
