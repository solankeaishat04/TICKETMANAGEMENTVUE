/**
 * @typedef {"open" | "in_progress" | "closed"} TicketStatus
 */

/**
 * @typedef {Object} Ticket
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {TicketStatus} status
 * @property {string} [priority]
 * @property {string} createdAt
 */