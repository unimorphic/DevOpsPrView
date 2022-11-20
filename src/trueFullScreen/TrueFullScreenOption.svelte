<script lang="ts">
  import Option from "../options/Option.svelte";

  export let storageValues: { [key: string]: any };
</script>

<Option feature="trueFullScreen" {storageValues} title="True Full Screen">
  Toggles the browser's full screen mode when a full screen mode button is
  clicked
</Option>
