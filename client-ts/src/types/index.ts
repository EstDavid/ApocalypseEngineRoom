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
  _id:string,
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

export interface Playbook {
  _id:string,
  name:string,
  systemName:string,
  available_at:string,
  madeBy:string,
  statOptionsText:string,
  movesText:string,
  playingThis:[string],
  description:[string],
  statsOptions:[
    [
      {
        name:string,
        value:number,
      }
    ]
  ]
}

export type LoginIssue = string

export type LoginFunc = (username: string, password:string) => void
export type SignupFunc = (username: string, password:string) => void


export interface Tracker {
  _id:string,
  name: string,
  system:string,
  playbook:string,
  description:string,
  type:string,
  value: [
    {
      index:number,
      value:boolean,
      text?:string,
    }
  ] | ''
}