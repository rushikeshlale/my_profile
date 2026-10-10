export default function SectionHeading({
  badge,
  title,
  subtitle,
  center = true,
  className = '',
}) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-800/60">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
