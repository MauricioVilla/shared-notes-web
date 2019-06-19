export class BoardModel {
  title: string;
  description: string;
  type: string;
  created_by: string;
}

export class IdeaModel {
  board: string;
  description: string;
  created_by: string;
  approved: string;
}
