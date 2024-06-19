import { JwtPayload } from "jwt-decode";

export type TabProps = {
  isSelected: boolean;
  onSelect: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  layoutId: string;
};

export type currentUserState = {
  username: string;
  email: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
  password: string;
};

export interface MyJwtPayload extends JwtPayload {
  email: string;
}

export type Offer = {
  id: number;
  sender: User;
  recipient: User;
  offer: number;
  status: string;
  listing: Listing;
  createdAt: string;
};

export type DashDetails = {
  soldListings: Listing[];
  orders: Order[];
  savedListings: Listing[];
  listedProducts: Listing[];
  sentTrades: TradeDetails[];
  receivedTrades: [];
  totalIncome: number;
  totalExpenses: number;
  marketplaceTotalSales: number;
  netIncome: number;
  sentOffers: Offer[];
  receivedOffers: Offer[];
};

export type User = {
  userId: number;
  email: string;
  imageUrl: string;
  username: string;
  createdAt: string;
};

export type FilterQueryParams = {
  categoryName?: string;
  manufacturers?: string[];
  condition?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  increasing?: boolean;
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type Image = {
  imageId: number;
  imageUrl: string;
};

export type Product = {
  productId: number;
  manufacturer: string;
  productName: string;
  category: Category;
};

export type Listing = {
  listingId: number;
  description: string;
  price: number;
  condition: string;
  status: string;
  seller: User;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  listedProduct: Product;
  order: Order;
};

export type TradeDetails = {
  id: number;
  user1: User;
  user2: User;
  listing1: Listing;
  listing2: Listing;
  tradeStatus: string;
  createdAt: string;
};

export type Order = {
  orderId: number;
  buyer: User;
  orderDate: string;
  totalPrice: number;
};

export type UploadedImage = {
  dataUrl: string;
  id: string;
};
