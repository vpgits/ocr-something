import { useAppSelector } from "@/app/hooks";
import { selectResults } from "@/features/file/fileSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Result() {
  const results = useAppSelector(selectResults);

  return (
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 prose min-w-full">
        <pre className=" p-2 rounded">
          {results ? results : "No results available"}
        </pre>
      </CardContent>
    </Card>
  );
}
