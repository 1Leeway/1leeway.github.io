import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/lib/api";

interface SharePreview {
  file: {
    name: string;
    mimeType: string;
    sizeBytes: number;
    previewUrl: string;
  };
  options: {
    allowDownload: boolean;
  };
}

export const SharePage = () => {
  const { token } = useParams();
  const [preview, setPreview] = useState<SharePreview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    api
      .get<SharePreview>(`/share/${token}`)
      .then((response) => setPreview(response.data))
      .catch(() => setError("Lien invalide ou expire"));
  }, [token]);

  if (error) {
    return <main className="grid min-h-screen place-items-center bg-background text-zinc-300">{error}</main>;
  }

  if (!preview) {
    return <main className="grid min-h-screen place-items-center bg-background text-zinc-300">Chargement...</main>;
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-card/90 p-6">
        <h1 className="font-display text-2xl">{preview.file.name}</h1>
        <p className="mt-2 text-sm text-zinc-400">{Math.ceil(preview.file.sizeBytes / 1024)} KB</p>
        {preview.options.allowDownload ? (
          <a
            href={`${import.meta.env.VITE_API_URL ?? "http://localhost:4000"}/share/${token}?download=1`}
            className="mt-6 inline-flex rounded-xl bg-accent px-4 py-2 text-sm font-semibold"
          >
            Telecharger
          </a>
        ) : null}
      </div>
    </main>
  );
};
