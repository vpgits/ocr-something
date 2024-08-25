export type FileType = "image/png" | "application/pdf" | null;

export interface FileData {
  name: string;
  size: number;
  lastModified: number;
}

export interface FileState {
  selectedFile: FileData | null;
  fileType: FileType;
  fileContent: string[] | null;
  result: string | null;
}
