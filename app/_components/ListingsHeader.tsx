import SortSelect from "./SortSelect";

export default function ListingsHeader({ totalCount }: { totalCount: number }) {
  return (
    <div className="flex flex-col text-center mx-4 mb-1">
      <span className="text-4xl font-bold">Job Listings</span>
      <div className="flex flex-row justify-between items-center gap-1 mt-1">
        <span className="text-md">
          Found <span className="text-primary">{totalCount}</span> jobs
        </span>
        <SortSelect />
      </div>
    </div>
  );
}
