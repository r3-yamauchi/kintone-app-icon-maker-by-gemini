
export enum StatusType {
  Initial = 'initial',
  Info = 'info',
  Error = 'error',
  Success = 'success',
}

export interface Status {
  text: string;
  type: StatusType;
}

export interface GeneratedImage {
  base64: string;
}
