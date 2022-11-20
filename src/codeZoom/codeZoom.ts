import {
  getFeatureValueFromStorage,
  setFeatureStorageValue,
  type FeatureStorageValue,
} from "../features";
import { querySelectorAll } from "../htmlUtils";
import {
  fontSizeToZoom,
  maxZoom,
  minZoom,
  zoomToFontSize,
} from "./codeZoomShared";

let configuredElements: HTMLElement[] = [];
let storageValue: FeatureStorageValue<number>;

const fontSizeObserver = new MutationObserver((mutations: MutationRecord[]) => {
  const target = mutations[0].target as HTMLElement;
  storageValue.data = fontSizeToZoom(getFontSize(target));
  setFeatureStorageValue("codeZoom", storageValue);
});

function onWheelCodeContainer(event: WheelEvent): void {
  if (!event.ctrlKey) {
    return;
  }

  const zoom = storageValue.data + (event.deltaY < 0 ? 1 : -1);
  if (zoom >= minZoom && zoom <= maxZoom) {
    storageValue.data = zoom;
    setFeatureStorageValue("codeZoom", storageValue);

    configureZoomElements();
  }

  event.preventDefault();
}

function getFontSize(element: HTMLElement): number {
  return parseFloat(element.style.fontSize.replace("px", ""));
}

function configureZoomElements(): void {
  const zoom = storageValue.data!;
  const fontSize = `${zoomToFontSize(zoom).toFixed(2)}px`;

  const codeContainers = querySelectorAll(".repos-summary-diff-container");
  for (const container of codeContainers) {
    container.style.fontSize = fontSize;

    if (!configuredElements.includes(container)) {
      container.addEventListener("wheel", onWheelCodeContainer);
    }
  }

  const editors = querySelectorAll(".vss-base-editor");
  for (const editor of editors) {
    const fontElement = editor.querySelector(
      ".monaco-mouse-cursor-text"
    ) as HTMLElement;

    // Multiple wheel events must be used since the monaco editor doesn't use the delta value
    // https://github.com/microsoft/vscode/blob/79c26b4dd3366bb965b10625beb1dd39f0171f19/src/vs/editor/browser/controller/mouseHandler.ts#L147
    let editorZoom = fontSizeToZoom(getFontSize(fontElement));
    while (Math.abs(editorZoom - zoom) >= 1) {
      const delta = zoom > editorZoom ? 1 : -1;
      fontElement.dispatchEvent(
        new WheelEvent("wheel", {
          bubbles: true,
          ctrlKey: true,
          deltaY: delta,
        })
      );
      editorZoom += delta;
    }

    if (!configuredElements.includes(editor)) {
      fontSizeObserver.observe(fontElement, { attributes: true });
    }
  }

  configuredElements = codeContainers.concat(editors);
}

getFeatureValueFromStorage<number>("codeZoom").then((value) => {
  storageValue = value;

  new MutationObserver(configureZoomElements).observe(document, {
    childList: true,
    subtree: true,
  });
  configureZoomElements();
});
