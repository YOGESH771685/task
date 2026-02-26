// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, map } from 'rxjs';
// import { DataModellerResponse, Difference, EvaluatedItem } from '../../model/DataModellerModel';




// @Injectable({
//   providedIn: 'root',
// })
// export class DataModellerService {
//   private apiUrl = 'http://192.168.1.123:7286/devum/draftFinalization/evaluate'

//   constructor(private http: HttpClient) {}

//   getEvaluatedData(): Observable<EvaluatedItem[]> {
//     const body = {
//       appArtifactType: 'DataModeller',
//       aggregateAppEntityName: 'employee',
//     };

//     return this.http.post<DataModellerResponse[]>(this.apiUrl, body).pipe(
//       map(res =>
//         res.map(item => {
//           const draftObj = JSON.parse(item.draft);
//           const actualObj = item.actual ? JSON.parse(item.actual) : {};

//           const differences = this.compareObjects(draftObj, actualObj);

//           return {
//             appArtifactName: item.appArtifactName,
//             state: item.state,
//             differences,
//           } as EvaluatedItem;
//         })
//       )
//     );
//   }

//   private compareObjects(draft: any, actual: any, parentKey = ''): Difference[] {
//     const differences: Difference[] = [];
//     const allKeys = new Set([...Object.keys(draft || {}), ...Object.keys(actual || {})]);

//     for (const key of allKeys) {
//       const draftValue = draft?.[key] ?? null;
//       const actualValue = actual?.[key] ?? null;
//       const fieldPath = parentKey ? `${parentKey}.${key}` : key;

//       if (!this.deepEqual(draftValue, actualValue)) {
//         differences.push({
//           field: fieldPath,
//           draftValue,
//           actualValue,
//         });
//       }
//     }

//     return differences;
//   }

//   private deepEqual(a: any, b: any): boolean {
//     if (a === b) return true;
//     if (a == null || b == null) return false;
//     if (typeof a !== typeof b) return false;

//     if (Array.isArray(a) && Array.isArray(b)) {
//       if (a.length !== b.length) return false;
//       return a.every((v, i) => this.deepEqual(v, b[i]));
//     }

//     if (typeof a === 'object') {
//       const aKeys = Object.keys(a);
//       const bKeys = Object.keys(b);
//       if (aKeys.length !== bKeys.length) return false;
//       return aKeys.every(k => bKeys.includes(k) && this.deepEqual(a[k], b[k]));
//     }

//     return false;
//   }
// }




import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { EvaluateApiResponse, EvaluateRequest } from '../../model/DraftEvaluateResponse';


@Injectable({ providedIn: 'root' })
export class DataModellerService  {

  private http = inject(HttpClient);

  private url =
    'http://192.168.1.123:7286/devum/draftFinalization/evaluate';

  evaluate(body: EvaluateRequest): Observable<EvaluateApiResponse[]> {
    return this.http.post<EvaluateApiResponse[]>(this.url, body);
  }
}

