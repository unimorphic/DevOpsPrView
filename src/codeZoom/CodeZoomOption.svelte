<script lang="ts">
  import FormField from "@smui/form-field";
  import Slider from "@smui/slider";
  import type { FeatureStorageValue } from "../features";
  import Option from "../options/Option.svelte";
  import { maxZoom, minZoom, zoomToFontSize } from "./codeZoomShared";
  import ExampleCodeBlock from "./ExampleCodeBlock.svelte";

  export let storageValues: { [key: string]: any };

  function getZoom(featureStorageValue: FeatureStorageValue<unknown>): number {
    return featureStorageValue.data as number;
  }

  function getAfterFontSize(
    featureStorageValue: FeatureStorageValue<unknown>
  ): string {
    let zoom = 4;
    if (featureStorageValue.isEnabled) {
      zoom = getZoom(featureStorageValue);
    }
    return zoomToFontSize(zoom).toFixed(2);
  }
</script>

<Option
  feature="codeZoom"
  let:featureStorageValue
  let:onUpdateData
  {storageValues}
  title="Code Zoom"
>
  Enables changing the zoom of code blocks by using ctrl + mouse wheel or
  manually via the slider below (when enabled) and remembers the zoom level
  between sessions

  {#if featureStorageValue.isEnabled}
    <FormField align="end" class="code-zoom-field">
      <span slot="label">Zoom</span>
      <Slider
        class="code-zoom-slider"
        discrete
        input$aria-label="Code zoom"
        min={minZoom}
        max={maxZoom}
        on:SMUISlider:input={(e) => onUpdateData(e.detail.value)}
        step={1}
        value={getZoom(featureStorageValue)}
      />
    </FormField>
  {/if}

  <div class="code-block" slot="beforeImage">
    <ExampleCodeBlock />
  </div>
  <div class="code-block" slot="afterImage">
    <ExampleCodeBlock
      codeBlockStyle="font-size: {getAfterFontSize(featureStorageValue)}px"
    />
  </div>
</Option>

<style lang="scss">
  :global(.code-zoom-field) {
    display: flex;
    margin-top: 20px;
  }
  :global(.code-zoom-slider) {
    flex: 1;
  }
  .code-block {
    align-self: stretch;
  }
</style>
