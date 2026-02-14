import FavoriteCard from './FavoriteCard';
import { DataItem } from '@/app/commons/hooks/fetchStore';

interface Props {
  data: DataItem[];
  favoriteIds: string[];
  onToggle: (id: string) => void;
  loadedItems: number;
}

export default function FavoritesGrid({
  data,
  favoriteIds,
  onToggle,
  loadedItems,
}: Props) {
  const columns: DataItem[][] = [[], []];
  const heights = [
    [532, 792, 640],
    [650, 532, 792],
  ];
  const imgHeights = [
    [460, 720, 416],
    [586, 460, 720],
  ];

  data.slice(0, loadedItems * 3).forEach((item, index) => {
    columns[index % 2].push(item);
  });

  return (
    <div className='w-full flex flex-col justify-center'>
      {columns.map((column, colIndex) => (
        <div className='w-full grid grid-cols-3 gap-[16px]' key={colIndex}>
          {column.map((item, index) => (
            <FavoriteCard
              key={item._id}
              item={item}
              isFavorited={favoriteIds.includes(item._id)}
              onToggle={() => onToggle(item._id)}
              height={heights[colIndex][index % 3]}
              imgHeight={imgHeights[colIndex][index % 3]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
