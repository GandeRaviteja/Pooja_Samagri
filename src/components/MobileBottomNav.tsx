import { Home, Grid3X3, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid3X3, label: "Categories", path: "/categories" },
    { spacer: true },
    { icon: ShoppingCart, label: "Cart", path: "#" },
    { icon: User, label: "Profile", path: "#" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass border-t border-border/50 shadow-lg">
      <div className="flex items-center justify-around py-2 px-2">
        {items.map((item, i) => {
          if ('spacer' in item && item.spacer) {
            return <div key={i} className="w-16" />;
          }
          const Icon = 'icon' in item ? item.icon : Home;
          const path = 'path' in item ? item.path : "/";
          const isActive = location.pathname === path;
          return (
            <button
              key={i}
              onClick={() => path !== "#" && navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors btn-ripple ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{'label' in item ? item.label : ''}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
