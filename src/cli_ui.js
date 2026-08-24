/**
 * Markov Engine 2.0 - Rich Terminal UI & ANSI Design System
 */

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  
  // Foreground
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Bright Foreground
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
  
  // Backgrounds
  bgDark: '\x1b[40m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgGreen: '\x1b[42m',
};

const UI = {
  banner() {
    console.log(`
${ANSI.brightCyan}${ANSI.bold}  ███╗   ███╗ █████╗ ██████╗ ██╗  ██╗ ██████╗ ██╗   ██╗
  ████╗ ████║██╔══██╗██╔══██╗██║ ██╔╝██╔═══██╗██║   ██║
  ██╔████╔██║███████║██████╔╝█████╔╝ ██║   ██║██║   ██║
  ██║╚██╔╝██║██╔══██║██╔══██╗██╔═██╗ ██║   ██║╚██╗ ██╔╝
  ██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██╗╚██████╔╝ ╚████╔╝ 
  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ${ANSI.brightMagenta}${ANSI.bold}ENGINE 2.0${ANSI.reset}
${ANSI.dim}  ─────────────────────────────────────────────────────────────${ANSI.reset}
  ${ANSI.brightYellow}✦ Decentralized Predictive Context & Zero-Turn Error Cache ✦${ANSI.reset}
  ${ANSI.dim}Walrus Session 7 • Powered by Walrus Protocol & Mysten Labs${ANSI.reset}
`);
  },

  box(title, lines, color = ANSI.brightCyan) {
    const width = 76;
    console.log(`${color}╭── ${ANSI.bold}${title} ${ANSI.reset}${color}${'─'.repeat(Math.max(0, width - title.length - 5))}╮${ANSI.reset}`);
    lines.forEach(l => {
      console.log(`${color}│${ANSI.reset} ${l}`);
    });
    console.log(`${color}╰${'─'.repeat(width)}╯${ANSI.reset}`);
  },

  statPill(label, value, color = ANSI.brightGreen) {
    return `${ANSI.dim}${label}:${ANSI.reset} ${color}${ANSI.bold}${value}${ANSI.reset}`;
  },

  progressBar(percent, width = 20) {
    const p = Math.max(0, Math.min(100, percent));
    const filled = Math.round((p / 100) * width);
    const empty = width - filled;
    return `${ANSI.brightGreen}${'█'.repeat(filled)}${ANSI.dim}${'░'.repeat(empty)}${ANSI.reset} ${ANSI.bold}${p}%${ANSI.reset}`;
  },

  transitionFlow(from, to, prob) {
    return `${ANSI.brightYellow}[${from}]${ANSI.reset} ${ANSI.cyan}──(${ANSI.bold}${Math.round(prob * 100)}%${ANSI.reset}${ANSI.cyan})──►${ANSI.reset} ${ANSI.brightGreen}[${to}]${ANSI.reset}`;
  }
};

module.exports = { ANSI, UI };
