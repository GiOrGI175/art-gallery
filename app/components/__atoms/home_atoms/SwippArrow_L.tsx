type SwippArrow_LProps = {
  arrowHover: boolean;
};

const SwippArrow_L: React.FC<SwippArrow_LProps> = ({ arrowHover }) => {
  return (
    <svg
      width='34'
      height='36'
      viewBox='0 0 34 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M22.6665 33.5984L6.7998 17.9984L22.6665 2.39844'
        stroke={arrowHover ? '#060002' : '#D04175'}
        strokeWidth='3'
        strokeLinecap='square'
      />
    </svg>
  );
};

export default SwippArrow_L;
