<script lang="ts">
  import Option from "../options/Option.svelte";

  export let storageValues: { [key: string]: any };
</script>

<Option feature="trueFullScreen" {storageValues} title="True Full Screen">
  Toggles the browser's full screen mode when full screen mode is toggled via a
  button or the keyboard shortcut 'z'
</Option>
