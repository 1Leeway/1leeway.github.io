import { Check, FileText, Image, Music, Star, Trash2, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CloudFile } from "@/types/api";

const iconForType = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return <Image size={18} className="text-pink-300" />;
  if (mimeType.startsWith("video/")) return <Video size={18} className="text-indigo-300" />;
  if (mimeType.startsWith("audio/")) return <Music size={18} className="text-cyan-300" />;
  return <FileText size={18} className="text-zinc-300" />;
};

const typeLabelFor = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return "Image";
  if (mimeType.startsWith("video/")) return "Video";
  if (mimeType.startsWith("audio/")) return "Audio";
  return "Fichier";
};

interface FileCardProps {
  file: CloudFile;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, nextValue: boolean) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export const FileCard = ({
  file,
  onDelete,
  onToggleFavorite,
  isSelected,
  onToggleSelect
}: FileCardProps) => {
  const isImage = file.mimeType.startsWith("image/");
  const previewUrl = `${import.meta.env.VITE_API_URL ?? "http://localhost:4000"}/files/${file.id}/content`;
  const typeLabel = typeLabelFor(file.mimeType);

  return (
    <Card className={`animate-rise p-4 ${isSelected ? "border-accent/70 ring-1 ring-accent/40" : ""}`}>
      {isImage ? (
        <img
          src={previewUrl}
          alt={file.originalName}
          className="mb-3 h-28 w-full rounded-xl border border-white/10 object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className={`h-7 w-7 rounded-lg px-0 ${isSelected ? "border-accent bg-accent/20 text-indigo-100" : ""}`}
            onClick={() => onToggleSelect(file.id)}
          >
            {isSelected ? <Check size={13} /> : null}
          </Button>
          {iconForType(file.mimeType)}
          <span className="text-xs font-medium text-zinc-300">{typeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className={`${file.isFavorite ? "border-amber-300/50 bg-amber-400/20 text-amber-100" : ""}`}
            onClick={() => onToggleFavorite(file.id, !file.isFavorite)}
          >
            <Star size={14} className={file.isFavorite ? "fill-current" : ""} />
          </Button>
          {file.isFavorite ? <Badge>Favori</Badge> : null}
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
      <p className="truncate text-sm font-medium text-white">{file.originalName}</p>
      <p className="mt-1 text-xs text-zinc-400">{Math.ceil(Number(file.sizeBytes) / 1024)} KB</p>
    </Card>
  );
};
