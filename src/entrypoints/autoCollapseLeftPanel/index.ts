export default defineUnlistedScript(() => {
  let hadFullScreenClass = false;
  let leftPanelWidth: string | null = null;

  function bodyHasFullScreenClass(): boolean {
    return document.body.classList.contains("full-screen-mode");
  }

  function toggleLeftPanelIfNeeded(): void {
    const hasFullScreenClass = bodyHasFullScreenClass();
    if (hadFullScreenClass === hasFullScreenClass) {
      return;
    }

    hadFullScreenClass = hasFullScreenClass;
    const leftPanel = document.querySelector(
      ".vss-Splitter--pane-fixed"
    ) as HTMLElement;

    if (!leftPanel) {
      leftPanelWidth = null;
      return;
    }

    if (hasFullScreenClass) {
      if (parseFloat(leftPanel.style.width.replace("px", "")) > 40) {
        leftPanelWidth = leftPanel.style.width;
        leftPanel.style.width = "38px";
        updateLeftPanelLayout();
      } else {
        leftPanelWidth = null;
      }
    } else if (leftPanelWidth) {
      leftPanel.style.width = leftPanelWidth;
      updateLeftPanelLayout();
    }
  }

  function updateLeftPanelLayout(): void {
    const splitter = document.querySelector(".vss-Splitter--divider");
    if (splitter) {
      splitter.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      splitter.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    }
  }

  new MutationObserver(toggleLeftPanelIfNeeded).observe(document.body, {
    attributes: true,
  });
});
