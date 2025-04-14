"use server";

import {
  BlogPost,
  GalleryItemRaw,
  PreviewCardRaw,
  StartupMemberRaw,
  TeamMember,
  TeamMemberProps,
  TeamMemberRaw,
} from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;
if (!STRAPI_URL) {
  throw new Error("❌ Missing required environment variable: STRAPI_URL");
}

export async function getSiteFooter() {
  const res = await fetch(`${STRAPI_URL}/api/site-footer?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch site footer");

  const { data } = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getImageUrl = (img: any) =>
    img?.url ? `${STRAPI_URL}${img.url}` : "/placeholder.svg";

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

  const resJson = await res.json();
  const data = resJson.data;

  return {
    title: data.Title,
    buttonText: data.Button_Text,
    buttonLink: data.Button_Link,
    posts: data.Preview_Card.map((item: PreviewCardRaw): BlogPost => {
      const image = item.Image?.[0];
      return {
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
        image: image ? `${STRAPI_URL}${image.url}` : "/placeholder.svg",
        altText: image?.alternativeText || item.Title,
        width: image?.width || 1200,
        height: image?.height || 600,
      };
    }),
  };
}

export async function getProductTeamData(): Promise<{
  title: string;
  caption: string;
  members: TeamMember[];
}> {
  const res = await fetch(
    `${STRAPI_URL}/api/product-team-section?populate[Team_Member_Card][populate]=Image`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch Product Team Section");

  const { data } = await res.json();

  return {
    title: data.Headline,
    caption: data.Caption,
    members: data.Team_Member_Card.map((item: TeamMemberRaw): TeamMember => {
      const image = item.Image?.[0];
      return {
        id: item.id,
        name: item.Name,
        role: item.Role,
        content: item.Description,
        image: image ? `${STRAPI_URL}${image.url}` : "/placeholder.svg",
        altText: image?.alternativeText || item.Name,
        width: image?.width || 400,
        height: image?.height || 400,
      };
    }),
  };
}

export async function getStartupTeamSection() {
  const res = await fetch(
    `${STRAPI_URL}/api/startup-team-section?populate[Startup_Card][populate]=Image`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch startup team section");

  const { data } = await res.json();

  return {
    title: data.Headline,
    subtitle: data.Caption,
    teamMembers: data.Startup_Card.map(
      (item: StartupMemberRaw): TeamMemberProps => {
        const image = item.Image?.[0];
        return {
          name: item.Person_Name,
          role: item.Role,
          content: item.Description,
          image: image ? `${STRAPI_URL}${image.url}` : "/placeholder.svg",
          altText: image?.alternativeText || item.Person_Name,
          width: image?.width || 400,
          height: image?.height || 400,
          linkedin: item.LinkedIn,
          twitter: item.Twitter,
          website: item.Website,
        };
      }
    ),
  };
}

export async function getHeroParagraph() {
  const res = await fetch(`${STRAPI_URL}/api/hero-paragraph`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch hero paragraph");

  const { data } = await res.json();

  return {
    content: data.Content,
    buttonText: data.Button_Text,
    buttonLink: data.Button_Link,
  };
}

export async function getBeyondWorkGallery() {
  const res = await fetch(
    `${STRAPI_URL}/api/beyond-work-gallery?populate[Gallery_Items][populate]=Image`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch gallery");

  const { data } = await res.json();

  const images = data.Gallery_Items.map((item: GalleryItemRaw) => {
    const image = item.Image?.[0];
    return {
      src: image ? `${STRAPI_URL}${image.url}` : "/placeholder.svg",
      alt: item.Alt_Text || "Gallery image",
      caption: item.Caption || undefined,
      width: image?.width,
      height: image?.height,
    };
  });

  const half = Math.ceil(images.length / 2);

  return {
    title: data.Title,
    caption: data.Caption,
    topRowImages: images.slice(0, half),
    bottomRowImages: images.slice(half),
  };
}
