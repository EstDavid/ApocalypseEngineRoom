export interface Move {
  _id: string,
  name: string,
  system: string,
  playbook: string,
  description: string,
  isAvailable: boolean,
  isRoll: boolean,
  mod?: string | number,
  isModAdded?: boolean,
}

export interface User {
  name: string;
  password: string;
  _id: string,
}

export interface Character {
  _id: string,
  name: string,
  system: string,
  playbook: string,
  charDescription: string,
  moves: [
    {
      isAvailable: boolean,
      _id: string,
    }
  ],
  trackers: [
    {
      value: [
        {
          index: number,
          value: boolean
        }
      ] | '',
      _id: string,
    }
  ],
  stats: [
    {
      name: string,
      value: number,
    },
  ],
  owner: string,
  notes: string,
}

export interface Stat {
  name: string,
  value: number,
}

export interface Playbook {
  _id: string,
  name: string,
  systemName: string,
  available_at: string,
  madeBy: string,
  statOptionsText: string,
  movesText: string,
  playingThis: [string],
  description: [string],
  statsOptions: [
    [
      Stat
    ]
  ]
}
export interface ITracker {
  _id: string,
  name: string,
  system: string,
  playbook: string,
  description: string,
  type: string,
  value: [
    {
      index: number,
      value: string,
      text?: string,
    }
  ] | string | ''
}

// Function interfaces
//Login
export type LoginIssue = string

export type ILogin = (username: string, password: string) => void
export type ISignup = (username: string, password: string) => void

//Charsheet

export type IUpdateTextArea = (newText: string, fieldName: string) => void;
export type IUpdateStat = (statName:string, newVal:number) => void;
export type IUpdateTextTracker = (trackerName:string, newText:string) => void;