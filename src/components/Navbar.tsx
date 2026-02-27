import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Flame, ChevronDown, Search, User } from "lucide-react";

const languages = ["English", "हिन्दी", "తెలుగు", "தமிழ்"];

interface NavbarProps {
  lang: string;
  onLangChange: (lang: string) => void;
}

const Navbar = ({ lang, onLangChange }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [cartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/categories?q=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-card/80 backdrop-blur-xl shadow-md border-b border-border/50"
        : "bg-card/95 backdrop-blur-md border-b border-border"
    }`}>
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-light to-saffron-dark flex items-center justify-center shadow-sm">
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground leading-tight hidden sm:block">
            Divya Pooja Samagri
          </span>
        </button>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
          <div className={`relative w-full transition-all duration-200 ${searchFocused ? "scale-[1.02]" : ""}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search pooja items…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/70 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-card transition-all"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </form>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => navigate("/")} className="text-foreground hover:text-primary transition-colors">Home</button>
          <button onClick={() => navigate("/categories")} className="text-muted-foreground hover:text-primary transition-colors">Categories</button>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Offers</a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary/70 text-secondary-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              {lang} <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 glass rounded-xl shadow-xl overflow-hidden">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => { onLangChange(l); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      lang === l ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary/80"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <button className="relative p-2 rounded-xl hover:bg-secondary/70 transition-colors btn-ripple">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold animate-fade-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <button className="hidden sm:flex p-2 rounded-xl hover:bg-secondary/70 transition-colors btn-ripple">
            <User className="w-5 h-5 text-foreground" />
          </button>

          {/* Mobile menu toggle */}
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-xl px-4 py-4 space-y-3 animate-fade-in">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search pooja items…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/70 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </form>
          <button onClick={() => { navigate("/"); setMenuOpen(false); }} className="block text-lg font-medium text-foreground">Home</button>
          <button onClick={() => { navigate("/categories"); setMenuOpen(false); }} className="block text-lg font-medium text-muted-foreground">Categories</button>
          <a href="#" className="block text-lg font-medium text-muted-foreground">Offers</a>
          <div className="flex gap-2 pt-2 flex-wrap">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => { onLangChange(l); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === l
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
