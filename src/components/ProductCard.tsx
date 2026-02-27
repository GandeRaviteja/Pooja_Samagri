import { useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
}

const ProductCard = ({ name, price, originalPrice, rating, image }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1.5">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform btn-ripple"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:bg-saffron-dark transition-colors text-sm shadow-lg btn-ripple">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-foreground mb-1.5 leading-snug line-clamp-2">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">₹{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
