export interface NewCharacter {
  name: string,
  system: string,
  playbook: string,
  stats: [
    {
      name: string,
      value: number,
    },
  ];
}