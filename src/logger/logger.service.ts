import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';
import { Model } from 'mongoose';
import { createLogInterface } from 'src/interfaces';

@Injectable()
export class LoggerService {
  constructor(@InjectModel(Log.name) private catModel: Model<Log>) {}

  save(createLog: createLogInterface) {
    const createdCat = new this.catModel(createLog);
    createdCat.save();
  }
}
