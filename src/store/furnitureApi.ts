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
}

export interface ListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
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
      query: () => "furnitures",
    }),
    listItems: builder.query<ListResponse<IFurniture[]>, number | void>({
      query: (page = 1) => `furnitures?page=${page}&limit=10`,
    }),
  }),
});

export const {
  useGetFurnitureByIdQuery,
  useGetFurnituresQuery,
  useListItemsQuery,
} = furnitureApi;
