export const maxZoom = 20;
export const minZoom = -5;
export const defaultFontSize = 12;

export function zoomToFontSize(zoom: number): number {
  // https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/config/fontInfo.ts#L74
  return defaultFontSize * (1 + zoom * 0.1);
}

export function fontSizeToZoom(fontSize: number): number {
  return (fontSize / defaultFontSize - 1) / 0.1;
}
