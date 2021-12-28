export type QRConstruct = {
  secret: string;
  notes: string;
};

export const constructQRString = (params: QRConstruct): string => {
  return JSON.stringify(params);
};

export const deconstructQRString = (qrstring: string): QRConstruct => {
  const data: QRConstruct = JSON.parse(qrstring);
  return data;
};
