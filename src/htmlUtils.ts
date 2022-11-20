export function querySelectorAll(selector: string): HTMLElement[] {
  return [...document.querySelectorAll(selector)] as HTMLElement[];
}
