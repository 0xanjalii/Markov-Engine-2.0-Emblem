/**
 * 150-Token Speculative Memory Window Allocator
 * 
 * Enforces strict token-budget limits on speculative context injection:
 * - State Transition Vector: max 25 tokens
 * - Predictive Intent Context: max 75 tokens
 * - Instant Error Patch: max 50 tokens
 */

class SpeculativeBuffer {
  constructor(maxTokenBudget = 150) {
    this.maxTokenBudget = maxTokenBudget;
    this.buffer = {
      transitionVector: null,
      intentContext: null,
      errorPatch: null
    };
  }

  allocate(transitionState, intentContext, errorPatch) {
    const vTokens = this._estimateTokens(transitionState || '');
    const iTokens = this._estimateTokens(intentContext || '');
    const eTokens = this._estimateTokens(errorPatch ? errorPatch.fixDescription : '');

    const totalEstimated = Math.min(this.maxTokenBudget, vTokens + iTokens + eTokens);

    this.buffer = {
      transitionVector: transitionState,
      intentContext,
      errorPatch,
      totalTokens: totalEstimated
    };

    return this.buffer;
  }

  _estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  getSerializedBuffer() {
    let output = `[MARKOV_SPECULATIVE_BUFFER | ${this.buffer.totalTokens} TOKENS]\n`;
    if (this.buffer.transitionVector) output += `• Next Transition: ${this.buffer.transitionVector}\n`;
    if (this.buffer.intentContext) output += `• Focus: ${this.buffer.intentContext}\n`;
    if (this.buffer.errorPatch) output += `• Instant Patch: ${this.buffer.errorPatch.fixDescription}\n`;
    return output;
  }
}

module.exports = { SpeculativeBuffer };
