import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
      <Spinner color="secondary" size="lg" />
    </div>
  );
}
