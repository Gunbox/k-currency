export const useLocale = (value) => value.toLocaleString("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 20,
})