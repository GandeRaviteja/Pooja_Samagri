import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, Loader2, CheckCircle2 } from "lucide-react";

type MicState = "idle" | "listening" | "processing" | "results";

const LANG_CODE_MAP: Record<string, string> = {
  "English": "en-IN",
  "हिन्दी": "hi-IN",
  "తెలుగు": "te-IN",
  "தமிழ்": "ta-IN",
};

const LANG_LABELS: Record<string, Record<string, string>> = {
  idle: { English: "Tap to speak", "हिन्दी": "बोलने के लिए टैप करें", "తెలుగు": "మాట్లాడటానికి నొక్కండి", "தமிழ்": "பேச தட்டவும்" },
  listening: { English: "🎙️ Listening…", "हिन्दी": "🎙️ सुन रहा हूँ…", "తెలుగు": "🎙️ వింటున్నాను…", "தமிழ்": "🎙️ கேட்கிறேன்…" },
  processing: { English: "✨ Finding products…", "हिन्दी": "✨ उत्पाद ढूंढ रहे हैं…", "తెలుగు": "✨ ఉత్పత్తులు వెతుకుతున్నాము…", "தமிழ்": "✨ பொருட்களைத் தேடுகிறோம்…" },
  results: { English: "✅ Scroll down for results", "हिन्दी": "✅ परिणामों के लिए नीचे स्क्रॉल करें", "తెలుగు": "✅ ఫలితాల కోసం క్రిందికి స్క్రోల్ చేయండి", "தமிழ்": "✅ முடிவுகளுக்கு கீழே உருட்டவும்" },
  autoSubmit: { English: "Auto-submits after 3s pause", "हिन्दी": "3 सेकंड बाद ऑटो-सबमिट", "తెలుగు": "3 సెకన్ల తర్వాత ఆటో-సబ్మిట్", "தமிழ்": "3 வினாடிகளில் தானாக சமர்ப்பிக்கும்" },
  resultsFound: { English: "Results found!", "हिन्दी": "परिणाम मिले!", "తెలుగు": "ఫలితాలు దొరికాయి!", "தமிழ்": "முடிவுகள் கிடைத்தன!" },
};

interface FloatingMicProps {
  onResults?: (query: string) => void;
  lang?: string;
}

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const SILENCE_TIMEOUT = 3000;

