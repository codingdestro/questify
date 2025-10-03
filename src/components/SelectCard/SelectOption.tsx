export default function SelectOption({
  value,
  children,
}: {
  value: string;
  children: string;
}) {
  return <option className="" value={value}>{children}</option>;
}
