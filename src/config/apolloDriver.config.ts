import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { BlogModule } from '../blog/blog.module';

export const apolloDriverConfig = {
  driver: ApolloDriver,
  typePaths: ['./**/*.graphql'],
  definitions: {
    path: join(process.cwd(), 'src/graphql.ts'),
  },
  include: [BlogModule],
};
