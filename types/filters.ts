export type Option = {
  id: string;
  label: string;
};

export type FilterDropdownProps = {
  label: string;
  options: Option[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
};

export type FilterChipProps = {
  label: string;
  onDismiss: () => void;
};
