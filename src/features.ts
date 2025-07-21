export interface Feature {
  cssFile?: boolean | string;
  enabledByDefault?: boolean;
  defaultData?: unknown;
  jsFileIsolated?: boolean | string;
  jsFileMain?: boolean | string;
}

export interface FeatureStorageValue<T> {
  data?: T;
  isEnabled: boolean;
  isOptionExpanded: boolean;
}

function makeFeatureMap<T extends Record<string, Feature>>(
  map: T
): { [index in keyof T]: Feature } {
  return map;
}

const features = makeFeatureMap({
  autoCollapseLeftPanel: { jsFileIsolated: true },
  codeZoom: {
    defaultData: 0,
    jsFileIsolated: true,
    enabledByDefault: true,
  },
  commentHighlightToggle: {
    defaultData: true,
    enabledByDefault: true,
    jsFileIsolated: true,
  },
  fullScreenToggle: {
    cssFile: true,
    enabledByDefault: true,
    jsFileIsolated: true,
  },
  singleHorizontalScrollbar: { cssFile: true },
  trueFullScreen: { jsFileIsolated: true },
});

export type FeatureKey = keyof typeof features;

export function getFeatureStorageValue<T>(
  feature: FeatureKey,
  storageValues: { [key: string]: any }
): FeatureStorageValue<T> {
  return !storageValues[feature]
    ? {
        data: features[feature].defaultData as T,
        isEnabled: features[feature].enabledByDefault ?? false,
        isOptionExpanded: true,
      }
    : storageValues[feature];
}

export async function getFeatureValueFromStorage<T>(
  feature: FeatureKey
): Promise<FeatureStorageValue<T>> {
  const storageValues = await browser.storage.local.get([feature]);
  return getFeatureStorageValue(feature, storageValues);
}

export function setFeatureStorageValue<T>(
  feature: FeatureKey,
  value: FeatureStorageValue<T>
): Promise<void> {
  return browser.storage.local.set({ [feature]: value });
}

export default features;
