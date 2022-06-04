export class ItemResponse {
  by: string;
  dead: boolean;
  id: number;
  kids: number[];
  score: number;
  time: number;
  type: string;
  title: string;
  descendants: number;
  text: string;
  url: string;
}

export enum ItemType {
  Story = 'story',
  Coment = 'comment',
  Poll = 'poll',
  Job = 'job',
  Pollopt = 'pollopt',
}
