/**
 * The base URL for the client API.
 * @constant
 */
export const baseUrl = process.env.NEXT_PUBLIC_BASEURL

/**
 * The base URL for the admin API.
 * @constant
 */
export const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_BASEURL

/**
 * The milliseconds per minute.
 * @constant
 */
const MILLSECONDS_PER_MINUTE = 60000

/**
 * The time in milliseconds that the access token expires.
 * @constant
 */
export const ACCESS_TOKEN_EXPIRE_TIME = 30 * MILLSECONDS_PER_MINUTE

/**
 * The meta base URL for open graph and twitter card.
 * @constant
 */
export const metaBaseUrl = process.env.VERCEL_URL || process.env.NEXT_URL
