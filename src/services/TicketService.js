const TICKETS_KEY = "ticketapp_tickets";

const DELAY = (ms = 400) => new Promise(r => setTimeout(r, ms));

function load() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export const ticketService = {
  async getTickets() {
    await DELAY();
    return load().sort((a, b) => b.createdAt - a.createdAt);
  },

  async createTicket(payload) {
    await DELAY();
    const tickets = load();
    const t = { ...payload, id: String(Date.now()), createdAt: Date.now() };
    tickets.push(t);
    save(tickets);
    return t;
  },

  async updateTicket(id, payload) {
    await DELAY();
    const tickets = load();
    const i = tickets.findIndex(t => t.id === id);
    if (i === -1) throw new Error("Ticket not found");
    tickets[i] = { ...tickets[i], ...payload };
    save(tickets);
    return tickets[i];
  },

  async deleteTicket(id) {
    await DELAY();
    let tickets = load();
    tickets = tickets.filter(t => t.id !== id);
    save(tickets);
    return true;
  }
};
export default ticketService;
