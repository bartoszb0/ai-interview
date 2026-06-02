import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionResult = {
  readonly length: number;
  [index: number]: { transcript: string };
};

type SpeechRecognitionResultList = {
  readonly length: number;
  [Symbol.iterator](): Iterator<SpeechRecognitionResult>;
};

type SpeechRecognitionEvent = {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

type Options = {
  onTranscript: (text: string) => void;
};

export function useSpeechRecognition({ onTranscript }: Options) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  const isSupported =
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const createInstance = useCallback(() => {
    recognitionRef.current?.abort();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      onTranscriptRef.current(transcript);
    };

    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    return recognition;
  }, []);

  const toggle = useCallback(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      const recognition = createInstance();
      recognition.start();
      setIsRecording(true);
    }
  }, [isRecording, createInstance]);

  const reset = useCallback(() => {
    recognitionRef.current?.abort();
    setIsRecording(false);
  }, []);

  return { isRecording, toggle, reset, isSupported };
}
