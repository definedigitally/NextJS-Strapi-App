import type { Schema, Struct } from '@strapi/strapi';

export interface CardBlogCard extends Struct.ComponentSchema {
  collectionName: 'components_card_blog_cards';
  info: {
    description: '';
    displayName: 'Blog Card';
    icon: 'file';
  };
  attributes: {
    Date: Schema.Attribute.Date;
    Heading: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Tag: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'card.blog-card': CardBlogCard;
    }
  }
}
