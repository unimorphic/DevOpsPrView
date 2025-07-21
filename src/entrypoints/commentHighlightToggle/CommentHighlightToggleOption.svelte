<script lang="ts">
  import Option from "../options/Option.svelte";

  const props: { storageValues: { [key: string]: any } } = $props();
</script>

<Option
  feature="commentHighlightToggle"
  storageValues={props.storageValues}
  title="Comment Highlight Toggle"
>
  Adds a button that toggles the visibility of code comment highlights and
  remembers the visibility between sessions
</Option>
