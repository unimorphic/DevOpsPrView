<script lang="ts">
  import Option from "../options/Option.svelte";

  export let storageValues: { [key: string]: any };
</script>

<Option
  feature="autoCollapseLeftPanel"
  {storageValues}
  title="Collapse Left Panel on Full Screen"
>
  Collapses/expands the left panel when full screen mode is toggled via a button
  or the keyboard shortcut 'z'
</Option>
