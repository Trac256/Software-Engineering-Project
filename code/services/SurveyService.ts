import { Survey, SurveyResponse, Student } from '../models';

export class SurveyService {
  private surveys = new Map<string, Survey>();
  private responses = new Map<string, SurveyResponse[]>();

  createSurvey(id: string, title: string, questions: string[]): Survey {
    const s = new Survey(id, title, questions);
    this.surveys.set(id, s);
    this.responses.set(id, []);
    return s;
  }

  activate(id: string): void {
    const s = this.surveys.get(id);
    if (!s) throw new Error('Survey not found');
    s.activate();
  }

  deactivate(id: string): void {
    const s = this.surveys.get(id);
    if (!s) throw new Error('Survey not found');
    s.deactivate();
  }

  submitResponse(
    surveyId: string,
    responseId: string,
    student: Student,
    answers: Record<string,string>
  ): SurveyResponse {
    const s = this.surveys.get(surveyId);
    if (!s) throw new Error('Survey not found');
    const r = new SurveyResponse(responseId, answers, new Date());
    r.submit();
    r.student = student;
    this.responses.get(surveyId)!.push(r);
    return r;
  }

  getResponses(surveyId: string): SurveyResponse[] {
    return this.responses.get(surveyId) || [];
  }
}
