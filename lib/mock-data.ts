// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar?: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export interface Permission {
  id: string;
  name: string;
  module: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: 'Active' | 'Inactive';
  image?: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  size: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  user: string;
  avatar?: string;
  action: string;
  time: string;
}

export interface ChartData {
  label: string;
  value: number;
}

// Mock Users
export const users: User[] = [
  { id: '1', name: 'Rahim Ahmed', email: 'rahim@techbd.com', role: 'Admin', status: 'Active', createdAt: '2024-01-15' },
  { id: '2', name: 'Fatima Begum', email: 'fatima@techbd.com', role: 'Editor', status: 'Active', createdAt: '2024-02-20' },
  { id: '3', name: 'Kamal Hossain', email: 'kamal@techbd.com', role: 'Viewer', status: 'Inactive', createdAt: '2024-03-10' },
  { id: '4', name: 'Nadia Islam', email: 'nadia@techbd.com', role: 'Editor', status: 'Active', createdAt: '2024-03-25' },
  { id: '5', name: 'Saif Rahman', email: 'saif@techbd.com', role: 'Viewer', status: 'Pending', createdAt: '2024-04-05' },
  { id: '6', name: 'Mina Chowdhury', email: 'mina@techbd.com', role: 'Admin', status: 'Active', createdAt: '2024-04-18' },
  { id: '7', name: 'Tariq Hasan', email: 'tariq@techbd.com', role: 'Editor', status: 'Active', createdAt: '2024-05-02' },
  { id: '8', name: 'Sadia Akter', email: 'sadia@techbd.com', role: 'Viewer', status: 'Inactive', createdAt: '2024-05-15' },
  { id: '9', name: 'Imran Khan', email: 'imran@techbd.com', role: 'Editor', status: 'Active', createdAt: '2024-06-08' },
  { id: '10', name: 'Parveen Bibi', email: 'parveen@techbd.com', role: 'Viewer', status: 'Active', createdAt: '2024-06-22' },
];

// Mock Roles
export const roles: Role[] = [
  { id: '1', name: 'Admin', description: 'Full system access with all permissions', userCount: 2, permissions: ['dashboard.view', 'users.create', 'users.edit', 'users.delete', 'users.view', 'roles.create', 'roles.edit', 'roles.delete', 'roles.view', 'products.create', 'products.edit', 'products.delete', 'products.view', 'categories.create', 'categories.edit', 'categories.delete', 'categories.view', 'brands.create', 'brands.edit', 'brands.delete', 'brands.view', 'media.upload', 'media.delete', 'media.view'] },
  { id: '2', name: 'Editor', description: 'Can create and edit content but not delete', userCount: 4, permissions: ['dashboard.view', 'users.view', 'roles.view', 'products.create', 'products.edit', 'products.view', 'categories.create', 'categories.edit', 'categories.view', 'brands.create', 'brands.edit', 'brands.view', 'media.upload', 'media.view'] },
  { id: '3', name: 'Viewer', description: 'Read-only access to all sections', userCount: 4, permissions: ['dashboard.view', 'users.view', 'roles.view', 'products.view', 'categories.view', 'brands.view', 'media.view'] },
];

// Mock Permissions by Module
export const permissions: Permission[] = [
  // Dashboard
  { id: 'p1', name: 'View Dashboard', module: 'Dashboard' },
  // Users
  { id: 'p2', name: 'View Users', module: 'Users' },
  { id: 'p3', name: 'Create Users', module: 'Users' },
  { id: 'p4', name: 'Edit Users', module: 'Users' },
  { id: 'p5', name: 'Delete Users', module: 'Users' },
  // Roles
  { id: 'p6', name: 'View Roles', module: 'Roles' },
  { id: 'p7', name: 'Create Roles', module: 'Roles' },
  { id: 'p8', name: 'Edit Roles', module: 'Roles' },
  { id: 'p9', name: 'Delete Roles', module: 'Roles' },
  // Products
  { id: 'p10', name: 'View Products', module: 'Products' },
  { id: 'p11', name: 'Create Products', module: 'Products' },
  { id: 'p12', name: 'Edit Products', module: 'Products' },
  { id: 'p13', name: 'Delete Products', module: 'Products' },
  // Categories
  { id: 'p14', name: 'View Categories', module: 'Categories' },
  { id: 'p15', name: 'Create Categories', module: 'Categories' },
  { id: 'p16', name: 'Edit Categories', module: 'Categories' },
  { id: 'p17', name: 'Delete Categories', module: 'Categories' },
  // Brands
  { id: 'p18', name: 'View Brands', module: 'Brands' },
  { id: 'p19', name: 'Create Brands', module: 'Brands' },
  { id: 'p20', name: 'Edit Brands', module: 'Brands' },
  { id: 'p21', name: 'Delete Brands', module: 'Brands' },
  // Media
  { id: 'p22', name: 'View Media', module: 'Media' },
  { id: 'p23', name: 'Upload Media', module: 'Media' },
  { id: 'p24', name: 'Delete Media', module: 'Media' },
];

