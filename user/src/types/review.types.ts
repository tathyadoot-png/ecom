export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  user: ReviewUser;
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
