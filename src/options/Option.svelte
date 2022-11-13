<script lang="ts">
  import { Content, Header, Panel } from "@smui-extra/accordion";
  import FormField from "@smui/form-field";
  import IconButton, { Icon } from "@smui/icon-button";
  import Switch from "@smui/switch";
  import { getFeatureStorageValue, type FeatureKey } from "../features";
  import Arrow from "./Arrow.svelte";

  export let description: string;
  export let feature: FeatureKey;
  export let storageValues: { [key: string]: any };
  export let title: string;

  let featureStorageValue = getFeatureStorageValue(feature, storageValues);

  function onChange(): void {
    chrome.storage.local.set({ [feature]: featureStorageValue });
  }
</script>

<Panel open={featureStorageValue.isOptionExpanded} nonInteractive>
  <Header>
    <IconButton
      toggle
      bind:pressed={featureStorageValue.isOptionExpanded}
      on:SMUIIconButtonToggle:change={onChange}
    >
      <Icon on><Arrow /></Icon>
      <Icon><Arrow rotate /></Icon>
    </IconButton>
    {title}
    <FormField slot="icon">
      <Switch
        bind:checked={featureStorageValue.isEnabled}
        icons={false}
        on:SMUISwitch:change={onChange}
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
    <div class="description">{description}</div>
    <div class="images">
      <div>
        <div>Before</div>
        <img alt="before" src={"/images/" + feature + "/before.png"} />
      </div>
      <div>
        <div>After</div>
        <img alt="after" src={"/images/" + feature + "/after.png"} />
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
      padding: 20px 24px;
    }
    & img {
      max-width: 100%;
    }
    display: flex;
    font-size: 14px;
  }
</style>
