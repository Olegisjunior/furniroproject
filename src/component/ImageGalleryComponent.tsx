import { useEffect, useState } from "react";
import { IFurniture } from "../store/furnitureApi";
import ImageGallery from "react-image-gallery";

type Image = {
  original: string;
  thumbnail: string;
};

interface ImageGalleryComponentProps {
  data: IFurniture | undefined;
  isColor: string | undefined;
}

export const ImageGalleryComponent: React.FC<ImageGalleryComponentProps> = ({
  data,
  isColor,
}) => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (!data) return;

    const updatedImages: Image[] = [];

    if (data.gallery && isColor === data?.colors?.[0]) {
      data?.gallery?.forEach((item: string) => {
        updatedImages.push({ original: item, thumbnail: item });
      });
    } else if (data.gallery_second_color && isColor === data?.colors?.[1]) {
      data?.gallery_second_color?.forEach((item: string) => {
        updatedImages.push({ original: item, thumbnail: item });
      });
    } else if (data.gallery_third_color && isColor === data?.colors?.[2]) {
      data?.gallery_third_color?.forEach((item: string) => {
        updatedImages.push({ original: item, thumbnail: item });
      });
    }

    setImages(updatedImages);
  }, [isColor, data]);

  return (
    <div className="gallery flex flex-col gap-5">
      <ImageGallery
        items={images}
        showNav={false}
        thumbnailPosition={"left"}
        showFullscreenButton={false}
        showPlayButton={false}
        disableThumbnailScroll={true}
      />
    </div>
  );
};
