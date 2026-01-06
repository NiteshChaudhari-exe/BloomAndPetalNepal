
import { Category, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Eternal Rose Box',
    category: Category.BOUQUETS,
    price: 3500,
    description: 'A luxurious box of 24 premium red roses, perfectly arranged for anniversaries.',
    images: ['https://picsum.photos/seed/rosebox/800/800', 'https://picsum.photos/seed/rosebox2/800/800'],
    stock: 15,
    featured: true,
    occasions: ['Anniversary', 'Birthday']
  },
  {
    id: '2',
    name: 'Serene Lily Bouquet',
    category: Category.BOUQUETS,
    price: 1800,
    description: 'White oriental lilies with fresh eucalyptus leaves. Symbolic of peace and purity.',
    images: ['https://picsum.photos/seed/lily/800/800'],
    stock: 20,
    featured: true,
    occasions: ['Funeral', 'Sympathy', 'Wedding']
  },
  {
    id: '3',
    name: 'Handmade Lavender Candle',
    category: Category.HANDMADE,
    price: 950,
    description: 'Soy wax candle infused with organic lavender essential oil from the hills of Nepal.',
    images: ['https://picsum.photos/seed/candle/800/800'],
    stock: 50,
    featured: false
  },
  {
    id: '4',
    name: 'Assorted Orchids',
    category: Category.FRESH_FLOWERS,
    price: 2500,
    description: 'Rare purple and white orchids sourced from local farmers in Ilam.',
    images: ['https://picsum.photos/seed/orchids/800/800'],
    stock: 8,
    featured: true,
    occasions: ['Birthday', 'Graduation']
  },
  {
    id: '5',
    name: 'Floral Perfume Mist',
    category: Category.HANDMADE,
    price: 1200,
    description: 'Delicate mist with notes of rose, jasmine, and sandalwood.',
    images: ['https://picsum.photos/seed/perfume/800/800'],
    stock: 30,
    featured: false
  },
  {
    id: '6',
    name: 'Birthday Bliss Hamper',
    category: Category.GIFTS,
    price: 4500,
    description: 'Mixed seasonal flowers with a premium dark chocolate box and a small teddy.',
    images: ['https://picsum.photos/seed/hamper/800/800'],
    stock: 12,
    featured: true,
    occasions: ['Birthday']
  }
];

export const NEPAL_LOCATIONS = [
  'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Butwal', 'Dharan', 'Itahari', 'Biratnagar'
];
