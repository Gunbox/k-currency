export const useOperated = (value) => {
  return Boolean(value && ['/', '*', '-', '+'].some((v) => value.includes(v)))
}