import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEvaluateAnswer } from "@/hooks/useEvaluateAnswer";
import { useGenerateAnswer } from "@/hooks/useGenerateAnswer";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Loader2, Mic, MicOff, Sparkles } from "lucide-react";
import { useState } from "react";

export default function AnswerInput() {
  const [answer, setAnswer] = useState("");

  const { isRecording, toggle, reset, isSupported } = useSpeechRecognition({
    onTranscript: setAnswer,
  });

  const { evaluateAnswer, isEvaluating } = useEvaluateAnswer(
    answer,
    setAnswer,
    reset,
  );
  const { generateAnswerAI, isGenerating } = useGenerateAnswer(setAnswer);

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Your answer
        </span>
        <div className="flex gap-1">
          {isSupported && (
            <Button
              size="icon"
              variant="ghost"
              onClick={toggle}
              className={`h-7 w-7 transition-colors ${isRecording ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-primary/50"}`}
            >
              {isRecording ? (
                <Mic className="w-3.5 h-3.5" />
              ) : (
                <MicOff className="w-3.5 h-3.5" />
              )}
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            disabled={isGenerating}
            onClick={generateAnswerAI}
            className="h-7 w-7 text-muted-foreground hover:text-primary/80"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin w-3.5 h-3.5" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </div>

      <Textarea
        rows={3}
        placeholder={isRecording ? "Listening..." : "Type your answer here..."}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isEvaluating}
        className={`bg-card [field-sizing:content] min-h-20 placeholder:text-muted-foreground/40 text-foreground resize-none transition-colors duration-200 ${
          isRecording ? "border-primary" : "border-border"
        }`}
      />

      <Button
        onClick={evaluateAnswer}
        disabled={!answer.trim()}
        isLoading={isEvaluating}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0"
      >
        Submit Answer
      </Button>
    </div>
  );
}
