export const isDomainValid = (url: string) => {
  const domainRegex = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/i;
  return domainRegex.test(url);
};
