export type BlogPost = {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  image?: string | null;
};

export type PreviewCardRaw = {
  id: number;
  Title: string;
  Category: string;
  Date: string;
  ReadTime: string;
  Slug: string;
  Image?: {
    url: string;
  };
};
