/** Client Node per la Skillplate External API. */

export {
  DEFAULT_BASE_URL,
  DEFAULT_TOKEN_PATH,
  SkillplateClient,
  encodeParams,
  groups,
  items,
  pagination,
  resolveToken,
} from "./client.js";
export { MissingTokenError, RateLimitError, SkillplateError } from "./errors.js";
export * as webhooks from "./webhooks.js";
