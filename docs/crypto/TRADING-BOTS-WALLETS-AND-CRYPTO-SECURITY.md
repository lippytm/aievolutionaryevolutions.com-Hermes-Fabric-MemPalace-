# Trading Bots, Exchanges, Wallets, and Crypto Security

Trading, exchange, wallet, and crypto features must be treated as high-risk systems.

## Supported capability boundaries

AI may provide education, market-data organization, strategy simulation, backtesting, risk reports, portfolio observations, alerting, and draft trade plans. Live trading, withdrawals, transfers, custody, and account changes remain approval-gated.

## Required separation

- Education and simulation environments
- Paper-trading environments
- Live trading environments
- User accounts and service accounts
- Read-only market-data credentials and trading credentials
- Hot wallets, cold storage, and operational wallets
- Development, staging, and production systems

## Credential rules

API keys must be stored in secure secret storage, scoped to the minimum required permissions, restricted by IP or environment where supported, rotated, monitored, and revocable. Withdrawal permissions should be disabled by default. Seed phrases and private keys must never be sent to AI models, logs, prompts, tickets, or source control.

## Trading bot controls

Every bot must define its strategy, assets, venue, limits, position sizing, maximum loss, daily loss limit, order types, slippage tolerance, rate limits, pause conditions, kill switch, reconciliation process, and audit trail.

## Wallet and payment controls

Transfers require destination verification, address allowlists where supported, transaction previews, network validation, amount limits, cooling-off periods for new destinations, and explicit approval. The system must detect address changes, duplicate transactions, abnormal withdrawals, and failed reconciliation.

## Transparency

Reports must distinguish historical results, simulated results, forecasts, and live results. No output may guarantee profit or imply that past performance predicts future returns.
