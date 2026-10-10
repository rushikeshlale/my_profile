export default function Card({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  ...props
}) {
  const hoverStyles = hoverEffect
    ? "hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300"
    : "";

  const glowStyles = glow
    ? "relative before:absolute before:-inset-px before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 before:rounded-2xl before:opacity-20 before:blur-sm before:-z-10"
    : "";

  return (
    <div
      className={`bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/30 rounded-2xl p-6 transition-all duration-300 ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
