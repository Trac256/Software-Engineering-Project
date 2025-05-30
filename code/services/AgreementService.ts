import { CoLivingAgreement, Attachment, Roommate, Apartment } from '../models';

export class AgreementService {
  private agreements = new Map<string, CoLivingAgreement>();

  createDraft(
    agreementId: string,
    apartment: Apartment,
    terms: string,
    attachments: Attachment[],
    deadline: Date
  ): CoLivingAgreement {
    const a = new CoLivingAgreement(
      agreementId,
      terms,
      attachments,
      'draft',
      deadline
    );
    a.createDraft();
    a.apartment = apartment;
    this.agreements.set(a.agreementId, a);
    return a;
  }

  sendForSignatures(agreementId: string): void {
    const a = this.get(agreementId);
    a.sendForSignatures();
  }

  sign(agreementId: string, roommate: Roommate): void {
    const a = this.get(agreementId);
    a.sign(roommate as any);  // model expects User, but roommates sign too
  }

  cancel(agreementId: string): void {
    const a = this.get(agreementId);
    a.cancel();
  }

  get(agreementId: string): CoLivingAgreement {
    const a = this.agreements.get(agreementId);
    if (!a) throw new Error('Agreement not found');
    return a;
  }
}
