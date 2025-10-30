const TICKETS_KEY = "ticketapp_tickets"

// Simulate network delay
const DELAY = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms))

// Load from localStorage
function load() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]")
  } catch {
    return []
  }
}

// Save to localStorage
function save(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}

export const ticketService = {
  // 🟢 Get all tickets (sorted newest first)
  async getTickets() {
    await DELAY()
    return load().sort((a, b) => b.createdAt - a.createdAt)
  },

  // 🟢 Create new ticket
  async createTicket(payload) {
    await DELAY()
    const tickets = load()
    const newTicket = {
      ...payload,
      id: String(Date.now()),
      createdAt: Date.now(),
      status: payload.status || "open",
    }
    tickets.push(newTicket)
    save(tickets)
    return newTicket
  },

  // 🟡 Update existing ticket
  async updateTicket(id, payload) {
    await DELAY()
    const tickets = load()
    const index = tickets.findIndex(t => t.id === id)
    if (index === -1) throw new Error("Ticket not found")
    tickets[index] = { ...tickets[index], ...payload }
    save(tickets)
    return tickets[index]
  },

  // 🔴 Delete a ticket
  async deleteTicket(id) {
    await DELAY()
    let tickets = load()
    tickets = tickets.filter(t => t.id !== id)
    save(tickets)
    return true
  },
}

export default ticketService
