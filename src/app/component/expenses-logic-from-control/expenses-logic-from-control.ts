// import { Component, OnInit, signal } from '@angular/core';
// import { ControlInstance } from '../../../model/control.instance.model';
// import { ControlInstanceService } from '../../service/control-instance';

// @Component({
//   selector: 'app-expenses-logic-from-control',
//   templateUrl: './expenses-logic-from-control.html',
// })
// export class ExpensesLogicFromControl implements OnInit {

//   controls = signal<ControlInstance[]>([]);
//   filtered = signal<ControlInstance[]>([]);
//   loading = signal(true);

//   constructor(private controlService: ControlInstanceService) {}

//   ngOnInit(): void {
//     this.controlService.getControlInstances().subscribe({
//       next: (res: any) => {


//         const controls: ControlInstance[] = res.published ?? res;

//         this.controls.set(controls);


//         const result = controls.filter(control => {
//           try {
//             const parsed = JSON.parse(control.propertyDefinitions);

//             return parsed.some((prop: any) =>
//               prop.dsPropertyName?.toLowerCase().includes('expenses')
//             );

//           } catch {
//             return false;
//           }
//         });

//         this.filtered.set(result);
//         this.loading.set(false);
//       },
//       error: (err) => {
//         console.error(err);
//         this.loading.set(false);
//       }
//     });
//   }
// }


import { Component, OnInit, signal } from '@angular/core';
import { ControlInstance } from '../../../model/control.instance.model';
import { ControlInstanceService } from '../../service/control-instance';

@Component({
  selector: 'app-expenses-logic-from-control',
  templateUrl: './expenses-logic-from-control.html',
})
export class ExpensesLogicFromControl implements OnInit {

  controls = signal<ControlInstance[]>([]);
  filtered = signal<ControlInstance[]>([]);
  loading = signal(true);

  // ✅ define constant
  private readonly PAGE_NAME = 'Global_dashboard';

  constructor(private controlService: ControlInstanceService) {}

  ngOnInit(): void {

    this.controlService
      .getControlInstances(this.PAGE_NAME)   // ✅ FIX HERE
      .subscribe({

        next: (controls: ControlInstance[]) => {

          this.controls.set(controls);

          const result = controls.filter(control => {

            try {

              const parsed = JSON.parse(
                control.propertyDefinitions || '[]'
              );

              return parsed.some((prop: any) =>
                prop.dsPropertyName
                  ?.toLowerCase()
                  .includes('expenses')
              );

            } catch {

              return false;

            }

          });

          this.filtered.set(result);

          this.loading.set(false);

        },

        error: (err) => {

          console.error(err);

          this.loading.set(false);

        }

      });

  }

}
