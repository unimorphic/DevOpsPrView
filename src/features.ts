export interface Feature {
  css: boolean;
  enabledByDefault: boolean;
  js: boolean;
}

export interface FeatureStorageValue {
  isEnabled: boolean;
  isOptionExpanded: boolean;
}

const features = {
  fullScreenToggle: { css: true, enabledByDefault: true, js: true },
  singleVerticalScrollbar: { css: true, enabledByDefault: true, js: false },
};

export type FeatureKey = keyof typeof features;

export function getFeatureStorageValue(
  feature: FeatureKey,
  storageValues: { [key: string]: any }
): FeatureStorageValue {
  return !storageValues[feature]
    ? { isEnabled: features[feature].enabledByDefault, isOptionExpanded: true }
    : storageValues[feature];
}

export default features;
