// ~/data/products.ts

export type ProductType = "beras" | "tebas";

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  image: string;
}

const getRandomImage = (type: ProductType): string => {
  const randomIndex = Math.floor(Math.random() * 6) + 1;
  return type === "beras"
    ? `/img${randomIndex}.webp`
    : `/sawah${randomIndex}.${
        [2, 3, 5].includes(randomIndex) ? "jpg" : "jpeg"
      }`;
};

const types: ProductType[] = ["beras", "tebas"];
const locations: string[] = [
  "Kab. Nganjuk",
  "Kab. Sleman",
  "Kab. Klaten",
  "Kab. Cianjur",
  "Kab. Boyolali",
  "Kab. Magelang",
];
const names: Record<ProductType, string[]> = {
  beras: [
    "Premium Maju Sari",
    "Organik Sehat Jaya",
    "Kepala Super Enak",
    "Pulen Wangi Melati",
    "Merah Organik Sejahtera",
    "Hitam Asli Nusantara",
  ],
  tebas: [
    "Tebasan Subur Makmur",
    "Tebasan Panen Raya",
    "Tebasan Hijau Lestari",
    "Tebasan Tani Jaya",
    "Tebasan Sawah Abadi",
    "Tebasan Sejahtera",
  ],
};

const generateProducts = (): Product[] => {
  const result: Product[] = [];

  for (let i = 1; i <= 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const nameList = names[type];
    const name = `${type.charAt(0).toUpperCase() + type.slice(1)} ${
      nameList[i % nameList.length]
    }`;
    const slug =
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "") + `-${i}`;
    const price =
      type === "beras"
        ? 14000 + Math.floor(Math.random() * 10000)
        : 300000 + Math.floor(Math.random() * 300000);
    const rating = parseFloat((4 + Math.random()).toFixed(1));
    const location = locations[i % locations.length];
    const image = getRandomImage(type);

    result.push({
      id: slug,
      name,
      price,
      rating,
      location,
      image,
    });
  }

  return result;
};

export const productsData: Product[] = generateProducts();
