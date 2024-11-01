export function FormTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="col-span-3 space-y-2 rounded-l-xl bg-secondary">
      <div className="p-6">
        <h2 className="text-xl font-light">
          <span className="font-semibold">{title}. </span>
          {subtitle}.
        </h2>
      </div>
    </div>
  );
}
