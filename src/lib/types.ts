export interface ReportInput {
  courseName: string;
  experimentName: string;
  experimentSteps: string;
}

export interface ReportOutput {
  purpose: string;
  principle: string;
  steps: string;
  summary: string;
}

export interface GenerateState {
  success: boolean;
  data?: ReportOutput;
  error?: string;
}
