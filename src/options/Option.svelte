<script lang="ts">
  import { Content, Header, Panel } from "@smui-extra/accordion";
  import FormField from "@smui/form-field";
  import IconButton, { Icon } from "@smui/icon-button";
  import Switch from "@smui/switch";
  import features, {
    getFeatureStorageValue,
    setFeatureStorageValue,
    type FeatureKey,
  } from "../features";
  import ArrowIcon from "./ArrowIcon.svelte";

  export let feature: FeatureKey;
  export let storageValues: { [key: string]: any };
  export let title: string;

  let featureStorageValue = getFeatureStorageValue<unknown>(
    feature,
    storageValues
  );

  function onChangeIsEnabled(): void {
    featureStorageValue.data = features[feature].defaultData;
    setFeatureStorageValue(feature, featureStorageValue);
  }

  function onChangeIsExpanded(): void {
    setFeatureStorageValue(feature, featureStorageValue);
  }

  function onUpdateData(data: unknown): void {
    featureStorageValue.data = data;
    setFeatureStorageValue(feature, featureStorageValue);
  }
</script>

<Panel open={featureStorageValue.isOptionExpanded} nonInteractive>
  <Header>
    <IconButton
      toggle
      bind:pressed={featureStorageValue.isOptionExpanded}
      on:SMUIIconButtonToggle:change={onChangeIsExpanded}
    >
      <Icon on><ArrowIcon /></Icon>
      <Icon><ArrowIcon rotate /></Icon>
    </IconButton>
    {title}
    <FormField slot="icon">
      <Switch
        bind:checked={featureStorageValue.isEnabled}
        icons={false}
        on:SMUISwitch:change={onChangeIsEnabled}
      />
      <span
        slot="label"
        style:color={featureStorageValue.isEnabled
          ? "var(--mdc-theme-primary)"
          : "var(--mdc-theme-error)"}
      >
        {featureStorageValue.isEnabled ? "Enabled" : "Disabled"}
      </span>
    </FormField>
  </Header>
  <Content>
    <div class="description">
      <slot {featureStorageValue} {onUpdateData} />
    </div>
    <div class="images">
      <div>
        <div>Before</div>
        <slot name="beforeImage">
          <img alt="before" src={`/${feature}/images/before.png`} />
        </slot>
      </div>
      <div>
        <div>After</div>
        <slot name="afterImage">
          <img alt="after" src={`/${feature}/images/after.png`} />
        </slot>
      </div>
    </div>
  </Content>
</Panel>

<style lang="scss">
  .description {
    border-bottom: 1px solid var(--theme-border);
    font-size: 14px;
    padding: 20px 24px;
  }
  .images {
    & > * {
      &:first-child {
        border-right: 1px solid var(--theme-border);
      }
      align-items: center;
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
      padding: 20px 24px;
    }
    & img {
      max-width: 100%;
    }
    display: flex;
    font-size: 14px;
  }
</style>
