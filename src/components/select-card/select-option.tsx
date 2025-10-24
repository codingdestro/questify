export default function SelectOption({
  value,
  children,
}: {
  value: string;
  children: string;
}) {
  return <option className="hover:cursor-pointer" value={value}>{children}</option>;
}
