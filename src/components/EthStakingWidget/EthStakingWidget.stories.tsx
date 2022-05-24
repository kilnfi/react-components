import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EthStakingWidget from "./EthStakingWidget";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/EthStakingWidget",
  component: EthStakingWidget,
} as ComponentMeta<typeof EthStakingWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EthStakingWidget> = (args) => (
  <EthStakingWidget {...args}>
    <EthStakingWidget.Header/>
    <EthStakingWidget.SelectAmount/>
    <EthStakingWidget.RewardsForecast/>
    <EthStakingWidget.Status/>
  </EthStakingWidget>
);

export const DefaultStakingWidget = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStakingWidget.args = {
  config: {
    apiUrl: 'https://api.devnet.kiln.fi',
    apiKey: '',
    accountId: '',
    network: 'goerli',
    networkApy: 5,
  },
  provider: undefined,
};