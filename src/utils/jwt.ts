import { MyJwtPayload } from '@/types/types';
import {jwtDecode} from 'jwt-decode';


/**
 * checks if json web token is expired
 * @param token 
 * @returns 
 */
function isTokenExpired(token: string) {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode<MyJwtPayload>(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp! < currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
}

export default isTokenExpired;
