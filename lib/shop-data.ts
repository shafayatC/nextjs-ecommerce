// Shop-specific mock data

export interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  discountPercent?: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
}

export interface ShopCategory {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  image: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  image: string;
}

export interface ShopOrder {
  id: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: { name: string; quantity: number; price: number; image: string }[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  timeline: { date: string; status: string }[];
}

export interface ShopAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export const shopCategories: ShopCategory[] = [
  { id: '1', name: 'Electronics', icon: 'smartphone', productCount: 156, image: 'https://picsum.photos/seed/elec/400/300' },
  { id: '2', name: 'Fashion', icon: 'shirt', productCount: 312, image: 'https://picsum.photos/seed/fash/400/300' },
  { id: '3', name: 'Home & Living', icon: 'home', productCount: 234, image: 'https://picsum.photos/seed/home/400/300' },
  { id: '4', name: 'Beauty', icon: 'sparkles', productCount: 145, image: 'https://picsum.photos/seed/beau/400/300' },
  { id: '5', name: 'Sports', icon: 'dumbbell', productCount: 78, image: 'https://picsum.photos/seed/spor/400/300' },
  { id: '6', name: 'Books', icon: 'book-open', productCount: 89, image: 'https://picsum.photos/seed/book/400/300' },
  { id: '7', name: 'Food', icon: 'apple', productCount: 67, image: 'https://picsum.photos/seed/food/400/300' },
  { id: '8', name: 'Services', icon: 'briefcase', productCount: 23, image: 'https://picsum.photos/seed/serv/400/300' },
];

export const shopProducts: ShopProduct[] = [
  { id: '1', name: 'Walton Refrigerator 253L', slug: 'walton-refrigerator-253l', price: 42990, salePrice: 37990, discountPercent: 12, category: 'Electronics', brand: 'Walton', stock: 28, images: ['https://picsum.photos/seed/prod1/600/600', 'https://picsum.photos/seed/prod1b/600/600'], description: 'Singer 253 liter frost freezer double door refrigerator with energy-saving technology. Features automatic defrost, adjustable shelves, and LED lighting.', rating: 4.2, reviews: 156 },
  { id: '2', name: 'Singer Automatic Iron', slug: 'singer-automatic-iron', price: 2499, salePrice: 1999, discountPercent: 20, category: 'Home & Living', brand: 'Singer', stock: 89, images: ['https://picsum.photos/seed/prod2/600/600', 'https://picsum.photos/seed/prod2b/600/600'], description: 'Singer auto-shutoff iron with ceramic soleplate and 2000W power. Steam burst and vertical steam functions.', rating: 4.5, reviews: 234 },
  { id: '3', name: 'Puma Sports Shoes Runner', slug: 'puma-sports-shoes-runner', price: 5999, salePrice: 4499, discountPercent: 25, category: 'Sports', brand: 'Puma', stock: 156, images: ['https://picsum.photos/seed/prod3/600/600', 'https://picsum.photos/seed/prod3b/600/600'], description: 'Puma mens running sports shoes with lightweight mesh upper, rubber outsole, and cushioned midsole for comfort.', rating: 4.7, reviews: 412 },
  { id: '4', name: 'Apple iPhone 15 Pro Max', slug: 'apple-iphone-15-pro-max', price: 199990, salePrice: 184990, discountPercent: 8, category: 'Electronics', brand: 'Apple', stock: 45, images: ['https://picsum.photos/seed/prod4/600/600', 'https://picsum.photos/seed/prod4b/600/600'], description: 'Apple iPhone 15 Pro Max with A17 Pro chip, 6.7-inch Super Retina XDR display, titanium design, and 48MP camera system.', rating: 4.9, reviews: 1243 },
  { id: '5', name: 'Apex Formal Shoes Leather', slug: 'apex-formal-shoes-leather', price: 3499, salePrice: 2799, discountPercent: 20, category: 'Fashion', brand: 'Apex', stock: 78, images: ['https://picsum.photos/seed/prod5/600/600', 'https://picsum.photos/seed/prod5b/600/600'], description: 'Apex mens premium leather formal shoes with cushioned insole and durable rubber sole. Perfect for office wear.', rating: 4.3, reviews: 189 },
  { id: '6', name: 'Samsung 55" Smart 4K TV', slug: 'samsung-55-smart-4k-tv', price: 89990, salePrice: 79990, discountPercent: 11, category: 'Electronics', brand: 'Samsung', stock: 34, images: ['https://picsum.photos/seed/prod6/600/600', 'https://picsum.photos/seed/prod6b/600/600'], description: 'Samsung 55 inch 4K UHD Smart TV with Crystal Display, HDR, and built-in voice assistants. Multiple HDMI and USB ports.', rating: 4.6, reviews: 567 },
  { id: '7', name: 'Aarong Dairy Milk 1L', slug: 'aarong-dairy-milk-1l', price: 180, category: 'Food', brand: 'Aarong', stock: 500, images: ['https://picsum.photos/seed/prod7/600/600'], description: 'Fresh cow milk from Aarong dairy, 1 liter pack. Farm-fresh, pasteurized, and homogenized for maximum nutrition.', rating: 4.8, reviews: 2341 },
  { id: '8', name: 'LUX Beauty Soap 150g', slug: 'lux-beauty-soap-150g', price: 95, salePrice: 80, discountPercent: 16, category: 'Beauty', brand: 'LUX', stock: 890, images: ['https://picsum.photos/seed/prod8/600/600'], description: 'LUX Beauty Soap with moisturizer and royal jelly. Leaves skin soft, smooth, and fragrant.', rating: 4.4, reviews: 3421 },
  { id: '9', name: 'RFL Plastic Dining Set 6pc', slug: 'rfl-plastic-dining-set-6pc', price: 4599, salePrice: 3999, discountPercent: 13, category: 'Home & Living', brand: 'RFL', stock: 67, images: ['https://picsum.photos/seed/prod9/600/600', 'https://picsum.photos/seed/prod9b/600/600'], description: 'RFL 6-piece plastic dining set including 1 table and 4 chairs. Durable, lightweight, and stackable design.', rating: 4.1, reviews: 234 },
  { id: '10', name: 'Bashundhara Tissue Pack 12pc', slug: 'bashundhara-tissue-pack-12pc', price: 850, salePrice: 720, discountPercent: 15, category: 'Home & Living', brand: 'Bashundhara', stock: 1200, images: ['https://picsum.photos/seed/prod10/600/600'], description: 'Bashundhara facial tissue pack, 12 rolls per pack. Soft, strong, and absorbent. Made from 100% virgin pulp.', rating: 4.2, reviews: 876 },
  { id: '11', name: 'Deshi Chicken Eggs 30pc', slug: 'deshi-chicken-eggs-30pc', price: 600, category: 'Food', brand: 'Local Farm', stock: 320, images: ['https://picsum.photos/seed/prod11/600/600'], description: 'Fresh deshi chicken eggs, pack of 30. Farm-raised, naturally fed hens for better quality eggs.', rating: 4.6, reviews: 1234 },
  { id: '12', name: 'Yamaha Acoustic Guitar', slug: 'yamaha-acoustic-guitar', price: 12500, salePrice: 10999, discountPercent: 12, category: 'Sports', brand: 'Yamaha', stock: 23, images: ['https://picsum.photos/seed/prod12/600/600', 'https://picsum.photos/seed/prod12b/600/600'], description: 'Yamaha F310 acoustic guitar with spruce top and nato back/sides. Full size dreadnought shape, great for beginners.', rating: 4.5, reviews: 345 },
  { id: '13', name: 'Fair & Lovely Max Fairness', slug: 'fair-lovely-max-fairness', price: 450, salePrice: 380, discountPercent: 16, category: 'Beauty', brand: 'Fair & Lovely', stock: 456, images: ['https://picsum.photos/seed/prod13/600/600'], description: 'Fair & Lovely Maximum Even Tone Fairness Cream with UV filters and vitamin B3. Visible fairness in 4 weeks.', rating: 4.1, reviews: 2341 },
  { id: '14', name: 'Oxford Advanced Learner Dictionary', slug: 'oxford-advanced-learner-dictionary', price: 1290, salePrice: 1100, discountPercent: 15, category: 'Books', brand: 'Oxford', stock: 89, images: ['https://picsum.photos/seed/prod14/600/600'], description: 'Oxford Advanced Learner Dictionary 10th Edition. The worlds most trusted dictionary with 185,000 words, phrases, and meanings.', rating: 4.8, reviews: 567 },
  { id: '15', name: 'DBBL Mobile Banking Setup', slug: 'dbbl-mobile-banking-setup', price: 0, category: 'Services', brand: 'DBBL', stock: 9999, images: ['https://picsum.photos/seed/prod15/600/600'], description: 'Dutch-Bangla Bank Mobile Banking account setup service. Zero maintenance fee, instant registration.', rating: 3.9, reviews: 432 },
  { id: '16', name: 'Walton LED Bulb 12W Pack 4', slug: 'walton-led-bulb-12w-pack-4', price: 480, salePrice: 399, discountPercent: 17, category: 'Electronics', brand: 'Walton', stock: 1200, images: ['https://picsum.photos/seed/prod16/600/600'], description: 'Walton 12W LED bulb, pack of 4. Energy saving up to 85%, long life up to 25,000 hours, bright daylight.', rating: 4.4, reviews: 1567 },
  { id: '17', name: 'Ladies Hijab Cotton Premium', slug: 'ladies-hijab-cotton-premium', price: 890, salePrice: 699, discountPercent: 21, category: 'Fashion', brand: 'Local Brand', stock: 345, images: ['https://picsum.photos/seed/prod17/600/600', 'https://picsum.photos/seed/prod17b/600/600'], description: 'Premium cotton hijab with soft drape. Available in multiple colors. Perfect for everyday and formal wear.', rating: 4.3, reviews: 654 },
  { id: '18', name: 'RFL Water Jar 20L', slug: 'rfl-water-jar-20l', price: 1850, salePrice: 1599, discountPercent: 14, category: 'Home & Living', brand: 'RFL', stock: 234, images: ['https://picsum.photos/seed/prod18/600/600'], description: 'RFL 20 liter water jar with tap. BPA-free, durable plastic, easy to clean. Perfect for home and office.', rating: 4.2, reviews: 876 },
  { id: '19', name: 'Nike Dri-FIT Sports T-Shirt', slug: 'nike-dri-fit-sports-tshirt', price: 2999, salePrice: 2399, discountPercent: 20, category: 'Sports', brand: 'Nike', stock: 189, images: ['https://picsum.photos/seed/prod19/600/600'], description: 'Nike Dri-FIT technology pulls sweat away from your skin for faster evaporation. Lightweight, breathable mesh fabric.', rating: 4.7, reviews: 432 },
  { id: '20', name: 'Singer Sewing Machine portable', slug: 'singer-sewing-machine-portable', price: 8999, salePrice: 7999, discountPercent: 11, category: 'Home & Living', brand: 'Singer', stock: 45, images: ['https://picsum.photos/seed/prod20/600/600', 'https://picsum.photos/seed/prod20b/600/600'], description: 'Singer portable sewing machine with 12 built-in stitches, automatic bobbin, and easy thread tension adjustment.', rating: 4.4, reviews: 234 },
];

export const shopCartItems: CartItem[] = [
  { productId: '1', name: 'Walton Refrigerator 253L', price: 42990, salePrice: 37990, quantity: 1, image: 'https://picsum.photos/seed/prod1/200/200' },
  { productId: '3', name: 'Puma Sports Shoes Runner', price: 5999, salePrice: 4499, quantity: 2, image: 'https://picsum.photos/seed/prod3/200/200' },
  { productId: '8', name: 'LUX Beauty Soap 150g', price: 95, quantity: 3, image: 'https://picsum.photos/seed/prod8/200/200' },
  { productId: '4', name: 'Apple iPhone 15 Pro Max', price: 199990, salePrice: 184990, quantity: 1, image: 'https://picsum.photos/seed/prod4/200/200' },
  { productId: '10', name: 'Bashundhara Tissue Pack 12pc', price: 850, salePrice: 720, quantity: 2, image: 'https://picsum.photos/seed/prod10/200/200' },
];

export const shopOrders: ShopOrder[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-06-15',
    status: 'Delivered',
    items: [
      { name: 'Walton Refrigerator 253L', quantity: 1, price: 37990, image: 'https://picsum.photos/seed/prod1/200/200' },
      { name: 'Singer Automatic Iron', quantity: 1, price: 1999, image: 'https://picsum.photos/seed/prod2/200/200' },
    ],
    total: 39989,
    shippingAddress: 'House 12, Road 5, Dhanmondi, Dhaka 1205',
    paymentMethod: 'Cash on Delivery',
    timeline: [
      { date: '2024-06-15 10:30', status: 'Order Placed' },
      { date: '2024-06-15 14:00', status: 'Confirmed' },
      { date: '2024-06-16 09:00', status: 'Shipped' },
      { date: '2024-06-17 11:00', status: 'Delivered' },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-06-14',
    status: 'Shipped',
    items: [
      { name: 'Puma Sports Shoes Runner', quantity: 2, price: 8998, image: 'https://picsum.photos/seed/prod3/200/200' },
    ],
    total: 8998,
    shippingAddress: 'Flat 3B, Tower 2, Gulshan-1, Dhaka 1212',
    paymentMethod: 'Card',
    timeline: [
      { date: '2024-06-14 08:00', status: 'Order Placed' },
      { date: '2024-06-14 12:00', status: 'Confirmed' },
      { date: '2024-06-15 10:00', status: 'Shipped' },
    ],
  },
  {
    id: 'ORD-2024-003',
    date: '2024-06-13',
    status: 'Pending',
    items: [
      { name: 'Apple iPhone 15 Pro Max', quantity: 1, price: 184990, image: 'https://picsum.photos/seed/prod4/200/200' },
      { name: 'LUX Beauty Soap 150g', quantity: 3, price: 285, image: 'https://picsum.photos/seed/prod8/200/200' },
    ],
    total: 185275,
    shippingAddress: 'Village: Bashur, Upazila: Sreepur, Gazipur',
    paymentMethod: 'Cash on Delivery',
    timeline: [
      { date: '2024-06-13 16:00', status: 'Order Placed' },
    ],
  },
  {
    id: 'ORD-2024-004',
    date: '2024-06-12',
    status: 'Cancelled',
    items: [
      { name: 'Samsung 55" Smart 4K TV', quantity: 1, price: 79990, image: 'https://picsum.photos/seed/prod6/200/200' },
    ],
    total: 79990,
    shippingAddress: 'House 45, Block B, Banani, Dhaka 1213',
    paymentMethod: 'Card',
    timeline: [
      { date: '2024-06-12 11:00', status: 'Order Placed' },
      { date: '2024-06-12 15:00', status: 'Cancelled' },
    ],
  },
  {
    id: 'ORD-2024-005',
    date: '2024-06-11',
    status: 'Delivered',
    items: [
      { name: 'Aarong Dairy Milk 1L', quantity: 5, price: 900, image: 'https://picsum.photos/seed/prod7/200/200' },
      { name: 'Deshi Chicken Eggs 30pc', quantity: 2, price: 1200, image: 'https://picsum.photos/seed/prod11/200/200' },
    ],
    total: 2100,
    shippingAddress: 'Road 8, Mirpur-10, Dhaka 1216',
    paymentMethod: 'Cash on Delivery',
    timeline: [
      { date: '2024-06-11 07:00', status: 'Order Placed' },
      { date: '2024-06-11 09:00', status: 'Confirmed' },
      { date: '2024-06-11 14:00', status: 'Shipped' },
      { date: '2024-06-12 08:00', status: 'Delivered' },
    ],
  },
  {
    id: 'ORD-2024-006',
    date: '2024-06-10',
    status: 'Delivered',
    items: [
      { name: 'Nike Dri-FIT Sports T-Shirt', quantity: 1, price: 2399, image: 'https://picsum.photos/seed/prod19/200/200' },
      { name: 'Apex Formal Shoes Leather', quantity: 1, price: 2799, image: 'https://picsum.photos/seed/prod5/200/200' },
    ],
    total: 5198,
    shippingAddress: 'Flat 5C, Elephant Road, Dhaka 1205',
    paymentMethod: 'Card',
    timeline: [
      { date: '2024-06-10 13:00', status: 'Order Placed' },
      { date: '2024-06-10 16:00', status: 'Confirmed' },
      { date: '2024-06-11 09:00', status: 'Shipped' },
      { date: '2024-06-12 15:00', status: 'Delivered' },
    ],
  },
];

export const shopAddresses: ShopAddress[] = [
  { id: '1', label: 'Home', name: 'Rahim Ahmed', phone: '+880 1711-123456', address: 'House 12, Road 5, Dhanmondi', city: 'Dhaka', isDefault: true },
  { id: '2', label: 'Office', name: 'Rahim Ahmed', phone: '+880 1711-123456', address: 'Floor 7, Gulshan-2, Elephant Road', city: 'Dhaka', isDefault: false },
  { id: '3', label: 'Parents', name: 'Fatima Begum', phone: '+880 1811-654321', address: 'Village: Bashur, Sreepur', city: 'Gazipur', isDefault: false },
];
