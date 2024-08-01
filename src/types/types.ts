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
  receivedTrades: TradeDetails[];
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
  sender: User;
  recipient: User;
  requestedItem: Listing;
  tradeStatus: string;
  createdAt: string;
};

export type Order = {
  orderId: number;
  buyer: User;
  orderDate: string;
  totalPrice: number;
};

export type ImageFile = {
  dataUrl: string;
  id: string;
  imageFile: File;
};

export type RawgResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: any;
};

export type Platform = {
  id: number;
  name: string;
  slug: string;
  platform: { [key: string]: any };
};

export type Store = {
  game_id: number;
  id: number;
  url: string;
  store_id: number;
};

export type YoutubeAPIResponse = {
  kind: string;
  eTag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: Object;
  items: Array<{ [key: string]: any }>;
};
