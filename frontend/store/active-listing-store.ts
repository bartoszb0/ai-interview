import { Job } from "@/types/job";
import { create } from "zustand";

type ActiveListingStore = {
  activeListing: Job | null;
  setActiveListing: (job: Job) => void;
  resetActiveListing: () => void;
};

export const useActiveListingStore = create<ActiveListingStore>((set) => ({
  activeListing: null,
  setActiveListing: (job) => set({ activeListing: job }),
  resetActiveListing: () => set({ activeListing: null }),
}));
