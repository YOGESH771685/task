import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type':'application/json',
      'orgCode': 'rainy',
      'appCode': 'reactoreEmployeePortal',
      'apiKey': 'eyJraWQiOiJBb2xTaUp5b1ZFS2J0OGdyZVdSQThTMnhQaU5oR0xWWk0xSDFrbGpLc2QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ZDdlOWNhYy04YjBmLTQxZTItOGU4My00Mjg0OTMwYWYzYzciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfTENHMkRraVhvIiwiY29nbml0bzp1c2VybmFtZSI6ImJhY2tlbmQiLCJvcmlnaW5fanRpIjoiZjExZGU0ZTYtZjFlMy00MmJlLTkzZGEtYjMxNTg2ODE2ZDkwIiwiYXVkIjoiNWI2NWl0bHM5dDVqOWhkOGc2NHNob3Q2amUiLCJldmVudF9pZCI6ImU0ZmVkNmIxLTc3MWQtNGI4NS1hYWQwLTgwZDdhN2ZjNTIyZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzcyMTcxNTYwLCJleHAiOjE3NzIyNTc5NjAsImlhdCI6MTc3MjE3MTU2MCwianRpIjoiOTEzYjk4MmEtNDhiMi00YmI2LWI3ZTMtMjM1NjMyZjNjZmU2IiwiZW1haWwiOiJiZUBtYWlsaW5hdG9yLmNvbSJ9.XIrvh55lh8rOmbFIOvQACIZ1XQe2n7VEAcIYJ9PV3ZmPIBnvqgy6FqHmJiSZS5p68IDXrYo43wiy3FPOlZppqzbP8tz1rnuTRebVAQT9iPSNjumADSqOVCTjubWdYld43ZRLp3XA719m63S8_-_xxVGosiGcue-KBaUemgufAieWRJbFXDtfAAUgqqnugZ7-P9J8Ca-5Wq5k2Gqt23IWO5abTuo0Ml-03uIVEhhlz07FLF0ym7ovQd6JYvvMjs9klXBZefuY8FKB8Za0Bmo-wdM-ugIwzDiGSDQGZuc_rd9Pkki4GgEyshL2wH5bgkG6xvN_9HcKnk3rDRzsuoP68g',
      'identifiertype': 'external',
      'sitecode': 'BANG'

    }
  })

  return next(modifiedReq);
};
