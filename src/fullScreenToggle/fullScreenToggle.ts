import FullScreenToggle from "./FullScreenToggle.svelte";

let component: FullScreenToggle | null = null;
let mounted = false;
let lastUrl = "";

function mountFullScreenToggleIfNeeded(): void {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    mounted = false;
  }

  const urls = ["/commit/", "/pullrequestcreate"];
  if (urls.some((url) => location.href.includes(url))) {
    const toolbar = document.querySelector(".repos-compare-toolbar");
    const fullScreenToggle = document.getElementById("__bolt-fullscreen");

    if (fullScreenToggle) {
      mounted = true;
    } else if (toolbar && !mounted) {
      mounted = true;
      component = new FullScreenToggle({ target: toolbar });
    } else {
      mounted = false;
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
