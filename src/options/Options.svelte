<script lang="ts">
  import Accordion from "@smui-extra/accordion";
  import CircularProgress from "@smui/circular-progress";
  import features from "../features";
  import Option from "./Option.svelte";

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
    <Option
      description="Removes the vertical scrollbars on individual files when viewing the files in a PR"
      feature="singleVerticalScrollbar"
      {storageValues}
      title="Single Vertical Scrollbar"
    />
    <Option
      description="Adds a button to view in full screen mode when viewing a single commit & when creating a new PR. Operates similar to the full screen mode when viewing the files in a PR. Keyboard shortcut 'z' is also supported."
      feature="fullScreenToggle"
      {storageValues}
      title="Additional Full Screen Toggle Buttons"
    />
  </Accordion>
{/if}
