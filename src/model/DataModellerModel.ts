export interface DataModellerResponse {
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

export interface EvaluatedItem {
  appArtifactName: string;
  state: string;
  differences: Difference[];
}
