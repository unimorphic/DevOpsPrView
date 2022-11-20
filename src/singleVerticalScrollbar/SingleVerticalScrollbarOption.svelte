<script lang="ts">
  import Option from "../options/Option.svelte";

  export let storageValues: { [key: string]: any };
</script>

<Option
  feature="singleVerticalScrollbar"
  {storageValues}
  title="Single Vertical Scrollbar"
>
  Removes the vertical scrollbars on individual files when viewing the files in
  a PR
</Option>
