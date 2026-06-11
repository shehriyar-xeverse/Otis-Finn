export interface Barber {
  id: string;
  name: string;
  image: string;
  locationId: string;
  role: string;
  introduction: string;
  rating?: number;
  specialties?: string[];
}

export interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: "hair" | "beard" | "combo" | "treatment";
  price: number;
  duration: number; // in minutes
  description: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: "Shaving" | "Hair Styling" | "Beard Care" | "Hair Care" | "Facial Care" | "Barber Accessories";
  subCategory: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  brand: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface Appointment {
  locationId: string;
  serviceId: string;
  barberId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}
