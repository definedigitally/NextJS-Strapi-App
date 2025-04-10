"use server";

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
