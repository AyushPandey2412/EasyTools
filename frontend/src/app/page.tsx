import { TestView } from "@/views/test/TestView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-50 text-slate-800">
      <TestView />
    </main>
  );
}
