import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerService } from './logger.service';

import { Log, LogSchema } from './schemas/log.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
