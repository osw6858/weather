import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { useSearchDistricts } from '../model';
import { SearchResults } from './search-results';
import { Button } from '@/shared/ui';

interface SearchLocationProps {
  placeholder?: string;
}

export const SearchLocation = ({
  placeholder = '시, 구, 동 검색 (예: 강남구, ㄱㄴ)',
}: SearchLocationProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { results, isEmpty } = useSearchDistricts(query, {
    minLength: 1,
    maxResults: 10,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          className="border-white/30 bg-white/90 pr-10 pl-10 focus:border-purple-400"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
        />
        {query && (
          <Button
            onClick={handleClear}
            className="absolute top-1/2 right-3 h-auto -translate-y-1/2 cursor-pointer bg-white p-0 hover:bg-white"
            aria-label="검색어 지우기"
            asChild
          >
            <X color="gray" />
          </Button>
        )}
      </div>

      {isOpen && <SearchResults results={results} isEmpty={isEmpty} />}
    </div>
  );
};