const FloatingMic = ({ onResults, lang = "English" }: FloatingMicProps) => {
  const [state, setState] = useState<MicState>("idle");
  const [displayTranscript, setDisplayTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [detectedLang, setDetectedLang] = useState("");

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transcriptRef = useRef("");
  const interimRef = useRef("");
  const onResultsRef = useRef(onResults);
  onResultsRef.current = onResults;

  const t = (key: string) => LANG_LABELS[key]?.[lang] || LANG_LABELS[key]?.English || key;

  const scrollToResults = () => {
    setTimeout(() => {
      const grid = document.querySelector("[data-product-grid]");
      grid?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  };

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  const doFinish = useCallback(() => {
    isListeningRef.current = false;
    clearSilenceTimer();
    recognitionRef.current?.stop();

    const finalQuery = (transcriptRef.current + " " + interimRef.current).trim();
    transcriptRef.current = finalQuery;
    interimRef.current = "";
    setDisplayTranscript(finalQuery);
    setInterimText("");

    if (finalQuery) {
      setState("processing");
      setDetectedLang("Auto-detected");
      setTimeout(() => {
        setState("results");
        onResultsRef.current?.(finalQuery);
        scrollToResults();
        setTimeout(() => setState("idle"), 4000);
      }, 800);
    } else {
      setState("idle");
    }
  }, []);

  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      if (isListeningRef.current) {
        doFinish();
      }
    }, SILENCE_TIMEOUT);
  }, [doFinish]);

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setState("listening");
      transcriptRef.current = "";
      interimRef.current = "";
      setDisplayTranscript("");
      setInterimText("");
      setTimeout(() => {
        transcriptRef.current = "Lakshmi pooja items";
        setDisplayTranscript("Lakshmi pooja items");
        setState("processing");
        setDetectedLang("English");
        setTimeout(() => {
          setState("results");
          onResultsRef.current?.("Lakshmi pooja items");
          scrollToResults();
          setTimeout(() => setState("idle"), 4000);
        }, 800);
      }, 3000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = LANG_CODE_MAP[lang] ?? "en-IN";

    recognition.onresult = (event: any) => {
      let interim = "";
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += t;
        } else {
          interim += t;
        }
      }
      if (finalText) {
        transcriptRef.current = (transcriptRef.current ? transcriptRef.current + " " + finalText : finalText).trim();
        interimRef.current = "";
        setDisplayTranscript(transcriptRef.current);
        setInterimText("");
      } else {
        interimRef.current = interim;
        setInterimText(interim);
      }
      resetSilenceTimer();
    };

    recognition.onerror = (event: any) => {
      if (event.error === "no-speech") {
        if (isListeningRef.current && (transcriptRef.current || interimRef.current)) {
          doFinish();
        }
        return;
      }
      isListeningRef.current = false;
      clearSilenceTimer();
      setState("idle");
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        try { recognition.start(); } catch {}
      }
    };

    recognitionRef.current = recognition;
    isListeningRef.current = true;
    transcriptRef.current = "";
    interimRef.current = "";
    setDisplayTranscript("");
    setInterimText("");
    setDetectedLang("");
    setState("listening");
    recognition.start();
    resetSilenceTimer();
  }, [resetSilenceTimer, doFinish, lang]);

  const handleMicClick = () => {
    if (state === "listening") {
      doFinish();
      return;
    }
    if (state === "processing" || state === "results") return;
    startListening();
  };

  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      clearSilenceTimer();
      recognitionRef.current?.stop();
    };
  }, []);

  const WaveformBars = () => (
    <div className="flex items-center gap-[3px] h-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[3px] bg-primary-foreground rounded-full wave-bar"
          style={{ animationDelay: `${i * 0.13}s`, height: "6px" }}
        />
      ))}
    </div>
  );

  const shownText = interimText || displayTranscript;

  return (
    <>
      {state === "listening" && (
        <div className="fixed inset-0 bg-foreground/5 backdrop-blur-sm z-40 transition-all duration-500" />
      )}

      <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        {(state === "listening" || state === "processing" || state === "results") && shownText && (
          <div className="mb-4 animate-fade-in max-w-xs md:max-w-sm">
            <div className="glass rounded-2xl px-5 py-3 shadow-lg text-center">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                "{shownText}"
                {state === "listening" && interimText && (
                  <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                )}
              </p>
              {state === "listening" && (
                <p className="text-[10px] text-muted-foreground mt-1">{t("autoSubmit")}</p>
              )}
              {detectedLang && state === "results" && (
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-primary font-medium">{t("resultsFound")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="relative flex items-center justify-center">
          {state === "idle" && (
            <div className="absolute w-20 h-20 rounded-full border border-primary/10 breathe-glow" />
          )}
          {state === "listening" && (
            <>
              <div className="absolute w-20 h-20 rounded-full border-2 border-primary/40 mic-ring-1" />
              <div className="absolute w-20 h-20 rounded-full border-2 border-primary/25 mic-ring-2" />
              <div className="absolute w-20 h-20 rounded-full border-2 border-primary/10 mic-ring-3" />
            </>
          )}

          <button
            onClick={handleMicClick}
            className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 btn-ripple ${
              state === "idle"
                ? "bg-gradient-to-br from-saffron-light to-saffron-dark shadow-lg breathe-glow float-anim"
                : state === "listening"
                ? "bg-primary mic-pulse shadow-2xl shadow-primary/40"
                : state === "processing"
                ? "bg-gradient-to-br from-primary to-accent shadow-xl"
                : "bg-gradient-to-br from-accent to-gold-dark shadow-xl"
            }`}
            aria-label={
              state === "idle" ? "Start voice search" :
              state === "listening" ? "Stop listening" :
              "Processing"
            }
          >
            {state === "idle" && <Mic className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />}
            {state === "listening" && <WaveformBars />}
            {state === "processing" && <Loader2 className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground animate-spin" />}
            {state === "results" && <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />}
          </button>
        </div>

        <span className={`mt-2 text-xs font-medium transition-colors ${
          state === "listening" ? "text-primary" :
          state === "processing" ? "text-accent" :
          state === "results" ? "text-primary" :
          "text-muted-foreground"
        }`}>
          {t(state)}
        </span>
      </div>
    </>
  );
};

export default FloatingMic;
