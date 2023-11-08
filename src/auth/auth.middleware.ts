import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
      // 1. get token from headers
      // token format: "Bearer <token>"
      const request = req.headers['auth-user']

      if ( (!request) || (request.split(' ').length !== 2) || (request.split(' ')[0] !== 'Bearer')){
        return res.status(401).send('Unauthorized')
      }
      
      const token = request.split(' ')[1]

      try {
          // 2. Validation
          const secret = process.env.JWT_SECRET || 'secret'
          const payload = jwt.verify(token, secret)

          // 3. Si valide : on continue + set req.user
          req.user = payload
          next()
      } catch (e) {
          return res.status(401).send('Unauthorized')
      }
  }
}
