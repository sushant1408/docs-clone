import { Editor } from "./_components/editor";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Editor />
    </div>
  );
}
