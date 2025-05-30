// src/models/models.ts

/** Base User class */
export class User {
  private userId: string;
  private username: string;
  private email: string;
  private passwordHash: string;
  private loggedIn: boolean = false;

  constructor(userId: string, username: string, email: string, passwordHash: string) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  public login(passwordHash: string): boolean {
    if (passwordHash === this.passwordHash) {
      this.loggedIn = true;
      console.log(`${this.username} logged in.`);
      return true;
    }
    console.warn(`Login failed for ${this.username}.`);
    return false;
  }

  public logout(): void {
    this.loggedIn = false;
    console.log(`${this.username} logged out.`);
  }
}

/** Student extends User */
export class Student extends User {
  private studentId: string;
  private degreeProgram: string;
  private preferences: Preferences;

  constructor(
    userId: string,
    username: string,
    email: string,
    passwordHash: string,
    studentId: string,
    degreeProgram: string
  ) {
    super(userId, username, email, passwordHash);
    this.studentId = studentId;
    this.degreeProgram = degreeProgram;
    this.preferences = new Preferences(`${studentId}-prefs`, false, 0, 'normal', 0, 0, false);
  }

  public completeProfile(profile: Partial<{ degreeProgram: string }>): void {
    if (profile.degreeProgram) this.degreeProgram = profile.degreeProgram;
    console.log(`Profile completed for student ${this.studentId}.`);
  }

  public viewListings(listings: Listing[]): Listing[] {
    return listings.filter(l => l.getStatus() === 'published');
  }
}

/** Owner extends User */
export class Owner extends User {
  private ownerId: string;
  private listings: Listing[] = [];

  constructor(
    userId: string,
    username: string,
    email: string,
    passwordHash: string,
    ownerId: string
  ) {
    super(userId, username, email, passwordHash);
    this.ownerId = ownerId;
  }

  public createListing(listing: Listing): Listing {
    this.listings.push(listing);
    console.log(`Listing ${listing.getId()} created by owner ${this.ownerId}.`);
    return listing;
  }

  public viewReviews(): Review[] {
    return this.listings.flatMap(l => l.getReviews());
  }
}

/** Moderator extends User */
export class Moderator extends User {
  private moderatorId: string;

  constructor(
    userId: string,
    username: string,
    email: string,
    passwordHash: string,
    moderatorId: string
  ) {
    super(userId, username, email, passwordHash);
    this.moderatorId = moderatorId;
  }

  public reviewReport(r: Report): void {
    console.log(`Moderator ${this.moderatorId} is reviewing report ${r.getId()}.`);
  }

  public takeAction(r: Report, action: 'approve' | 'reject'): void {
    r.updateStatus(action === 'approve' ? 'approved' : 'rejected');
    console.log(`Report ${r.getId()} ${action}d by moderator ${this.moderatorId}.`);
  }
}

/** Apartment entity */
export class Apartment {
  private apartmentId: string;
  private address: string;
  private rooms: number;
  private floor: number;
  private squareMeters: number;
  private available: boolean = true;

  constructor(
    apartmentId: string,
    address: string,
    rooms: number,
    floor: number,
    squareMeters: number
  ) {
    this.apartmentId = apartmentId;
    this.address = address;
    this.rooms = rooms;
    this.floor = floor;
    this.squareMeters = squareMeters;
  }

  public getAvailability(): boolean {
    return this.available;
  }

  public setAvailability(status: boolean): void {
    this.available = status;
    console.log(`Apartment ${this.apartmentId} availability set to ${status}.`);
  }
}

/** Listing ties to an Apartment */
export class Listing {
  private listingId: string;
  private title: string;
  private description: string;
  private price: number;
  private minStay: number;
  private maxStay: number;
  private images: string[];
  private status: string = 'draft';
  private apartment: Apartment;
  private reviews: Review[] = [];

  constructor(
    listingId: string,
    title: string,
    description: string,
    price: number,
    minStay: number,
    maxStay: number,
    images: string[],
    apartment: Apartment
  ) {
    this.listingId = listingId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.minStay = minStay;
    this.maxStay = maxStay;
    this.images = images;
    this.apartment = apartment;
  }

  public getId(): string {
    return this.listingId;
  }

  public getStatus(): string {
    return this.status;
  }

  public getReviews(): Review[] {
    return this.reviews;
  }

  public publish(): void {
    this.status = 'published';
    console.log(`Listing ${this.listingId} published.`);
  }

  public edit(details: Partial<{ title: string; description: string; price: number }>): void {
    Object.assign(this, details);
    console.log(`Listing ${this.listingId} edited.`);
  }

  public hide(): void {
    this.status = 'hidden';
    console.log(`Listing ${this.listingId} hidden.`);
  }

  public delete(): void {
    this.status = 'deleted';
    console.log(`Listing ${this.listingId} deleted.`);
  }

