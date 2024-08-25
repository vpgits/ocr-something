import OCR from "./components/OCR";
import Result from "./components/Result";
import UploadForm from "./components/UploadForm";

function App() {
  return (
    <>
      <main className="flex flex-col gap-4 justify-between">
        <UploadForm />
        <OCR />
        <Result />
      </main>
    </>
  );
}

export default App;
