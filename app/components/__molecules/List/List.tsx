import React from "react";

interface ListProps {
  items: string[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          className="text-[#B3B3B3] font-oswald text-[18px] font-light"
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
