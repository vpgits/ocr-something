import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addFile, clearFile, getCurrentFile } from "@/features/file/fileSlice";
import { FileType } from "@/types/file";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function UploadForm() {
  const form = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const selectedFile = useAppSelector(getCurrentFile);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      let fileContent = e.target?.result!;
      let images: string[] = [];
      if (file.type === "application/pdf") {
        var loadingTask = pdfjsLib.getDocument(fileContent);
        loadingTask.promise.then(async function (pdfDocument) {
          console.log("PDF Loaded");
          const numPages = pdfDocument.numPages;
          console.log("Number of pages: " + numPages);
          for (let i = 1; i <= numPages; i++) {
            console.log("Processing page: " + i);
            const page = await pdfDocument.getPage(i);
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context!,
              viewport: viewport,
            };
            await page.render(renderContext).promise;

            const image = canvas.toDataURL("image/png");
            images.push(image as string);
          }

          dispatchFileData(images);
        });
      } else {
        dispatchFileData([fileContent as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  const dispatchFileData = (fileContent: string[]) => {
    if (!file) return;
    dispatch(
      addFile({
        selectedFile: {
          name: file.name,
          size: file.size,
          lastModified: file.lastModified,
        },
        fileType: file.type as FileType,
        fileContent: fileContent,
        result: null,
      })
    );
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(clearFile());
    form.current?.reset();
  };

  return (
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle>Select a file</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4"
          ref={form}
        >
          <label htmlFor="file">
            File
            <input type="file" name="file" onChange={handleFileChange} />
          </label>
          <Button type="submit" disabled={!!selectedFile}>
            Process
          </Button>
          <Button
            variant="destructive"
            disabled={!selectedFile}
            onClick={handleClear}
          >
            Clear
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
