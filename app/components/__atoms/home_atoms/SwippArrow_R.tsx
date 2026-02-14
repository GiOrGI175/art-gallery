type SwippArrow_RProps = {
  arrowHover: boolean;
};

const SwippArrow_R: React.FC<SwippArrow_RProps> = ({ arrowHover }) => {
  return (
    <svg
      width='34'
      height='36'
      viewBox='0 0 34 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.3326 33.5984L27.1992 17.9984L11.3326 2.39844'
        stroke={arrowHover ? '#060002' : '#D04175'}
        strokeWidth='3'
        strokeLinecap='square'
      />
    </svg>
  );
};

export default SwippArrow_R;
