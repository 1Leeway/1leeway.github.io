export interface User {
  id: string;
  discordId: string;
  username: string;
  avatar?: string | null;
  banner?: string | null;
  displayName?: string | null;
  theme: string;
}

export interface CloudFile {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  sizeBytes: string | number;
  createdAt: string;
  isFavorite: boolean;
}

export interface Folder {
  id: string;
  parentId?: string | null;
  name: string;
  path: string;
  createdAt: string;
  isFavorite: boolean;
}

export interface ShareLink {
  id: string;
  token: string;
  readOnly: boolean;
  allowDownload: boolean;
  expiresAt?: string | null;
}
