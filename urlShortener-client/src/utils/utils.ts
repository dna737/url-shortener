export const isDomainValid = (url: string) => {
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/i;
  return urlRegex.test(url);
};
