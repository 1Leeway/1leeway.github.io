import { FolderOpen, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Folder } from "@/types/api";

interface FolderListRowProps {
  folder: Folder;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, nextValue: boolean) => void;
}

export const FolderListRow = ({ folder, onOpen, onDelete, onToggleFavorite }: FolderListRowProps) => {
  return (
    <div className="grid grid-cols-[1.5fr_0.8fr_0.6fr_0.35fr] items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200">
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-white/5"
        onClick={() => onOpen(folder.id)}
      >
        <FolderOpen size={16} className="text-indigo-300" />
        <span className="truncate">{folder.name}</span>
      </button>
      <span className="text-zinc-400">{new Date(folder.createdAt).toLocaleDateString()}</span>
      <span className="text-zinc-400">Dossier</span>
      <div className="flex items-center justify-self-end gap-2">
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
  );
};
