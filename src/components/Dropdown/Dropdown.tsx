import { ChangeEventHandler, ReactElement } from 'react';

import './Dropdown.scss';

const Dropdown = ({ label, list, value, onChange }: DropdownProps): ReactElement => {
  return (
    <select
      name="dropdown"
      value={value}
      onChange={onChange}
      className="dropdown"
      data-testid="dropdown"
    >
      <option value="">{label}</option>
      {list?.map((item) => (
        <option value={item.key} key={item.key}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

interface DropdownProps {
  label: string;
  list: {
    key: number | string;
    label: string;
  }[];
  onChange: ChangeEventHandler;
  value: string;
}

export default Dropdown;
