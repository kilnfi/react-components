import React from "react";
import { render } from "@testing-library/react";
import EthStakingWidget, { Config } from "./EthStakingWidget";

describe("EthStakingWidget", () => {
  test("renders the EthStakingWidget component", () => {
    const config: Config = {
      apiUrl: 'https://api.devnet.kiln.fi',
      apiKey: '',
      accountId: '',
      network: 'goerli',
      chainId: 5,
      networkApy: 5,
    };
    render(<EthStakingWidget provider={undefined} config={config}/>);
  });
});