  public addReview(r: Review): void {
    this.reviews.push(r);
  }
}

/** Roommate entity */
export class Roommate {
  private roommateId: string;
  private joinedAt: Date;

  constructor(roommateId: string, joinedAt: Date) {
    this.roommateId = roommateId;
    this.joinedAt = joinedAt;
  }

  public getStatus(): string {
    const now = new Date();
    return now > this.joinedAt ? 'active' : 'pending';
  }
}

/** Co-living request */
export class CoLivingRequest {
  private requestId: string;
  private status: string;
  private message: string;
  private createdAt: Date;

  constructor(requestId: string, message: string) {
    this.requestId = requestId;
    this.message = message;
    this.createdAt = new Date();
    this.status = 'pending';
  }

  public submit(): void {
    console.log(`Request ${this.requestId} submitted.`);
  }

  public approve(): void {
    this.status = 'approved';
    console.log(`Request ${this.requestId} approved.`);
  }

  public reject(): void {
    this.status = 'rejected';
    console.log(`Request ${this.requestId} rejected.`);
  }

  public getStatus(): string {
    return this.status;
  }
}

/** Co-living agreement */
export class CoLivingAgreement {
  private agreementId: string;
  private terms: string;
  private attachments: Attachment[];
  private status: string;
  private deadline: Date;
  private signedBy: User[] = [];

  constructor(
    agreementId: string,
    terms: string,
    attachments: Attachment[],
    deadline: Date
  ) {
    this.agreementId = agreementId;
    this.terms = terms;
    this.attachments = attachments;
    this.status = 'draft';
    this.deadline = deadline;
  }

  public createDraft(): void {
    this.status = 'draft';
    console.log(`Agreement ${this.agreementId} set to draft.`);
  }

  public sendForSignatures(): void {
    this.status = 'pending_signatures';
    console.log(`Agreement ${this.agreementId} sent for signatures.`);
  }

  public sign(u: User): void {
    this.signedBy.push(u);
    console.log(`User ${u['userId']} signed agreement ${this.agreementId}.`);
    if (this.signedBy.length > 0) this.status = 'active';
  }

  public cancel(): void {
    this.status = 'cancelled';
    console.log(`Agreement ${this.agreementId} cancelled.`);
  }
}

/** Expense item */
export class Expense {
  private expenseId: string;
  private type: string;
  private amount: number;
  private dueDate: Date;
  private splitMethod: string;
  private creator: User;

  constructor(
    expenseId: string,
    type: string,
    amount: number,
    dueDate: Date,
    splitMethod: string,
    creator: User
  ) {
    this.expenseId = expenseId;
    this.type = type;
    this.amount = amount;
    this.dueDate = dueDate;
    this.splitMethod = splitMethod;
    this.creator = creator;
  }

  public calculateShare(roommates: Roommate[]): number {
    if (this.splitMethod === 'equal' && roommates.length) {
      return this.amount / roommates.length;
    }
    return this.amount;
  }

  public confirmPayment(r: Roommate): void {
    console.log(`Expense ${this.expenseId} payment confirmed by roommate ${r['roommateId']}.`);
  }
}

/** Expense board */
export class ExpenseBoard {
  private boardId: string;
  private expenses: Expense[] = [];

  constructor(boardId: string) {
    this.boardId = boardId;
  }

  public addExpense(e: Expense): void {
    this.expenses.push(e);
    console.log(`Expense ${e['expenseId']} added to board ${this.boardId}.`);
  }

  public getSummary(): Record<string, number> {
    return this.expenses.reduce((acc, e) => {
      acc[e['type']] = (acc[e['type']] || 0) + e['amount'];
      return acc;
    }, {} as Record<string, number>);
  }
}

/** Review entity */
export class Review {
  private reviewId: string;
  private rating: number;
  private comment: string;
  private date: Date;
  private flagged: boolean = false;
  private responses: string[] = [];

  constructor(reviewId: string, rating: number, comment: string, date: Date) {
    this.reviewId = reviewId;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
  }

  public addResponse(resp: string): void {
    this.responses.push(resp);
    console.log(`Response added to review ${this.reviewId}.`);
  }

  public flag(): void {
    this.flagged = true;
    console.log(`Review ${this.reviewId} flagged.`);
  }

  public getId(): string {
    return this.reviewId;
  }
}

/** Report entity */
export class Report {
  private reportId: string;
  private reason: string;
  private description: string;
  private attachments: Attachment[];
  private status: string;

  constructor(
    reportId: string,
    reason: string,
    description: string,
    attachments: Attachment[]
  ) {
    this.reportId = reportId;
    this.reason = reason;
    this.description = description;
    this.attachments = attachments;
    this.status = 'submitted';
  }

  public submit(): void {
    this.status = 'submitted';
    console.log(`Report ${this.reportId} submitted.`);
  }

