export const convertBase64 = (selectedfile) => {
  const [imageFile] = selectedfile;
  const fileReader = new FileReader();
  let srcData = "ss";
  fileReader.onload = () => {
    srcData = fileReader.result;
  };
  console.log("base64:", srcData);
  fileReader.readAsDataURL(imageFile);
  return srcData;
};
