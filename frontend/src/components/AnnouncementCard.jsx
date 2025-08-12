export default function AnnouncementCard({
  title,
  content,
  postedBy,
  datePosted,
}) {
  const formattedDate = datePosted
    ? new Date(datePosted).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <article className="w-full bg-gray-900 border border-gray-700 shadow-lg shadow-black/50 rounded-2xl p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-gray-100 leading-tight">
            {title}
          </h3>
          
        </div>
        <time className="text-sm text-gray-400">{formattedDate}</time>
      </header>

      <div className="mt-4 text-lg text-gray-200 leading-relaxed">
        {content}
      </div>

      <footer className="mt-6 flex items-center justify-between text-sm text-gray-400">
        {/* <span className="inline-flex items-center gap-2">
          <span>Announcement</span>
        </span> */}
        <p className="mt-1 text-sm text-gray-400">
            Posted by{' '}
            <span className="text-gray-200 font-medium">{postedBy}</span>
          </p>
      </footer>
    </article>
  );
}
