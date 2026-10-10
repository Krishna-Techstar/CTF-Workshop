import { IS_PARTICIPANT } from './mode';

let answersMap = {};

if (!IS_PARTICIPANT) {
  import('../content/answers.js').then((mod) => {
    answersMap = mod.ANSWERS;
  }).catch(() => {});
}

export function getAnswer(id) {
  if (IS_PARTICIPANT) return null;
  return answersMap[id] || null;
}

export function resolveFlagPlaceholder(id) {
  if (IS_PARTICIPANT) {
    return 'flag{...}';
  }
  return answersMap[id] || `flag{${id}}`;
}
