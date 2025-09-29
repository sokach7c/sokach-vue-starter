interface Option {
  label: string;
  value: number | string;
  color?: string;
  disabled?: boolean;
  type?: string;
  icon?: string;
}

type Options = Option[];
