import { UploadFile } from "antd";

export interface Blog {
  _id: string;
  user: StringConstructor;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogUpload {
  _id: string;
  title: string;
  content: string;
  upload: UploadFile[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface FillterType {
  title?: string;
  sort?: string;
}
