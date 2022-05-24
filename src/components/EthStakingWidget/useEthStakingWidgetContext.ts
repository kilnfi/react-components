import { useContext } from "react";
import { EthStakingWidgetContext } from "./EthStakingWidgetContext";


export const useEthStakingWidgetContext = () => {
  const { context, setContext } = useContext(EthStakingWidgetContext);

  return { context, setContext };
};