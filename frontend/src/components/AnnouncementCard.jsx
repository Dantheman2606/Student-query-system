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
    <article className="w-full bg-[#ffffff] border border-gray-300 shadow-lg shadow-black/10 rounded-2xl p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-grey-100 leading-tight">
            {title}
          </h1>

        </div>
        <time className="text-2xl text-grey-400">{formattedDate}</time>
      </header>

      <div className="mt-4 text-2xl text-grey-200 leading-relaxed">
        {content}
      </div>

      <footer className="mt-6 flex items-center justify-between text-sm text-grey-400">
        {/* <span className="inline-flex items-center gap-2">
          <span>Announcement</span>
        </span> */}
        <p className="mt-1 text-xl text-grey-400">
            Posted by{' '}
            <span className="text-grey-200 font-medium">{postedBy}</span>
          </p>
      </footer>
    </article>
  );
}
