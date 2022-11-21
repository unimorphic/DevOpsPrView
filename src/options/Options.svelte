<script lang="ts">
  import Accordion from "@smui-extra/accordion";
  import CircularProgress from "@smui/circular-progress";
  import AutoCollapseLeftPanelOption from "../autoCollapseLeftPanel/AutoCollapseLeftPanelOption.svelte";
  import CodeZoomOption from "../codeZoom/CodeZoomOption.svelte";
  import CommentHighlightToggle from "../commentHighlightToggle/CommentHighlightToggleOption.svelte";
  import features from "../features";
  import FullScreenToggleOption from "../fullScreenToggle/FullScreenToggleOption.svelte";
  import SingleVerticalScrollbarOption from "../singleVerticalScrollbar/SingleVerticalScrollbarOption.svelte";
  import TrueFullScreenOption from "../trueFullScreen/TrueFullScreenOption.svelte";

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
    <TrueFullScreenOption {storageValues} />
    <AutoCollapseLeftPanelOption {storageValues} />
    <CommentHighlightToggle {storageValues} />
  </Accordion>
{/if}
