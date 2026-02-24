export interface DraftEvaluateResponse {
  draft: string;
  actual: string | null;
  appArtifactName: string;
  state: string;
}

export interface Difference {
  field: string;
  draftValue: any;
  actualValue: any;
}
