import InterviewBtn from "@/components/common/InterviewBtn";
import ProfileBtn from "../../components/common/ProfileBtn";
import SearchFilters from "./SearchFilters";

export default function Navbar() {
  return (
    <div className="flex bg-secondary w-full p-3">
      <div className="max-w-5xl w-full mx-auto flex justify-between">
        <SearchFilters />
        <div className="flex items-center gap-2">
          <InterviewBtn />
          <ProfileBtn />
        </div>
      </div>
    </div>
  );
}
