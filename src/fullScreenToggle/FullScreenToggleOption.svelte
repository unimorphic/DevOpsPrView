<script lang="ts">
  import Option from "../options/Option.svelte";

  export let storageValues: { [key: string]: any };
</script>

<Option
  feature="fullScreenToggle"
  {storageValues}
  title="Additional Full Screen Toggle Buttons"
>
  Adds a button to view in full screen mode when viewing a single commit & when
  creating a new PR. Operates similar to the full screen mode when viewing the
  files in a PR. Keyboard shortcut 'z' is also supported.
</Option>
