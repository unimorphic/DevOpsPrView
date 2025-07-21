<script lang="ts">
  import Option from "../options/Option.svelte";

  const props: { storageValues: { [key: string]: any } } = $props();
</script>

<Option
  feature="trueFullScreen"
  storageValues={props.storageValues}
  title="True Full Screen"
>
  Toggles the browser's full screen mode when full screen mode is toggled via a
  button or the keyboard shortcut 'z'
</Option>
