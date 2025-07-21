<script lang="ts">
  const { rotate = false }: { rotate?: boolean } = $props();
</script>

<svg
  class={rotate ? "root-rotate" : "root"}
  fill="currentColor"
  height="48"
  viewBox="0 0 48 48"
  width="48"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M35 32V13H16v-3h22v22ZM25 42V23H6v-3h22v22Z" />
</svg>

<style lang="scss">
  .root-rotate {
    display: block;
    margin-top: -4px;
    transform: rotate(135deg);
  }
  .root {
    display: block;
    margin-bottom: -4px;
    transform: rotate(-45deg);
  }
</style>
