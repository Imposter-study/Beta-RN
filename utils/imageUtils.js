import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

export const getFileInfoFromUri = (uri) => {
  const uriParts = uri.split("/");
  const fileName = uriParts[uriParts.length - 1];

  const extension = fileName.split(".").pop()?.toLowerCase();
  let mimeType = "image/jpeg"; // 기본값

  if (extension === "png") mimeType = "image/png";
  else if (extension === "jpg" || extension === "jpeg") mimeType = "image/jpeg";
  else if (extension === "webp") mimeType = "image/webp";

  return {
    name: fileName,
    type: mimeType,
  };
};
