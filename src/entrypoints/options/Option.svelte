<script lang="ts">
  import { Content, Header, Panel } from "@smui-extra/accordion";
  import FormField from "@smui/form-field";
  import IconButton, { Icon } from "@smui/icon-button";
  import Switch from "@smui/switch";
  import features, {
    getFeatureStorageValue,
    setFeatureStorageValue,
    type FeatureKey,
    type FeatureStorageValue,
  } from "../../features";
  import ArrowIcon from "./icons/ArrowIcon.svelte";
  import type { Snippet } from "svelte";

  const props: {
    afterImage?: Snippet<[FeatureStorageValue<unknown>]>;
    beforeImage?: Snippet<[FeatureStorageValue<unknown>]>;
    children?: Snippet<[FeatureStorageValue<unknown>, (data: unknown) => void]>;
    feature: FeatureKey;
    storageValues: { [key: string]: any };
    title: string;
  } = $props();

  let featureStorageValue: FeatureStorageValue<unknown> | null = $state(null);

  function updateValue(values: { [key: string]: any }): void {
    featureStorageValue = getFeatureStorageValue<unknown>(
      props.feature,
      values
    );
  }
  $effect(() => updateValue(props.storageValues));

  function onChangeIsEnabled(): void {
    featureStorageValue!.data = features[props.feature].defaultData;
    setFeatureStorageValue(props.feature, featureStorageValue!);
  }

  function onChangeIsExpanded(): void {
    setFeatureStorageValue(props.feature, featureStorageValue!);
  }

  function onUpdateData(data: unknown): void {
    featureStorageValue!.data = data;
    setFeatureStorageValue(props.feature, featureStorageValue!);
  }
</script>

{#if featureStorageValue}
  <Panel open={featureStorageValue.isOptionExpanded} nonInteractive>
    <Header>
      <IconButton
        toggle
        bind:pressed={featureStorageValue.isOptionExpanded}
        onclick={onChangeIsExpanded}
      >
        <Icon on><ArrowIcon /></Icon>
        <Icon><ArrowIcon rotate /></Icon>
      </IconButton>
      {props.title}
      {#snippet icon()}
        <FormField>
          <Switch
            bind:checked={featureStorageValue!.isEnabled}
            icons={false}
            onSMUISwitchChange={onChangeIsEnabled}
          />
          {#snippet label()}
            <span
              style:color={featureStorageValue!.isEnabled
                ? "var(--mdc-theme-on-surface)"
                : "var(--mdc-theme-error)"}
            >
              {featureStorageValue!.isEnabled ? "Enabled" : "Disabled"}
            </span>
          {/snippet}
        </FormField>
      {/snippet}
    </Header>
    <Content>
      <div class="description">
        {@render props.children?.(featureStorageValue, onUpdateData)}
      </div>
      <div class="images">
        <div>
          <div>Before</div>
          {#if props.beforeImage}
            {@render props.beforeImage(featureStorageValue)}
          {:else}
            <img alt="before" src={`/assets/${props.feature}/before.png`} />
          {/if}
        </div>
        <div>
          <div>After</div>
          {#if props.afterImage}
            {@render props.afterImage(featureStorageValue)}
          {:else}
            <img alt="after" src={`/assets/${props.feature}/after.png`} />
          {/if}
        </div>
      </div>
    </Content>
  </Panel>
{/if}

<style lang="scss">
  .description {
    border-bottom: 1px solid var(--theme-border);
    font-size: 14px;
    padding: 20px 24px;
  }
  .images {
    display: flex;
    font-size: 14px;

    & > * {
      align-items: center;
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
      padding: 20px 24px;

      &:first-child {
        border-right: 1px solid var(--theme-border);
      }
    }
    & img {
      max-width: 100%;
    }
  }
</style>
