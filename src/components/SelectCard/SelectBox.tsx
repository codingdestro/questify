export default function SelectBox({
  id,
  name,
  title,
  children,
  onChangeHandler,
}: {
  id: string;
  name: string;
  title: string;
  onChangeHandler?: (value: string) => void;

  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border border-gray-400 p-4 rounded-md bg-white">
      <label htmlFor="topic-select">
        <span className="capitalize text-lg font-bold">{title}</span>
      </label>
      <select
        id={id}
        onChange={(e) => onChangeHandler && onChangeHandler(e.target.value)}
        name={name}
        className="capitalize p-2 cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}
