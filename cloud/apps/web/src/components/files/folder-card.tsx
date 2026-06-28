import { FolderOpen, Star, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Folder } from "@/types/api";

interface FolderCardProps {
  folder: Folder;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, nextValue: boolean) => void;
}

export const FolderCard = ({ folder, onOpen, onDelete, onToggleFavorite }: FolderCardProps) => {
  return (
    <Card className="animate-rise p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen size={18} className="text-indigo-300" />
          <span className="text-xs font-medium text-zinc-300">Dossier</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className={`${folder.isFavorite ? "border-amber-300/50 bg-amber-400/20 text-amber-100" : ""}`}
            onClick={() => onToggleFavorite(folder.id, !folder.isFavorite)}
          >
            <Star size={14} className={folder.isFavorite ? "fill-current" : ""} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-400/40 bg-red-500/10 text-red-200 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onDelete(folder.id)}
            disabled={folder.isFavorite}
            title={folder.isFavorite ? "Un favori ne peut pas etre supprime" : "Supprimer"}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2 text-left transition hover:bg-white/[0.06]"
        onClick={() => onOpen(folder.id)}
      >
        <p className="truncate text-sm font-medium text-white">{folder.name}</p>
        <p className="mt-1 text-xs text-zinc-400">Ouvrir le dossier</p>
      </button>
    </Card>
  );
};
