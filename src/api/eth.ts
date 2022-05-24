import api from './api';

export type ValidationKeyDepositData = {
  data: {
    pubkeys: string[];
    withdrawal_credentials: string[];
    signatures: string[];
    deposit_data_roots: string[];
  };
};

export const generateEthKey = async (
  apiUrl: string,
  apiKey: string,
  withdrawalAddress: string,
  accountId: string,
): Promise<ValidationKeyDepositData> => {
  return api<ValidationKeyDepositData>('POST', '/v0/eth/keys', { apiUrl, apiKey, accountId }, {
    withdrawalAddress,
  });
};
