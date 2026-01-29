import { Star } from 'lucide-react';
import { formatDistrict } from '@/entities/district';
import type { District } from '@/entities/district';
import { useSearchItemActions } from '../model';

interface SearchResultItemProps {
  district: District;
}

export const SearchResultItem = ({ district }: SearchResultItemProps) => {
  const { handleSelect, handleToggleFavorite, isFavorite } =
    useSearchItemActions();

  const isStarred = isFavorite(district);
  const parts = district.split('-');
  const level = parts.length;
  const levelText = level === 1 ? '시/도' : level === 2 ? '구/군' : '동/읍/면';

  return (
    <div className="group flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50">
      <div
        role="button"
        onClick={() => handleSelect(district)}
        className="flex-1"
      >
        <p className="font-medium text-gray-900">{formatDistrict(district)}</p>
        <p className="text-sm text-gray-500">{levelText}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite(district);
        }}
        className="ml-4 rounded p-1 transition-colors hover:bg-gray-100"
        aria-label={isStarred ? '즐겨찾기 제거' : '즐겨찾기 추가'}
      >
        <Star
          className={`h-5 w-5 transition-colors ${
            isStarred
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 group-hover:text-gray-400'
          }`}
        />
      </button>
    </div>
  );
};
