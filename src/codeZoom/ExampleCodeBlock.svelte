<script lang="ts">
  export let codeBlockStyle: string = "";
</script>

<div class="comment-file-header flex-column root">
  <div class="comment-file-header-title flex-row">
    <div class="flex-column flex-start flex-grow scroll-hidden">
      <a
        class="comment-file-header-link body-m font-weight-semibold text-ellipsis flex-self-stretch bolt-link"
        data-focuszone="focuszone-64"
        href="/"
        tabindex="0"
      >
        FileName.cs
      </a>
      <span class="body-s secondary-text text-ellipsis flex-self-stretch">
        /Folder/AnotherFolder/FileName.cs
      </span>
    </div>
  </div>
  <div class="comment-file-diff-container margin-top-16 flex-row">
    <div class="repos-summary-code-diff custom-scrollbar">
      <div
        class="repos-summary-diff-container body-s repos-summary-diff-blocks"
        role="table"
        style={codeBlockStyle}
      >
        <div class="repos-diff-contents-row monospaced-text" role="row">
          <span
            role="cell"
            class="padding-horizontal-8 text-right secondary-text"
          >
            <span class="screen-reader-only">6 </span>
            <span aria-hidden="true">
              <span class="repos-line-number" data-line="6" />
            </span>
          </span>
          <span class="padding-right-8 repos-line-content added" role="cell">
            <span class="screen-reader-only">Plus &nbsp;</span>
            <span aria-hidden="true">
              <span class="line-icon added" />
            </span>
            public class ClassName
          </span>
        </div>
        <div class="repos-diff-contents-row monospaced-text" role="row">
          <span
            role="cell"
            class="padding-horizontal-8 text-right secondary-text"
          >
            <span class="screen-reader-only">7 </span>
            <span aria-hidden="true">
              <span class="repos-line-number" data-line="7" />
            </span>
          </span>
          <span class="padding-right-8 repos-line-content added" role="cell">
            <span class="screen-reader-only">Plus &nbsp;</span>
            <span aria-hidden="true">
              <span class="line-icon added" />
            </span>
            {"{"}
          </span>
        </div>
        <div class="repos-diff-contents-row monospaced-text" role="row">
          <span
            role="cell"
            class="padding-horizontal-8 text-right secondary-text"
          >
            <span class="screen-reader-only">Commented 8 </span>
            <span aria-hidden="true">
              <span class="repos-line-number" data-line="8" />
            </span>
          </span>
          <span class="padding-right-8 repos-line-content added" role="cell">
            <span class="screen-reader-only">Plus &nbsp;</span>
            <span aria-hidden="true">
              <span class="line-icon added" />
            </span>
            <span class="diff-comment">
              <span class="offset">
                {"public SomeClass Property1 { get; set; }"}
              </span>
            </span>
          </span>
        </div>
        <div class="repos-diff-contents-row monospaced-text" role="row">
          <span
            role="cell"
            class="padding-horizontal-8 text-right secondary-text"
          >
            <span class="screen-reader-only">9 </span>
            <span aria-hidden="true">
              <span class="repos-line-number" data-line="9" />
            </span>
          </span>
          <span class="padding-right-8 repos-line-content added" role="cell">
            <span class="screen-reader-only">Plus &nbsp;</span>
            <span aria-hidden="true">
              <span class="line-icon added" />
            </span>
            <span class="offset">
              {"public List<AnotherClass> Property2 { get; set; }"}
            </span>
          </span>
        </div>
        <div class="repos-diff-contents-row monospaced-text" role="row">
          <span
            role="cell"
            class="padding-horizontal-8 text-right secondary-text"
          >
            <span class="screen-reader-only">10 </span>
            <span aria-hidden="true">
              <span class="repos-line-number" data-line="10" />
            </span>
          </span>
          <span class="padding-right-8 repos-line-content added" role="cell">
            <span class="screen-reader-only">Plus &nbsp;</span>
            <span aria-hidden="true">
              <span class="line-icon added" />
            </span>
            <span class="offset">
              {"public Meow Property3 { get; set; }"}
            </span>
          </span>
        </div>
        <div class="repos-diff-contents-row monospaced-text" role="row">
          <span
            role="cell"
            class="padding-horizontal-8 text-right secondary-text"
          >
            <span class="screen-reader-only">11 </span>
            <span aria-hidden="true">
              <span class="repos-line-number" data-line="11" />
            </span>
          </span>
          <span class="padding-right-8 repos-line-content added" role="cell">
            <span class="screen-reader-only">Plus &nbsp;</span>
            <span aria-hidden="true">
              <span class="line-icon added" />
            </span>
            {"}"}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .body-s {
    font-size: 0.75rem;
  }
  .bolt-link {
    border-radius: 2px;
    color: rgba(0, 90, 158, 1);
    color: var(--communication-foreground, rgba(0, 90, 158, 1));
    cursor: pointer;
    outline: transparent;
    text-decoration: none;
  }
  .comment-file-diff-container {
    .repos-summary-code-diff {
      border-radius: 4px 0 0 4px;
      width: 100%;
    }
    border-top: 1px solid;
    border-top-color: rgba(234, 234, 234, 1);
    border-top-color: rgba(var(--palette-neutral-8, 234, 234, 234), 1);
    padding-top: 12px;
  }
  .comment-file-header {
    border-bottom: 1px solid;
    border-bottom-color: rgba(234, 234, 234, 1);
    border-bottom-color: rgba(var(--palette-neutral-8, 234, 234, 234), 1);
    padding-bottom: 12px;
    padding-top: 12px;
  }
  .comment-file-header-link {
    color: rgba(0, 0, 0, 0.9);
    color: var(--text-primary-color, rgba(0, 0, 0, 0.9));
    pointer-events: none;
  }
  .comment-file-header-title {
    padding-left: 20px;
    padding-right: 20px;
  }
  .custom-scrollbar {
    &::-webkit-scrollbar {
      width: 18px;
      height: 18px;
    }
    &::-webkit-scrollbar-corner {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border: 6px solid transparent;
      background: rgba(0, 0, 0, 0.2);
      background: var(--palette-black-alpha-20, rgba(0, 0, 0, 0.2));
      border-radius: 10px;
      background-clip: padding-box;
    }
  }
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .flex-self-stretch {
    align-self: stretch;
  }
  .flex-start {
    align-items: flex-start;
  }
  .font-weight-semibold {
    font-weight: 600;
  }
  .margin-top-16 {
    margin-top: 16px;
  }
  .monospaced-text {
    font-family: Menlo, Consolas, Courier New, monospace;
  }
  .offset {
    padding-left: 20px;
  }
  .padding-horizontal-8 {
    padding-left: 8px;
    padding-right: 8px;
  }
  .padding-right-8 {
    padding-right: 8px;
  }
  .repos-diff-contents-row {
    & > span {
      display: table-cell;
    }
    .added {
      &.line-icon {
        &::before {
          content: "+ ";
          float: left;
        }
        margin-right: 10px;
      }
      background-color: rgba(51, 153, 51, 0.1);
      background-color: var(--diff-color-modified, rgba(51, 153, 51, 0.1));
    }
    display: table-row;
  }
  .repos-line-content {
    tab-size: 4;
    width: 100%;
  }
  .repos-summary-code-diff {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-padding-bottom: 10px;
  }
  .repos-summary-diff-container {
    .diff-comment {
      background-color: rgba(199, 224, 244, 1);
      background-color: rgba(var(--palette-primary-tint-20, 199, 224, 244), 1);
      border-bottom: 1px solid rgba(0, 120, 212, 1);
      border-bottom: 1px solid
        var(--communication-background, rgba(0, 120, 212, 1));
    }
    white-space: nowrap;
  }
  .root {
    & * {
      box-sizing: inherit;
    }
    --palette-primary-shade-20: 152, 198, 255;
    --palette-primary-tint-20: 73, 126, 191;
    --palette-neutral-100: 255, 255, 255;
    --palette-neutral-8: 59, 58, 57;
    --palette-neutral-6: 50, 49, 48;
    --palette-black-alpha-20: rgba(var(--palette-neutral-100), 0.29);
    --communication-foreground: rgba(var(--palette-primary-shade-20), 1);
    --communication-background: rgba(0, 120, 212, 1);
    --text-primary-color: rgba(var(--palette-neutral-100), 0.95);
    --text-secondary-color: rgba(var(--palette-neutral-100), 0.8);
    --callout-background-color: rgba(var(--palette-neutral-6), 1);
    --diff-color-modified: rgba(155, 185, 85, 0.2);

    background-color: rgba(255, 255, 255, 1);
    background-color: var(--callout-background-color, rgba(255, 255, 255, 1));
    font-family: "Segoe UI", "-apple-system", BlinkMacSystemFont, Roboto,
      "Helvetica Neue", Helvetica, Ubuntu, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: normal;
  }
  .screen-reader-only {
    user-select: none;
    position: absolute;
    height: 1px;
    width: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    -webkit-clip-path: inset(50%);
    overflow: hidden !important;
    white-space: nowrap;
    padding: 0 !important;
    margin: 0 !important;
  }
  .secondary-text {
    color: rgba(0, 0, 0, 0.55);
    color: var(--text-secondary-color, rgba(0, 0, 0, 0.55));
  }
  .text-right {
    text-align: right;
  }
</style>
