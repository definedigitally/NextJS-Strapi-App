export type BlogPost = {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  image: string;
  altText: string;
  width: number;
  height: number;
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
    alternativeText: string | null;
    width: number;
    height: number;
  }[];
};

export type TeamMemberRaw = {
  id: number;
  Name: string;
  Role: string;
  Description: string;
  Image?: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  }[];
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
  altText: string;
  width: number;
  height: number;
};

export type StartupMemberRaw = {
  id: number;
  Person_Name: string;
  Role: string;
  Description: string;
  LinkedIn: string;
  Twitter: string;
  Website: string;
  Image?: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  }[];
};

export type TeamMemberProps = {
  name: string;
  role: string;
  content: string;
  image: string;
  altText: string;
  width: number;
  height: number;
  linkedin: string;
  twitter: string;
  website: string;
};

export interface GalleryItemRaw {
  id: number;
  Caption: string | null;
  Alt_Text: string | null;
  Image?: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  }[];
}

export interface BeyondWorkGalleryResponse {
  Title: string;
  Caption: string;
  Gallery_Items: GalleryItemRaw[];
}
