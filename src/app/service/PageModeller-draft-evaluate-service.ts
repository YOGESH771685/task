// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { Difference, DraftEvaluateResponse } from '../../model/DraftEvaluateResponse';


// @Injectable({
//   providedIn: 'root',
// })
// export class DraftEvaluateService {
//   private apiUrl = 'http://192.168.1.123:7286/devum/draftFinalization/evaluate';

//   constructor(private http: HttpClient) {}

//   getEvaluatedData(): Observable<any[]> {
//     const body = {
//       appArtifactType: 'PAGE',
//       aggregateAppEntityName: 'Chat_bot',
//     };

//     return this.http.post<DraftEvaluateResponse[]>(this.apiUrl, body).pipe(
//       map((response) =>
//         response.map((item) => {
//           const draftObj = JSON.parse(item.draft);
//           const actualObj = item.actual ? JSON.parse(item.actual) : null;

//           const differences = this.compareObjects(draftObj, actualObj);

//           return {
//             appArtifactName: item.appArtifactName,
//             state: item.state,
//             differences,
//           };
//         }),
//       ),
//     );
//   }

//   private compareObjects(draft: any, actual: any, parentKey: string = ''): Difference[] {
//     const differences: Difference[] = [];

//     const allKeys = new Set([...Object.keys(draft || {}), ...Object.keys(actual || {})]);

//     for (const key of allKeys) {
//       const draftValue = draft?.[key];
//       const actualValue = actual?.[key];
//       const fullKey = parentKey ? `${parentKey}.${key}` : key;



//       // incase if the values is deiffernrr push into the difference
//       if (JSON.stringify(draftValue) !== JSON.stringify(actualValue)) {
//         differences.push({
//           field: fullKey,
//           draftValue,
//           actualValue: actualValue ?? null,
//         });
//       }
//     }

//     return differences;
//   }
// }


















// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { Difference, DraftEvaluateResponse } from '../../model/DraftEvaluateResponse';

// @Injectable({
//   providedIn: 'root',
// })
// export class DraftEvaluateService {
//   private apiUrl = 'http://192.168.1.123:7286/devum/draftFinalization/evaluate';

//   constructor(private http: HttpClient) {}

//   getEvaluatedData(): Observable<any[]> {
//     const body = {
//       appArtifactType: 'PAGE',
//       aggregateAppEntityName: 'Chat_bot',
//     };

//     return this.http.post<DraftEvaluateResponse[]>(this.apiUrl, body).pipe(
//       map((response) =>
//         response.map((item) => {
//           const draftObj = JSON.parse(item.draft);
//           const actualObj = item.actual ? JSON.parse(item.actual) : null;

//           const differences = this.compareObjects(draftObj, actualObj);

//           return {
//             appArtifactName: item.appArtifactName,
//             state: item.state,
//             differences,
//           };
//         })
//       )
//     );
//   }

//   private compareObjects(draft: any, actual: any, parentKey: string = ''): Difference[] {
//     const differences: Difference[] = [];

//     const allKeys = new Set([
//       ...Object.keys(draft || {}),
//       ...Object.keys(actual || {})
//     ]);

//     for (const key of allKeys) {
//       const draftValue = draft?.[key];
//       const actualValue = actual?.[key];
//       const fullKey = parentKey ? `${parentKey}.${key}` : key;

//       // deep comparison
//       if (!this.deepEqualIgnoreOrder(draftValue, actualValue)) {
//         differences.push({
//           field: fullKey,
//           draftValue,
//           actualValue: actualValue ?? null,
//         });
//       }
//     }

//     return differences;
//   }

//   //  Deep compare for the shuffled arrays and objects
//   private deepEqualIgnoreOrder(a: any, b: any): boolean {

//     // Same reference or primitive equal
//     if (a === b) return true;

//     // If one is null/undefined
//     if (a == null || b == null) return false;


//     if (typeof a !== typeof b) return false;

//     // Handle Arrays (ignore order)
//     if (Array.isArray(a) && Array.isArray(b)) {
//       if (a.length !== b.length) return false;

//       const sortedA = [...a].sort();
//       const sortedB = [...b].sort();

//       for (let i = 0; i < sortedA.length; i++) {
//         if (!this.deepEqualIgnoreOrder(sortedA[i], sortedB[i])) {
//           return false;
//         }
//       }
//       return true;
//     }

//     // Handle Objects (ignore key order)
//     if (typeof a === 'object' && typeof b === 'object') {
//       const keysA = Object.keys(a);
//       const keysB = Object.keys(b);

//       if (keysA.length !== keysB.length) return false;

//       for (const key of keysA) {
//         if (!keysB.includes(key)) return false;

//         if (!this.deepEqualIgnoreOrder(a[key], b[key])) {
//           return false;
//         }
//       }
//       return true;
//     }

//     // Primitive mismatch
//     return false;
//   }
// }



import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { EvaluateApiResponse, EvaluateRequest } from '../../model/PageModellerModel';


@Injectable({ providedIn: 'root' })
export class DraftEvaluate  {

  private http = inject(HttpClient);

  private url =
    'http://192.168.1.123:7286/devum/draftFinalization/evaluate';

  evaluate(body: EvaluateRequest): Observable<EvaluateApiResponse[]> {
    return this.http.post<EvaluateApiResponse[]>(this.url, body);
  }
}