// Mock Products - Bangladeshi products
export const products: Product[] = [
  { id: '1', name: 'Walton Laptop 15-intel', slug: 'walton-laptop-15-intel', category: 'Electronics', brand: 'Walton', price: 54990, stock: 45, status: 'Active', description: 'Walton 15.6 inch Intel Core i5 11th Gen laptop with 8GB RAM and 512GB SSD' },
  { id: '2', name: 'Singer Refrigerator 253L', slug: 'singer-refrigerator-253l', category: 'Electronics', brand: 'Singer', price: 42990, stock: 28, status: 'Active', description: 'Singer 253 liter frost freezer double door refrigerator' },
  { id: '3', name: 'Aarong Dairy Milk 1L', slug: 'aarong-dairy-milk-1l', category: 'Food & Beverages', brand: 'Aarong', price: 180, stock: 500, status: 'Active', description: 'Fresh cow milk from Aarong dairy, 1 liter pack' },
  { id: '4', name: 'Bashundhara Tissue Pack', slug: 'bashundhara-tissue-pack', category: 'Household', brand: 'Bashundhara', price: 85, stock: 1200, status: 'Active', description: 'Bashundhara facial tissue pack, 100 sheets per pack' },
  { id: '5', name: 'Apex Sports Shoes', slug: 'apex-sports-shoes', category: 'Fashion', brand: 'Apex', price: 2499, stock: 156, status: 'Active', description: 'Apex mens running sports shoes with rubber sole' },
  { id: '6', name: 'RFL Plastic Chair', slug: 'rfl-plastic-chair', category: 'Furniture', brand: 'RFL', price: 1250, stock: 89, status: 'Inactive', description: 'RFL premium quality molded plastic chair, stackable' },
  { id: '7', name: 'Deshi Chicken Eggs 12pc', slug: 'deshi-chicken-eggs-12pc', category: 'Food & Beverages', brand: 'Local Farm', price: 240, stock: 320, status: 'Active', description: 'Fresh deshi chicken eggs, pack of 12' },
  { id: '8', name: 'DBBL Savings Account', slug: 'dbbl-savings-account', category: 'Services', brand: 'DBBL', price: 0, stock: 9999, status: 'Active', description: 'Dutch-Bangla Bank Limited savings account with zero maintenance fee' },
];

// Mock Categories
export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', productCount: 156 },
  { id: '2', name: 'Food & Beverages', slug: 'food-beverages', productCount: 89 },
  { id: '3', name: 'Household', slug: 'household', productCount: 234 },
  { id: '4', name: 'Fashion', slug: 'fashion', productCount: 312 },
  { id: '5', name: 'Furniture', slug: 'furniture', productCount: 67 },
  { id: '6', name: 'Services', slug: 'services', productCount: 23 },
  { id: '7', name: 'Health & Beauty', slug: 'health-beauty', productCount: 145 },
  { id: '8', name: 'Sports & Outdoors', slug: 'sports-outdoors', productCount: 78 },
  { id: '9', name: 'Automotive', slug: 'automotive', productCount: 45 },
  { id: '10', name: 'Office Supplies', slug: 'office-supplies', productCount: 112 },
  { id: '11', name: 'Toys & Games', slug: 'toys-games', productCount: 89 },
  { id: '12', name: 'Books & Education', slug: 'books-education', productCount: 234 },
];

// Mock Brands - Bangladeshi brands
export const brands: Brand[] = [
  { id: '1', name: 'Walton', slug: 'walton', productCount: 89 },
  { id: '2', name: 'Singer', slug: 'singer', productCount: 67 },
  { id: '3', name: 'Aarong', slug: 'aarong', productCount: 45 },
  { id: '4', name: 'Bashundhara', slug: 'bashundhara', productCount: 123 },
  { id: '5', name: 'Apex', slug: 'apex', productCount: 78 },
  { id: '6', name: 'RFL', slug: 'rfl', productCount: 56 },
];

