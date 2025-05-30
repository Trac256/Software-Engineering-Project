import { Report, Attachment, Student, Listing, User } from '../models';

export class ReportService {
  private reports = new Map<string, Report>();

  submitReport(
    reportId: string,
    reporter: Student,
    listing: Listing | null,
    user: User | null,
    reason: string,
    description: string,
    attachments: Attachment[] = []
  ): Report {
    const r = new Report(reportId, reason, description, attachments, 'pending');
    r.submit();
    r.reporter = reporter;
    if (listing) r.targetListing = listing;
    if (user) r.targetUser = user;
    this.reports.set(r.reportId, r);
    return r;
  }

  updateStatus(reportId: string, status: string): void {
    const r = this.get(reportId);
    r.updateStatus(status);
  }

  getByStatus(status: string): Report[] {
    return Array.from(this.reports.values()).filter(r => r.status === status);
  }

  getForListing(listingId: string): Report[] {
    return Array.from(this.reports.values()).filter(r => r.targetListing?.listingId === listingId);
  }

  getForUser(userId: string): Report[] {
    return Array.from(this.reports.values()).filter(r => r.targetUser?.userId === userId);
  }

  private get(reportId: string): Report {
    const r = this.reports.get(reportId);
    if (!r) throw new Error('Report not found');
    return r;
  }
}
