import { Editor } from "./_components/editor";
import { Navbar } from "./_components/navbar";
import { Toolbar } from "./_components/toolbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <div className="flex flex-col px-4 pt-2 gap-2 fixed top-0 left-0 right-0 z-[10] bg-[#fafbfd] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
}
