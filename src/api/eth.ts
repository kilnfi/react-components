import api from './api';

export type ValidationKeyDepositData = {
  data: {
    pubkeys: string[];
    withdrawal_credentials: string[];
    signatures: string[];
    deposit_data_roots: string[];
  };
};

export const generateEthKeys = async (
  apiUrl: string,
  apiKey: string,
  withdrawalAddress: string,
  accountId: string,
  number: number,
): Promise<ValidationKeyDepositData> => {
  return api<ValidationKeyDepositData>('POST', '/v1/eth/keys', { apiUrl, apiKey }, {
    withdrawal_address: withdrawalAddress,
    account_id: accountId,
    number: number,
    format: 'batch_deposit'
  });
};
