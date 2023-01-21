export const useLastIsOperand = (value) => {
  let operand = `${value}`.slice(-1)
  if (
    operand === '+' ||
    operand === '-' ||
    operand === '*' ||
    operand === '/'
  ) {
    return true
  } else {
    return false
  }
}