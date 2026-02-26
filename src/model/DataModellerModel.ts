// export interface DataModellerResponse {
//   draft: string;
//   actual: string | null;
//   appArtifactName: string;
//   state: string;
// }

// export interface Difference {
//   field: string;
//   draftValue: any;
//   actualValue: any;
// }

// export interface EvaluatedItem {
//   appArtifactName: string;
//   state: string;
//   differences: Difference[];
// }



export interface EvaluateRequest {
  appArtifactType: string;
  aggregateAppEntityName: string;
}

export interface EvaluateApiResponse {
  draft: string | null;
  actual: string | null;
  state: 'INSERT' | 'UPDATE' | 'DELETE';
  appArtifactName: string;
}

export interface ParsedArtifact {
  [key: string]: any;
}

export interface DiffItem {
  state: string;
  differences: Record<string, { draft: any; actual: any }>;
}

export interface GroupedDiff {
  appArtifactName: string;
  items: DiffItem[];
}

