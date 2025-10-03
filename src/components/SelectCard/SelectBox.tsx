export default function SelectBox({
  id,
  name,
  title,
  children,
}: {
  id: string;
  name: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border border-gray-400 p-4 rounded-md">
      <label htmlFor="topic-select">
        <span className="capitalize text-lg font-bold">{title}</span>
      </label>
      <select id={id} name={name} className="capitalize p-2 ">
        {children}
      </select>
    </div>
  );
}
