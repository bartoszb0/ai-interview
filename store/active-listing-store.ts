import { Job } from "@/types/job";
import { create } from "zustand";

type ActiveListingStore = {
  activeListing: Job | null;
  setActiveListing: (job: Job) => void;
  reset: () => void;
};

export const useActiveListingStore = create<ActiveListingStore>((set) => ({
  activeListing: null,
  setActiveListing: (job) => set({ activeListing: job }),
  reset: () => set({ activeListing: null }),
}));
