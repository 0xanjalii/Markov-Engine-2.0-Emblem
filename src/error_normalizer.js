/**
 * Deterministic Error Signature Normalizer & Vault
 * 
 * Normalizes terminal stack traces into deterministic 8-character hashes
 * and resolves proven historical patches in 0-turns.
 */

const crypto = require('crypto');

class ErrorNormalizer {
  constructor() {
    this.vault = new Map();
  }

  normalizeError(rawStackTrace) {
    let clean = rawStackTrace.trim();

    // 1. Detect Sui Move Aborts
    const moveMatch = clean.match(/Move Abort\s*(\d+)\s*(?:\(([^)]+)\))?\s*(?:at\s*([A-Za-z0-9_:]+))?/i);
    if (moveMatch) {
      const code = moveMatch[1];
      const errorName = moveMatch[2] || 'UNKNOWN_ABORT';
      const symbol = moveMatch[3] || 'UNKNOWN_MODULE';
      const canonical = `[error_sig|type=MOVE_ABORT|code=${code}|name=${errorName}|symbol=${symbol}]`;
      const hash = this._computeHash(canonical);
      return { type: 'MOVE_ABORT', code, name: errorName, symbol, canonical, hash };
    }

    // 2. Detect React/Next.js Hydration Mismatches
    const hydrationMatch = clean.match(/Hydration failed[^\n]*rendered on the server:\s*([A-Za-z0-9_]+)/i);
    if (hydrationMatch || clean.includes('Hydration failed')) {
      const symbol = hydrationMatch ? hydrationMatch[1] : 'WalletProvider';
      const canonical = `[error_sig|type=HYDRATION_MISMATCH|code=REACT_418|symbol=${symbol}]`;
      const hash = this._computeHash(canonical);
      return { type: 'HYDRATION_MISMATCH', code: 'REACT_418', symbol, canonical, hash };
    }

    // 3. Detect RPC Rate Limits
    const rpcMatch = clean.match(/(?:429|Too Many Requests)[^\n]*on\s*([A-Za-z0-9_]+)/i);
    if (rpcMatch || clean.includes('429 Too Many Requests')) {
      const symbol = rpcMatch ? rpcMatch[1] : 'getDynamicFields';
      const canonical = `[error_sig|type=RPC_RATE_LIMIT|code=HTTP_429|symbol=${symbol}]`;
      const hash = this._computeHash(canonical);
      return { type: 'RPC_RATE_LIMIT', code: 'HTTP_429', symbol, canonical, hash };
    }

    // Fallback: General sanitized error
    const sanitized = clean.replace(/0x[a-fA-F0-9]{10,}/g, '0xADDR').replace(/:\d+:\d+/g, ':LINE');
    const hash = this._computeHash(sanitized);
    return { type: 'GENERIC_ERROR', code: 'ERR_UNKNOWN', canonical: sanitized, hash };
  }

  _computeHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex').substring(0, 8);
  }

  registerPatch(errorHash, patchDetails) {
    this.vault.set(errorHash, {
      ...patchDetails,
      registeredAt: new Date().toISOString(),
      usageCount: 0
    });
  }

  resolveInstantPatch(errorHash) {
    if (this.vault.has(errorHash)) {
      const entry = this.vault.get(errorHash);
      entry.usageCount++;
      return { hit: true, patch: entry };
    }
    return { hit: false, patch: null };
  }
}

module.exports = { ErrorNormalizer };
