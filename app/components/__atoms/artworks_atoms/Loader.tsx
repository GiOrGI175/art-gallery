const Loader = ({ text }: { text: string }) => (
  <div className='w-full h-[80dvh] flex justify-center items-center'>
    <span className='font-Oswald text-start font-normal text-[40px] leading-[41px] text-[#D04175]'>
      {text}
    </span>
  </div>
);

export default Loader;
