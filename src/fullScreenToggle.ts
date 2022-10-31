import FullScreenToggle from "./FullScreenToggle.svelte";

let component: FullScreenToggle | null = null;
let mounted = false;
let lastUrl = "";

function mountFullScreenToggleIfNeeded(): void {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    mounted = false;
  }

  if (!mounted && location.href.includes("/commit/")) {
    const toolbar = document.querySelector(".repos-compare-toolbar");
    const fullScreenToggle = document.getElementById("__bolt-fullscreen");

    if (fullScreenToggle) {
      mounted = true;
    } else if (toolbar) {
      mounted = true;
      component = new FullScreenToggle({ target: toolbar });
    }
  }

  if (!mounted && component) {
    component.$destroy();
    component = null;
  }
}

new MutationObserver(mountFullScreenToggleIfNeeded).observe(document, {
  childList: true,
  subtree: true,
});
mountFullScreenToggleIfNeeded();
