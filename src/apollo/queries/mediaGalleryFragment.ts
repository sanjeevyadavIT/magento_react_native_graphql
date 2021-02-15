import { gql } from '@apollo/client';

export interface MediaGalleryItemType {
  disabled: boolean;
  label: string;
  position: number;
  url: string;
}

export const MEDIA_GALLERY_FRAGMENT = gql`
  fragment MediaGallery on ProductInterface {
    mediaGallery: media_gallery {
      disabled
      label
      position
      url
    }
  }
`;
