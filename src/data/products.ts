import productAgarbatti from "@/assets/product-agarbatti.jpg";
import productDiya from "@/assets/product-diya.jpg";
import productKumkum from "@/assets/product-kumkum.jpg";
import productMala from "@/assets/product-mala.jpg";
import productChandan from "@/assets/product-chandan.jpg";
import productKapoor from "@/assets/product-kapoor.jpg";
import productThali from "@/assets/product-thali.jpg";
import productNariyal from "@/assets/product-nariyal.jpg";
import productGhanti from "@/assets/product-ghanti.jpg";
import productBatti from "@/assets/product-batti.jpg";
import productGhee from "@/assets/product-ghee.jpg";
import productHaldi from "@/assets/product-haldi.jpg";
import productKalash from "@/assets/product-kalash.jpg";
import productMoli from "@/assets/product-moli.jpg";

export type LangKey = "English" | "हिन्दी" | "తెలుగు" | "தமிழ்";

export interface Product {
  name: Record<LangKey, string>;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  keywords: string[];
}

export interface Category {
  id: string;
  name: Record<LangKey, string>;
  emoji: string;
  description: Record<LangKey, string>;
}

export const categories: Category[] = [
  { id: "all", emoji: "🛕",
    name: { English: "All Items", "हिन्दी": "सभी सामान", "తెలుగు": "అన్ని వస్తువులు", "தமிழ்": "அனைத்தும்" },
    description: { English: "Browse everything", "हिन्दी": "सब कुछ देखें", "తెలుగు": "అన్నీ చూడండి", "தமிழ்": "அனைத்தையும் பாருங்கள்" },
  },
  { id: "dhoop-agarbatti", emoji: "🪔",
    name: { English: "Dhoop & Agarbatti", "हिन्दी": "धूप और अगरबत्ती", "తెలుగు": "ధూపం & అగరబత్తి", "தமிழ்": "தூபம் & ஊதுபத்தி" },
    description: { English: "Incense sticks & cones", "हिन्दी": "अगरबत्ती और धूप", "తెలుగు": "అగరబత్తి మరియు ధూపం", "தமிழ்": "ஊதுபத்தி & தூபம்" },
  },
  { id: "diya-lamp", emoji: "🕯️",
    name: { English: "Diya & Lamps", "हिन्दी": "दीया और दीपक", "తెలుగు": "దీపాలు", "தமிழ்": "தீபங்கள்" },
    description: { English: "Brass & clay lamps", "हिन्दी": "पीतल और मिट्टी के दीये", "తెలుగు": "ఇత్తడి & మట్టి దీపాలు", "தமிழ்": "பித்தளை & மண் விளக்குகள்" },
  },
  { id: "pooja-powder", emoji: "🔴",
    name: { English: "Pooja Powders", "हिन्दी": "पूजा पाउडर", "తెలుగు": "పూజ పొడులు", "தமிழ்": "பூஜை பொடிகள்" },
    description: { English: "Kumkum, chandan, haldi", "हिन्दी": "कुमकुम, चंदन, हल्दी", "తెలుగు": "కుంకుమ, చందనం, పసుపు", "தமிழ்": "குங்குமம், சந்தனம், மஞ்சள்" },
  },
  { id: "flowers-mala", emoji: "🌸",
    name: { English: "Flowers & Mala", "हिन्दी": "फूल और माला", "తెలుగు": "పూలు & మాలలు", "தமிழ்": "பூக்கள் & மாலைகள்" },
    description: { English: "Garlands & fresh flowers", "हिन्दी": "मालाएँ और ताज़े फूल", "తెలుగు": "మాలలు & తాజా పూలు", "தமிழ்": "மாலைகள் & புதிய பூக்கள்" },
  },
  { id: "brass-items", emoji: "🔔",
    name: { English: "Brass Utensils", "हिन्दी": "पीतल के बर्तन", "తెలుగు": "ఇత్తడి పాత్రలు", "தமிழ்": "பித்தளை பாத்திரங்கள்" },
    description: { English: "Thali, kalash, ghanti", "हिन्दी": "थाली, कलश, घंटी", "తెలుగు": "పళ్ళెం, కలశం, గంట", "தமிழ்": "தட்டு, கலசம், மணி" },
  },
  { id: "pooja-essentials", emoji: "🥥",
    name: { English: "Pooja Essentials", "हिन्दी": "पूजा सामग्री", "తెలుగు": "పూజ సామగ్రి", "தமிழ்": "பூஜை பொருட்கள்" },
    description: { English: "Nariyal, ghee, moli", "हिन्दी": "नारियल, घी, मोली", "తెలుగు": "కొబ్బరి, నెయ్యి, దారం", "தமிழ்": "தேங்காய், நெய், நூல்" },
  },
];

