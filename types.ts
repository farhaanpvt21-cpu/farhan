
export enum ToolType {
  LESSON_PLAN = 'lesson-plan',
  QUESTION_PAPER = 'question-paper',
  NOTES = 'notes',
  HOMEWORK = 'homework',
  FEEDBACK = 'feedback',
  ATTENDANCE = 'attendance'
}

export interface StudentAttendance {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceInsights {
  summary: string;
  notifications: {
    studentName: string;
    draftEmail: string;
  }[];
}

export interface TeacherProfile {
  name: string;
  subject: string;
  level: string;
  email: string;
}

export interface ToolHistory {
  id: string;
  type: ToolType;
  title: string;
  date: string;
  content: string;
}

export interface LessonPlanOutput {
  objectives: string[];
  activities: string[];
  teachingMethod: string;
  assessment: string;
}

export interface QuestionPaperOutput {
  title: string;
  instructions: string;
  questions: {
    number: number;
    text: string;
    marks: number;
    type: string;
  }[];
}
