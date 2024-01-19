export interface Move {
  _id:string,
  name:string,
  system:string,
  playbook:string,
  description:string,
  isAvailable:boolean,
  isRoll: boolean,
  mod?: string | number
}

export interface User {
  name: string;
  password: string;
  _id:string,
}

export interface Character {
  name: string,
  system: string,
  playbook:string,
  charDescription:string,
  moves: [
    {isAvailable: boolean,
    _id:string,}
  ],
  trackers: [
    {
      value: [
        {index:number,
        value: boolean}
      ] | '',
      _id:string,
    }
  ],
  stats: [
    {
      name:string,
      value:number,
    },
  ],
  owner:string,
  notes:string,
}