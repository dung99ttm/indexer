import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './entities/market.entity';
import { EventProducerService } from './event/event-producer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'indexer',
      entities: [Market],
      synchronize: true,
    }),
  ],
  providers: [EventProducerService],
})
export class AppModule {}
