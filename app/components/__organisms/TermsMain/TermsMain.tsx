import React from "react";
import Section from "../../__molecules/Section/Section";
import List from "../../__molecules/List/List";
import Booking from "../../__molecules/Booking/Booking";

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="py-10 max-w-[1280px] w-full ">
        <h1 className="text-[#D5D5D5] font-oswald text-[57px] font-normal leading-normal mb-8">
          Terms & Conditions
        </h1>
        <p className="mb-6 text-[#B3B3B3] font-oswald text-[18px] font-light">
          Welcome to TATAK ART GALLERY! These Terms and Conditions
          (&quot;Terms&quot;) govern your use of our website and services. By
          accessing or using our website, you agree to be bound by these Terms.
          If you do not agree with any part of these Terms, please refrain from
          using our website.
        </p>

        <Section title="1. General Information">
          <List
            items={[
              "1.1. TATAK ART GALLERY is an online platform for showcasing and selling artworks.",
              "1.2. The website is owned and operated by Tata Kacharava, located at Tbilisi, Georgia.",
              "1.3. For inquiries, please contact us at kacharava.tamar12@gmail.com.",
            ]}
          />
        </Section>

        <Section title="2. User Account">
          <List
            items={[
              "2.1. To access certain features of the website, you may need to create an account. You are responsible for maintaining the confidentiality of your account information.",
              "2.2. By creating an account, you represent that you are at least 18 years old or have parental/guardian consent to use the website.",
              "2.3. You agree to provide accurate, complete, and current information during registration.",
            ]}
          />
        </Section>

        <Section title="3. Purchasing Artworks">
          <List
            items={[
              "3.1. All purchases made through TATAK ART GALLERY are subject to availability.",
              "3.2. Prices are displayed in USD, and additional taxes, shipping, or handling fees may apply.",
              "3.3. Payments must be made through the available payment methods provided on the website.",
              "3.4. Once your order is placed, you will receive a confirmation email with order details.",
              "3.5. All sales are final unless specified otherwise under the 'Returns and Refunds' section.",
            ]}
          />
        </Section>

        <Section title="4. Shipping and Delivery">
          <List
            items={[
              "4.1. TATAK ART GALLERY ships worldwide unless stated otherwise.",
              "4.2. TATAK ART GALLERY is not responsible for delays caused by customs, carriers, or other unforeseen circumstances.",
              "4.3. Risk of loss and title for purchased items pass to you upon delivery.",
            ]}
          />
        </Section>

        <Section title="5. Returns and Refunds">
          <List
            items={[
              "5.1. Returns and refunds are only accepted if the artwork arrives damaged or does not match the description provided on the website.",
              "5.2. You must notify us of any issues within 2 days of receiving the artwork, along with photographic evidence of the issue.",
              "5.3. Refunds, if approved, will be processed back to your original payment method.",
            ]}
          />
        </Section>

        <Section title="6. Intellectual Property">
          <List
            items={[
              "6.1. All content on the TATAK ART GALLERY website, including text, images, logos, and designs, is the intellectual property of TATAK ART GALLERY or its licensors.",
              "6.2. You may not copy, reproduce, or distribute any part of the website without prior written consent.",
              "6.3. Artists retain the copyright to their respective works unless otherwise agreed upon in writing.",
            ]}
          />
        </Section>

        <Section title="7. Prohibited Activities">
          <List
            items={[
              "7.1. You agree not to:",
              "- Use the website for unlawful purposes.",
              "- Attempt to hack, disable, or disrupt the website.",
              "- Misrepresent yourself or impersonate another person.",
              "- Resell artworks without prior written approval.",
            ]}
          />
        </Section>

        <Section title="8. Limitation of Liability">
          <List
            items={[
              "8.1. TATAK ART GALLERY is not liable for any indirect, incidental, or consequential damages arising from your use of the website or the purchase of any artwork.",
              "8.2. Our total liability for any claim related to the use of our services is limited to the amount you paid for the artwork in question.",
            ]}
          />
        </Section>

        <Section title="9. Privacy Policy">
          <p className="mb-4">
            9.1. Your personal information will be handled in accordance with
            our Privacy Policy, which can be found [link to Privacy Policy].
          </p>
        </Section>

        <Section title="10. Changes to Terms">
          <List
            items={[
              "10.1. We reserve the right to update these Terms at any time. Changes will be effective upon posting on this page.",
              "10.2. Continued use of the website after changes signifies your acceptance of the revised Terms.",
            ]}
          />
        </Section>

        <Section title="11. Governing Law">
          <p className="text-[#B3B3B3] font-oswald text-[18px] font-light">
            11.1. These Terms are governed by the laws of Georgia, without
            regard to its conflict of law provisions.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p className="text-[#B3B3B3] font-oswald text-[18px] font-light">
            If you have any questions or concerns about these Terms, please
            contact us at kacharava.tamar12@gmail.com.
          </p>
        </Section>

        <p className="mt-6 font-Oswald font-[300] text-[16px] text-[#B3B3B3]">
          Thank you for visiting TATAK ART GALLERY!
        </p>
      </div>
      <Booking />
    </div>
  );
};

export default TermsAndConditions;
