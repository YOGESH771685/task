// import { Component, OnInit, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EvaluatedItem } from '../../../model/FluentModel';
// import { FluentService } from '../../service/fluent-service';

// @Component({
//   selector: 'app-fluent-selector',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './fluent-component.html',
// })
// export class FluentComponent implements OnInit {
//   //  Original API Data
//   evaluatedData = signal<EvaluatedItem[]>([]);

//   //  Grouped Data (NEW)
//   groupedData = signal<{ name: string; items: EvaluatedItem[] }[]>([]);
//   loading = signal<boolean>(true);
//   errorMessage = signal<string>('');

//   constructor(private service: FluentService) {}

//   ngOnInit(): void {
//     this.service.getEvaluatedData().subscribe({
//       next: (res) => {
//         console.log(res);

//         const safeData = res ?? [];

//         // Store original
//         this.evaluatedData.set(safeData);

//         // Group data
//         const grouped = this.groupByArtifact(safeData);
//         this.groupedData.set(grouped);

//         this.loading.set(false);
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage.set('API Failed');
//         this.loading.set(false);
//       },
//     });
//   }

//   //  Grouping Function
//   private groupByArtifact(data: EvaluatedItem[]) {
//     const grouped: Record<string, EvaluatedItem[]> = {};

//     data.forEach((item) => {
//       const key = item.appArtifactName ?? 'Unknown';

//       if (!grouped[key]) {
//         grouped[key] = [];
//       }

//       grouped[key].push(item);
//     });

//     return Object.keys(grouped).map((key) => ({
//       name: key,
//       items: grouped[key],
//     }));
//   }

//   //  Helper
//   isObject(value: any): boolean {
//     return value !== null && typeof value === 'object' && !Array.isArray(value);
//   }

//   isArray(value: any): boolean {
//     return Array.isArray(value);
//   }

//   //  Convert object → key/value array (for nested display)
//   toKeyValueArray(value: any): any[] {
//     if (value === null || value === undefined) {
//       return [{ key: '', value: 'null' }];
//     }

//     if (Array.isArray(value)) {
//       return value.map((item, index) => ({
//         key: `[${index}]`,
//         value: this.isObject(item) ? this.toKeyValueArray(item) : (item ?? 'null'),
//       }));
//     }

//     if (this.isObject(value)) {
//       return Object.entries(value).map(([k, v]) => ({
//         key: k,
//         value: this.isObject(v) || Array.isArray(v) ? this.toKeyValueArray(v) : (v ?? 'null'),
//       }));
//     }

//     return [{ key: '', value }];
//   }
// }

// import { Component, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FluentService } from '../../service/fluent-service';
// import {
//   BackendResponseItem,
//   EvaluateRequest,
//   GroupedResult,
//   ResultItem
// } from '../../../model/FluentModel';

// @Component({
//   selector: 'app-fluent-selector',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './fluent-component.html'
// })
// export class FluentComponent {

//   groupedData = signal<GroupedResult>({});
//   loading = signal(false);
//   errorMessage = signal('');

//   constructor(private service: FluentService) {}

//   loadData() {

//     const body: EvaluateRequest = {
//       appArtifactType: 'FluentService',
//       aggregateAppEntityName: 'testbs3'
//     };

//     this.loading.set(true);
//     this.errorMessage.set('');

//     this.service.evaluate(body).subscribe({
//       next: (res) => {
//         this.processData(res ?? []);
//         this.loading.set(false);
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage.set('API Failed');
//         this.loading.set(false);
//       }
//     });
//   }

//   private processData(data: BackendResponseItem[]) {

//     const grouped: GroupedResult = {};

//     data.forEach(item => {

//       if (!grouped[item.appArtifactName]) {
//         grouped[item.appArtifactName] = [];
//       }

//       const draftObj = item.draft ? JSON.parse(item.draft) : null;
//       const actualObj = item.actual ? JSON.parse(item.actual) : null;

//       const differences = this.flattenDifferences(draftObj, actualObj);

//       grouped[item.appArtifactName].push({
//         state: item.state,
//         differences
//       });

//     });

//     this.groupedData.set(grouped);
//   }

//   //  FLATTEN INTO SIMPLE KEY → VALUE
//   private flattenDifferences(
//     draft: any,
//     actual: any
//   ): Record<string, any> {

//     const result: Record<string, any> = {};

//     // INSERT
//     if (draft && !actual) {
//       Object.keys(draft).forEach(key => {
//         if (typeof draft[key] !== 'object') {
//           result[key] = draft[key];
//         }
//       });
//       return result;
//     }

//     // DELETE
//     if (!draft && actual) {
//       Object.keys(actual).forEach(key => {
//         if (typeof actual[key] !== 'object') {
//           result[key] = actual[key];
//         }
//       });
//       return result;
//     }

