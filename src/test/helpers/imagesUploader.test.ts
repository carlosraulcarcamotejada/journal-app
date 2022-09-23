import fetch from "isomorphic-fetch";
import { imagesUploader } from "../../helpers/imagesUploader";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name:'dshv2du95',
  api_key:'195499424784431',
  api_secret:'yN-PKyS9kw14qg6rlFIQfL4cvxs',
  secure:true
});


describe("Pruebas en imageUploader", () => {
  test("debe subir el archivo correctamente a cloudinary", async () => {
    const imageUrl =
      "https://cdn.freeones.com/photo-77b/5N/Et/DfYA2owE8CowTnDMKP/Pretty-Little-Caprice-strips-to-just-her-sneakers_001_big.jpg";

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = await new File([blob], "little_caprice", {
      type: blob.type,
    });

    

    await imagesUploader(file);
  });
});
