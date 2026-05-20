"use client";

import { useInterviewStore } from "@/store/interview-store";
import AiQuestion from "./_components/AiQuestion";
import AnswerInput from "./_components/AnswerInput";
import BrowseJobsBtn from "./_components/BrowseJobsBtn";
import FollowupQuestion from "./_components/FollowupQuestion";
import InterviewHeader from "./_components/InterviewHeader";
import JobDescriptionInput from "./_components/JobDescriptionInput";
import PageHero from "./_components/PageHero";
import SummaryScreen from "./_components/SummaryScreen";

export default function Interview() {
  const questions = useInterviewStore((state) => state.questions);
  const interviewComplete = useInterviewStore(
    (state) => state.interviewComplete,
  );
  const currentQuestionIndex = useInterviewStore(
    (state) => state.currentQuestionIndex,
  );

  const inSession = questions.length > 0 && !interviewComplete;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {inSession && <InterviewHeader />}

      <main
        className={`flex-1 flex flex-col items-center justify-center px-4 ${
          inSession ? "pt-14" : ""
        }`}
      >
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {questions.length === 0 ? (
            <>
              <PageHero />
              <JobDescriptionInput />
              <BrowseJobsBtn />
            </>
          ) : !interviewComplete ? (
            <>
              <AiQuestion key={currentQuestionIndex} />
              <FollowupQuestion />
              <AnswerInput />
            </>
          ) : (
            <SummaryScreen />
          )}
        </div>
      </main>
    </div>
  );
}
