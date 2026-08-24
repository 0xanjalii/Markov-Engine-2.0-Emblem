/**
 * Markov State Transition Machine
 * 
 * Computes probabilistic transitions across developer workflow states:
 * S_INIT -> S_PLAN -> S_EDIT -> S_TEST -> (S_PASS / S_FAIL) -> S_DEBUG -> S_HOTFIX -> S_DEPLOY
 */

const STATES = {
  INIT: 'S_INIT',
  PLAN: 'S_PLAN',
  EDIT: 'S_EDIT',
  TEST: 'S_TEST',
  FAIL: 'S_FAIL',
  DEBUG: 'S_DEBUG',
  HOTFIX: 'S_HOTFIX',
  PASS: 'S_PASS',
  DEPLOY: 'S_DEPLOY'
};

class MarkovStateMachine {
  constructor() {
    // Initial probability transition matrix P(S_next | S_current)
    this.transitionMatrix = {
      [STATES.INIT]:   { [STATES.PLAN]: 0.90, [STATES.EDIT]: 0.10 },
      [STATES.PLAN]:   { [STATES.EDIT]: 0.85, [STATES.INIT]: 0.15 },
      [STATES.EDIT]:   { [STATES.TEST]: 0.88, [STATES.PLAN]: 0.12 },
      [STATES.TEST]:   { [STATES.PASS]: 0.60, [STATES.FAIL]: 0.40 },
      [STATES.FAIL]:   { [STATES.DEBUG]: 0.95, [STATES.EDIT]: 0.05 },
      [STATES.DEBUG]:  { [STATES.HOTFIX]: 0.80, [STATES.TEST]: 0.20 },
      [STATES.HOTFIX]: { [STATES.TEST]: 0.90, [STATES.DEBUG]: 0.10 },
      [STATES.PASS]:   { [STATES.DEPLOY]: 0.92, [STATES.EDIT]: 0.08 },
      [STATES.DEPLOY]: { [STATES.INIT]: 0.70, [STATES.PLAN]: 0.30 }
    };
    this.currentState = STATES.INIT;
    this.history = [];
  }

  getCurrentState() {
    return this.currentState;
  }

  transitionTo(nextState) {
    if (!Object.values(STATES).includes(nextState)) {
      throw new Error(`Invalid Markov state: ${nextState}`);
    }
    const priorState = this.currentState;
    this.currentState = nextState;
    this.history.push({ from: priorState, to: nextState, timestamp: new Date().toISOString() });
    return { priorState, currentState: nextState };
  }

  predictNextState(fromState = this.currentState) {
    const transitions = this.transitionMatrix[fromState];
    if (!transitions) return { predictedState: STATES.PLAN, probability: 0.5 };

    let highestProb = -1;
    let bestState = null;

    for (const [state, prob] of Object.entries(transitions)) {
      if (prob > highestProb) {
        highestProb = prob;
        bestState = state;
      }
    }

    return {
      predictedState: bestState,
      probability: highestProb,
      distribution: transitions
    };
  }

  updateTransitionWeight(fromState, toState, delta = 0.05) {
    if (!this.transitionMatrix[fromState]) this.transitionMatrix[fromState] = {};
    const current = this.transitionMatrix[fromState][toState] || 0.1;
    this.transitionMatrix[fromState][toState] = Math.min(0.99, current + delta);
  }
}

module.exports = { MarkovStateMachine, STATES };
