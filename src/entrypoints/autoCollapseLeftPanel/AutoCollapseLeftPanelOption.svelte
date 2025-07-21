<script lang="ts">
  import Option from "../options/Option.svelte";

  const props: { storageValues: { [key: string]: any } } = $props();
</script>

<Option
  feature="autoCollapseLeftPanel"
  storageValues={props.storageValues}
  title="Collapse Left Panel on Full Screen"
>
  Collapses/expands the left panel when full screen mode is toggled via a button
  or the keyboard shortcut 'z'
</Option>
