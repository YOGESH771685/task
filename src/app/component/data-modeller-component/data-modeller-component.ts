// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EvaluatedItem } from '../../../model/DataModellerModel';
// import { DataModellerService } from '../../service/data-modeller-service';


// @Component({
//   selector: 'app-datamodeller',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './data-modeller-component.html',

// })
// export class DataModellerComponent implements OnInit {
//   evaluatedData: EvaluatedItem[] = [];
//   // evaluatedData = signal<EvaluatedItem[]>([]);
//   loading = true;
//   errorMessage = '';

//   constructor(private service: DataModellerService) {}

//   ngOnInit(): void {
//     this.service.getEvaluatedData().subscribe({
//       next: res => {
//         console.log(res)
//         this.evaluatedData = res;
//         this.loading = false;
//       },
//       error: err => {
//         console.error('api error',err);
//         this.errorMessage = 'API Failed';
//         this.loading = false;
//       },
//     });
//   }

//   isObject(value: any): boolean {
//     return value !== null && typeof value === 'object';
//   }

//   // Convert object/array to key-value array for UI rendering
//   toKeyValueArray(value: any): any {
//     if (value === null) return null;
//     if (Array.isArray(value)) {
//       return value.map((v, i) => ({
//         key: `[${i}]`,
//         value: this.isObject(v) ? this.toKeyValueArray(v) : v,
//       }));
//     }
//     if (this.isObject(value)) {
//       return Object.entries(value).map(([k, v]) => ({
//         key: k,
//         value: this.isObject(v) || Array.isArray(v) ? this.toKeyValueArray(v) : v,
//       }));
//     }
//     return value;
//   }
// }


















// import { Component, OnInit, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EvaluatedItem } from '../../../model/DataModellerModel';
// import { DataModellerService } from '../../service/data-modeller-service';

// @Component({
//   selector: 'app-datamodeller',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './data-modeller-component.html',
// })
// export class DataModellerComponent implements OnInit {
//   //  Original API Data
//   evaluatedData = signal<EvaluatedItem[]>([]);

//   //  Grouped Data (NEW)
//   groupedData = signal<{ name: string; items: EvaluatedItem[] }[]>([]);
//   loading = signal<boolean>(true);
//   errorMessage = signal<string>('');

//   constructor(private service: DataModellerService) {}

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
//   toKeyValueArray(value: any): any {
//     if (value === null) return [];

//     if (Array.isArray(value)) {
//       return value.map((v, i) => ({
//         key: `[${i}]`,
//         value: this.isObject(v) ? this.toKeyValueArray(v) : v,
//       }));
//     }

//     if (this.isObject(value)) {
//       return Object.entries(value).map(([k, v]) => ({
//         key: k,
//         value: this.isObject(v) || Array.isArray(v) ? this.toKeyValueArray(v) : v,
//       }));
//     }

//     return value;
//   }
// }






import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModellerService } from '../../service/data-modeller-service';
import { EvaluateApiResponse } from '../../../model/DataModellerModel';


@Component({
  selector: 'app-diff-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-modeller-component.html',
  styleUrl: './data-modeller-component.css',
})
export class DataModellerComponent implements OnInit {

  private service = inject(DataModellerService);

  loading = signal(true);
  error = signal<string | null>(null);

  groupedData = signal<Record<string, any[]>>({});

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {

    this.loading.set(true);
    this.error.set(null);

    const body = {
      appArtifactType: 'DataModeller',
      aggregateAppEntityName: 'employee',
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

  // Group by appArtifactName
  private groupByArtifact(res: EvaluateApiResponse[]) {

    const grouped: Record<string, any[]> = {};

    res.forEach((item) => {

      if (!grouped[item.appArtifactName]) {
        grouped[item.appArtifactName] = [];
      }

      const draft = item.draft ? this.safeParse(item.draft) : null;
      const actual = item.actual ? this.safeParse(item.actual) : null;

      const differences = this.getDifferences(draft, actual);

      grouped[item.appArtifactName].push({
        state: item.state,
        differences
      });

    });

    return grouped;
  }

  // 🔥 SAFE JSON parse (handles nested JSON strings)
  private safeParse(value: any): any {

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return this.safeParse(parsed);
      } catch {
        return value;
      }
    }

    if (Array.isArray(value)) {
      return value.map(v => this.safeParse(v));
    }

    if (typeof value === 'object' && value !== null) {
      const result: any = {};
      Object.keys(value).forEach(key => {
        result[key] = this.safeParse(value[key]);
      });
      return result;
    }

    return value;
  }

  // 🔥 Flatten object into key-value map (NO recursion loop)
  private flattenObject(obj: any, parentKey: string = '', result: any = {}) {

    if (!obj) return result;

    Object.keys(obj).forEach(key => {

      const newKey = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {

        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            this.flattenObject(item, `${newKey}[${index}]`, result);
          });
        } else {
          this.flattenObject(value, newKey, result);
        }

      } else {
        result[newKey] = value;
      }

    });

    return result;
  }

  // 🔥 Compare flattened objects
  private getDifferences(draft: any, actual: any) {

    const draftFlat = this.flattenObject(draft);
    const actualFlat = this.flattenObject(actual);

    const differences: any[] = [];

    const allKeys = new Set([
      ...Object.keys(draftFlat),
      ...Object.keys(actualFlat)
    ]);

    allKeys.forEach(key => {

      const draftVal = draftFlat[key] ?? null;
      const actualVal = actualFlat[key] ?? null;

      if (draftVal !== actualVal) {

        differences.push({
          field: key,
          draft: draftVal ?? 'null',
          actual: actualVal ?? 'null'
        });

      }

    });

    return differences;
  }

  objectKeys = Object.keys;
}

