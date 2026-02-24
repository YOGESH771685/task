// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ControlInstanceResponse, ControlInstance } from '../../model/control.instance.model';
// import { Observable, map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ControlInstanceService {
//   private url = "http://192.168.1.123:4284/devum/controlInstances";

//   constructor(private http: HttpClient) {}

//   getControlInstances(): Observable<ControlInstance[]> {
//     return this.http.get<ControlInstanceResponse>(this.url)
//       .pipe(
//         map(res => res.published)
//       );
//   }
// }


//controlInstances
//http://192.168.1.123:4284/devum/controlInstances

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ControlInstance } from '../../model/control.instance.model';

interface ControlInstanceResponse {
  published: ControlInstance[];
}

@Injectable({
  providedIn: 'root'
})
export class ControlInstanceService {

  private readonly apiUrl =
    'http://192.168.1.123:4284/devum/controlInstances/draftsByAggregateName/Global_dashboard';

  constructor(private http: HttpClient) {}

  getControlInstances(pageName: string): Observable<ControlInstance[]> {

    const params = new HttpParams()
      .set('filter', `pageName:${pageName}`);

    return this.http
      .get<ControlInstanceResponse>(this.apiUrl, { params })
      .pipe(
        map(response => response?.published ?? [])
      );

  }

}
//controlInstances
