import { useMemo, useRef, useState } from "react";

type UploadStatus = "idle" | "uploading" | "paused" | "done" | "error" | "cancelled";

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  controller?: AbortController;
  error?: string;
}

interface UploadLog {
  id: string;
  fileName: string;
  status: UploadStatus;
  message: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

interface UseUploadManagerOptions {
  onUploadSuccess?: () => void;
}

export const useUploadManager = ({ onUploadSuccess }: UseUploadManagerOptions = {}) => {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [logs, setLogs] = useState<UploadLog[]>([]);
  const csrfRef = useRef<string | null>(null);

  const pushLog = (fileName: string, status: UploadStatus, message: string) => {
    setLogs((current) => [
      {
        id: crypto.randomUUID(),
        fileName,
        status,
        message,
        createdAt: new Date().toISOString()
      },
      ...current
    ].slice(0, 80));
  };

  const queueFiles = (files: File[]) => {
    const next = files.map((file) => ({
      id: `${file.name}-${crypto.randomUUID()}`,
      file,
      progress: 0,
      status: "idle" as const
    }));
    setItems((current) => [...next, ...current]);
    files.forEach((file) => {
      pushLog(file.name, "idle", "Fichier ajoute a la file d'upload");
    });
  };

  const ensureCsrf = async () => {
    if (csrfRef.current) return csrfRef.current;
    const response = await fetch(`${API_URL}/auth/csrf-token`, {
      credentials: "include"
    });
    const data = (await response.json()) as { csrfToken?: string | null };
    csrfRef.current = data.csrfToken ?? null;
    return csrfRef.current;
  };

  const uploadOne = async (id: string, fileOverride?: File) => {
    const target = fileOverride ? { file: fileOverride } : items.find((item) => item.id === id);
    if (!target) return;

    const controller = new AbortController();

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "uploading", controller, error: undefined } : item
      )
    );
    pushLog(target.file.name, "uploading", "Upload demarre");

    const formData = new FormData();
    formData.append("files", target.file);

    const csrfToken = await ensureCsrf();

    try {
      const request = new XMLHttpRequest();
      request.open("POST", `${API_URL}/upload`);
      request.withCredentials = true;
      if (csrfToken) request.setRequestHeader("x-csrf-token", csrfToken);

      request.upload.onprogress = (event) => {
        if (!event.lengthComputable) return;
        const progress = Math.round((event.loaded / event.total) * 100);
        setItems((current) =>
          current.map((item) => (item.id === id ? { ...item, progress } : item))
        );
      };

      controller.signal.addEventListener("abort", () => {
        request.abort();
      });

      await new Promise<void>((resolve, reject) => {
        request.onload = () => {
          if (request.status >= 200 && request.status < 300) {
            resolve();
          } else {
            let payload: { message?: string } | null = null;
            if (request.responseText) {
              try {
                payload = JSON.parse(request.responseText) as { message?: string };
              } catch {
                payload = null;
              }
            }
            const message =
              request.status === 401
                ? "Session expiree, reconnecte-toi avec Discord"
                : payload?.message ?? `Upload failed (${request.status})`;
            reject(new Error(message));
          }
        };
        request.onerror = () => reject(new Error("Network error"));
        request.onabort = () => reject(new Error("aborted"));
        request.send(formData);
      });

      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, status: "done", progress: 100 } : item))
      );
      pushLog(target.file.name, "done", "Upload termine avec succes");
      onUploadSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload error";
      const status: UploadStatus = message === "aborted" ? "paused" : "error";
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, status, controller: undefined, error: message } : item
        )
      );
      pushLog(target.file.name, status, message);
    }
  };

  const uploadAll = async () => {
    const pendingItems = items.filter((item) => ["idle", "paused", "error"].includes(item.status));
    for (const item of pendingItems) {
      if (["idle", "paused", "error"].includes(item.status)) {
        // Sequential upload keeps progress handling simple and reliable.
        await uploadOne(item.id, item.file);
      }
    }
  };

  const pause = (id: string) => {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      target?.controller?.abort();
      return current;
    });
  };

  const cancel = (id: string) => {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      target?.controller?.abort();
      if (target) {
        pushLog(target.file.name, "cancelled", "Upload annule par l'utilisateur");
      }
      return current.map((item) => (item.id === id ? { ...item, status: "cancelled" } : item));
    });
  };

  const resume = async (id: string) => {
    await uploadOne(id);
  };

  const activeCount = useMemo(() => items.filter((item) => item.status === "uploading").length, [items]);
  const pendingCount = useMemo(
    () => items.filter((item) => ["idle", "paused", "error"].includes(item.status)).length,
    [items]
  );

  return {
    items,
    logs,
    queueFiles,
    uploadAll,
    pause,
    resume,
    cancel,
    activeCount,
    pendingCount
  };
};
