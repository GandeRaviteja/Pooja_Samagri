import { Flame } from "lucide-react";

const Footer = () => (
  <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50 py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron-light to-saffron-dark flex items-center justify-center">
            <Flame className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">Divya Pooja Samagri</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>

        <p className="text-muted-foreground/60 text-xs">
          © 2026 Divya Pooja Samagri. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
