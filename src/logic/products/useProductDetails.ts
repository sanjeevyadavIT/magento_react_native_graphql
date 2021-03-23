import { useQuery, ApolloError } from '@apollo/client';
import { useState, useEffect, useReducer } from 'react';
import {
  GET_PRODUCT_DETAILS,
  GetProductDetailsVars,
  ProductDetailsDataType,
  ProductDetailsType,
  ProductTypeEnum,
} from '../../apollo/queries/getProductDetails';
import type { ConfigurableProductVariant } from '../../apollo/queries/configurableProductFragment';
import { PriceRangeType } from '../../apollo/queries/productPriceFragment';
import type { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';

interface Props {
  sku: string;
}

export type SelectedConfigurableProductOptions = { [key: string]: number };

export type HandleSelectedConfigurableOptions = (
  optionCode: string,
  valueIndex: number,
) => void;

interface Result extends ProductState {
  productDetails?: ProductDetailsType | null;
  loading: boolean;
  error: ApolloError | undefined;
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions;
  handleSelectedConfigurableOptions: HandleSelectedConfigurableOptions;
}

interface ProductState {
  priceRange: PriceRangeType | null;
  mediaGallery: Array<MediaGalleryItemType>;
}

const findSelectedProductVariant = (
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions,
  productData: ProductDetailsType,
): ConfigurableProductVariant | null => {
  if (productData.type !== ProductTypeEnum.CONFIGURED) {
    return null;
  }
  let variants = productData.variants;
  Object.keys(selectedConfigurableProductOptions).forEach(code => {
    variants = variants.filter(variant => {
      const attribute = variant.attributes.find(attr => attr.code === code);
      return attribute?.valueIndex === selectedConfigurableProductOptions[code];
    });
  });
  return variants?.[0];
};

export const useProductDetails = ({ sku }: Props): Result => {
  const [
    selectedConfigurableProductOptions,
    setSelectedConfigurableProductOptions,
  ] = useState<SelectedConfigurableProductOptions>({});
  const [
    selectedVariant,
    setSelectedVariant,
  ] = useState<ConfigurableProductVariant | null>(null);
  const [{ priceRange, mediaGallery }, setState] = useReducer<
    React.Reducer<ProductState, ProductState>
  >((prevState, newState) => ({ ...prevState, ...newState }), {
    priceRange: null,
    mediaGallery: [],
  });
  const { data, loading, error } = useQuery<
    ProductDetailsDataType,
    GetProductDetailsVars
  >(GET_PRODUCT_DETAILS, {
    variables: {
      sku,
    },
  });

  useEffect(() => {
    // User has selected configurable options, find the matching simple product
    if (
      data?.products?.items?.[0] &&
      Object.keys(selectedConfigurableProductOptions).length > 0
    ) {
      const variant = findSelectedProductVariant(
        selectedConfigurableProductOptions,
        data?.products?.items?.[0],
      );
      setSelectedVariant(variant);
    }
  }, [data, selectedConfigurableProductOptions]);

  useEffect(() => {
    if (data?.products?.items?.[0]) {
      if (selectedVariant) {
        setState({
          priceRange: selectedVariant.product.priceRange,
          mediaGallery: [
            ...selectedVariant.product.mediaGallery,
            ...data?.products?.items?.[0].mediaGallery,
          ],
        });
      } else {
        setState({
          priceRange: data?.products?.items?.[0].priceRange,
          mediaGallery: data?.products?.items?.[0].mediaGallery,
        });
      }
    }
  }, [data, selectedVariant]);

  const handleSelectedConfigurableOptions: HandleSelectedConfigurableOptions = (
    optionCode,
    valueIndex,
  ) => {
    setSelectedConfigurableProductOptions(prevState => ({
      ...prevState,
      [optionCode]: valueIndex,
    }));
  };

  return {
    productDetails: data?.products?.items?.[0],
    priceRange,
    mediaGallery,
    loading,
    error,
    selectedConfigurableProductOptions,
    handleSelectedConfigurableOptions,
  };
};
