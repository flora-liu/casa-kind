import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

function SkeletonLoader() {
  return (
    <div className="w-full h-full flex flex-col px-5 md:px-0 py-2 gap-y-3 md:gap-y-4">
      {Array(12)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className="w-full h-[20px] rounded-full" />
        ))}
    </div>
  );
}

export { Skeleton, SkeletonLoader };
