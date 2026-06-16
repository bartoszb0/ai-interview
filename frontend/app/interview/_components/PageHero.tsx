export default function PageHero() {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        AI Interview Trainer
      </h1>
      <p className="text-muted-foreground text-base">
        Paste a job description and get tailored interview questions
      </p>
    </div>
  );
}
