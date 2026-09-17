export type Distributor = {
  slug: string
  name: string
  logo: string
  zone: string[]
  phone: string
  position?: number
  mapEmbedUrl: string
  openingHours: {
    [day: string]: {
      open: string | null
      close: string | null
    }
  }
}

export const distributors: Distributor[] = [
  {
    slug: "patisserie-ines",
    name: "Pâtisserie d'Inès",
    logo: "Logo-patisserie-ines.JPG",
    zone: ["La Marsa", "Manar 2"],
    phone: "+216 96 334 310",
    position: 1,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    openingHours: {
      monday: { open: "10:00", close: "18:30" },
      tuesday: { open: "10:00", close: "18:30" },
      wednesday: { open: "10:00", close: "18:30" },
      thursday: { open: "10:00", close: "18:30" },
      friday: { open: "10:00", close: "18:30" },
      saturday: { open: "10:00", close: "18:30" },
      sunday: { open: null, close: null },
    },
  },
  {
    slug: "hardBeat-athletics",
    name: "HardBeat Athletics",
    logo: "logo-HBA.jpg",
    zone: ["Jardin de carthage"],
    phone: "+216 29 008 000",
    position: 2,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    openingHours: {
      monday: { open: "06:00", close: "22:00" },
      tuesday: { open: "06:00", close: "22:00" },
      wednesday: { open: "06:00", close: "22:00" },
      thursday: { open: "06:00", close: "22:00" },
      friday: { open: "06:00", close: "22:00" },
      saturday: { open: "06:00", close: "18:00" },
      sunday: { open: "08:00", close: "15:00" },
    },
  },
  {
    slug: "triangle-fitness",
    name: "Triangle Fitness",
    logo: "Logo-Triangle-fitness.JPG",
    zone: ["Jardin de carthage"],
    phone: "+216 99 858 020",
    position: 3,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    openingHours: {
      monday: { open: "06:00", close: "22:00" },
      tuesday: { open: "06:00", close: "22:00" },
      wednesday: { open: "06:00", close: "22:00" },
      thursday: { open: "06:00", close: "22:00" },
      friday: { open: "06:00", close: "22:00" },
      saturday: { open: "06:00", close: "18:00" },
      sunday: { open: "08:00", close: "15:00" },
    },
  },
  {
    slug: "mon-coin-nature",
    name: "Mon Coin Nature",
    logo: "Logo-mon-coin-nature.JPG",
    zone: ["La marsa"],
    phone: "+216 99 858 020",
    position: 4,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    openingHours: {
      monday: { open: "06:00", close: "22:00" },
      tuesday: { open: "06:00", close: "22:00" },
      wednesday: { open: "06:00", close: "22:00" },
      thursday: { open: "06:00", close: "22:00" },
      friday: { open: "06:00", close: "22:00" },
      saturday: { open: "06:00", close: "18:00" },
      sunday: { open: "08:00", close: "15:00" },
    },
  },
  {
    slug: "bolo-healthy-restaurant",
    name: "Bolo Healthy Restaurant",
    logo: "Logo-bolo-healthy-restaurant.JPG",
    zone: ["Menzeh 6"],
    phone: "+216 99 858 020",
    position: 5,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    openingHours: {
      monday: { open: "06:00", close: "22:00" },
      tuesday: { open: "06:00", close: "22:00" },
      wednesday: { open: "06:00", close: "22:00" },
      thursday: { open: "06:00", close: "22:00" },
      friday: { open: "06:00", close: "22:00" },
      saturday: { open: "06:00", close: "18:00" },
      sunday: { open: "08:00", close: "15:00" },
    },
  }
]
