const Status = ({ text }: { text: string }) => (
  <div className='w-full h-full flex justify-center'>
    <span className='mt-[200px] font-Oswald text-start font-normal text-[100px] leading-[41px] text-[#D04175]'>
      {text}
    </span>
  </div>
);

export default Status;
