import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { products, categories, searchProducts, getProductName, getCategoryName, getCategoryDesc } from "@/data/products";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get("cat") || "all";
  const searchQuery = searchParams.get("q") || "";
  const [lang, setLang] = useState("English");
  const sectionRef = useScrollReveal();

  const filtered = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : products;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    return result;
  }, [activeCategory, searchQuery]);

  const setCategory = (catId: string) => {
    const params = new URLSearchParams(searchParams);
    if (catId === "all") params.delete("cat");
    else params.set("cat", catId);
    setSearchParams(params);
  };

  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar lang={lang} onLangChange={setLang} />
      <main className="container mx-auto px-4 py-8">
        {/* Back + Title */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl hover:bg-secondary/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {searchQuery
                ? `🔍 Results for "${searchQuery}"`
                : `${activeCat?.emoji || "🛕"} ${activeCat ? getCategoryName(activeCat, lang) : "All Items"}`}
            </h1>
            <p className="text-muted-foreground text-sm">
              {searchQuery
                ? `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`
                : activeCat ? getCategoryDesc(activeCat, lang) : "Browse all products"}
            </p>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-secondary"
              }`}
            >
              <span>{cat.emoji}</span>
              {getCategoryName(cat, lang)}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div ref={sectionRef} className="scroll-reveal">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {filtered.map((product, i) => (
                <div key={product.name.English} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCard
                    name={getProductName(product, lang)}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={product.rating}
                    image={product.image}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">🙏</p>
              <p className="text-lg font-medium text-foreground mb-1">No products found</p>
              <p className="text-muted-foreground text-sm">Try a different category or search term</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Categories;
