import { useState } from 'react';
import { Edit2, Check, X, Star } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useFavoritesStore } from '../model';
import { toast } from 'sonner';

interface FavoriteCardHeaderProps {
  favoriteId: string;
  alias: string;
}

export const FavoriteCardHeader = ({
  favoriteId,
  alias,
}: FavoriteCardHeaderProps) => {
  const { updateAlias, removeFavorite } = useFavoritesStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(alias);

  const handleSave = () => {
    if (editValue.trim()) {
      updateAlias(favoriteId, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(alias);
    setIsEditing(false);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(favoriteId);
    toast.success('즐겨찾기에서 제거되었습니다');
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className="flex items-center gap-2">
        <Input
          className="h-10 flex-1 text-base"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
          maxLength={20}
        />
        <Button
          size="sm"
          variant="ghost"
          className="h-10 w-10 p-0"
          onClick={handleSave}
        >
          <Check className="h-5 w-5 text-green-600" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-10 w-10 p-0"
          onClick={handleCancel}
        >
          <X className="h-5 w-5 text-gray-400" />
        </Button>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="truncate text-lg font-semibold text-gray-900">{alias}</h3>
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 cursor-pointer p-0"
          onClick={() => setIsEditing(true)}
          aria-label="별칭 수정"
        >
          <Edit2 className="h-4 w-4 cursor-pointer text-gray-400" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 cursor-pointer p-0"
          onClick={handleRemoveFavorite}
          aria-label="즐겨찾기 제거"
        >
          <Star className="h-5 w-5 cursor-pointer fill-yellow-400 text-yellow-400" />
        </Button>
      </div>
    </div>
  );
};
