interface HeroSectionProps {
  lang?: string;
}

const HERO_STRINGS: Record<string, { badge: string; title1: string; title2: string; subtitle: string; examples: string[] }> = {
  English: {
    badge: "India's First Voice-Based Pooja Platform",
    title1: "🙏 Speak Your",
    title2: "Pooja Needs",
    subtitle: "No typing needed. Just speak in your language — Hindi, Telugu, Tamil or English.",
    examples: ["Big size agarbatti", "Lakshmi pooja items", "Ganesh pooja set"],
  },
  "हिन्दी": {
    badge: "भारत का पहला वॉइस-आधारित पूजा प्लेटफ़ॉर्म",
    title1: "🙏 बोलिए अपनी",
    title2: "पूजा ज़रूरतें",
    subtitle: "टाइप करने की ज़रूरत नहीं। बस अपनी भाषा में बोलें।",
    examples: ["बड़ी अगरबत्ती", "लक्ष्मी पूजा सामान", "गणेश पूजा सेट"],
  },
  "తెలుగు": {
    badge: "భారతదేశపు మొట్టమొదటి వాయిస్ ఆధారిత పూజ ప్లాట్‌ఫారమ్",
    title1: "🙏 మీ పూజ",
    title2: "అవసరాలు చెప్పండి",
    subtitle: "టైప్ చేయవలసిన అవసరం లేదు. మీ భాషలో మాట్లాడండి.",
    examples: ["పెద్ద అగరబత్తి", "లక్ష్మి పూజ సామాను", "గణేష పూజ సెట్"],
  },
  "தமிழ்": {
    badge: "இந்தியாவின் முதல் குரல் அடிப்படையிலான பூஜை தளம்",
    title1: "🙏 உங்கள் பூஜை",
    title2: "தேவைகளைச் சொல்லுங்கள்",
    subtitle: "தட்டச்சு செய்ய வேண்டியதில்லை. உங்கள் மொழியில் பேசுங்கள்.",
    examples: ["பெரிய ஊதுபத்தி", "லட்சுமி பூஜை பொருட்கள்", "கணேஷ பூஜை செட்"],
  },
};

const HeroSection = ({ lang = "English" }: HeroSectionProps) => {
  const s = HERO_STRINGS[lang] || HERO_STRINGS.English;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden mandala-bg">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-3xl" />

      <div className="relative container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {s.badge}
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-5 animate-fade-in leading-tight">
          {s.title1} <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {s.title2}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {s.subtitle}
        </p>

        {/* Voice prompt examples */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {s.examples.map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
            >
              🎤 "{item}"
            </span>
          ))}
        </div>

        {/* Spacer for floating mic area */}
        <div className="h-32 md:h-16" />
      </div>
    </section>
  );
};

export default HeroSection;
