import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type':'application/json',
      'orgCode': 'rainy',
      'appCode': 'reactoreEmployeePortal',
      'apiKey': 'eyJraWQiOiJBb2xTaUp5b1ZFS2J0OGdyZVdSQThTMnhQaU5oR0xWWk0xSDFrbGpLc2QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ZDdlOWNhYy04YjBmLTQxZTItOGU4My00Mjg0OTMwYWYzYzciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfTENHMkRraVhvIiwiY29nbml0bzp1c2VybmFtZSI6ImJhY2tlbmQiLCJvcmlnaW5fanRpIjoiMDFhYzBiNzUtN2RiMi00NGQ4LWFhYmYtZjQzNjM4NzJiYTZiIiwiYXVkIjoiNWI2NWl0bHM5dDVqOWhkOGc2NHNob3Q2amUiLCJldmVudF9pZCI6ImJiMTkyOTYxLTZmZWItNDBhNy04MDgyLTg1ZjU2OTQxZjJiOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzcxOTMwNjU4LCJleHAiOjE3NzIwMTcwNTgsImlhdCI6MTc3MTkzMDY1OCwianRpIjoiZjdmNGU4NjUtYTEzNy00NjI4LWI2N2ItNmYzNGU4MDI5YjA2IiwiZW1haWwiOiJiZUBtYWlsaW5hdG9yLmNvbSJ9.QiteH9lK9ZZ1UAWMG8x9cl2el2W35MHAqM6TeTwML8z-poxc0z7W-IGR80Aho6Mi9CT_qkt6BUEcHmMnZLdP5ct9XCCu41l0nB7k3bAOjXgwNYGvYggEsreowDAF0vwG8IbMv1qRiYuySQSa6uNgY7KKCEcK5SqGKQN0ZjAJZ0FGzf-QaiENclEIZktwiDZ0ROQ92i2X5fsw9q5SYJc2r7jKQly10vByxHVNBwFxnEHMkCm5x34yxPaHDlZucpmdnV9NtBqFZsMjeErfGvs1jFWavbAMmNElx4BxWX3a_hj0nVFuX8kz8WkbN_v8jRHMJF8q5wvzJNhKoX6_HF4Kjw',
      'identifiertype': 'external',
      'sitecode': 'BANG'

    }
  })

  return next(modifiedReq);
};
