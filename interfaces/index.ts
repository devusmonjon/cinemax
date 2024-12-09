export interface INotification {
  _id: string;
  user_id: string;
  message: string;
  image?: string;
  url: string;
  isViewed: boolean;
  viewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  title: string;
}

export interface IMovie {
  _id: string;
  title: string;
  description: string;
  poster: string;
  cover: string;
  slug: string;
  rating: string;
  genres: string[];
}
