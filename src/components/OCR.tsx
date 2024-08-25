import { useState, useCallback } from "react";
import { createWorker } from "tesseract.js";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addResults, selectFile } from "@/features/file/fileSlice";

const OCRComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { fileContent, selectedFile } = useAppSelector(selectFile);
  const dispatch = useAppDispatch();
  const { name: fileName } = selectedFile || {};

  const performOCR = useCallback(async () => {
    if (!fileContent || fileContent?.length === 0) {
      console.error("No image data available");
      return;
    }

    setIsLoading(true);
    let worker;
    let ocrText: string = "";

    try {
      worker = await createWorker({ logger: (m) => console.log(m) });
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      for (let i = 0; i < fileContent.length; i++) {
        const {
          data: { text },
        } = await worker.recognize(fileContent[i] as string);
        ocrText += text;
      }
      dispatch(addResults(ocrText));
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      await worker?.terminate();
      setIsLoading(false);
    }
  }, [fileContent]);

  return (
    <Card className="flex  flex-col items-center">
      <CardHeader>
        <CardTitle>OCR Processing</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {fileName && fileContent && (
          <div className="flex justify-center">
            {fileContent.map((content, i) => (
              <img
                key={i}
                src={content as string}
                alt={fileName || "Uploaded image - " + i}
                className="mb-4 max-w-full h-auto"
              />
            ))}
          </div>
        )}
        <Button onClick={performOCR} disabled={isLoading || !fileName}>
          {isLoading ? "Processing..." : "Perform OCR"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OCRComponent;
