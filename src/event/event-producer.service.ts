import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { DataSource, Repository } from 'typeorm';
import {
  LendingEnabled,
  MaxLongSizeRatioSet,
  PauseTradingToggled,
  PoolAdded,
  TokenConfigured,
} from 'indexer/src/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Market } from 'indexer/src/entities/market.entity';

@Injectable()
export class EventProducerService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
  ) {}

  async produceEvent() {
    const events = readFileSync('events.json', 'utf8');
    const eventData = JSON.parse(events);

    const markets = new Map<string, Market>();
    const tokens = new Map<string, string>();

    for (const event of eventData) {
      switch (event.type) {
        case '0xc9dca9c853dd5019::pool_event::PoolAdded': {
          const poolAddedEvent = event.data as PoolAdded;
          const market = this.marketRepository.create({
            pool: poolAddedEvent.pool,
            longToken: poolAddedEvent.long_token,
            shortToken: poolAddedEvent.short_token,
            createdAt: Number(poolAddedEvent.submission_timestamp),
            updatedAt: Number(poolAddedEvent.submission_timestamp),
          });
          markets.set(market.pool, market);
          tokens.set(market.longToken, market.pool);
          break;
        }
        case '0xc9dca9c853dd5019::pool_event::MaxLongSizeRatioSet': {
          const maxLongSizeRatioSetEvent = event.data as MaxLongSizeRatioSet;
          const market = markets.get(maxLongSizeRatioSetEvent.pool);
          market.maxLongSizeRatio = maxLongSizeRatioSetEvent.value;
          break;
        }
        case '0xc9dca9c853dd5019::lending::MarketAdded': {
          // const marketAddedEvent = event.data as MarketAdded;
          break;
        }
        case '0xc9dca9c853dd5019::pool_event::PauseTradingToggled': {
          const pauseTradingToggledEvent = event.data as PauseTradingToggled;
          const market = markets.get(pauseTradingToggledEvent.pool);
          market.paused = pauseTradingToggledEvent.paused;
          break;
        }
        case '0xc9dca9c853dd5019::pool_event::LendingEnabled': {
          const lendingEnabledEvent = event.data as LendingEnabled;
          const market = markets.get(lendingEnabledEvent.pool);
          market.lendingEnabled = true;
          market.maxBorrowRatio = lendingEnabledEvent.max_borrow_ratio;
          break;
        }
        case '0xc9dca9c853dd5019::lending::BorrowConfigured': {
          // const borrowConfiguredEvent = event.data as BorrowConfigured;
          break;
        }
        case '0x7c83cb310dcb3185::oracle::TokenConfigured': {
          const tokenConfiguredEvent = event.data as TokenConfigured;
          const pool = tokens.get(tokenConfiguredEvent.token.inner);
          const market = markets.get(pool);
          market.pythPriceIdentifier =
            tokenConfiguredEvent.pyth_price_identifier;
          break;
        }
        case '0x4be9381ed03aa3185::fee_distributor::FeeRecipientConfigured': {
          // const feeRecipientConfiguredEvent =
          //   event.data as FeeRecipientConfigured;
          break;
        }
        case '0x4be9381ed03aa3185::season::StrategyAdded': {
          break;
        }
        case '0x4be9381ed03aa3185::season::Swap': {
          break;
        }
        case '0x4be9381ed03aa3185::season::LeverageVolume': {
          break;
        }
        case '0x4be9381ed03aa3185::season::LeverageFee': {
          break;
        }
        case '0x4be9381ed03aa3185::season::SeasonStarted': {
          break;
        }
      }
    }
    await this.persistDatabase(Array.from(markets.values()));
  }

  private async persistDatabase(markets: Market[]) {
    await this.dataSource.transaction(async (manager) => {
      await manager.save(Market, markets);
    });
  }
}
