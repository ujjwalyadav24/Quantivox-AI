interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">
        {title}
      </h2>

      {children}
    </div>
  );
}