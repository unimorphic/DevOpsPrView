<script lang="ts">
  const { rotate = false }: { rotate?: boolean } = $props();
</script>

<svg
  class={rotate ? "root-rotate" : "root"}
  height="48"
  viewBox="0 0 48 48"
  width="48"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" />
</svg>

<style lang="scss">
  .root-rotate {
    display: block;
    transform: rotate(-90deg);
  }
  .root {
    display: block;
  }
</style>
