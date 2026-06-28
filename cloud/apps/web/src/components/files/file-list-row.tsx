import { Check, FileText, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CloudFile } from "@/types/api";

interface FileListRowProps {
  file: CloudFile;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, nextValue: boolean) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export const FileListRow = ({
  file,
  onDelete,
  onToggleFavorite,
  isSelected,
  onToggleSelect
}: FileListRowProps) => {
  const isImage = file.mimeType.startsWith("image/");
  const previewUrl = `${import.meta.env.VITE_API_URL ?? "http://localhost:4000"}/files/${file.id}/content`;

  return (
    <div
      className={`grid grid-cols-[0.22fr_1.5fr_0.8fr_0.6fr_0.35fr] items-center gap-3 rounded-xl border px-4 py-3 text-sm text-zinc-200 ${
        isSelected ? "border-accent/70 bg-accent/10" : "border-white/5 bg-white/[0.03]"
      }`}
    >
      <Button
        size="sm"
        variant="outline"
        className={`h-7 w-7 rounded-lg px-0 ${isSelected ? "border-accent bg-accent/20 text-indigo-100" : ""}`}
        onClick={() => onToggleSelect(file.id)}
      >
        {isSelected ? <Check size={13} /> : null}
      </Button>
      <div className="flex items-center gap-2">
        {isImage ? (
          <img
            src={previewUrl}
            alt={file.originalName}
            className="h-8 w-8 rounded-md border border-white/10 object-cover"
            loading="lazy"
          />
        ) : (
          <FileText size={16} className="text-zinc-400" />
        )}
        <span className="truncate">{file.originalName}</span>
      </div>
      <span className="text-zinc-400">{new Date(file.createdAt).toLocaleDateString()}</span>
      <span className="text-zinc-400">{Math.ceil(Number(file.sizeBytes) / 1024)} KB</span>
      <div className="flex items-center justify-self-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className={`${file.isFavorite ? "border-amber-300/50 bg-amber-400/20 text-amber-100" : ""}`}
          onClick={() => onToggleFavorite(file.id, !file.isFavorite)}
        >
          <Star size={14} className={file.isFavorite ? "fill-current" : ""} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-red-400/40 bg-red-500/10 text-red-200 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onDelete(file.id)}
          disabled={file.isFavorite}
          title={file.isFavorite ? "Un favori ne peut pas etre supprime" : "Supprimer"}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
};