  public updateStatus(newStatus: string): void {
    this.status = newStatus;
    console.log(`Report ${this.reportId} status updated to ${newStatus}.`);
  }

  public getId(): string {
    return this.reportId;
  }
}

/** GeoLocation helper */
export class GeoLocation {
  private latitude: number;
  private longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public static geocode(address: string): GeoLocation {
    console.log(`Geocoding address: ${address}`);
    return new GeoLocation(0, 0);
  }
}

/** User preferences */
export class Preferences {
  private prefId: string;
  private smoking: boolean;
  private cleanliness: number;
  private sleepSchedule: string;
  private studyHabit: number;
  private socialActivity: number;
  private petsAllowed: boolean;

  constructor(
    prefId: string,
    smoking: boolean,
    cleanliness: number,
    sleepSchedule: string,
    studyHabit: number,
    socialActivity: number,
    petsAllowed: boolean
  ) {
    this.prefId = prefId;
    this.smoking = smoking;
    this.cleanliness = cleanliness;
    this.sleepSchedule = sleepSchedule;
    this.studyHabit = studyHabit;
    this.socialActivity = socialActivity;
    this.petsAllowed = petsAllowed;
  }

  public update(updates: Partial<Omit<Preferences, 'prefId'>>): void {
    Object.assign(this, updates);
    console.log(`Preferences ${this.prefId} updated.`);
  }
}

/** Compatibility calculator */
export class Compatibility {
  private compatId: string;
  private score: number;
  private details: Record<string, number>;

  constructor(compatId: string, details: Record<string, number>) {
    this.compatId = compatId;
    this.details = details;
    this.score = 0;
  }

  public calculate(): void {
    const vals = Object.values(this.details);
    this.score = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
    console.log(`Compatibility ${this.compatId} calculated: score=${this.score}.`);
  }

  public save(): void {
    console.log(`Compatibility ${this.compatId} saved.`);
  }
}

/** Notification entity */
export class Notification {
  private notificationId: string;
  private content: string;
  private read: boolean = false;

  constructor(notificationId: string, content: string) {
    this.notificationId = notificationId;
    this.content = content;
  }

  public send(recipient: User): void {
    console.log(`Notification ${this.notificationId} sent to ${recipient['username']}.`);
  }

  public markRead(): void {
    this.read = true;
    console.log(`Notification ${this.notificationId} marked as read.`);
  }
}


/** Message entity */
export class Message {
  private messageId: string;
  private content: string;
  private timestamp: Date;
  private sender: User;
  private recipient: User;

  constructor(messageId: string, content: string, sender: User, recipient: User) {
    this.messageId = messageId;
    this.content = content;
    this.timestamp = new Date();
    this.sender = sender;
    this.recipient = recipient;
  }

  public send(): void {
    console.log(`Message ${this.messageId} sent from ${this.sender['username']} to ${this.recipient['username']}.`);
  }
}

/** Attachment entity */
export class Attachment {
  private attachmentId: string;
  private filename: string;
  private url: string;
  private type: string;

  constructor(attachmentId: string, filename: string, url: string, type: string) {
    this.attachmentId = attachmentId;
    this.filename = filename;
    this.url = url;
    this.type = type;
  }

  public download(): void {
    console.log(`Attachment ${this.attachmentId} downloading from ${this.url}.`);
  }
}

/** PaymentTransaction entity */
export class PaymentTransaction {
  private transactionId: string;
  private amount: number;
  private date: Date;
  private method: string;
  private status: string;

  constructor(transactionId: string, amount: number, method: string) {
    this.transactionId = transactionId;
    this.amount = amount;
    this.method = method;
    this.date = new Date();
    this.status = 'pending';
  }

  public process(): void {
    this.status = 'processed';
    console.log(`Transaction ${this.transactionId} processed.`);
  }

  public refund(): void {
    this.status = 'refunded';
    console.log(`Transaction ${this.transactionId} refunded.`);
  }
}

/** AuthSession entity */
export class AuthSession {
  private sessionId: string;
  private createdAt: Date;
  private expiresAt: Date;

  constructor(sessionId: string, ttlHours: number) {
    this.sessionId = sessionId;
    this.createdAt = new Date();
    this.expiresAt = new Date(this.createdAt.getTime() + ttlHours * 3600000);
  }

  public validate(): boolean {
    const valid = new Date() < this.expiresAt;
    console.log(`Session ${this.sessionId} valid: ${valid}.`);
    return valid;
  }

  public invalidate(): void {
    this.expiresAt = new Date();
    console.log(`Session ${this.sessionId} invalidated.`);
  }
}

/** Bookmark entity */
export class Bookmark {
  private bookmarkId: string;

  constructor(bookmarkId: string) {
    this.bookmarkId = bookmarkId;
  }

