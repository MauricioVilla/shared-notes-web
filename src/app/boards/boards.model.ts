export class BoardModel {
  title: String;
  description: String;
  type: String;
  created_by: String;
}

export class IdeaModel {
  board: String;
  description: String;
  created_by: String;
  approved: boolean;
}
