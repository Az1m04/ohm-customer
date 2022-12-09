export interface TimeEntriesOutput {
  logEnteries: number;
  projects?: null[];
  totalTime: string;
  resources?: ResourcesEntity[];
  responseMessage: string;
  searchResults?: SearchResultsEntity[];
  events?: EventsEntity[];
  totalTimeInMillis: number;
}
export interface ResourcesEntity {
  name: string;
  id: string;
  category: Category;
}
export interface Category {
  color: Color;
  name: string;
  parentCategoryId: string;
  categoryName: string;
}
export interface Color {
  backgroundColor: string;
  foregroundColor: string;
  id: string;
}
export interface SearchResultsEntity {
  parentTaskId: string;
  ownerId: string;
  workLogDate: string;
  billable: boolean;
  timesheetId: string;
  workInMilliSec: number;
  createdBy: CreatedBy;
  typeId: string;
  taskName: string;
  category: Category;
  taskId: string;
  startDate: string;
  loggedForId: string;
}
export interface CreatedBy {
  photoUrl: string;
  displayName: string;
  self: boolean;
  id: string;
  email: string;
}
export interface EventsEntity {
  resourceId: string;
  movable: boolean;
  resizable: boolean;
  start: string;
  end: string;
  id: string;
  title: string;
  showPopover: boolean;
}
