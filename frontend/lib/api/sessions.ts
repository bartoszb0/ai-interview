import { QuestionRecord } from "@/types/questionRecord";
import { apiClient } from "./client";

type SaveSessionData = {
  jobTitle: string;
  jobDescription: string;
  jobSeniority: string;
  questionRecords: QuestionRecord[];
  overallScore: number;
  whatWentWell: string[];
  areasForImprovement: string[];
};

export function saveSession(data: SaveSessionData) {
  return apiClient("/sessions", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function listSessions() {
  return apiClient("/sessions");
}

export function getSession(id: string) {
  return apiClient(`/sessions/${id}`);
}

export function deleteSession(id: string) {
  return apiClient(`/sessions/${id}`, {
    method: "DELETE",
  });
}
