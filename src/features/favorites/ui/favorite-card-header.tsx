import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

interface FavoriteCardHeaderProps {
  alias: string;
  onUpdateAlias: (alias: string) => void;
}

export const FavoriteCardHeader = ({
  alias,
  onUpdateAlias,
}: FavoriteCardHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(alias);

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdateAlias(editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(alias);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          className="h-10 flex-1 text-base"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
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
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="truncate text-lg font-semibold text-gray-900">{alias}</h3>
      <button
        onClick={() => setIsEditing(true)}
        className="rounded p-1.5 transition-colors hover:bg-gray-100"
        aria-label="별칭 수정"
      >
        <Edit2 className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  );
};
