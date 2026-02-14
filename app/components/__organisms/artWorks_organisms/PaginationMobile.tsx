import Image from 'next/image';
import Link from 'next/link';

type PaginationMobileProps = {
  page: number;
  perPage: number;
  totalItems: number;
  changeColor: boolean;
};

const PaginationMobile: React.FC<PaginationMobileProps> = ({
  page,
  perPage,
  totalItems,
  changeColor,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const pagesToShow = 4;

  const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === page ? 'active' : ''}`}>
          <Link
            href={`?page=${i}&perPage=${perPage}`}
            className={`page-item ${
              changeColor ? 'text-[#060002' : 'text-[#DDDDDD]'
            } font-Oswald font-normal text-[16px] leading-[23px] ${
              i === page && 'border-b-[2px] border-[#D04175]'
            }`}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav aria-label='Page navigation example' className='flex justify-center'>
      <ul className='pagination flex justify-center items-center gap-[36px] space-x-2'>
        <li className={`page-item  ${page === 1 ? 'disabled' : ''}`}>
          <Link
            href={`?page=${page - 1}&perPage=${perPage}`}
            className='page-link'
          >
            <Image
              src={
                changeColor
                  ? '/L_arrow_pagination_B.svg'
                  : '/L_arrow_pagination.svg'
              }
              width={16}
              height={16}
              alt='left'
            />
          </Link>
        </li>

        <div className='flex gap-[24px]'>{renderPageNumbers()}</div>

        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <Link
            href={`?page=${page + 1}&perPage=${perPage}`}
            className='page-link'
          >
            <Image
              src={
                changeColor
                  ? '/R_arrow_pagination_B.svg'
                  : '/R_arrow_pagination.svg'
              }
              width={16}
              height={16}
              alt='Right'
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationMobile;
