import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type':'application/json',
      'orgCode': 'rainy',
      'appCode': 'reactoreEmployeePortal',
      'apiKey': 'eyJraWQiOiJBb2xTaUp5b1ZFS2J0OGdyZVdSQThTMnhQaU5oR0xWWk0xSDFrbGpLc2QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ZDdlOWNhYy04YjBmLTQxZTItOGU4My00Mjg0OTMwYWYzYzciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfTENHMkRraVhvIiwiY29nbml0bzp1c2VybmFtZSI6ImJhY2tlbmQiLCJvcmlnaW5fanRpIjoiYTBkYmY1MGItMTQ4NC00OTBmLThhOWItNGQzODg2MTFiNjI4IiwiYXVkIjoiNWI2NWl0bHM5dDVqOWhkOGc2NHNob3Q2amUiLCJldmVudF9pZCI6ImM5MGQzMjAxLTBlM2ItNDQ0MC1hYzg2LTA2YjAxYzY1MzAwZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzcxOTkxMzc2LCJleHAiOjE3NzIwNzc3NzYsImlhdCI6MTc3MTk5MTM3NiwianRpIjoiODdkMzhmMzUtYzk2YS00MzAxLThhZmUtMjcyMzFlYzI5MzI3IiwiZW1haWwiOiJiZUBtYWlsaW5hdG9yLmNvbSJ9.Vt3IImc8qXGYHa_tlaZypDSyXDhJExoxUtAWDWYkUhUZ1MujSciM7VxMOyAW92aIXH4mZ6RH-2sHyeoT8T1m9acRKT_3VBP7ChEpef7y6otj7T7fAjwl_L-jUluBqIlo2_lL13ryqRH0oC5-BKijqFBd98vvwNszv2ath2-v585vs68PLl7yaFv14I6HoBK_8MFcjDrJf0vKzcFUAm5M_IiBL6PXhHQyZLFAXA5s0Eu3ALx7kib60SGwdWETKOhHd7kEvjz0DqU8CD05udwaaFfJzTNw90MMu7E7wximH-ywpWu8zi2Yznnd3R1y9X5LDjLiLkUTvdt6a8JFAVkWkA',
      'identifiertype': 'external',
      'sitecode': 'BANG'

    }
  })

  return next(modifiedReq);
};
