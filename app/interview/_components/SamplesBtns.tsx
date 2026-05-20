import { Button } from "@/components/ui/button";
import { sampleJobDescriptions } from "@/lib/sample-jds";
import { useInterviewStore } from "@/store/interview-store";

export default function SamplesBtns() {
  const setJobDescription = useInterviewStore(
    (state) => state.setJobDescription,
  );

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm font-mono text-primary/70 uppercase tracking-widest self-center">
        Samples
      </span>
      {sampleJobDescriptions.map((job) => (
        <Button
          key={job.id}
          variant="outline"
          size="sm"
          onClick={() =>
            setJobDescription({
              description: job.jd,
              seniority: job.seniority,
            })
          }
          className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 bg-transparent"
        >
          {job.id}
        </Button>
      ))}
    </div>
  );
}
