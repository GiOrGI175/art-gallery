import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return (
    <h2 className="text-gray-200 font-oswald text-[20px] font-normal leading-normal mb-4">
      {children}
    </h2>
  );
};

export default SectionHeading;
