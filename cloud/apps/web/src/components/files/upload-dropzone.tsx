import { useRef } from "react";
import { Pause, Play, Square, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploadManager } from "@/hooks/use-upload-manager";

interface UploadDropzoneProps {
  onUploadSuccess?: () => void;
}

export const UploadDropzone = ({ onUploadSuccess }: UploadDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { items, logs, queueFiles, uploadAll, pause, resume, cancel, pendingCount } = useUploadManager({
    onUploadSuccess
  });

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    queueFiles(Array.from(files));
  };

  return (
    <section className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-5">
      <div
        className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          onFiles(event.dataTransfer.files);
        }}
      >
        <p className="font-medium text-white">Glisse tes fichiers ici</p>
        <p className="mt-1 text-sm text-zinc-400">Images, videos, PDF, audio, code</p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button variant="outline" onClick={() => inputRef.current?.click()}>
            Parcourir
          </Button>
          <Button onClick={uploadAll}>
            <Upload size={16} />
            <span className="ml-2">Lancer l'upload ({pendingCount})</span>
          </Button>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(event) => onFiles(event.target.files)}
        />
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-zinc-100">{item.file.name}</p>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => pause(item.id)}>
                  <Pause size={14} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => resume(item.id)}>
                  <Play size={14} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => cancel(item.id)}>
                  <Square size={14} />
                </Button>
              </div>
            </div>

            <div className="mt-2 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-accent transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              {item.status} - {item.progress}% {item.error ? `- ${item.error}` : ""}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/10 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Logs upload</p>
        <div className="max-h-48 space-y-1 overflow-auto text-xs text-zinc-300">
          {logs.length === 0 ? <p className="text-zinc-500">Aucun log pour le moment.</p> : null}
          {logs.map((log) => (
            <p key={log.id}>
              [{new Date(log.createdAt).toLocaleTimeString()}] {log.fileName} - {log.status} - {log.message}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
