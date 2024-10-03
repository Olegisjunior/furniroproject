import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface IFurniture {
  name: string;
  id: number;
  img: string;
  desc: string;
  price: number;
  discount: boolean;
  gallery: string[];
  gallery_second_color?: string[];
  gallery_third_color?: string[];
  colors: string[];
  sizes?: string[];
  size_photo?: string[];
  prod_info: {
    Length?: string;
    Width?: string;
    Height?: string;
    Material: string;
    Frame_Material?: string;
    Seating_Capacity?: string;
    Finish?: string;
    Model?: string;
    Warranty?: string;
  };
  prod_info2?: {
    Length?: string;
    Width?: string;
    Height?: string;
    Material: string;
    Frame_Material?: string;
    Seating_Capacity?: string;
    Finish?: string;
    Model?: string;
    Warranty?: string;
  };
}

export interface ListResponse<T> {
  data: T;
}

export const furnitureApi = createApi({
  reducerPath: "furnitureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66cace3959f4350f064ff108.mockapi.io",
  }),
  endpoints: (builder) => ({
    getFurnitureById: builder.query<IFurniture, number>({
      query: (id) => `furnitures/${id}`,
    }),
    getFurnitures: builder.query<IFurniture[], void>({
      query: () => "/furnitures",
    }),
    getFurnitureByName: builder.query<IFurniture[], string>({
      query: (name) => `furnitures?name=${name}`,
    }),
    listItems: builder.query<
      ListResponse<IFurniture>,
      {
        category?: string;
        page: number;
        sortBy?: string;
        order?: string;
        limit: number;
      }
    >({
      query: (filters) => {
        const { page = 1, category, sortBy, order, limit = 12 } = filters || {};

        const queryParams = new URLSearchParams({
          ...(page ? { page: page.toString() } : {}),
          ...(category ? { category } : {}),
          ...(sortBy ? { sortBy } : {}),
          ...(order ? { order } : {}),
          ...(limit ? { limit: limit.toString() } : {}),
        });

        return `furnitures?${queryParams.toString()}`;
      },
    }),
  }),
});

// sortBy=name&order=desc

export const {
  useGetFurnitureByIdQuery,
  useGetFurnituresQuery,
  useListItemsQuery,
  useGetFurnitureByNameQuery,
} = furnitureApi;
