import getSiteUrl from "./getSiteUrl"

export const localImageLoader = ({ src, width, quality }) => {
  return `${getSiteUrl}/${src}?w=${width}&q=${quality || 75}`
}