export enum Side {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export enum OrderStatus {
  OPEN = 'OPEN',
  FILLED = 'FILLED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export type MoveObject = {
  inner: string;
};

export type I128 = {
  bits: string;
};

export type AccountKey = {
  wallet: string;
  account_index: number;
};

export type PoolAdded = {
  pool: string;
  long_token: string;
  short_token: string;
  max_leverage: string;
  max_skew_value: string;
  maintenance_margin: string;
  submission_timestamp: string;
  max_funding_per_second: string;
  min_funding_per_second: string;
};

export type PoolPauseTradingToggled = {
  pool: string;
  paused: boolean;
  submission_timestamp: string;
};

export type OrderManagerLeverageOrderPlaced = {
  order_id: string;
  owner: AccountKey;
  pool: string;
  collateral_token: string;
  pay_token: string;
  swap_paths: string[];
  size_change: string;
  collateral_changed: string;
  pay_amount: string;
  acceptable_price: string;
  trigger_price: string;
  is_increase: boolean;
  is_long: boolean;
  trigger_above_threshold: boolean;
  execution_fee: string;
  expires_at: string;
  submission_timestamp: string;
};

export type OrderManagerLeverageOrderExecuted = {
  order_id: string;
  index_price: string;
  execution_price: string;
  submission_timestamp: string;
};

export type OrderManagerLeverageOrderCancelled = {
  order_id: string;
  submission_timestamp: string;
};

export type OrderManagerLeverageOrderExpired = {
  order_id: string;
  submission_timestamp: string;
};

export type OrderManagerIncreasePosition = {
  pool: string;
  collateral_token: string;
  pay_token: string;
  account: AccountKey;
  is_long: boolean;
  size_change: string;
  pay_amount: string;
  acceptable_price: string;
  execution_price: string;
  submission_timestamp: string;
};

export type OrderManagerDecreasePosition = {
  pool: string;
  collateral_token: string;
  pay_token: string;
  account: AccountKey;
  is_long: boolean;
  size_change: string;
  collateral_changed: string;
  acceptable_price: string;
  execution_price: string;
  submission_timestamp: string;
};

export type PoolIncreasePosition = {
  pool: string;
  owner: AccountKey;
  is_long: boolean;
  collateral_changed: string;
  size_changed: string;
  position_fee_amount: string;
  borrow_fee_amount: string;
  collateral_price: string;
  index_price: string;
  funding_fee_amount: string;
  submission_timestamp: string;
};

export type PoolDecreasePosition = {
  pool: string;
  owner: AccountKey;
  is_long: boolean;
  collateral_changed: string;
  size_changed: string;
  position_fee_amount: string;
  borrow_fee_amount: string;
  collateral_price: string;
  index_price: string;
  funding_fee_amount: string;
  pnl: I128;
  submission_timestamp: string;
};

export type PoolLiquidatePosition = {
  pool: string;
  account: AccountKey;
  liquidator: string;
  is_long: boolean;
  index_price: string;
  collateral_price: string;
  collateral: string;
  position_fee_amount: string;
  borrow_fee_amount: string;
  funding_fee_amount: string;
  pending_funding_amount: string;
  size: string;
  pnl: I128;
  submission_timestamp: string;
};

export type PoolSwap = {
  pool: string;
  token_in: string;
  token_out: string;
  amount_in: string;
  amount_out: string;
  fee_amount: string;
  price_in: string;
  price_out: string;
  submission_timestamp: string;
};

export type PoolLiquidityAdded = {
  pool: string;
  long_amount_in: string;
  short_amount_in: string;
  lp_amount: string;
  long_fee_amount: string;
  short_fee_amount: string;
  long_price: string;
  short_price: string;
  submission_timestamp: string;
};

export type PoolLiquidityRemoved = {
  pool: string;
  lp_amount: string;
  long_amount_out: string;
  short_amount_out: string;
  long_fee_amount: string;
  short_fee_amount: string;
  long_price: string;
  short_price: string;
  submission_timestamp: string;
};

export type PoolFundingSettled = {
  pool: string;
  account: AccountKey;
  is_long: boolean;
  long_price: string;
  short_price: string;
  pay_funding_fee_amount: string;
  receive_funding_fee_amount: string;
  submission_timestamp: string;
};

export type PoolUpdatePosition = {
  pool: string;
  account: AccountKey;
  is_long: boolean;
  index_price: string;
  collateral_price: string;
  collateral: string;
  entry_price: string;
  borrow_index: string;
  pending_funding_amount: string;
  size: string;
  acc_pay_funding_per_size: string;
  acc_receive_funding_per_size: string;
  submission_timestamp: string;
};

export type PoolClosePosition = {
  pool: string;
  account: AccountKey;
  is_long: boolean;
  collateral: string;
  entry_price: string;
  entry_interest_rate: string;
  pending_funding_amount: string;
  size: string;
  submission_timestamp: string;
};

export type TradingAccountDeposited = {
  account: AccountKey;
  token: MoveObject;
  amount: string;
  submission_timestamp: string;
};

export type TradingAccountWithdrawn = {
  account: AccountKey;
  token: MoveObject;
  amount: string;
  submission_timestamp: string;
};

export type LendDeposited = {
  market: string;
  account: AccountKey;
  amount: string;
  submission_timestamp: string;
};

export type LendWithdrawn = {
  market: string;
  account: AccountKey;
  amount: string;
  submission_timestamp: string;
};

export type LendRepaid = {
  coin: string;
  account: AccountKey;
  amount: string;
  submission_timestamp: string;
};

export type LendBorrowed = {
  coin: string;
  account: AccountKey;
  amount: string;
  submission_timestamp: string;
};

export type LendLiquidated = {
  liquidator: AccountKey;
  borrower: AccountKey;
  repay_market: string;
  repay_amount: string;
  seize_market: string;
  seize_amount: string;
  submission_timestamp: string;
};

export type LendInterestAccrued = {
  pool: string;
  amount: string; // APT
  submission_timestamp: string;
};

export type TradingAsset = { token: string; amount: string };

export type TradingNetValue = {
  pool: string;
  side: Side;
  collateralAmount: string;
  size: string;
  entryPrice: string;
  pendingFundingAmount: string;
};

export type DaoFeeSet = {
  value: string;
  submission_timestamp: string;
};

export type MaxLongSizeRatioSet = {
  pool: string;
  value: string;
  submission_timestamp: string;
};

export type MarketAdded = {
  market: string;
  submission_timestamp: string;
};

export type PauseTradingToggled = {
  pool: string;
  paused: boolean;
  submission_timestamp: string;
};

export type LendingEnabled = {
  pool: string;
  max_borrow_ratio: string;
  submission_timestamp: string;
};

export type BorrowConfigured = {
  pool: string;
  submission_timestamp: string;
};

export type TokenConfigured = {
  token: MoveObject;
  trust_price_age: string;
  pyth_price_identifier: string;
};

export type FeeRecipientConfigured = {
  weight: string;
  recipient: {
    module_name: string;
    struct_name: string;
    account_address: string;
  };
};
