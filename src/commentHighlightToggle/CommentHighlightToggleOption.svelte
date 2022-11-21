<script lang="ts">
  import Option from "../options/Option.svelte";

  export let storageValues: { [key: string]: any };
</script>

<Option
  feature="commentHighlightToggle"
  {storageValues}
  title="Comment Highlight Toggle"
>
  Adds a button that toggles the visibility of code comment highlights and
  remembers the visibility between sessions
</Option>
