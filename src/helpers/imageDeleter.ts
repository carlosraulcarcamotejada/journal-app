import { v2 as cloudinary } from "cloudinary";

export const imageDeleter = async (images: string[] = []) => {
  //   cloudinary.config({
  //     cloud_name: "dshv2du95",
  //     api_key: "195499424784431",
  //     api_secret: "yN-PKyS9kw14qg6rlFIQfL4cvxs",
  //     secure: true,
  //   });

  const imagesDelete = images.map((image) => {
    const segments = image.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    return "journal-app/" + imageId;
  });

  console.log(imagesDelete);

  //   await cloudinary.api.delete_resources([...imagesDelete], {
  //     resource_type: "image",
  //   });
};
