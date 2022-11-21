import CommentHighlightToggle from "./CommentHighlightToggle.svelte";

let component: CommentHighlightToggle | null = null;
let mounted = false;
let lastUrl = "";

function mountCommentHighlightToggleIfNeeded(): void {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    mounted = false;
  }

  const urls = ["/commit/", "/pullrequest/"];
  if (urls.some((url) => location.href.includes(url))) {
    const toolbar = document.querySelector(".repos-compare-toolbar div");
    const highlightToggle = document.getElementById(
      "pr-view-comment-highlight"
    );

    if (highlightToggle) {
      mounted = true;
    } else if (toolbar && !mounted) {
      mounted = true;

      const toolbarCenter = toolbar.querySelector(":scope > .flex-grow");
      component = new CommentHighlightToggle({
        anchor: toolbarCenter?.nextElementSibling,
        target: toolbar,
      });
    } else {
      mounted = false;
    }
  }

  if (!mounted && component) {
    component.$destroy();
    component = null;
  }
}

new MutationObserver(mountCommentHighlightToggleIfNeeded).observe(document, {
  childList: true,
  subtree: true,
});
mountCommentHighlightToggleIfNeeded();
