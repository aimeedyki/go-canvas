import { ReactElement, ChangeEvent, memo, useMemo, useRef, useState } from 'react';

import { paginateList } from '../../utils';
import './Dropdown.scss';

const Dropdown = memo(({ label, list, onItemSelect, value }: DropdownProps): ReactElement => {
  const paginatedList = useMemo(() => paginateList(list, 40), [list]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const seletRef = useRef();

  const handleSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    const eventValue = event.target.value;

    if (eventValue === 'more') {
      setCurrentPageIndex((prevIndex: number) => prevIndex + 1);
    } else if (eventValue === 'prev') {
      setCurrentPageIndex((prevIndex: number) => prevIndex - 1);
    } else {
      onItemSelect(eventValue);
    }
  };

  return (
    <select
      name="dropdown"
      value={value}
      onChange={handleSelection}
      className="dropdown"
      data-testid="dropdown"
      ref={seletRef}
    >
      <option value="">{label}</option>
      {currentPageIndex !== 0 && <option value="prev">Load Previous...</option>}
      {paginatedList &&
        paginatedList[currentPageIndex]?.map((item) => {
          return (
            <option value={item.key} key={item.key}>
              {item.label}
            </option>
          );
        })}
      {paginatedList.length !== currentPageIndex + 1 && <option value="more">Load More...</option>}
    </select>
  );
});

interface ListItem {
  key: number | string;
  label: string;
}

interface DropdownProps {
  label: string;
  list: ListItem[];
  onItemSelect: (value: string) => void;
  value: string;
}

export default Dropdown;
