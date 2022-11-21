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
  <Label class="settings-banner-label" slot="label">
    <div class="banner-content">
      <div class="banner-warn-icon"><WarningIcon /></div>
      <div>
        {#if openReason === OpenOptionsReason.install}
          Install successful, enable/disable the below features as desired. This
          page can be opened again by clicking the extension button in the
          extensions toolbar menu.
        {:else if openReason === OpenOptionsReason.update}
          New features have been added, enable/disable them below
        {/if}
      </div>
    </div>
  </Label>
  <IconButton on:click={onCloseBanner} slot="actions">
    <Icon><div class="banner-close-icon"><CloseIcon /></div></Icon>
  </IconButton>
</Banner>

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
    & > :global(*) {
      max-width: none;
    }
    background-color: rgba(67, 53, 25, 1);
    border-bottom: none;
    box-shadow: 0 3.2px 7.2px 0 rgba(0, 0, 0, 0.4),
      0 0.6px 1.8px 0 rgba(0, 0, 0, 0.32);
    margin-bottom: 20px;
  }
  :global(.settings-banner-label) {
    padding: 24px 20px;
    margin: 0;
  }
  .banner-content {
    align-items: center;
    display: flex;
  }
  .banner-close-icon {
    & > :global(svg) {
      display: block;
    }
  }
  .banner-warn-icon {
    & > :global(svg) {
      vertical-align: middle;
    }
    color: rgba(177, 133, 37, 1);
    margin-right: 20px;
  }
</style>
