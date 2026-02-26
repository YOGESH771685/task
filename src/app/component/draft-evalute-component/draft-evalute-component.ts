// import { Component, OnInit } from '@angular/core';
// import { DraftEvaluateService } from '../../service/draft-evaluate-service';
// import { CommonModule, JsonPipe } from '@angular/common';

// @Component({
//   selector: 'app-draft-evalute-component',
//   imports: [CommonModule,],
//   standalone:true,
//   templateUrl: './draft-evalute-component.html',
//   styleUrl: './draft-evalute-component.css'
// })
// export class DraftEvaluteComponent implements OnInit {

//   evaluatedData: any[] = [];
//   loading = true;
//   errorMessage = '';

//   constructor(private service: DraftEvaluateService) {}


//   ngOnInit(): void {


//     console.log('Component Loaded');

//     this.service.getEvaluatedData().subscribe({
//       next: (res) => {
//         console.log('API Success:', res);
//         this.evaluatedData = res;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('API Error:', err);
//         this.errorMessage = 'API Failed';
//         this.loading = false;
//       }
//     });

//   }


// }















































// import { Component, OnInit } from '@angular/core';
// import { DraftEvaluateService } from '../../service/draft-evaluate-service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-draft-evalute-component',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './draft-evalute-component.html',
//   styleUrl: './draft-evalute-component.css',
// })
// export class DraftEvaluteComponent implements OnInit {
//   evaluatedData: any[] = [];
//   loading = true;
//   errorMessage = '';

//   constructor(private service: DraftEvaluateService) {}

//   ngOnInit(): void {
//     console.log('Component Loaded');

//     this.service.getEvaluatedData().subscribe({
//       next: (res) => {
//         console.log('API Success:', res);
//         this.evaluatedData = res
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('API Error:', err);
//         this.errorMessage = 'API Failed';
//         this.loading = false;
//       },
//     });
//   }

//   prettyPrint(obj: any): string {
//     return JSON.stringify(obj, null, 2); // '2' is indentation
//   }

//   isObject(value: any): boolean {
//     return value !== null && typeof value === 'object';
//   }

//   objectEntries(obj: any) {
//     return Object.entries(obj || {}).map(([key, value]) => ({
//       key,
//       value: typeof value === 'object' && value !== null ? JSON.stringify(value) : value,
//     }));
//   }

//   displayValue(value: any): string {
//     if (value === null || value === undefined) return 'null';

//     if (Array.isArray(value)) {
//       if (value.length === 0) return '[]';
//       return '[\n  ' + value.map((v) => this.displayValue(v)).join(',\n  ') + '\n]';
//     }

//     if (typeof value === 'object') {
//       const entries = Object.entries(value);
//       if (entries.length === 0) return '{}';
//       return '{\n' + entries.map(([k, v]) => `  ${k}: ${this.displayValue(v)}`).join(',\n') + '\n}';
//     }

//     // For strings or numbers
//     return String(value);
//   }
// }





// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EvaluatedResult } from '../../../model/DraftEvaluateResponse';
// import { DraftEvaluateService } from '../../service/draft-evaluate-service';


// @Component({
//   selector: 'app-draft-evaluate',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './draft-evalute-component.html'
// })
// export class DraftEvaluteComponent implements OnInit {

//   data: EvaluatedResult[] = [];
//   loading = true;
//   error = '';

//   constructor(private service: DraftEvaluateService) {}

//   ngOnInit(): void {

//     this.service.getEvaluatedData().subscribe({
//       next: (res) => {
//         this.data = res;
//         this.loading = false;
//       },
//       error: () => {
//         this.error = 'API Failed';
//         this.loading = false;
//       }
//     });

//   }
// }





import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftEvaluate } from '../../service/draft-evaluate-service';
import { EvaluateApiResponse } from '../../../model/DraftEvaluateResponse';

@Component({
  selector: 'app-diff-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draft-evalute-component.html',
  styleUrl: './draft-evalute-component.css',
})
export class DraftEvaluteComponent implements OnInit {

  private service = inject(DraftEvaluate);

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
      appArtifactType: 'PAGE',
      aggregateAppEntityName: 'Chat_bot',
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

  // 🔥 Group by appArtifactName
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




