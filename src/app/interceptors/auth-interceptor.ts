import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type':'application/json',
      'orgCode': 'rainy',
      'appCode': 'reactoreEmployeePortal',
      'apiKey': 'eyJraWQiOiJBb2xTaUp5b1ZFS2J0OGdyZVdSQThTMnhQaU5oR0xWWk0xSDFrbGpLc2QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ZDdlOWNhYy04YjBmLTQxZTItOGU4My00Mjg0OTMwYWYzYzciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfTENHMkRraVhvIiwiY29nbml0bzp1c2VybmFtZSI6ImJhY2tlbmQiLCJvcmlnaW5fanRpIjoiM2YxZTRjYzItM2I4My00ODc3LWJlYWUtYTBmZmI5ZWMwMDM5IiwiYXVkIjoiNWI2NWl0bHM5dDVqOWhkOGc2NHNob3Q2amUiLCJldmVudF9pZCI6ImRkZTFiNGUxLTJiYjctNDY2NC1hNzE4LWZiMDc0ZjNjNWIwYyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzcyMDg1NDg5LCJleHAiOjE3NzIxNzE4ODksImlhdCI6MTc3MjA4NTQ4OSwianRpIjoiOTY4MWExODMtYzE5YS00YmJlLTlhNGUtMGQ0N2I2ZGMxOThlIiwiZW1haWwiOiJiZUBtYWlsaW5hdG9yLmNvbSJ9.m2oQUUuF_pBE-MH7WdqZqVFXJEnyGGVrJV7qRv4J-LEVvpf3D56wEtnUHxldrVfEHkvLyAiZGdRDaIX0Pj5IHDvKx_rsp177Fh2TVrUZJ3Puv80_2n05DnI50zxjYogKcy9XPsbtvpDRF_zrhGLfqJgIg4H41lqzKo26h4qstHv-zQCaSzuLJuYkOEvd54b3GNAsNqMh4yGCUIkJazIQIANpPkuYi62LS_8T2nPNliltWEHhbBHwwypYFE9xHoPnMHiwRacWy5J8axeyBeRI2fGuq4OUBRkX67t6jbsh3vMv80g0Uw6I2MorKR_Ro0McmTghpk6uj2cZGZWaqNuyGQ',
      'identifiertype': 'external',
      'sitecode': 'BANG'

    }
  })

  return next(modifiedReq);
};
