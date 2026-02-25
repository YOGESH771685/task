import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluatedItem } from '../../../model/FluentModel';
import { FluentService } from '../../service/fluent-service';



@Component({
  selector: 'app-fluent-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fluent-component.html',
})
export class FluentComponent implements OnInit {
  //  Original API Data
  evaluatedData = signal<EvaluatedItem[]>([]);

  //  Grouped Data (NEW)
  groupedData = signal<{ name: string; items: EvaluatedItem[] }[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  constructor(private service: FluentService) {}

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
  toKeyValueArray(value: any): any[] {
    if (value === null || value === undefined) {
      return [{ key: '', value: 'null' }];
    }

    if (Array.isArray(value)) {
      return value.map((item, index) => ({
        key: `[${index}]`,
        value: this.isObject(item) ? this.toKeyValueArray(item) : (item ?? 'null'),
      }));
    }

    if (this.isObject(value)) {
      return Object.entries(value).map(([k, v]) => ({
        key: k,
        value: this.isObject(v) || Array.isArray(v) ? this.toKeyValueArray(v) : (v ?? 'null'),
      }));
    }

    return [{ key: '', value }];
  }
}
