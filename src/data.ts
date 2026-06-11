import { BusinessLocation, Barber, ServiceItem, ProductItem } from "./types";

export const LOCATIONS: BusinessLocation[] = [
  {
    id: "44th-ave",
    name: "44th AVE",
    address: "44th Ave, Long Island City, NY 11101",
    phone: "(718) 433-4122",
    hours: {
      weekdays: "9:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    mapCoordinates: { lat: 40.7484, lng: -73.9412 },
    description: "Our pristine multi-chair flagship located on 44th Ave in Long Island City. Combining vintage styling benches with an open neighborhood atmosphere."
  },
  {
    id: "court-square",
    name: "COURT SQUARE",
    address: "Court Square, Long Island City, NY 11101",
    phone: "(718) 392-2311",
    hours: {
      weekdays: "8:00 AM - 8:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    mapCoordinates: { lat: 40.7468, lng: -73.9436 },
    description: "The historical roots of Otis & Finn. Court Square is where we started our dream, serving LIC locals with high-quality classic cuts."
  },
  {
    id: "greenpoint",
    name: "GREENPOINT",
    address: "Greenpoint, Brooklyn, NY 11222",
    phone: "(718) 389-1922",
    hours: {
      weekdays: "9:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    mapCoordinates: { lat: 40.7303, lng: -73.9515 },
    description: "Perched near the beautiful East River waterfront in Greenpoint, our Brooklyn location delivers premier styling to the creative community."
  },
  {
    id: "williamsburg",
    name: "WILLIAMSBURG",
    address: "Williamsburg, Brooklyn, NY 11211",
    phone: "(718) 782-9011",
    hours: {
      weekdays: "9:00 AM - 9:00 PM",
      saturday: "8:00 AM - 7:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    mapCoordinates: { lat: 40.7163, lng: -73.9599 },
    description: "Located in the vibrant heart of Williamsburg, Brooklyn, providing unmatched skin-fades and hot-towel premium scalp therapies."
  }
];

export const BARBERS: Barber[] = [
  // 44th Ave Location Barbers
  {
    id: "kirk-riley",
    name: "Kirk Riley",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179919/Kirk_Riley_44th_Road_2_p4ei5l.avif",
    locationId: "44th-ave",
    role: "Co-Founder & Head Barber",
    specialties: ["Traditional Shaves", "Classic Tapers", "Beard Sculpting"],
    rating: 4.9,
    introduction: "A 10-year fashion industry veteran, Kirk is the co-founder of Otis & Finn Barbershop. Before opening our first shop in Court Square in Long Island City, Kirk began his barbering career in Manhattan. Having lived in Queens for the past decade, Kirk wanted to open a shop in the borough that provided high-quality traditional barbering services while also creating a place for neighbors to come, meet, and get to know one another. That's how Otis and Finn Barbershop was born. In addition to overseeing the brand, Kirk currently serves as the head barber at our 44th Road location in Long Island City."
  },
  {
    id: "adrian-vance",
    name: "Adrian Vance",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179918/8c2f1d_c7ddf7cc3bdf4d28a8341e2e18fcda52_mv2_z8t2sd.avif",
    locationId: "44th-ave",
    role: "Senior Barber",
    specialties: ["Modern Textures", "High-Taper Fades", "Scissor Cuts"],
    rating: 4.8,
    introduction: "With over 8 years of intensive craft in Brooklyn and Queens, Adrian has earned a stellar reputation for precision-perfect crops. He combines classic hand-scissors technique with modern structural shapes, ensuring a cut that grows out perfectly over weeks."
  },
  {
    id: "milo-sterling",
    name: "Milo Sterling",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179918/ba0541_125125bb833c4eb798ceb3c9e83545df_mv2_tlinql.avif",
    locationId: "44th-ave",
    role: "Grooming Master",
    specialties: ["Straight Razor Shaves", "Hot Towel Facials", "Buzz Textures"],
    rating: 4.9,
    introduction: "Milo has mastered the authentic traditional grooming craft with an emphasis on therapeutic hot-shaves. His legendary straight-razor touch leaves the skin extremely smooth and refreshed. He views barbering as an active meditation, delivering ultimate relaxation to every patron."
  },
  {
    id: "julian-vance",
    name: "Julian Vance",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179919/Kirk_Riley_44th_Road_1_bqviuk.avif",
    locationId: "44th-ave",
    role: "Stylist & Line-Artist",
    specialties: ["Sharp Closures", "Long Hair Styling", "Signature Fades"],
    rating: 4.7,
    introduction: "Julian works at the crossroads of classic high-end dapper fashion and modern urban culture. Passionate about hair anatomy, Julian tailors exact styling lines that complement your organic facial boundaries. He treats grooming sessions as an exquisite high-art."
  },

  // Court Square Location Barbers
  {
    id: "leo-mercer",
    name: "Leo Mercer",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179921/Kirk_Riley_44th_Road_idvt19.avif",
    locationId: "court-square",
    role: "Shop Principal",
    specialties: ["Vintage Executive Partings", "Beard Shaping"],
    rating: 4.9,
    introduction: "Leo has been with Otis & Finn since its Court Square roots. Famous for his highly engaging stories and unparalleled precision with side-parts, Leo represents the neighborhood spirit of Otis & Finn. A master of styling advice for business-formal environments."
  },
  {
    id: "silas-thorne",
    name: "Silas Thorne",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179921/Kirk_Riley_44th_Road_11_trgrw7.avif",
    locationId: "court-square",
    role: "Senior Barber",
    specialties: ["High Skin Fades", "Beard Grooming"],
    rating: 4.8,
    introduction: "A fading fanatic who eats, sleeps, and breathes lines. Silas specializes in razor-sharp gradients and impeccable beard styling. If you are looking for a crispy beard shape or zero tapers that last, Silas's schedule is your perfect destination."
  },
  {
    id: "owen-hayes",
    name: "Owen Hayes",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179921/Kirk_Riley_44th_Road_10_dlz6qp.avif",
    locationId: "court-square",
    role: "Creative Stylist",
    specialties: ["Layered Cuts", "Pompadours", "Texturing"],
    rating: 4.7,
    introduction: "Owen blends traditional English hair styling methods with casual American texture models. Perfect for customers looking to keep some length while retaining high-end cleanliness. His pompadour finishes are famous throughout LIC."
  },
  {
    id: "elias-vance",
    name: "Elias Vance",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179921/Kirk_Riley_44th_Road_9_r2t4hd.avif",
    locationId: "court-square",
    role: "Therapy Barber",
    specialties: ["Royal Hot Towel Treatment", "Executive Grooming"],
    rating: 4.9,
    introduction: "Elias focuses deeply on the sensory and tactile relaxation of modern barbering. He treats shaves as custom spa experiences, starting with signature organic pre-oils, 3 layered hot towels, rich hand-whipped cream, and ending with refreshing chilled stones."
  },

  // Williamsburg Location Barbers
  {
    id: "felix-gray",
    name: "Felix Gray",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179920/Kirk_Riley_44th_Road_8_l58yxy.avif",
    locationId: "williamsburg",
    role: "Master Stylist",
    specialties: ["Contemporary Waves", "Undercuts", "Textured Fringe"],
    rating: 4.9,
    introduction: "Felix brings a background in European salon styling to Williamsburg's chairs. He is renowned for high-fashion texturing, long hairstyles, and geometric undercuts. When you sit in Felix's chair, rest assured you receive tomorrow's trending hair aesthetics."
  },
  {
    id: "jasper-holt",
    name: "Jasper Holt",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179919/Kirk_Riley_44th_Road_7_byw6bp.avif",
    locationId: "williamsburg",
    role: "Beard Specialist",
    specialties: ["Beard Therapy", "Cheek RazoringFades", "Mustache Care"],
    rating: 4.8,
    introduction: "Jasper's passion lies entirely in facial grooming. He treats beards as customized architecture, creating outlines that emphasize jaw angles. From full winter beard sculpts to sharp corporate details, Jasper provides perfect maintenance."
  },
  {
    id: "oscar-finch",
    name: "Oscar Finch",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179919/Kirk_Riley_44th_Road_6_vvfibc.avif",
    locationId: "williamsburg",
    role: "Heritage Barber",
    specialties: ["Dapper Retro Cuts", "Flat Tops", "Wet Styling"],
    rating: 4.8,
    introduction: "Oscar is a classicist. Utilizing heavy-duty cast shears and old-school pomades, he crafts authentic 1920s to 1950s styles with stunning accuracy. If you prefer high-gloss pompadours, clean slick-backs, or rockabilly ducktails, Oscar is your barber."
  },
  {
    id: "theo-thorne",
    name: "Theo Thorne",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179919/Kirk_Riley_44th_Road_5_mxbpue.avif",
    locationId: "williamsburg",
    role: "Vibrant Barber",
    specialties: ["Modern Mullets", "Slick-back Crops", "Active Shays"],
    rating: 4.7,
    introduction: "Theo's bright spirit makes his grooming sessions incredibly fun and social. He is highly versatile, jumping fluidly from bold modern mullets to clean executive scissor trims. An expert on hair-texture matching and Brooklyn fashion culture."
  },

  // Greenpoint Location Barbers (sharing some or customized for complete roster balance)
  {
    id: "harrison-cole",
    name: "Harrison Cole",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179918/ba0541_125125bb833c4eb798ceb3c9e83545df_mv2_tlinql.avif",
    locationId: "greenpoint",
    role: "Greenpoint Lead",
    specialties: ["Executive Styling", "Straight Beard Trims"],
    rating: 4.9,
    introduction: "Harrison oversees Greenpoint, focusing on classic barber layouts with heavy attention to scalp health. He blends custom clay styling and hair growing serums to keep hair robust and full. A true gentlemen's grooming mentor."
  },
  {
    id: "carter-lane",
    name: "Carter Lane",
    image: "https://res.cloudinary.com/dju25z9v3/image/upload/v1781179919/Kirk_Riley_44th_Road_1_bqviuk.avif",
    locationId: "greenpoint",
    role: "Artisan Barber",
    specialties: ["Point Cutting", "Taper Shaves"],
    rating: 4.8,
    introduction: "Carter has been doing styling along Brooklyn for 7 years. He is a scissors craftsman, ensuring that your hair maintains its clean, organic texture and falls in place effortlessly without needing heavy styling waxes every morning."
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "barbers-haircut",
    name: "Barber's Classic Haircut",
    category: "hair",
    price: 55,
    duration: 35,
    description: "Our signature precision haircut. Custom consultation, hair washing with nourishing shampoo, custom shear/clipper craftsmanship, hair drying, styled with premium waxes and a warm lather neck clean with straight razor."
  },
  {
    id: "buzz-cut",
    name: "Buzz Cut (One-Guard)",
    category: "hair",
    price: 35,
    duration: 20,
    description: "An ultra-clean single-guard uniform trim over the entire head. Includes shampoo rinse, sharp outline tapering, and a revitalizing tea tree oil head massage."
  },
  {
    id: "beard-trim-razor",
    name: "Classic Beard Trim & Razor Line",
    category: "beard",
    price: 40,
    duration: 25,
    description: "Beard styled and shaped with precision-calibrated clippers and shears. Includes hot lather outlining, precise straight-razor detailing on cheeks and neck, and organic moisturizing beard oil finish."
  },
  {
    id: "traditional-shave",
    name: "Traditional Hot Towel Wet Shave",
    category: "beard",
    price: 60,
    duration: 45,
    description: "The crown jewel of traditional barbershops. Starts with hot essential oils and high-potency pre-shave cream, continuous layered hot steamed towels, hand-whipped Proraso shaving cream, meticulously shaven twice with straight razor, finished with cooling after-shave balm."
  },
  {
    id: "combo-classic",
    name: "Haircut & Beard Trim Combo",
    category: "combo",
    price: 85,
    duration: 55,
    description: "Our most popular combo service. Comprehensive classic haircut along with a complete personalized beard shaping, sharp razor line details, and double hot towels."
  },
  {
    id: "royal-treatment",
    name: "The Royal Executive Package",
    category: "combo",
    price: 130,
    duration: 80,
    description: "The ultimate therapeutic treatment. Traditional classic haircut, premium hot towel straight-shave/beard-service, charcoal face mask, energizing menthol scalp therapy, and high-end facial massage."
  },
  {
    id: "scalp-therapy",
    name: "Energizing Menthol Scalp Treatment",
    category: "treatment",
    price: 25,
    duration: 15,
    description: "Designed for dry, fatigued scalp. Intensive scalp micro-scrubbing cleanse, application of deep cooling mentholated mask, and 10 minutes of hot steam towel manual acupressure massage to stimulate hair follicles."
  },
  {
    id: "hot-towel-cleanse",
    name: "Charcoal Peel & Face Lift Cleanse",
    category: "treatment",
    price: 30,
    duration: 20,
    description: "A deep-pore exfoliating charcoal mud mask. Starts with hot towers to fully open pores, manual facial scrub, face mask application, following after-peeling cold compress towel and premium moisturizing fluid."
  }
];

export const PRODUCTS: ProductItem[] = [
  // --- SHAVING PRODUCTS ---
  {
    id: "proraso-shaving-cream",
    name: "Proraso Menthol & Eucalyptus Shaving Cream",
    category: "Shaving",
    subCategory: "Shaving Cream",
    price: 16,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590156546746-c569f6920557?q=80&w=600&auto=format&fit=crop",
    description: "Made in Italy since 1948. A historical formula featuring eucalyptus oil and menthol, yielding rich protective lather and supreme razor glide with a cooling feel.",
    brand: "Proraso",
    isPopular: true
  },
  {
    id: "barberclub-shaving-cream",
    name: "L'Oreal BarberClub Protective Shaving Cream",
    category: "Shaving",
    subCategory: "Shaving Cream",
    price: 14,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1626285861696-9f0be5a49c6e?q=80&w=600&auto=format&fit=crop",
    description: "Infused with pristine cedarwood essential oils. Ensures an easy non-irritating shave while moisturizing and leaving a rugged, classy woody scent.",
    brand: "BarberClub"
  },
  {
    id: "rocky-mountain-shaving-cream",
    name: "Rocky Mountain Sandalwood Shaving Cream",
    category: "Shaving",
    subCategory: "Shaving Cream",
    price: 22,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1532635224-cf024e66d122?q=80&w=600&auto=format&fit=crop",
    description: "A super-concentrated pre-whipped shaving paste. Formulated with rich essential oils and butter to prevent razor-burns and deliver premium sandalwood fragrance.",
    brand: "Rocky Mountain Barber",
    isPopular: true
  },
  {
    id: "proraso-shaving-foam",
    name: "Proraso Nourishing Sandalwood Shaving Foam",
    category: "Shaving",
    subCategory: "Shaving Foam",
    price: 10,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    description: "Ideal for dry skin and thick beards. Rich, instant thick foam enriched with cocoa butter and sandalwood wellness oils.",
    brand: "Proraso"
  },
  {
    id: "barbershop-shaving-gel",
    name: "Signature Precision Clear Shaving Gel",
    category: "Shaving",
    subCategory: "Shaving Gel",
    price: 13,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop",
    description: "A non-foaming clear gel that makes it very simple to outline clean lines, sideburns, and beard boundaries precisely with your straight razor.",
    brand: "Otis & Finn"
  },
  {
    id: "proraso-pre-shave",
    name: "Proraso Pre-Shave Cream (Green Tea & Oatmeal)",
    category: "Shaving",
    subCategory: "Pre-Shave Cream",
    price: 18,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop",
    description: "The ideal preparation for sensitive skin. Softens coarse hair, improves skin elasticity, and acts as a dynamic shield against razor cuts.",
    brand: "Proraso",
    isPopular: true
  },
  {
    id: "sandalwood-pre-shave-oil",
    name: "Artisan Pre-Shave Conditioning Oil",
    category: "Shaving",
    subCategory: "Pre-Shave Oil",
    price: 20,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    description: "A blend of rich castor, jojoba, and sandalwood oil. Maximizes razor glide and deeply moisturizes tight skins.",
    brand: "Rocky Mountain Barber"
  },
  {
    id: "clubman-after-shave",
    name: "Classic Country Clubman After Shave Lotion",
    category: "Shaving",
    subCategory: "After Shave Lotion",
    price: 12,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
    description: "An authentic, cooling classic antiseptic splash. Instantly cools down shaving burns, sanitizes small knicks, and leaves a retro barbershop clean aroma.",
    brand: "Clubman Pinaud"
  },
  {
    id: "proraso-aftershave-balm",
    name: "Proraso Shea Butter After Shave Balm",
    category: "Shaving",
    subCategory: "After Shave Balm",
    price: 18,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop",
    description: "An alcohol-free, fast-absorbing hydrating cream. Infused with shea butter and sandalwood oil, calming skin immediately.",
    brand: "Proraso",
    isPopular: true
  },

  // --- HAIR STYLING PRODUCTS ---
  {
    id: "matte-clay",
    name: "Otis & Finn High Hold Matte Clay",
    category: "Hair Styling",
    subCategory: "Hair Clay",
    price: 24,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?q=80&w=600&auto=format&fit=crop",
    description: "Provides high-strength structured hold with a completely natural modern matte finish. Infused with bentonite clay and subtle patchouli scent.",
    brand: "Otis & Finn",
    isPopular: true
  },
  {
    id: "water-soluble-pomade",
    name: "Premium Water Soluble Pomade",
    category: "Hair Styling",
    subCategory: "Hair Pomade",
    price: 22,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    description: "High shine and strong classic vintage hold, yet washes out extremely easily with pure water. Perfect for executing dapper slick-backs and classic side parts.",
    brand: "BarberClub"
  },
  {
    id: "natural-finish-hair-wax",
    name: "Rocky Mountain Matte Look Barber Wax",
    category: "Hair Styling",
    subCategory: "Hair Wax",
    price: 19,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop",
    description: "Clean bees-wax base styled to offer flexible medium hold. Allows restyling multiple times during long days without getting crispy.",
    brand: "Rocky Mountain Barber"
  },
  {
    id: "classic-hair-spray",
    name: "Professional Strong Seal Hair Spray",
    category: "Hair Styling",
    subCategory: "Hair Spray",
    price: 15,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    description: "Fast-drying, fine-mist lock spray that withstands heavy summer humidity and active days. Non-sticky and easily brushed out.",
    brand: "BarberClub"
  },

  // --- BEARD CARE PRODUCTS ---
  {
    id: "premium-beard-oil",
    name: "Otis & Finn Sandalwood Cedar Beard Oil",
    category: "Beard Care",
    subCategory: "Beard Oil",
    price: 26,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    description: "The ultimate conditioning oil. Softens coarse chin hair, eliminates dry beard itch, hydrates underlying skin, and leaves a premium warm cedarwood legacy aroma.",
    brand: "Otis & Finn",
    isPopular: true
  },
  {
    id: "beardsman-balm",
    name: "Shea Butter Shaping Beard Balm",
    category: "Beard Care",
    subCategory: "Beard Balm",
    price: 22,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508179522047-382df3545744?q=80&w=600&auto=format&fit=crop",
    description: "Provides structural hold to sculpt unruly beard hairs while delivering heavy-duty moisture. Rich in natural Shea Butter and Eucalyptus extracts.",
    brand: "Proraso"
  },
  {
    id: "barber-beard-wash",
    name: "Deep Cleanse Menthol Beard Wash",
    category: "Beard Care",
    subCategory: "Beard Wash",
    price: 18,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop",
    description: "A gentle low-foaming shampoo specifically crafted for beard hygiene. Completely strips beard of dust, food and grease without depleting natural oils.",
    brand: "BarberClub"
  },

  // --- HAIR CARE PRODUCTS ---
  {
    id: "daily-menthol-shampoo",
    name: "Otis & Finn Scalp Purge Shampoo",
    category: "Hair Care",
    subCategory: "Shampoo",
    price: 20,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop",
    description: "Infused with raw peppermint extract and tea tree oil. Deeply cleanses and stimulates the scalp, completely purging styling clay and dirt.",
    brand: "Otis & Finn"
  },
  {
    id: "nourishing-conditioner",
    name: "Rocky Mountain Argan Oil Conditioner",
    category: "Hair Care",
    subCategory: "Conditioner",
    price: 21,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop",
    description: "Rich Argan Oil conditioner that repairs hair follicles, volumizes hair thickness, and leaves deep botanical moisture.",
    brand: "Rocky Mountain Barber",
    isPopular: true
  },
  {
    id: "anti-dandruff-shampoo",
    name: "Premium Charcoal Active Dandruff Purge",
    category: "Hair Care",
    subCategory: "Anti-Dandruff Shampoo",
    price: 18,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop",
    description: "Formulated with 2% Salicylic Acid and active bamboo charcoal to clear flaky scalps, prevent recurrence, and cool irritation.",
    brand: "BarberClub"
  },
  {
    id: "hair-growth-serum",
    name: "Otis & Finn Biotin Follicle Growing Serum",
    category: "Hair Care",
    subCategory: "Hair Growth Serum",
    price: 34,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop",
    description: "A high-concentration daily scalp stimulant with active Biotin, Caffeine, and Rosemary oil. Clinically targeted to stimulate dormant follicles.",
    brand: "Otis & Finn",
    isPopular: true
  },

  // --- FACIAL CARE ---
  {
    id: "charcoal-face-wash",
    name: "Active Volcano Clay Face Wash",
    category: "Facial Care",
    subCategory: "Face Wash",
    price: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    description: "Absorbs oil, pulls out deep blackheads, and cleanses pores with continuous charcoal defense. Non-drying and highly cooling.",
    brand: "BarberClub"
  },
  {
    id: "exfoliating-scrub",
    name: "Apricot Kernels Deep Face Scrub",
    category: "Facial Care",
    subCategory: "Face Scrub",
    price: 18,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop",
    description: "Crushed apricot seed beads that sweep up dead skin, clear dull layers and prep beard paths perfectly for ultra-close cuts.",
    brand: "Rocky Mountain Barber"
  },
  {
    id: "brightening-moisturizer",
    name: "Vitamin C Active Radiance Hydration Cream",
    category: "Facial Care",
    subCategory: "Moisturizing Cream",
    price: 24,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1626285861696-9f0be5a49c6e?q=80&w=600&auto=format&fit=crop",
    description: "Recharges skin with immediate high-potency hydration. Visibly evens skin tone and prevents city pollution oxidation.",
    brand: "Otis & Finn"
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: "post1",
    videoPseudoUrl: "https://v1.assets.tcgd.controlplane.us-east1.gcp.internal/placeholder-video-1",
    thumbnail: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop",
    caption: "The flagship vibe on 44th Ave. Stepping up hair fashion daily. #otisandfinn #licbarber",
    likes: "421",
    comments: "32"
  },
  {
    id: "post2",
    videoPseudoUrl: "https://v1.assets.tcgd.controlplane.us-east1.gcp.internal/placeholder-video-2",
    thumbnail: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=600&auto=format&fit=crop",
    caption: "A traditional straight razor wet shave with Elias Vance. Peak relaxation mode. #hotshave #prora_so",
    likes: "512",
    comments: "45"
  },
  {
    id: "post3",
    videoPseudoUrl: "https://v1.assets.tcgd.controlplane.us-east1.gcp.internal/placeholder-video-3",
    thumbnail: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop",
    caption: "Pompadour locks and crisp blends by Silas Thorne in Court Square. #barbercraft #fadeking",
    likes: "367",
    comments: "19"
  },
  {
    id: "post4",
    videoPseudoUrl: "https://v1.assets.tcgd.controlplane.us-east1.gcp.internal/placeholder-video-4",
    thumbnail: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop",
    caption: "Restocking our artisan styling clay. Natural hold that is kind to your hair. #barberwax #mattclay",
    likes: "289",
    comments: "11"
  },
  {
    id: "post5",
    videoPseudoUrl: "https://v1.assets.tcgd.controlplane.us-east1.gcp.internal/placeholder-video-5",
    thumbnail: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop",
    caption: "Vibrant Friday crowds. Our shop is a place for neighbors to link up. #licqueens #nychair",
    likes: "614",
    comments: "53"
  },
  {
    id: "post6",
    videoPseudoUrl: "https://v1.assets.tcgd.controlplane.us-east1.gcp.internal/placeholder-video-6",
    thumbnail: "https://images.unsplash.com/photo-1532710093739-9470ac088b6d?q=80&w=600&auto=format&fit=crop",
    caption: "Signature shears technique by Felix Gray in Williamsburg. Precision in motion. #brooklynbarber #stylist",
    likes: "498",
    comments: "27"
  }
];