export const products: Product[] = [
  { name: { English: "Premium Agarbatti Set", "हिन्दी": "प्रीमियम अगरबत्ती सेट", "తెలుగు": "ప్రీమియం అగరబత్తి సెట్", "தமிழ்": "பிரீமியம் ஊதுபத்தி செட்" }, price: 149, originalPrice: 249, rating: 4.5, image: productAgarbatti, category: "dhoop-agarbatti", keywords: ["agarbatti", "incense", "dhoop", "fragrance", "pooja", "अगरबत्ती", "ధూపం", "ஊதுபத்தி"] },
  { name: { English: "Brass Diya (Large)", "हिन्दी": "पीतल का दीया (बड़ा)", "తెలుగు": "ఇత్తడి దీపం (పెద్ద)", "தமிழ்": "பித்தளை தீபம் (பெரியது)" }, price: 299, originalPrice: 499, rating: 4.8, image: productDiya, category: "diya-lamp", keywords: ["diya", "lamp", "deepak", "brass", "lakshmi", "pooja", "light", "दीया", "దీపం", "தீபம்"] },
  { name: { English: "Pure Kumkum Box", "हिन्दी": "शुद्ध कुमकुम डिब्बा", "తెలుగు": "స్వచ్ఛమైన కుంకుమ బాక్స్", "தமிழ்": "சுத்தமான குங்குமம் பெட்டி" }, price: 79, rating: 4.3, image: productKumkum, category: "pooja-powder", keywords: ["kumkum", "sindoor", "tikka", "pooja", "lakshmi", "ganesh", "कुमकुम", "కుంకుమ", "குங்குமம்"] },
  { name: { English: "Marigold Mala (Fresh)", "हिन्दी": "गेंदे की माला (ताज़ी)", "తెలుగు": "బంతి పూల మాల (తాజా)", "தமிழ்": "சாமந்தி மாலை (புதியது)" }, price: 49, rating: 4.6, image: productMala, category: "flowers-mala", keywords: ["mala", "garland", "marigold", "flower", "pooja", "ganesh", "lakshmi", "माला", "మాల", "மாலை"] },
  { name: { English: "Chandan Powder", "हिन्दी": "चंदन पाउडर", "తెలుగు": "చందనం పొడి", "தமிழ்": "சந்தனப் பொடி" }, price: 129, originalPrice: 199, rating: 4.4, image: productChandan, category: "pooja-powder", keywords: ["chandan", "sandalwood", "tilak", "pooja", "चंदन", "చందనం", "சந்தனம்"] },
  { name: { English: "Pure Kapoor Pack", "हिन्दी": "शुद्ध कपूर पैक", "తెలుగు": "స్వచ్ఛమైన కర్పూరం ప్యాక్", "தமிழ்": "சுத்தமான கற்பூரம் பேக்" }, price: 99, rating: 4.7, image: productKapoor, category: "dhoop-agarbatti", keywords: ["kapoor", "camphor", "aarti", "pooja", "कपूर", "కర్పూరం", "கற்பூரம்"] },
  { name: { English: "Brass Pooja Thali", "हिन्दी": "पीतल की पूजा थाली", "తెలుగు": "ఇత్తడి పూజ పళ్ళెం", "தமிழ்": "பித்தளை பூஜை தட்டு" }, price: 399, originalPrice: 599, rating: 4.9, image: productThali, category: "brass-items", keywords: ["thali", "plate", "brass", "pooja", "aarti", "थाली", "పళ్ళెం", "தட்டு"] },
  { name: { English: "Pooja Nariyal", "हिन्दी": "पूजा नारियल", "తెలుగు": "పూజ కొబ్బరి", "தமிழ்": "பூஜை தேங்காய்" }, price: 39, rating: 4.2, image: productNariyal, category: "pooja-essentials", keywords: ["nariyal", "coconut", "shreefal", "pooja", "नारियल", "కొబ్బరి", "தேங்காய்"] },
  { name: { English: "Brass Ghanti (Bell)", "हिन्दी": "पीतल की घंटी", "తెలుగు": "ఇత్తడి గంట", "தமிழ்": "பித்தளை மணி" }, price: 249, originalPrice: 399, rating: 4.6, image: productGhanti, category: "brass-items", keywords: ["ghanti", "bell", "brass", "aarti", "pooja", "घंटी", "గంట", "மணி"] },
  { name: { English: "Cotton Batti Pack", "हिन्दी": "कॉटन बत्ती पैक", "తెలుగు": "కాటన్ వత్తి ప్యాక్", "தமிழ்": "பருத்தி திரி பேக்" }, price: 29, rating: 4.4, image: productBatti, category: "diya-lamp", keywords: ["batti", "wick", "cotton", "diya", "pooja", "बत्ती", "వత్తి", "திரி"] },
  { name: { English: "Pure Desi Ghee", "हिन्दी": "शुद्ध देसी घी", "తెలుగు": "స్వచ్ఛమైన దేశీ నెయ్యి", "தமிழ்": "சுத்தமான நாட்டு நெய்" }, price: 199, originalPrice: 299, rating: 4.8, image: productGhee, category: "pooja-essentials", keywords: ["ghee", "desi", "cow", "pooja", "diya", "lamp", "घी", "నెయ్యి", "நெய்"] },
  { name: { English: "Haldi Powder", "हिन्दी": "हल्दी पाउडर", "తెలుగు": "పసుపు పొడి", "தமிழ்": "மஞ்சள் பொடி" }, price: 59, rating: 4.5, image: productHaldi, category: "pooja-powder", keywords: ["haldi", "turmeric", "tilak", "pooja", "हल्दी", "పసుపు", "மஞ்சள்"] },
  { name: { English: "Brass Kalash", "हिन्दी": "पीतल का कलश", "తెలుగు": "ఇత్తడి కలశం", "தமிழ்": "பித்தளை கலசம்" }, price: 349, originalPrice: 549, rating: 4.7, image: productKalash, category: "brass-items", keywords: ["kalash", "lota", "water", "brass", "pooja", "कलश", "కలశం", "கலசம்"] },
  { name: { English: "Sacred Moli Thread", "हिन्दी": "पवित्र मोली धागा", "తెలుగు": "పవిత్ర మోళి దారం", "தமிழ்": "புனித மோலி நூல்" }, price: 19, rating: 4.3, image: productMoli, category: "pooja-essentials", keywords: ["moli", "thread", "kalawa", "sacred", "pooja", "मोली", "దారం", "நூல்"] },
];

export function getProductName(product: Product, lang: string): string {
  return product.name[lang as LangKey] || product.name.English;
}

export function getCategoryName(cat: Category, lang: string): string {
  return cat.name[lang as LangKey] || cat.name.English;
}

export function getCategoryDesc(cat: Category, lang: string): string {
  return cat.description[lang as LangKey] || cat.description.English;
}

export function searchProducts(query: string): Product[] {
  if (!query?.trim()) return products;
  const words = query.toLowerCase().split(/\s+/);
  const matches = products.filter((p) => {
    const allNames = Object.values(p.name).map((n) => n.toLowerCase());
    const searchable = [...allNames, p.category, ...p.keywords];
    return words.some((w) => searchable.some((s) => s.includes(w) || w.includes(s)));
  });
  return matches.length > 0 ? matches : products;
}
