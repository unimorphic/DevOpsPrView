<script lang="ts">
  import Accordion from "@smui-extra/accordion";
  import Banner, { Icon, Label } from "@smui/banner";
  import CircularProgress from "@smui/circular-progress";
  import IconButton from "@smui/icon-button";
  import AutoCollapseLeftPanelOption from "../autoCollapseLeftPanel/AutoCollapseLeftPanelOption.svelte";
  import CodeZoomOption from "../codeZoom/CodeZoomOption.svelte";
  import CommentHighlightToggle from "../commentHighlightToggle/CommentHighlightToggleOption.svelte";
  import features from "../features";
  import FullScreenToggleOption from "../fullScreenToggle/FullScreenToggleOption.svelte";
  import SingleHorizontalScrollbarOption from "../singleHorizontalScrollbar/SingleHorizontalScrollbarOption.svelte";
  import SingleVerticalScrollbarOption from "../singleVerticalScrollbar/SingleVerticalScrollbarOption.svelte";
  import TrueFullScreenOption from "../trueFullScreen/TrueFullScreenOption.svelte";
  import CloseIcon from "./CloseIcon.svelte";
  import OpenOptionsReason from "./OpenOptionsReason";
  import WarningIcon from "./WarningIcon.svelte";
  import InfoIcon from "./InfoIcon.svelte";

  let storageValues: { [key: string]: any } | null = null;
  let openReason: OpenOptionsReason | null = null;

  chrome.storage.local.get(Object.keys(features), (values) => {
    storageValues = values;
  });

  chrome.runtime.sendMessage({}, (response: OpenOptionsReason) => {
    openReason = response;
  });

  function onCloseBanner(): void {
    openReason = null;
  }
</script>

<h1>Azure DevOps PR View Options</h1>

<Banner
  class="settings-banner"
  on:SMUIBanner:closed={onCloseBanner}
  open={openReason !== null}
>
  <Label slot="label">
    <WarningIcon />
    <div>
      {#if openReason === OpenOptionsReason.install}
        Install successful, enable/disable the below features as desired. This
        page can be opened again by clicking the extension button in the
        extensions toolbar menu.
      {:else if openReason === OpenOptionsReason.update}
        New features have been added, enable/disable them below
      {/if}
    </div>
  </Label>
  <IconButton on:click={onCloseBanner} slot="actions">
    <Icon><CloseIcon /></Icon>
  </IconButton>
</Banner>

<div class="info">
  <InfoIcon />
  Any open Azure DevOps pages must be reloaded after changing any of the below options
</div>

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
    <SingleHorizontalScrollbarOption {storageValues} />
  </Accordion>
{/if}

<style type="text/scss">
  :global(.settings-banner) {
    margin-bottom: 32px;
  }
  .info {
    & > :global(svg) {
      display: block;
      margin-right: 5px;
    }
    align-items: center;
    display: flex;
    font-size: 0.8em;
    margin-bottom: 32px;
  }
</style>
