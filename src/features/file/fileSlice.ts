import { FileState } from "@/types/file";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FileState = {
  selectedFile: null,
  fileType: null,
  fileContent: null,
  result: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<FileState>) => {
      state.fileContent = action.payload.fileContent;
      state.fileType = action.payload.fileType;
      state.selectedFile = action.payload.selectedFile;
    },
    clearFile: (state) => {
      state.fileContent = null;
      state.fileType = null;
      state.selectedFile = null;
      state.result = null;
    },
    addResults: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },
  },
});

export const { addFile, clearFile, addResults } = fileSlice.actions;

export const selectFile = (state: { file: FileState }) => state.file;

export const getCurrentFile = (state: { file: FileState }) =>
  state.file.selectedFile;

export const selectFileContent = (state: { file: FileState }) =>
  state.file.fileContent;

export const selectFileName = (state: { file: FileState }) =>
  state.file.selectedFile?.name;

export const selectFileType = (state: { file: FileState }) =>
  state.file.fileType;

export const selectResults = (state: { file: FileState }) => state.file.result;

export default fileSlice.reducer;
