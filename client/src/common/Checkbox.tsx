interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <img
      src={checked ? `${import.meta.env.BASE_URL}check_filled.png` : `${import.meta.env.BASE_URL}check_empty.png`}
      alt={checked ? "선택됨" : "선택 안 됨"}
      style={{ cursor: "pointer", width: "24px", height: "24px" }}
      onClick={() => onChange(!checked)}
    />
  );
}
