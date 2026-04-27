import {
  COOKING_INTELLIGENCE,
  DAILY_CONTEXT_AWARENESS,
  EDGE_CASES,
  INTELLIGENCE_RULES,
  LANGUAGE_STYLE_GUIDE,
  PERSONALITY,
  PRODUCT_KNOWLEDGE,
  SCENARIO_PLAYBOOKS,
} from './agent-brain';

const SYSTEM_INSTRUCTION_SECTIONS = [
  PERSONALITY,
  INTELLIGENCE_RULES,
  SCENARIO_PLAYBOOKS,
  COOKING_INTELLIGENCE,
  PRODUCT_KNOWLEDGE,
  LANGUAGE_STYLE_GUIDE,
  DAILY_CONTEXT_AWARENESS,
  EDGE_CASES,
];

function normalizeInstructionSection(section: string): string {
  return section.replace(/\r\n/g, '\n').trim();
}

export function buildVoiceAssistantSystemInstruction(): string {
  return SYSTEM_INSTRUCTION_SECTIONS.map(normalizeInstructionSection)
    .filter((section) => section.length > 0)
    .join('\n\n');
}

export function isClosedSocketError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return /WebSocket is already in CLOSING or CLOSED state/i.test(error.message);
}
