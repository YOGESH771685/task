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


















import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluatedItem } from '../../../model/DataModellerModel';
import { DataModellerService } from '../../service/data-modeller-service';

@Component({
  selector: 'app-datamodeller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-modeller-component.html',
})
export class DataModellerComponent implements OnInit {
  //  Original API Data
  evaluatedData = signal<EvaluatedItem[]>([]);

  //  Grouped Data (NEW)
  groupedData = signal<{ name: string; items: EvaluatedItem[] }[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  constructor(private service: DataModellerService) {}

  ngOnInit(): void {
    this.service.getEvaluatedData().subscribe({
      next: (res) => {
        console.log(res);

        const safeData = res ?? [];

        // Store original
        this.evaluatedData.set(safeData);

        // Group data
        const grouped = this.groupByArtifact(safeData);
        this.groupedData.set(grouped);

        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('API Failed');
        this.loading.set(false);
      },
    });
  }

  //  Grouping Function
  private groupByArtifact(data: EvaluatedItem[]) {
    const grouped: Record<string, EvaluatedItem[]> = {};

    data.forEach((item) => {
      const key = item.appArtifactName ?? 'Unknown';

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(item);
    });

    return Object.keys(grouped).map((key) => ({
      name: key,
      items: grouped[key],
    }));
  }

  //  Helper
  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  //  Convert object → key/value array (for nested display)
  toKeyValueArray(value: any): any {
    if (value === null) return [];

    if (Array.isArray(value)) {
      return value.map((v, i) => ({
        key: `[${i}]`,
        value: this.isObject(v) ? this.toKeyValueArray(v) : v,
      }));
    }

    if (this.isObject(value)) {
      return Object.entries(value).map(([k, v]) => ({
        key: k,
        value: this.isObject(v) || Array.isArray(v) ? this.toKeyValueArray(v) : v,
      }));
    }

    return value;
  }
}