//     if (!draft || !actual) return result;

//     // UPDATE
//     Object.keys(draft).forEach(key => {

//       if (typeof draft[key] !== 'object') {

//         if (draft[key] !== actual[key]) {

//           result[`${key} (Draft)`] = draft[key];
//           result[`${key} (Actual)`] = actual[key];

//         }
//       }
//     });

//     return result;
//   }

//   objectKeys = Object.keys;
// }










import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluentService } from '../../service/fluent-service';
import { EvaluateApiResponse } from '../../../model/FluentModel';

@Component({
  selector: 'app-diff-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fluent-component.html',
  styleUrl: './fluent-component.css',
})
export class FluentComponent implements OnInit {
  private service = inject(FluentService);

  loading = signal(true); // start as true
  error = signal<string | null>(null);

  groupedData = signal<Record<string, any[]>>({});

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading.set(true);
    this.error.set(null);

    const body = {
      appArtifactType: 'FluentService',
      aggregateAppEntityName: 'testbs3',
    };

    this.service.evaluate(body).subscribe({
      next: (res) => {
        this.groupedData.set(this.groupByArtifact(res));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to fetch data');
        this.loading.set(false);
      },
    });
  }

  private groupByArtifact(res: EvaluateApiResponse[]) {
    const grouped: Record<string, any[]> = {};

    res.forEach((item) => {
      if (!grouped[item.appArtifactName]) {
        grouped[item.appArtifactName] = [];
      }

      const draft = item.draft ? this.parseData(item.draft) : null;
      const actual = item.actual ? this.parseData(item.actual) : null;

      const differences = this.deepDiff(draft, actual);

      grouped[item.appArtifactName].push({
        state: item.state,
        draftId: draft?.id ?? null,
        differences,
      });
    });

    return grouped;
  }
  //to render the difference in array of objects
  // private getDifferences(draft: any, actual: any) {

  //   const rows: any[] = [];

  //   const keys = new Set([
  //     ...Object.keys(draft || {}),
  //     ...Object.keys(actual || {})
  //   ]);

  //   keys.forEach(key => {

  //     const draftVal = draft?.[key] ?? null;
  //     const actualVal = actual?.[key] ?? null;

  //     if (JSON.stringify(draftVal) !== JSON.stringify(actualVal)) {
  //       rows.push({
  //         field: key,
  //         draft: draftVal,
  //         actual: actualVal
  //       });
  //     }
  //   });

  //   if (rows.length === 0) {
  //     rows.push({
  //       field: 'No Difference',
  //       draft: '',
  //       actual: ''
  //     });
  //   }

  //   return rows;
  // }

  //to render only required difference from array of objects
  private deepDiff(draft: any, actual: any, path: string = ''): any[] {
    const changes: any[] = [];

    if (draft === actual) return changes;

    //  INSERT case
    if (draft && actual === null) {
      if (typeof draft === 'object') {
        Object.keys(draft).forEach((key) => {
          const newPath = path ? `${path}.${key}` : key;

          changes.push({
            field: newPath,
            draft: draft[key],
            actual: null,
          });
        });
        return changes;
      }
    }

    //  DELETE case
    if (actual && draft === null) {
      if (typeof actual === 'object') {
        Object.keys(actual).forEach((key) => {
          const newPath = path ? `${path}.${key}` : key;

          changes.push({
            field: newPath,
            draft: null,
            actual: actual[key],
          });
        });
        return changes;
      }
    }

    // Primitive difference
    if (typeof draft !== 'object' || typeof actual !== 'object') {
      changes.push({
        field: path || 'Root',
        draft,
        actual,
      });
      return changes;
    }

    // Array handling
    if (Array.isArray(draft) && Array.isArray(actual)) {
      draft.forEach((dItem, index) => {
        let aItem = actual[index];

        if (dItem?.key) {
          aItem = actual.find((x: any) => x.key === dItem.key);
        }

        const newPath = path ? `${path}[${dItem?.key || index}]` : `${dItem?.key || index}`;

        changes.push(...this.deepDiff(dItem, aItem, newPath));
      });

      return changes;
    }

    // Object handling
    const keys = new Set([...Object.keys(draft || {}), ...Object.keys(actual || {})]);

    keys.forEach((key) => {
      const newPath = path ? `${path}.${key}` : key;
      changes.push(...this.deepDiff(draft?.[key], actual?.[key], newPath));
    });

    return changes;
  }

  private parseData(data: string) {
    const parsed = JSON.parse(data);

    if (parsed.properties) {
      parsed.properties = JSON.parse(parsed.properties);
    }

    if (parsed.propertyContainer) {
      parsed.propertyContainer = JSON.parse(parsed.propertyContainer);
    }

    return parsed;
  }

  objectKeys = Object.keys;
}
