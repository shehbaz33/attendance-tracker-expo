import jwt_decode from "jwt-decode";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNDRjOWQyOGYtYjE4Ny00ZDE2LWJiMWYtNzM5Y2E1MmQ3OGRlIiwiaWF0IjoxNjQ4MDIxOTIzLCJleHAiOjE2NDgyODExMjN9.eCyO67CB8-xgBTDWv9HkKx0flo3_SuzTAnm4pWbSN9E";
var decoded = jwt_decode(token);
console.log(decoded);

