import jwt_decode from "jwt-decode";

export default function decodeJwt(token) {
  var decoded = jwt_decode(token);
  console.log(decoded);
  return decoded;
}