// Mock Media Items
export const mediaItems: MediaItem[] = [
  { id: '1', name: 'product-banner-1.jpg', type: 'image', url: '', size: '2.4 MB', createdAt: '2024-06-01' },
  { id: '2', name: 'product-gallery-1.jpg', type: 'image', url: '', size: '1.8 MB', createdAt: '2024-06-02' },
  { id: '3', name: 'hero-slider-1.jpg', type: 'image', url: '', size: '3.2 MB', createdAt: '2024-06-03' },
  { id: '4', name: 'brand-logo-walton.png', type: 'image', url: '', size: '245 KB', createdAt: '2024-06-04' },
  { id: '5', name: 'category-electronics.jpg', type: 'image', url: '', size: '1.5 MB', createdAt: '2024-06-05' },
  { id: '6', name: 'promo-summer-2024.jpg', type: 'image', url: '', size: '4.1 MB', createdAt: '2024-06-06' },
  { id: '7', name: 'testimonial-video.mp4', type: 'video', url: '', size: '45.6 MB', createdAt: '2024-06-07' },
  { id: '8', name: 'about-us-team.jpg', type: 'image', url: '', size: '2.9 MB', createdAt: '2024-06-08' },
  { id: '9', name: 'footer-logo.png', type: 'image', url: '', size: '128 KB', createdAt: '2024-06-09' },
  { id: '10', name: 'blog-post-1.jpg', type: 'image', url: '', size: '1.7 MB', createdAt: '2024-06-10' },
  { id: '11', name: 'blog-post-2.jpg', type: 'image', url: '', size: '2.1 MB', createdAt: '2024-06-11' },
  { id: '12', name: 'how-to-video.mp4', type: 'video', url: '', size: '67.3 MB', createdAt: '2024-06-12' },
  { id: '13', name: 'social-facebook.jpg', type: 'image', url: '', size: '890 KB', createdAt: '2024-06-13' },
  { id: '14', name: 'social-instagram.jpg', type: 'image', url: '', size: '1.2 MB', createdAt: '2024-06-14' },
  { id: '15', name: 'newsletter-bg.jpg', type: 'image', url: '', size: '3.5 MB', createdAt: '2024-06-15' },
  { id: '16', name: 'placeholder-banner.jpg', type: 'image', url: '', size: '1.9 MB', createdAt: '2024-06-16' },
  { id: '17', name: 'product-zoom-1.jpg', type: 'image', url: '', size: '4.8 MB', createdAt: '2024-06-17' },
  { id: '18', name: 'product-zoom-2.jpg', type: 'image', url: '', size: '5.2 MB', createdAt: '2024-06-18' },
  { id: '19', name: 'demo-video.mp4', type: 'video', url: '', size: '34.7 MB', createdAt: '2024-06-19' },
  { id: '20', name: 'avatar-placeholder.png', type: 'image', url: '', size: '45 KB', createdAt: '2024-06-20' },
];

// Recent Activity
export const recentActivity: Activity[] = [
  { id: '1', user: 'Rahim Ahmed', action: 'Added new product "Walton Laptop 15"', time: '2 minutes ago' },
  { id: '2', user: 'Fatima Begum', action: 'Updated category "Electronics"', time: '15 minutes ago' },
  { id: '3', user: 'Kamal Hossain', action: 'Deleted user "john@example.com"', time: '1 hour ago' },
  { id: '4', user: 'Nadia Islam', action: 'Uploaded 5 new images to media gallery', time: '2 hours ago' },
  { id: '5', user: 'Saif Rahman', action: 'Created new role "Content Manager"', time: '3 hours ago' },
];

// Chart Data
export const userGrowthData: ChartData[] = [
  { label: 'Jan 1', value: 120 },
  { label: 'Jan 2', value: 145 },
  { label: 'Jan 3', value: 132 },
  { label: 'Jan 4', value: 168 },
  { label: 'Jan 5', value: 156 },
  { label: 'Jan 6', value: 189 },
  { label: 'Jan 7', value: 201 },
];

export const productDistributionData: { label: string; value: number; color: string }[] = [
  { label: 'Electronics', value: 35, color: 'hsl(221.2 83.2% 53.3%)' },
  { label: 'Fashion', value: 28, color: 'hsl(160 84% 39%)' },
  { label: 'Food & Beverages', value: 18, color: 'hsl(38 92% 50%)' },
  { label: 'Household', value: 12, color: 'hsl(0 84% 60%)' },
  { label: 'Others', value: 7, color: 'hsl(270 60% 60%)' },
];

// Stats for Dashboard
export const dashboardStats = {
  totalUsers: 1245,
  totalProducts: 89,
  totalCategories: 12,
  recentActivity: 156,
};
