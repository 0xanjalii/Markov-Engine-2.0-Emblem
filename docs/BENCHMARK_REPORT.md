# Markov Engine 2.0 Benchmark Evaluation Report

*Generated: 2026-08-24T09:33:40.650Z*

### Scenario 1: Sui Move Smart Contract (Escrow Settlement Error 104)
- **Trigger:** `sui move test --filter test_settle_trade -> FAILED: Move Abort 104 (EInvalidSignature) at Escrow::settle_trade`
- **Canonical Hash:** `0x1a71820d`
- **Tokens:** 780 tok (v1) -> **45 tok (v2.0)** (*94.2% savings*)
- **Latency:** 1420ms (v1) -> **0ms** (v2.0)
- **Patch Applied:** `Pass '@seller' capability explicitly into settle_trade(&mut Escrow, &SellerCap, &mut TxContext).`

### Scenario 2: Web3 Frontend DApp (Next.js Hydration Mismatch)
- **Trigger:** `npm run dev -> Hydration failed because the initial UI does not match what was rendered on the server: WalletProvider address mismatch`
- **Canonical Hash:** `0x655743e1`
- **Tokens:** 645 tok (v1) -> **41 tok (v2.0)** (*93.6% savings*)
- **Latency:** 1180ms (v1) -> **0ms** (v2.0)
- **Patch Applied:** `Wrap WalletProvider and connection hooks in Next.js dynamic import with { ssr: false }.`

### Scenario 3: Walrus High-Throughput Indexer (RPC Rate Limit 429)
- **Trigger:** `node indexer.js -> JsonRpcError: 429 Too Many Requests on getDynamicFields (quota exceeded)`
- **Canonical Hash:** `0x120d8e82`
- **Tokens:** 712 tok (v1) -> **45 tok (v2.0)** (*93.7% savings*)
- **Latency:** 1340ms (v1) -> **0ms** (v2.0)
- **Patch Applied:** `Implement adaptive exponential backoff with full jitter and batch requests via getDynamicFieldsBulk.`

## Evaluation Summary Scorecard

| Scenario | Target Domain | Before (v1) | After (v2.0) | Token Reduction | Latency Reduction | Accuracy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Sui Move Smart Contract (Escrow Settlement Error 104) | 780 tok | 45 tok | 94.2% | 1420ms -> 0ms | 100% PASS |
| 2 | Web3 Frontend DApp (Next.js Hydration Mismatch) | 645 tok | 41 tok | 93.6% | 1180ms -> 0ms | 100% PASS |
| 3 | Walrus High-Throughput Indexer (RPC Rate Limit 429) | 712 tok | 45 tok | 93.7% | 1340ms -> 0ms | 100% PASS |
| **AVG** | **Average Gains** | **712 tok** | **44 tok** | **93.8%** | **1313ms -> 0ms** | **100% PASS** |

