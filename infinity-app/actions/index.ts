"use server";

import { BlogPost, PreviewCardRaw } from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export async function getSiteFooter() {
  const res = await fetch(`${STRAPI_URL}/api/site-footer?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch site footer");

  const { data } = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getImageUrl = (img: any) =>
    img?.url ? `${STRAPI_URL}${img.url}` : null;

  return {
    address: data.Address,
    phone: data.Phone,
    socials: data.Social_Link,
    links: data.Footer_Link,
    logoLight: getImageUrl(data.Logo_Light?.[0]),
    logoDark: getImageUrl(data.Logo_Dark?.[0]),
  };
}

export async function getBlogSectionData() {
  const res = await fetch(
    `${STRAPI_URL}/api/content-preview-section?populate[Preview_Card][populate]=Image`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch blog section");

  const { data } = await res.json();

  return {
    title: data.Title,
    buttonText: data.Button_Text,
    buttonLink: data.Button_Link,
    posts: data.Preview_Card.map(
      (item: PreviewCardRaw): BlogPost => ({
        id: item.id,
        title: item.Title,
        category: item.Category,
        date: new Date(item.Date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readTime: `${item.ReadTime} min read`,
        slug: item.Slug,
        image: item.Image?.url ? `${STRAPI_URL}${item.Image.url}` : null,
      })
    ),
  };
}
