import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '@/features/favorites';
import { toast } from 'sonner';
import type { District } from '@/entities/district';

export const useSearchItemActions = () => {
  const navigate = useNavigate();
  const { addFavorite, isFavorite } = useFavoritesStore();

  const handleSelect = (district: District) => {
    navigate(`/detail/${encodeURIComponent(district)}`);
  };

  const handleToggleFavorite = (district: District) => {
    if (isFavorite(district)) {
      return;
    }

    const success = addFavorite(district);
    if (success) {
      toast.success('즐겨찾기에 추가되었습니다');
    } else {
      toast.error('즐겨찾기는 최대 6개까지 추가할 수 있습니다');
    }
  };

  return {
    handleSelect,
    handleToggleFavorite,
    isFavorite,
  };
};
