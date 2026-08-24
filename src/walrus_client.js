const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

class WalrusClient {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.MEMWAL_API_KEY || process.env.MEMWAL_PRIVATE_KEY;
    this.accountId = config.accountId || process.env.MEMWAL_ACCOUNT_ID;
    this.serverUrl = config.serverUrl || process.env.MEMWAL_ENDPOINT || 'https://relayer.memory.walrus.xyz';
    this.network = config.network || process.env.SUI_NETWORK || 'mainnet';
    this.memwal = null;
  }

  async initialize() {
    const { MemWal } = await import('@mysten-incubation/memwal');
    this.memwal = MemWal.create({
      key: this.apiKey,
      accountId: this.accountId,
      serverUrl: this.serverUrl
    });
    return this.memwal;
  }

  async healthCheck() {
    if (!this.memwal) await this.initialize();
    return await this.memwal.health();
  }

  async persistTransition(transitionRecord) {
    if (!this.memwal) await this.initialize();
    return await this.memwal.remember(transitionRecord, 'markov_transitions');
  }

  async persistErrorCache(errorRecord) {
    if (!this.memwal) await this.initialize();
    return await this.memwal.remember(errorRecord, 'error_vault');
  }

  async recallErrorFix(errorHash) {
    if (!this.memwal) await this.initialize();
    return await this.memwal.recall({
      query: `error_cache sig_hash=${errorHash}`,
      limit: 2,
      namespace: 'error_vault'
    });
  }
}

module.exports = { WalrusClient };
