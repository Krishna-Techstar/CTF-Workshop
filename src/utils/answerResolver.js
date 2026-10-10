import { IS_PARTICIPANT } from './mode';

let answersMap = {};
const listeners = new Set();

if (!IS_PARTICIPANT) {
  import('../content/answers.js').then((mod) => {
    answersMap = mod.ANSWERS || {};
    listeners.forEach((fn) => fn());
  }).catch(() => {});
}

export function subscribeAnswers(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getAnswer(id) {
  if (IS_PARTICIPANT) return null;
  return answersMap[id] || null;
}

export function resolveFlagPlaceholder(id) {
  if (IS_PARTICIPANT) {
    return 'flag{...}';
  }
  return answersMap[id] || 'flag{...}';
}
