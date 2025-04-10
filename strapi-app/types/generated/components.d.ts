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

export interface SharedFooterNavigation extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_navigations';
  info: {
    displayName: 'Footer Navigation';
    icon: 'link';
  };
  attributes: {
    Label: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedGalleryItems extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallery_items';
  info: {
    displayName: 'Gallery Items';
    icon: 'picture';
  };
  attributes: {
    Alt_Text: Schema.Attribute.String;
    Caption: Schema.Attribute.String;
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SharedItems extends Struct.ComponentSchema {
  collectionName: 'components_shared_items';
  info: {
    displayName: 'Items';
    icon: 'bulletList';
  };
  attributes: {
    Category: Schema.Attribute.String;
    Date: Schema.Attribute.Date;
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    ReadTime: Schema.Attribute.BigInteger;
    Slug: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedMembers extends Struct.ComponentSchema {
  collectionName: 'components_shared_members';
  info: {
    displayName: 'Members';
    icon: 'user';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Name: Schema.Attribute.String;
    Role: Schema.Attribute.String;
  };
}

export interface SharedNavigationItems extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigation_items';
  info: {
    displayName: 'Navigation Items';
    icon: 'link';
  };
  attributes: {
    Label: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Links';
    icon: 'link';
  };
  attributes: {
    Icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Social_Platform: Schema.Attribute.Enumeration<
      [
        'facebook',
        'x',
        'instagram',
        'linkedin',
        'youtube',
        'github',
        'dribbble',
        'behance',
      ]
    >;
    URL: Schema.Attribute.String;
  };
}

export interface SharedStartups extends Struct.ComponentSchema {
  collectionName: 'components_shared_startups';
  info: {
    displayName: 'Startups';
    icon: 'dashboard';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    LinkedIn: Schema.Attribute.String;
    Person_Name: Schema.Attribute.String;
    Role: Schema.Attribute.String;
    Startup_Name: Schema.Attribute.String;
    Twitter: Schema.Attribute.String;
    Website: Schema.Attribute.String;
  };
}

export interface SharedUserProfile extends Struct.ComponentSchema {
  collectionName: 'components_shared_user_profiles';
  info: {
    displayName: 'User Profile';
    icon: 'user';
  };
  attributes: {
    Name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'card.blog-card': CardBlogCard;
      'shared.footer-navigation': SharedFooterNavigation;
      'shared.gallery-items': SharedGalleryItems;
      'shared.items': SharedItems;
      'shared.members': SharedMembers;
      'shared.navigation-items': SharedNavigationItems;
      'shared.social-links': SharedSocialLinks;
      'shared.startups': SharedStartups;
      'shared.user-profile': SharedUserProfile;
    }
  }
}
