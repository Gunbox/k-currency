export const useDropdownClick = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}