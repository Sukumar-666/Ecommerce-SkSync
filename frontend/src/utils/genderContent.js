import { useAuth } from "../context/AuthContext";

// Central place mapping gender -> categories, banners, offers copy, and hero
// images. Every personalized page (Homepage, Products, Categories, Offers,
// etc.) reads from this. Default is set to MALE with full men's grooming pics.
export const GENDER_CONTENT = {
  male: {
    label: "Men",
    heroTagline: "High-Performance Grooming & Skincare Engineered For Men.",
    categories: ["Skincare", "Beard & Shave", "Haircare & Styling", "Luxury Fragrances"],
    heroSlides: [
      {
        image: "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Men's Hydrating Facial Care Routine"
      },
      {
        image: "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Beard Grooming & Precision Care"
      },
      {
        image: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "SkSync Men Active Charcoal Collection"
      },
      {
        image: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Post-Workout Men's Energy Refresh"
      }
    ],
    categoryCards: [
      {
        label: "Men's Skincare",
        subtitle: "Deep Clean & Oil Control",
        image: "https://www.mankind.co.uk/images?url=https://blogscdn.thehut.net/wp-content/uploads/sites/32/2018/09/03174215/1200x672_205645746_MC_MK_Mankind_March_Bespoke_Shot5_1200x672_acf_cropped.jpg&auto=avif&width=1200&fit=crop"
      },
      {
        label: "Beard & Shave",
        subtitle: "Balms, Oils & Shave Gel",
        image: "https://www.u16.co.in/cdn/shop/files/download_9.png?v=1728038568&width=832"
      },
      {
        label: "Haircare & Clay",
        subtitle: "Matte Finish & Volume",
        image: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        label: "Luxury Fragrances",
        subtitle: "Woody, Spicy & Aquatic Colognes",
        image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        label: "Body & Shower Care",
        subtitle: "Refreshing Wash & Exfoliating Scrub",
        image: "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        label: "Grooming Kits",
        subtitle: "All-in-One Travel & Daily Essentials",
        image: "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
    ],
    offerBanner: "⚡ BIG BILLION MEN SALE: Up to 40% OFF Men's Skincare & Grooming Kits + Extra 15% OFF with code MENKING15",
    recommendationsTitle: "Curated Men's Best-Sellers"
  },
  female: {
    label: "Women",
    heroTagline: "Curated beauty essentials, picked for you.",
    categories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Body Care", "Beauty Combos"],
    heroSlides: [
      { image: "https://images.pexels.com/photos/3735622/pexels-photo-3735622.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Women's cosmetics shelf display" },
      { image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Skincare flat lay" },
      { image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Makeup products close up" }
    ],
    categoryCards: [
      { label: "Skincare", subtitle: "Glow & Hydration", image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Makeup", subtitle: "Lipsticks & Palettes", image: "https://images.pexels.com/photos/2688992/pexels-photo-2688992.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Haircare", subtitle: "Nourishing Serums", image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Fragrances", subtitle: "Floral & Sensual", image: "https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Body Care", subtitle: "Body Butter & Lotion", image: "https://images.pexels.com/photos/3735622/pexels-photo-3735622.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Beauty Combos", subtitle: "Complete Daily Care Sets", image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    offerBanner: "Up to 30% off women's skincare & makeup essentials this week.",
    recommendationsTitle: "Recommended For You"
  }
};

// Default is set to 'male' so all entering users see the Men's Cosmetics & Grooming pictures & products first
const DEFAULT_GENDER = "male";

export function useGenderContent() {
  const { session } = useAuth();
  const gender = session?.gender ? session.gender : DEFAULT_GENDER;
  return { gender, content: GENDER_CONTENT[gender] || GENDER_CONTENT.male };
}

