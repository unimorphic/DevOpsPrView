<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  let isFullScreen = $state(false);

  function onClickToggleButton(): void {
    toggleFullScreenMode();
  }

  function onKeyDownDocument(event: KeyboardEvent): void {
    const inputElements = ["TEXTAREA", "INPUT"];
    if (
      event.key === "z" &&
      !inputElements.includes((event.target as HTMLElement).nodeName)
    ) {
      toggleFullScreenMode();
      event.preventDefault();
    }
  }

  function toggleFullScreenMode(): void {
    const toggleClassBySelector = {
      ".bolt-header": "bolt-header-full-screen",
      ".bolt-header-title": "title-m",
      ".repos-pr-create-header-first-row": "title-m",
      body: "full-screen-mode",
    };
    for (const selector of Object.keys(
      toggleClassBySelector
    ) as (keyof typeof toggleClassBySelector)[]) {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.toggle(toggleClassBySelector[selector]);
      }
    }

    const hideSelectors = [
      ".bolt-header .bolt-header-commandbar",
      ".bolt-header-title .bolt-clipboard-button",
      ".bolt-header-title-area .secondary-text",
      ".bolt-tabbar",
      ".repos-pr-create-header > .flex-column > .flex-row",
    ];
    for (const selector of hideSelectors) {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        element.style.display = element.style.display === "none" ? "" : "none";
      }
    }

    window.dispatchEvent(new Event("resize"));

    isFullScreen = !isFullScreen;
  }

  onMount(() => {
    document.addEventListener("keydown", onKeyDownDocument);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", onKeyDownDocument);
  });
</script>

<button
  aria-roledescription="button"
  aria-label="Fullscreen"
  class="bolt-header-command-item-button bolt-button bolt-icon-button enabled subtle icon-only bolt-focus-treatment"
  data-focuszone="focuszone-71"
  data-is-focusable="true"
  id="__bolt-fullscreen"
  onclick={onClickToggleButton}
  role="menuitem"
  tabindex="0"
  title="Enter/exit full-screen mode"
  type="button"
>
  <span
    aria-hidden="true"
    class={"left-icon medium flex-noshrink fabric-icon " +
      (isFullScreen ? "ms-Icon--BackToWindow" : "ms-Icon--FullScreen")}
  ></span>
</button>

<style type="text/scss">
  :global(.bolt-page > .bolt-header.bolt-header-full-screen) {
    padding-bottom: 8px;
    padding-top: 8px;
  }
</style>
