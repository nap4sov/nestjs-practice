import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from './gqlAuth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, GqlAuthGuard],
  exports: [PassportModule],
})
export class AuthzModule {}
