<script lang="ts">
  import Option from "../options/Option.svelte";

  export let storageValues: { [key: string]: any };
</script>

<Option
  feature="singleHorizontalScrollbar"
  {storageValues}
  title="Single Horizontal Scrollbar"
>
  Removes the horizontal scrollbars on individual files when viewing the files
  in a PR. Side-by-side view is not affected.
</Option>
