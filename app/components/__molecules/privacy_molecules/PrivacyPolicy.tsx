import React from "react";
import privacyPolicy from "../../../../public/data/PrivacyPolicy.json";

// Define the PrivacyPolicy type
interface PrivacyPolicy {
  title: string;
  sections: {
    title: string;
    text?: string;
    list?: string[];
    content?: {
      subtitle: string;
      text: string;
      list?: string[];
      extra?: string;
    }[];
  }[];
}

const policy: PrivacyPolicy = privacyPolicy;

export default function PrivacySection1() {
  return (
    <div className="max-w-[1280px] m-auto">
      <h2 className="font-Oswald text-[57px] font-normal leading-[84px] text-[#D5D5D5]">
        {policy.title}
      </h2>

      <div className="mt-[41px] font-Oswald text-[16px] leading-7 font-light text-[#B3B3B3]">
        {policy.sections.map((section, index) => (
          <section key={index} className="mt-[20px]">
            <h3 className="font-Oswald text-[18px] leading-7 font-medium text-[#B3B3B3]">
              {section.title}
            </h3>

            {section.text && <p>{section.text}</p>}

            {section.list && (
              <ul className="list-disc pl-7">
                {section.list.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            )}

            {section.content &&
              section.content.map((subsection, subIndex) => (
                <div key={subIndex} className="mt-[15px]">
                  <h4 className="font-medium">{subsection.subtitle}</h4>
                  <p>{subsection.text}</p>

                  {subsection.list && (
                    <ul className="list-disc pl-7">
                      {subsection.list.map((listItem, listIndex) => (
                        <li key={listIndex}>{listItem}</li>
                      ))}
                    </ul>
                  )}

                  {subsection.extra && <p>{subsection.extra}</p>}
                </div>
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}
