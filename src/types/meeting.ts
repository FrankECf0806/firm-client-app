export interface Meeting {
  id: string;
  caseId: string;
  date: string;
  type: "call" | "meeting" | "email" | "hearing";
  summary: string;
  duration: string;
}

export interface ScheduledMeeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: "call" | "meeting" | "hearing";
  hasVideoLink: boolean;
}
