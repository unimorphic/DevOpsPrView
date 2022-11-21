<script type="text/typescript">
  import {
    getFeatureValueFromStorage,
    setFeatureStorageValue,
    type FeatureStorageValue,
  } from "../features";
  import HighlighterIcon from "./HighlighterIcon.svelte";

  let featureStorageValue: FeatureStorageValue<boolean> | null = null;

  getFeatureValueFromStorage<boolean>("commentHighlightToggle").then(
    (result) => (featureStorageValue = result)
  );

  function onClick(): void {
    featureStorageValue.data = !featureStorageValue.data;
    setFeatureStorageValue("commentHighlightToggle", featureStorageValue);
  }
</script>

<div id="pr-view-comment-highlight">
  {#if featureStorageValue}
    <button
      aria-roledescription="button"
      class="bolt-header-command-item-button bolt-button bolt-icon-button enabled subtle icon-only bolt-focus-treatment"
      data-is-focusable="true"
      on:click={onClick}
      role="menuitem"
      tabindex="0"
      title="Toggle comment highlights"
      type="button"
    >
      <span
        aria-hidden="true"
        class="left-icon medium flex-noshrink fabric-icon"
        style:color={featureStorageValue.data
          ? "var(--communication-foreground, rgba(0, 90, 158, 1))"
          : ""}
      >
        <HighlighterIcon />
      </span>
    </button>
    {#if !featureStorageValue.data}
      <style>
        .repos-summary-diff-container span.diff-comment,
        .monaco-editor .highlight-discussion-range {
          background-color: transparent;
          border-bottom-color: transparent;
        }
      </style>
    {/if}
  {/if}
</div>
