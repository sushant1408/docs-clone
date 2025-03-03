import { Editor } from "./_components/editor";
import { Toolbar } from "./_components/toolbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Toolbar />
      <Editor />
    </div>
  );
}
