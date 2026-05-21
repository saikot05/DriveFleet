import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
      <Spinner color="secondary" size="lg" />
    </div>
  );
}


export default Loading;
