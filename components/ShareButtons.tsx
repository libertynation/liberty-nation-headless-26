'use client';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out: ${title}`);
    const body = encodeURIComponent(`I thought you might be interested in this article:\n\n${title}\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    // Could add a toast notification here
  };

  return (
    <div className="flex items-center gap-3">
          <button
            onClick={handleTwitterShare}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition rounded-sm"
            aria-label="Share on Twitter"
            title="Share on Twitter"
          >
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button
            onClick={handleFacebookShare}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition rounded-sm"
            aria-label="Share on Facebook"
            title="Share on Facebook"
          >
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
            </svg>
          </button>
          <button
            onClick={handleEmailShare}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition rounded-sm"
            aria-label="Share via Email"
            title="Share via Email"
          >
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </button>
          <button
            onClick={handleCopyLink}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition rounded-sm"
            aria-label="Copy Link"
            title="Copy Link"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
    </div>
  );
}
