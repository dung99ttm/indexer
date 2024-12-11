import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('markets')
export class Market {
  @PrimaryGeneratedColumn()
  pool: string;

  @Column({ name: 'long_token' })
  longToken: string;

  @Column({ name: 'short_token' })
  shortToken: string;

  @Column({ name: 'max_long_size_ratio' })
  maxLongSizeRatio: string;

  @Column()
  paused: boolean;

  @Column({ name: 'lending_enabled' })
  lendingEnabled: boolean;

  @Column()
  market: boolean;

  @Column({ name: 'max_borrow_ratio' })
  maxBorrowRatio: string;

  @Column({ name: 'pyth_price_identifier' })
  pythPriceIdentifier: string;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at' })
  updatedAt: number;
}
