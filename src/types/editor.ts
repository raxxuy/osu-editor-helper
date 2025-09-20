export type File = {
  content: string;
  directory: string;
  absolutePath: string;
};

export type FileHistory = {
  absolutePath: string;
  filename: string;
  lastOpened: number;
};
