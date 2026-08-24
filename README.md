<div align="center">
  <img src="./logo.png" alt="Markov Engine 2.0 Logo" width="220" />
  <h1>Markov Engine 2.0 — Predictive Memory Pre-Fetcher & Error Cache</h1>
</div>

[![Walrus Session 7](https://img.shields.io/badge/Walrus%20Session%207-Prompt%20Evolution-blue?style=for-the-badge&logo=walrus)](https://memory.walrus.xyz)
[![Tests Passing](https://img.shields.io/badge/Benchmark-3%2F3%20Trials%20Passed-brightgreen?style=for-the-badge)](#-benchmark-results-3-trial-evaluation)
[![Latency Savings](https://img.shields.io/badge/Retrieval%20Delay-0ms%20(Instant)-success?style=for-the-badge)](#-benchmark-results-3-trial-evaluation)
[![Token Savings](https://img.shields.io/badge/Token%20Reduction-80.0%25%20Avg-blueviolet?style=for-the-badge)](#-benchmark-results-3-trial-evaluation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Markov Engine 2.0** is an evolution of the Markov state-based memory architecture for **Walrus Session 7: Prompt Evolution**. It replaces slow, reactive memory searches with a **probabilistic Markov State Transition Graph** and a **deterministic Error-to-Resolution Cache** anchored on decentralized **Walrus storage (MemWal)**.

---

## ⚡ Key Architectural Upgrades in Markov Engine 2.0

| Feature | Markov v1 (Baseline) | Markov Engine 2.0 (Evolution) |
| :--- | :--- | :--- |
| **Retrieval Timing** | **Purely Reactive:** Waits for user prompt, then executes 3+ vector searches (**~1313ms latency**). | **Predictive Pre-Fetch:** Calculates $S_{t+1} = \arg\max P(S \mid S_t)$ and pre-loads context in **0ms**. |
| **Debugging Repetitive Errors** | Guesses fixes heuristically on each occurrence; prone to LLM hallucination. | **Deterministic Error Cache (`markov.error_cache`):** Matches canonical error hash to verified patch in **0 turns (100% accuracy)**. |
| **Context Overhead** | Recalls 15–20 uncompressed logs per turn (**~712 tokens** context bloat). | **Speculative Buffer (150 Tokens):** Constrains memory injection to state delta + pre-fetched fix (**80.0% token savings**). |
| **Workflow Modeling** | Flat sequential phase tagging (`[state: PLAN]`). | **Dynamic Probabilistic Markov Matrix:** Adapts state-transition likelihoods to actual developer habits over time. |

---

## 📂 Repository Contents

* [`prompt_v1_original.md`](./prompt_v1_original.md) — The baseline Markov v1 prompt.
* [`prompt_v2_evolved.md`](./prompt_v2_evolved.md) / [`prompt.md`](./prompt.md) — The production-ready Markov Engine 2.0 system prompt.
* [`eval_harness.js`](./eval_harness.js) — Automated 3-trial benchmark test suite evaluating v1 vs v2.
* [`live_memwal_runner.js`](./live_memwal_runner.js) — Live decentralized interaction runner for Walrus Mainnet.
* [`BENCHMARK_RESULTS.md`](./BENCHMARK_RESULTS.md) — Full raw terminal execution logs for all trials.

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/0xanjalii/markov-engine-2.0.git
cd markov-engine-2.0
```

### 2. Install Dependencies
```bash
npm install
```

---

## 🧪 Running the Evaluations

### Option A: Run Offline 3-Trial Benchmark (No API Key Required)
Run the automated benchmark measuring latency, token reduction, and error resolution accuracy:
```bash
node eval_harness.js
```

### Option B: Run Live on Walrus Mainnet (With Live Relayer)
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure your credentials in `.env`:
   ```env
   MEMWAL_API_KEY=your_delegate_private_key_hex
   MEMWAL_ENDPOINT=https://relayer.memory.walrus.xyz
   SUI_NETWORK=mainnet
   MEMWAL_ACCOUNT_ID=0xYOUR_ACCOUNT_OBJECT_ID
   ```
3. Execute live writes and recalls on Walrus Mainnet:
   ```bash
   node live_memwal_runner.js
   ```

---

## 📊 Benchmark Results (3-Trial Evaluation)

```text
================================================================================
 3-TRIAL BEFORE / AFTER EVALUATION SUMMARY SCORECARD
================================================================================
 Trial | Target Project             | Before (v1) | After (v2.0) | Token Savings | Latency Savings | Resolution
-------|----------------------------|-------------|--------------|---------------|-----------------|-----------
   1   | Sui Move Smart Contract    | 780 tok     | 142 tok      | 81.8%         | 1420ms -> 0ms   | 100% (PASS)
   2   | Web3 Frontend DApp         | 645 tok     | 135 tok      | 79.1%         | 1180ms -> 0ms   | 100% (PASS)
   3   | Walrus Indexer Pipeline    | 712 tok     | 150 tok      | 78.9%         | 1340ms -> 0ms   | 100% (PASS)
-------|----------------------------|-------------|--------------|---------------|-----------------|-----------
 AVG   | 3-Scenario Average         | 712 tok     | 142 tok      | 80.0%         | 1313ms -> 0ms   | 100% PASS
================================================================================
 🏆 VERIFICATION COMPLETE: 3/3 Trials passed with measurable latency and token gains.
================================================================================
```

---

## 🙏 Credits & Attribution

* **Original Concept (Markov v1):** Created for earlier Walrus Memory sessions exploring state-tagged developer memory.
* **Markov Engine 2.0 Evolution:** Built by [@0xanjalii](https://github.com/0xanjalii) for **Walrus Session 7: Prompt Evolution**.
* **Decentralized Storage & Memory Layer:** Powered by [Walrus Protocol](https://walrus.xyz) and [@mysten-incubation/memwal](https://github.com/MystenLabs/MemWal).

---

## 📜 License
MIT License. Built for the decentralized AI developer ecosystem powered by [Walrus](https://walrus.xyz).
