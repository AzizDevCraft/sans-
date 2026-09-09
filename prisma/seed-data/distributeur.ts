export type Distributor = {
  id: string
  name: string
  logo: string
  zone: string[]
  phone: string
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
    id: "patisserie-ines",
    name: "Pâtisserie d'Inès",
    logo: "/images/logo-patisserie-ines.jpg",
    zone: ["La Marsa", "Manar 2"],
    phone: "+216 96 334 310",
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
    id: "hardBeat-athletics",
    name: "HardBeat Athletics",
    logo: "/images/logo-HBA.jpg",
    zone: ["Jardin de carthage"],
    phone: "+216 29 008 000",
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
    id: "triangle-fitness",
    name: "Triangle Fitness",
    logo: "/images/logo.jpg",
    zone: ["Jardin de carthage"],
    phone: "+216 99 858 020",
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
    id: "mon-coin-nature",
    name: "Mon Coin Nature",
    logo: "/images/logo.jpg",
    zone: ["La marsa"],
    phone: "+216 99 858 020",
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
    id: "bolo-healthy-restaurant",
    name: "Bolo Healthy Restaurant",
    logo: "/images/logo.jpg",
    zone: ["Menzeh 6"],
    phone: "+216 99 858 020",
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
