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




import { Component, OnInit } from '@angular/core';
import { DraftEvaluateService } from '../../service/draft-evaluate-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draft-evalute-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draft-evalute-component.html',
  styleUrl: './draft-evalute-component.css',
})
export class DraftEvaluteComponent implements OnInit {
  evaluatedData: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private service: DraftEvaluateService) {}

  ngOnInit(): void {
    console.log('Component Loaded');

    this.service.getEvaluatedData().subscribe({
      next: (res) => {
        console.log('API Success:', res);
        this.evaluatedData = res
        this.loading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'API Failed';
        this.loading = false;
      },
    });
  }

  prettyPrint(obj: any): string {
    return JSON.stringify(obj, null, 2); // '2' is indentation
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
  }

  objectEntries(obj: any) {
    return Object.entries(obj || {}).map(([key, value]) => ({
      key,
      value: typeof value === 'object' && value !== null ? JSON.stringify(value) : value,
    }));
  }

  displayValue(value: any): string {
    if (value === null || value === undefined) return 'null';

    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      return '[\n  ' + value.map((v) => this.displayValue(v)).join(',\n  ') + '\n]';
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value);
      if (entries.length === 0) return '{}';
      return '{\n' + entries.map(([k, v]) => `  ${k}: ${this.displayValue(v)}`).join(',\n') + '\n}';
    }

    // For strings or numbers
    return String(value);
  }
}










// import { Component, OnInit } from '@angular/core';
// import { DraftEvaluateService } from '../../service/draft-evaluate-service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-draft-evalute-component',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './draft-evalute-component.html',
//   styleUrls: ['./draft-evalute-component.css'],
// })
// export class DraftEvaluteComponent implements OnInit {
//   evaluatedData: any[] = [];
//   loading = true;
//   errorMessage = '';

//   constructor(private service: DraftEvaluateService) {}

//   ngOnInit(): void {
//     this.service.getEvaluatedData().subscribe({
//       next: (res) => {
//         this.evaluatedData = res;
//         this.loading = false;
//       },
//       error: () => {
//         this.errorMessage = 'API Failed';
//         this.loading = false;
//       },
//     });
//   }

//   isObject(value: any): boolean {
//     return value !== null && typeof value === 'object';
//   }
// }



