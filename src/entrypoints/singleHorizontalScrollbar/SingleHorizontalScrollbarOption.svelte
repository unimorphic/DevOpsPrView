<script lang="ts">
  import Option from "../options/Option.svelte";

  const props: { storageValues: { [key: string]: any } } = $props();
</script>

<Option
  feature="singleHorizontalScrollbar"
  storageValues={props.storageValues}
  title="Single Horizontal Scrollbar"
>
  Removes the horizontal scrollbars on individual files when viewing the files
  in a PR. Side-by-side view is not affected.
</Option>