  public add(): void {
    console.log(`Bookmark ${this.bookmarkId} added.`);
  }

  public remove(): void {
    console.log(`Bookmark ${this.bookmarkId} removed.`);
  }
}

/** ChatConversation entity */
export class ChatConversation {
  private conversationId: string;
  private participants: User[];
  private messages: Message[] = [];

  constructor(conversationId: string, participants: User[]) {
    this.conversationId = conversationId;
    this.participants = participants;
  }

  public start(): void {
    console.log(`Conversation ${this.conversationId} started with participants ${this.participants.map(u => u['username']).join(', ')}.`);
  }

  public close(): void {
    console.log(`Conversation ${this.conversationId} closed.`);
  }

  public addMessage(msg: Message): void {
    this.messages.push(msg);
    console.log(`Message ${msg['messageId']} added to conversation ${this.conversationId}.`);
  }
}

/** Survey entity */
export class Survey {
  private surveyId: string;
  private title: string;
  private questions: string[];
  private active: boolean = false;

  constructor(surveyId: string, title: string, questions: string[]) {
    this.surveyId = surveyId;
    this.title = title;
    this.questions = questions;
  }

  public activate(): void {
    this.active = true;
    console.log(`Survey ${this.surveyId} activated.`);
  }

  public deactivate(): void {
    this.active = false;
    console.log(`Survey ${this.surveyId} deactivated.`);
  }
}

/** SurveyResponse entity */
export class SurveyResponse {
  private responseId: string;
  private answers: Record<string, string>;
  private submittedAt: Date;
  private student: Student;

  constructor(responseId: string, answers: Record<string, string>, student: Student) {
    this.responseId = responseId;
    this.answers = answers;
    this.student = student;
    this.submittedAt = new Date();
  }

  public submit(): void {
    console.log(`Response ${this.responseId} submitted by student ${this.student['username']}.`);
  }
}

export class PaymentMethod {
  methodId: string;
  type: string;
  details: Record<string, string>;
  authorized = false;

  constructor(methodId: string, type: string, details: Record<string, string>) {
    this.methodId = methodId;
    this.type = type;
    this.details = details;
  }

  authorize(): boolean {
    console.log(`Authorizing payment method ${this.methodId}`);
    this.authorized = true;
    return this.authorized;
  }

  revoke(): void {
    console.log(`Revoking payment method ${this.methodId}`);
    this.authorized = false;
  }
}

export class Invoice {
  invoiceId: string;
  issueDate: Date;
  totalAmount: number;
  expenses: Expense[];
  sent = false;

  constructor(
    invoiceId: string,
    issueDate: Date,
    totalAmount: number,
    expenses: Expense[] = []
  ) {
    this.invoiceId = invoiceId;
    this.issueDate = issueDate;
    this.totalAmount = totalAmount;
    this.expenses = expenses;
  }

  generatePDF(): string {
    console.log(`Generating PDF for invoice ${this.invoiceId}`);
    // stubbed PDF content
    return `PDF_CONTENT_FOR_${this.invoiceId}`;
  }

  send(): void {
    console.log(`Sending invoice ${this.invoiceId} for amount ${this.totalAmount}`);
    this.sent = true;
  }
}

export class LeaseContract {
  contractId: string;
  startDate: Date;
  endDate: Date;
  terms: string;
  isSigned = false;
  isActive = false;

  constructor(contractId: string, startDate: Date, endDate: Date, terms: string) {
    this.contractId = contractId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.terms = terms;
  }

  sign(): void {
    console.log(`Signing contract ${this.contractId}`);
    this.isSigned = true;
    this.isActive = true;
  }

  terminate(): void {
    console.log(`Terminating contract ${this.contractId}`);
    this.isActive = false;
  }
}

export class NotificationSetting {
  settingId: string;
  emailAlerts: boolean;
  pushAlerts: boolean;

  constructor(settingId: string, emailAlerts = true, pushAlerts = true) {
    this.settingId = settingId;
    this.emailAlerts = emailAlerts;
    this.pushAlerts = pushAlerts;
  }

  updatePreferences(emailAlerts: boolean, pushAlerts: boolean): void {
    console.log(`Updating notification settings ${this.settingId}`);
    this.emailAlerts = emailAlerts;
    this.pushAlerts = pushAlerts;
  }
}

export class AuditLog {
  logId: string;
  action: string;
  timestamp: Date;
  performedBy: User;

  // In-memory store for audit entries
  private static logs: AuditLog[] = [];

  constructor(logId: string, action: string, timestamp: Date, performedBy: User) {
    this.logId = logId;
    this.action = action;
    this.timestamp = timestamp;
    this.performedBy = performedBy;
  }

  record(): void {
    AuditLog.logs.push(this);
  }

  // Helper to retrieve all logs
  static getAll(): AuditLog[] {
    return [...AuditLog.logs];
  }
}