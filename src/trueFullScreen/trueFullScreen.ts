let hadFullScreenClass = false;

function bodyHasFullScreenClass(): boolean {
  return document.body.classList.contains("full-screen-mode");
}

function onFullScreenChangeDocument(): void {
  if (document.fullscreenElement === null && bodyHasFullScreenClass()) {
    const event = new MouseEvent("click", { bubbles: true });
    document.getElementById("__bolt-fullscreen")?.dispatchEvent(event);
  }
}

function toggleFullScreenIfNeeded(): void {
  const hasFullScreenClass = bodyHasFullScreenClass();
  if (hadFullScreenClass === hasFullScreenClass) {
    return;
  }
  
  hadFullScreenClass = hasFullScreenClass;

  if (hasFullScreenClass) {
    if (document.fullscreenElement === null) {
      document.body.requestFullscreen();
    }
  } else if (document.fullscreenElement !== null) {
    document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", onFullScreenChangeDocument);

new MutationObserver(toggleFullScreenIfNeeded).observe(document.body, {
  attributes: true,
});

export {};
