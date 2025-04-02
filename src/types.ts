export interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt?: Date;
}

export interface FillterType {
  title?: string;
  latest?: boolean;
  old?: boolean;
}