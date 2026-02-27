import { useMemo } from "react";
import { X } from "lucide-react";
import ProductCard from "./ProductCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products, searchProducts, getProductName } from "@/data/products";

interface ProductGridProps {
  voiceQuery?: string;
  onClearVoice?: () => void;
  lang?: string;
}

const ProductGrid = ({ voiceQuery, onClearVoice, lang = "English" }: ProductGridProps) => {
  const sectionRef = useScrollReveal();

  const filtered = useMemo(() => searchProducts(voiceQuery || ""), [voiceQuery]);

  const isFiltered = voiceQuery?.trim() && filtered.length < products.length;

  return (
    <section className="py-14 md:py-20" data-product-grid>
      <div ref={sectionRef} className="container mx-auto px-4 scroll-reveal">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
              {isFiltered ? `🎯 Results for "${voiceQuery}"` : "🛕 Popular Pooja Items"}
            </h2>
            <p className="text-muted-foreground text-base">
              {isFiltered ? `${filtered.length} item${filtered.length > 1 ? "s" : ""} found` : "Everything you need for daily worship"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isFiltered && (
              <button
                onClick={onClearVoice}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors animate-fade-in"
              >
                <X className="w-3.5 h-3.5" />
                Clear search
              </button>
            )}
            <a href="/categories" className="text-primary text-sm font-medium hover:underline hidden sm:block">View All →</a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
          {filtered.slice(0, 12).map((product, i) => (
            <div key={product.name.English} className="animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <ProductCard name={getProductName(product, lang)} price={product.price} originalPrice={product.originalPrice} rating={product.rating} image={product.image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
