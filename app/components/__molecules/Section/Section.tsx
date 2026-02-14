import React from "react";
import SectionHeading from "../../__atoms/SectionHeading/SectionHeading";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-6">
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  );
};

export default Section;
