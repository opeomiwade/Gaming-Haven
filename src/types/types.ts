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

export type DashDetails = {
  receivedOrders: [];
  placedOrders: [];
  savedListings: [];
  listedProducts: [];
  sentTrades: [];
  receivedTrades: [];
  totalIncome: number;
  totalExpenses: number;
  totalSales: number;
  netIncome: number;
};

export type User = {
  userId: number;
  email: string;
  imageUrl: string;
  username: string;
  createdAt: Date;
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
  listingId:number,
  description: string,
  price: number,
  condition: string,
  status: string,
  seller: User
  images: Image[]
  createdAt: Date;
  listedProduct: Product
}

export type TradeDetails = {
  id: number;
  user1: User;
  user2: User;
  listing1: Listing;
  listing2: Listing;
  tradeStatus: string;
  createdAt: Date;
};

export type Order = {
  orderId: number;
  buyer: User;
  seller: User;
  orderDate: Date;
  totalPrice: number;
  username: number;
  products: Product[];
};

export type UploadedImage = {
  dataUrl: string;
  id: string;
};
