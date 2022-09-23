
export const imagesUploader = async (file: File | null) => {
  if (!file) return null;
  

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/dshv2du95/image/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal-app");
  formData.append("file", file);

  
  try {
    const resp = await fetch(cloudinaryUrl, { method: "POST", body: formData });
    //console.log(resp);
    if (!resp.ok) throw new Error('No se pudo subir imagen');

    const cloudResp = await resp.json();
    
    return cloudResp.secure_url;

  } catch (error) {
    console.log(error);
    return null;
  }
};

