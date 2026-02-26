// export interface FluentEvaluateResponse {
//   draft: string;
//   actual: string | null;
//   appArtifactName: string;
//   state: string;
// }

// export interface Difference {
//   field: string;
//   draftValue: object;
//   actualValue: object;
// }

// export interface EvaluatedItem {
//   appArtifactName: string;
//   state: string;
//   differences: Difference[];
// }



// export interface EvaluateRequest {
//   appArtifactType: string;
//   aggregateAppEntityName: string;
// }

// export interface EvaluateApiResponse {
//   draft: string | null;
//   actual: string | null;
//   state: 'INSERT' | 'UPDATE' | 'DELETE';
//   appArtifactName: string;
// }

// export interface ParsedArtifact {
//   [key: string]: any;
// }

// export interface DiffItem {
//   state: string;
//   differences: Record<string, { draft: any; actual: any }>;
// }

// export interface GroupedDiff {
//   appArtifactName: string;
//   items: DiffItem[];
// }

// export interface DiffRow {
//   appArtifactName: string;
//   state: string;
//   fieldPath: string;
//   draftValue: any;
//   actualValue: any;
// }


// models/evaluate.model.ts

// export interface EvaluateRequest {
//   appArtifactType: string;
//   aggregateAppEntityName: string;
// }

// export interface BackendResponseItem {
//   draft: string | null;
//   actual: string | null;
//   appArtifactName: string;
//   state: string;
// }

// export interface Difference {
//   field: string;
//   draft: any;
//   actual: any;
// };


// export interface GroupedResult {
//   state: string;
//   differences: Difference[];
// }





// ===============================
// REQUEST MODEL
// ===============================
// export interface EvaluateRequest {
//   appArtifactType: string;
//   aggregateAppEntityName: string;
// }


// // ===============================
// // BACKEND RESPONSE MODEL
// // ===============================
// export interface BackendResponseItem {
//   draft: string | null;
//   actual: string | null;
//   appArtifactName: string;
//   state: 'INSERT' | 'UPDATE' | 'DELETE';
// }


// // ===============================
// // UI RESULT MODELS
// // ===============================

// // Each row = one key + one value
// export interface FlatDifference {
//   [fieldName: string]: string | number | boolean | null;
// }


// // One record inside each appArtifact group
// export interface ResultItem {
//   state: 'INSERT' | 'UPDATE' | 'DELETE';
//   differences: FlatDifference;
// }


// // Grouped structure by appArtifactName
// export type GroupedResult = Record<string, ResultItem[]>;







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
