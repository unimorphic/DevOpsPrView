<script lang="ts">
  import Accordion from "@smui-extra/accordion";
  import CircularProgress from "@smui/circular-progress";
  import CodeZoomOption from "../codeZoom/CodeZoomOption.svelte";
  import features from "../features";
  import FullScreenToggleOption from "../fullScreenToggle/FullScreenToggleOption.svelte";
  import SingleVerticalScrollbarOption from "../singleVerticalScrollbar/SingleVerticalScrollbarOption.svelte";

  let storageValues: { [key: string]: any } | null = null;

  chrome.storage.local.get(Object.keys(features), (values) => {
    storageValues = values;
  });
</script>

<h1>Azure DevOps PR View Options</h1>
<hr />

{#if !storageValues}
  <CircularProgress indeterminate />
{:else}
  <Accordion multiple>
    <SingleVerticalScrollbarOption {storageValues} />
    <FullScreenToggleOption {storageValues} />
    <CodeZoomOption {storageValues} />
  </Accordion>
{/if}
