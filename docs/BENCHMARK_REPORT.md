# Markov Engine 2.0 Benchmark Evaluation Report

*Generated: 2026-08-24T10:04:09.378Z*

### Scenario 1: Sui Move Smart Contract (Escrow Abort 104)
- **Domain:** Smart Contracts
- **Trigger:** `sui move test --filter test_settle_trade -> FAILED: Move Abort 104 (EInvalidSignature) at Escrow::settle_trade`
- **Signature Hash:** `0x1a71820d`
- **Context Tokens:** 780 tok (v1) -> **42 tok (v2.0)** (*94.6% savings*)
- **Latency:** 1420ms (v1) -> **0ms** (v2.0)
- **Applied Fix:** `Pass '@seller' capability explicitly into settle_trade(&mut Escrow, &SellerCap, &mut TxContext).`

### Scenario 2: Web3 Frontend DApp (Next.js Hydration Mismatch)
- **Domain:** Frontend DApp
- **Trigger:** `npm run dev -> Hydration failed because the initial UI does not match what was rendered on the server: WalletProvider address mismatch`
- **Signature Hash:** `0x655743e1`
- **Context Tokens:** 645 tok (v1) -> **41 tok (v2.0)** (*93.6% savings*)
- **Latency:** 1180ms (v1) -> **0ms** (v2.0)
- **Applied Fix:** `Wrap WalletProvider and connection hooks in Next.js dynamic import with { ssr: false }.`

### Scenario 3: Walrus High-Throughput Indexer (RPC Rate Limit 429)
- **Domain:** Backend Indexer
- **Trigger:** `node indexer.js -> JsonRpcError: 429 Too Many Requests on getDynamicFields (quota exceeded)`
- **Signature Hash:** `0x120d8e82`
- **Context Tokens:** 712 tok (v1) -> **45 tok (v2.0)** (*93.7% savings*)
- **Latency:** 1340ms (v1) -> **0ms** (v2.0)
- **Applied Fix:** `Implement adaptive exponential backoff with full jitter and batch requests via getDynamicFieldsBulk.`

## Evaluation Summary Scorecard

| Scenario | Domain | Before (v1) | After (v2.0) | Token Savings | Latency Savings | Accuracy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Smart Contracts | 780 tok | 42 tok | 94.6% | 1420ms -> 0ms | 100% PASS |
| 2 | Frontend DApp | 645 tok | 41 tok | 93.6% | 1180ms -> 0ms | 100% PASS |
| 3 | Backend Indexer | 712 tok | 45 tok | 93.7% | 1340ms -> 0ms | 100% PASS |
| **AVG** | **Average Gains** | **712 tok** | **43 tok** | **94.0%** | **1313ms -> 0ms** | **100% PASS** |

