export interface IFactoolResponse {
  model_name: string; // enum
  response: string;
  factuality: boolean;
}

export interface IFactool {
  category: string; // enum
  prompt: string;
  responses_and_factuality: IFactoolResponse[];
  weight: number;
}
