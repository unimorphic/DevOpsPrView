let fullScreenButton: HTMLElement | null = null;

class FullScreenMouseEvent extends MouseEvent {
  public data = "full-screen-change";
}

function bodyHasFullScreenClass(): boolean {
  return document.body.classList.contains("full-screen-mode");
}

function getFullScreenButton(): HTMLElement | null {
  return document.getElementById("__bolt-fullscreen");
}

function onClickFullScreenButton(event: MouseEvent): void {
  if ((event as FullScreenMouseEvent).data === "full-screen-change") {
    return;
  }

  window.setTimeout(() => {
    if (bodyHasFullScreenClass()) {
      document.body.requestFullscreen();
    } else if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    }
  });
}

function onFullScreenChangeDocument(): void {
  if (document.fullscreenElement === null && bodyHasFullScreenClass()) {
    const event = new FullScreenMouseEvent("click", { bubbles: true });
    getFullScreenButton()?.dispatchEvent(event);
  }
}

function configureFullScreenButton(): void {
  const button = getFullScreenButton();
  if (button === fullScreenButton) {
    return;
  }

  document.removeEventListener("fullscreenchange", onFullScreenChangeDocument);

  if (fullScreenButton) {
    fullScreenButton.removeEventListener("click", onClickFullScreenButton);
  }

  if (button) {
    button.addEventListener("click", onClickFullScreenButton);
    fullScreenButton = button;

    document.addEventListener("fullscreenchange", onFullScreenChangeDocument);
  }
}

new MutationObserver(configureFullScreenButton).observe(document, {
  childList: true,
  subtree: true,
});
configureFullScreenButton();

export {};
