import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from '../dto/response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(_, next: CallHandler): Observable<Response<T>> {
		return next.handle().pipe(map(data => ({ data })));
	}
}
