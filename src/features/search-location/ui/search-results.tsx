import { SearchResultItem } from './search-result-item';
import type { District } from '@/entities/district';

interface SearchResultsProps {
  results: District[];
  isEmpty: boolean;
}

export const SearchResults = ({ results, isEmpty }: SearchResultsProps) => {
  if (isEmpty) {
    return (
      <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
        <div className="px-4 py-8 text-center text-gray-500">
          검색 결과가 없습니다
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
      {results.map((district) => (
        <SearchResultItem key={district} district={district} />
      ))}
    </div>
  );
};
