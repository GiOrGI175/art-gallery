interface Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'tel'; // Add more input types as needed
  required?: boolean;
  options?: string[]; // Only for 'select' type fields
  pattern?: string; // Only for fields like 'tel' or 'text' with pattern validation
}

const formFields: Field[] = [
  { name: 'FirstName', label: 'Cart.firstName', type: 'text', required: true },
  { name: 'LastName', label: 'Cart.lastName', type: 'text', required: true },
  { name: 'Email', label: 'Cart.email', type: 'email', required: true },
  {
    name: 'Country',
    label: 'Cart.country',
    type: 'select',
    options: [
      'Cart.country1',
      'Cart.country2',
      'Cart.country3',
      'Cart.country4',
    ],
  },
  { name: 'City', label: 'Cart.city', type: 'text', required: true },
  { name: 'Address', label: 'Cart.Address1', type: 'text', required: true },
  {
    name: 'Address2',
    label: 'Cart.Apartment',
    type: 'text',
  },
  {
    name: 'Phone',
    label: 'Cart.Phone',
    type: 'tel',
    pattern: '\\d{9}',
    required: true,
  },
  {
    name: 'PostCode',
    label: 'Cart.ZIP',
    type: 'text',
    pattern: '\\d{5}',
    required: true,
  },
];

export default formFields;
