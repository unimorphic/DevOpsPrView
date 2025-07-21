<script lang="ts">
  import FormField from "@smui/form-field";
  import Slider from "@smui/slider";
  import type { FeatureStorageValue } from "../../features";
  import Option from "../options/Option.svelte";
  import { maxZoom, minZoom, zoomToFontSize } from "./codeZoomShared";
  import ExampleCodeBlock from "./ExampleCodeBlock.svelte";

  const props: { storageValues: { [key: string]: any } } = $props();

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
  storageValues={props.storageValues}
  title="Code Zoom"
>
  {#snippet children(featureStorageValue, onUpdateData)}
    Enables changing the zoom of code blocks by using ctrl + mouse wheel or
    manually via the slider below (when enabled) and remembers the zoom level
    between sessions

    {#if featureStorageValue?.isEnabled}
      <FormField align="end" class="code-zoom-field">
        <span slot="label">Zoom</span>
        <Slider
          class="code-zoom-slider"
          discrete
          input$aria-label="Code zoom"
          min={minZoom}
          max={maxZoom}
          onSMUISliderInput={(e: { detail: { value: unknown } }) =>
            onUpdateData(e.detail.value)}
          step={1}
          value={getZoom(featureStorageValue)}
        />
      </FormField>
    {/if}
  {/snippet}
  {#snippet beforeImage()}
    <div class="code-block">
      <ExampleCodeBlock />
    </div>
  {/snippet}
  {#snippet afterImage(featureStorageValue)}
    <div class="code-block">
      <ExampleCodeBlock
        codeBlockStyle="font-size: {getAfterFontSize(featureStorageValue)}px"
      />
    </div>
  {/snippet}
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
