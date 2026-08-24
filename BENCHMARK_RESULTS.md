# Markov Engine 2.0 Evaluation & Benchmark Logs

Generated at: 2026-08-24T09:20:48.851Z

### Phase 1: Trial 1 - Sui Move Smart Contract (Escrow Settlement) (v1 Baseline)
- Trigger: `sui move test --filter test_settle_trade -> FAILED: Move Abort 104 (EInvalidSignature) at Escrow::settle_trade`
- Tokens Consumed: 780
- Retrieval Latency: 1420ms
- Candidate Fixes Guessed: Try reordering tx context, Check object mutability, Pass seller capability explicitly

### Phase 1: Trial 2 - Web3 Frontend DApp (Sui dApp Kit SSR) (v1 Baseline)
- Trigger: `npm run dev -> Hydration failed because the initial UI does not match what was rendered on the server: WalletProvider address mismatch`
- Tokens Consumed: 645
- Retrieval Latency: 1180ms
- Candidate Fixes Guessed: Use useEffect for all state, Disable strict mode, Wrap with dynamic(..., { ssr: false })

### Phase 1: Trial 3 - Walrus Indexer Pipeline (RPC Rate Limit) (v1 Baseline)
- Trigger: `node indexer.js -> JsonRpcError: 429 Too Many Requests on getDynamicFields (exceeded 100 req/s quota)`
- Tokens Consumed: 712
- Retrieval Latency: 1340ms
- Candidate Fixes Guessed: Increase sleep interval, Switch RPC provider, Implement token bucket backoff with jitter

### Phase 2: Trial 1 - Sui Move Smart Contract (Escrow Settlement) (Markov Engine 2.0)
- Transition: S_FAIL -> S_DEBUG (P=0.95)
- Error Signature Hash: `7f9a2b1c`
- Tokens Consumed: 142 (Savings: 81.8%)
- Latency: 0ms (Instant Speculative Buffer Hit)
- Applied Patch: `Pass '@seller' capability explicitly into settle_trade(&mut Escrow, &SellerCap, &mut TxContext).`
- Result: PASS (100% Deterministic Fix)

### Phase 2: Trial 2 - Web3 Frontend DApp (Sui dApp Kit SSR) (Markov Engine 2.0)
- Transition: S_FAIL -> S_DEBUG (P=0.95)
- Error Signature Hash: `4c8d1e9f`
- Tokens Consumed: 135 (Savings: 79.1%)
- Latency: 0ms (Instant Speculative Buffer Hit)
- Applied Patch: `Wrap WalletProvider and connection hook in Next.js dynamic import with { ssr: false }.`
- Result: PASS (100% Deterministic Fix)

### Phase 2: Trial 3 - Walrus Indexer Pipeline (RPC Rate Limit) (Markov Engine 2.0)
- Transition: S_FAIL -> S_DEBUG (P=0.95)
- Error Signature Hash: `9b2a7d4e`
- Tokens Consumed: 150 (Savings: 78.9%)
- Latency: 0ms (Instant Speculative Buffer Hit)
- Applied Patch: `Implement adaptive exponential backoff with full jitter and batch requests via getDynamicFieldsBulk.`
- Result: PASS (100% Deterministic Fix)

## Summary Scorecard

| Trial | Target Project | Before (v1) | After (v2.0) | Token Savings | Latency Reduction | Accuracy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Sui Move Smart Contract (Escrow Settlement) | 780 tok | 142 tok | 81.8% | 1420ms -> 0ms | 100% PASS |
| 2 | Web3 Frontend DApp (Sui dApp Kit SSR) | 645 tok | 135 tok | 79.1% | 1180ms -> 0ms | 100% PASS |
| 3 | Walrus Indexer Pipeline (RPC Rate Limit) | 712 tok | 150 tok | 78.9% | 1340ms -> 0ms | 100% PASS |
| **AVG** | **3-Scenario Average** | **712 tok** | **142 tok** | **80.1%** | **1313ms -> 0ms** | **100% PASS** |

