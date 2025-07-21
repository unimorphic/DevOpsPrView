<script lang="ts">
  import Option from "../options/Option.svelte";

  const props: { storageValues: { [key: string]: any } } = $props();
</script>

<Option
  feature="singleVerticalScrollbar"
  storageValues={props.storageValues}
  title="Single Vertical Scrollbar"
>
  Removes the vertical scrollbars on individual files when viewing the files in
  a PR
</Option>
