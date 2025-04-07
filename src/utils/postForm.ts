export const formFormatUrl = (details: any) => {
  let formBody: string[] = [];
  for (var property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
};
