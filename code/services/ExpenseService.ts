import { ExpenseBoard, Expense, Roommate, Invoice } from '../models';

export class ExpenseService {
  private boards = new Map<string, ExpenseBoard>();

  /** Creates or retrieves the board for a given apartment */
  getBoard(boardId: string): ExpenseBoard {
    let b = this.boards.get(boardId);
    if (!b) {
      b = new ExpenseBoard(boardId);
      this.boards.set(boardId, b);
    }
    return b;
  }

  /** Add a new expense to the board */
  addExpense(boardId: string, e: Expense): void {
    const board = this.getBoard(boardId);
    board.addExpense(e);
    console.log(`Expense ${e.expenseId} added to board ${boardId}`);
  }

  /** Calculate how much each roommate owes */
  calculateShares(boardId: string): Record<string, number> {
    const board = this.getBoard(boardId);
    const summary = board.getSummary();
    console.log(`Expense summary for board ${boardId}:`, summary);
    return summary;
  }

  /** Confirm that a roommate has paid their share */
  confirmPayment(boardId: string, roommate: Roommate): void {
    const board = this.getBoard(boardId);
    // find the expense and confirm
    interface IExpense {
        expenseId: string;
        calculateShare: (roommate: IRoommate) => number;
        confirmPayment: (roommate: IRoommate) => void;
    }

    interface IRoommate {
        roommateId: string;
    }

    board.expenses.forEach((e: IExpense): void => {
        const share: number = e.calculateShare(roommate);
        e.confirmPayment(roommate);
        console.log(`Confirmed ${roommate.roommateId} paid ${share} for expense ${e.expenseId}`);
    });
  }

  /** Optionally, generate an invoice for unpaid amounts */
  generateInvoice(boardId: string, invoiceId: string, date: Date): Invoice {
    const board = this.getBoard(boardId);
    const total = board.getSummary();
    const sumAll = (Object.values(total) as number[]).reduce((a, b) => a + b, 0);
    const inv = new Invoice(invoiceId, date, sumAll, board.expenses);
    console.log(`Invoice ${invoiceId} generated for board ${boardId}`);
    return inv;
  }
}
