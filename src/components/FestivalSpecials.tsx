import { useScrollReveal } from "@/hooks/useScrollReveal";
import festivalLakshmi from "@/assets/festival-lakshmi.jpg";
import festivalGanesh from "@/assets/festival-ganesh.jpg";
import festivalNavratri from "@/assets/festival-navratri.jpg";

const festivals = [
  {
    title: "Lakshmi Pooja Set",
    description: "Complete pooja kit with all essentials",
    price: "₹599",
    image: festivalLakshmi,
  },
  {
    title: "Ganesh Pooja Set",
    description: "Modak, flowers, diya & more",
    price: "₹499",
    image: festivalGanesh,
  },
  {
    title: "Navratri Special Kit",
    description: "9-day pooja essentials in one box",
    price: "₹899",
    image: festivalNavratri,
  },
];

const FestivalSpecials = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-14 md:py-20 bg-secondary/30">
      <div ref={sectionRef} className="container mx-auto px-4 scroll-reveal">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
              🪔 Festival Specials
            </h2>
            <p className="text-muted-foreground text-base">Complete pooja kits for upcoming festivals</p>
          </div>
          <a href="#" className="text-primary text-sm font-medium hover:underline hidden sm:block">View All →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map((fest, i) => (
            <div
              key={fest.title}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={fest.image}
                  alt={fest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">{fest.title}</h3>
                <p className="text-primary-foreground/80 text-sm mb-3">{fest.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold text-xl">{fest.price}</span>
                  <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-semibold hover:bg-saffron-dark transition-colors text-sm shadow-lg btn-ripple">
                    View Set
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalSpecials;
