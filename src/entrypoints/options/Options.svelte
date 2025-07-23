<script lang="ts">
  import Accordion from "@smui-extra/accordion";
  import Banner, { Icon, Label } from "@smui/banner";
  import CircularProgress from "@smui/circular-progress";
  import IconButton from "@smui/icon-button";
  import AutoCollapseLeftPanelOption from "../autoCollapseLeftPanel/AutoCollapseLeftPanelOption.svelte";
  import CodeZoomOption from "../codeZoom/CodeZoomOption.svelte";
  import CommentHighlightToggle from "../commentHighlightToggle/CommentHighlightToggleOption.svelte";
  import features, {
    getFeatureStorageValue,
    setFeatureStorageValue,
    type FeatureKey,
  } from "../../features";
  import FullScreenToggleOption from "../fullScreenToggle/FullScreenToggleOption.svelte";
  import SingleHorizontalScrollbarOption from "../singleHorizontalScrollbar/SingleHorizontalScrollbarOption.svelte";
  import TrueFullScreenOption from "../trueFullScreen/TrueFullScreenOption.svelte";
  import CloseIcon from "./icons/CloseIcon.svelte";
  import ExpandIcon from "./icons/ExpandIcon.svelte";
  import InfoIcon from "./icons/InfoIcon.svelte";
  import WarningIcon from "./icons/WarningIcon.svelte";
  import OpenOptionsReason from "./OpenOptionsReason";

  let storageValues: { [key: string]: any } | null = $state(null);
  let openReason: OpenOptionsReason | null = $state(null);

  browser.storage.local.get(Object.keys(features), (values) => {
    storageValues = values;
  });

  browser.runtime.sendMessage({}, (response: OpenOptionsReason) => {
    openReason = response;
  });

  function onClickCollapseAll(): void {
    toggleExpandCollapseAll(false);
  }

  function onClickExpandAll(): void {
    toggleExpandCollapseAll(true);
  }

  function onCloseBanner(): void {
    openReason = null;
  }

  async function toggleExpandCollapseAll(expand: boolean): Promise<void> {
    const values = await browser.storage.local.get(Object.keys(features));

    for (const feature of Object.keys(features) as FeatureKey[]) {
      const value = getFeatureStorageValue(feature, values);
      value.isOptionExpanded = expand;
      await setFeatureStorageValue(feature, value);
    }

    storageValues = await browser.storage.local.get(Object.keys(features));
  }
</script>

<h1>Azure DevOps PR View Options</h1>

<Banner
  class="settings-banner"
  onSMUIBannerClosed={onCloseBanner}
  open={openReason !== null}
>
  {#snippet label()}
    <Label>
      <WarningIcon />
      <div>
        {#if openReason === OpenOptionsReason.install}
          Install successful, enable/disable the below options as desired. This
          page can be opened again by clicking the extension button in the
          extensions toolbar menu.
        {:else if openReason === OpenOptionsReason.update}
          New options have been added, enable/disable them below
        {/if}
      </div>
    </Label>
  {/snippet}
  {#snippet actions()}
    <IconButton onclick={onCloseBanner}>
      <Icon><CloseIcon /></Icon>
    </IconButton>
  {/snippet}
</Banner>

<div class="toolbar">
  <div class="info">
    <InfoIcon />
    Any open Azure DevOps pages must be reloaded after changing any of the below
    options
  </div>
  <div>
    <IconButton onclick={onClickCollapseAll} title="Collapse All">
      <Icon><ExpandIcon /></Icon>
    </IconButton>
    <IconButton onclick={onClickExpandAll} title="Expand All">
      <Icon><ExpandIcon rotate /></Icon>
    </IconButton>
  </div>
</div>

<hr />

{#if !storageValues}
  <CircularProgress indeterminate />
{:else}
  <Accordion multiple>
    <FullScreenToggleOption {storageValues} />
    <CodeZoomOption {storageValues} />
    <TrueFullScreenOption {storageValues} />
    <AutoCollapseLeftPanelOption {storageValues} />
    <CommentHighlightToggle {storageValues} />
    <SingleHorizontalScrollbarOption {storageValues} />
  </Accordion>
{/if}

<style lang="scss">
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
  }
  .toolbar {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }
</style>
