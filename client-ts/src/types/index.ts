import { ReactElement } from 'react';

export interface IMove {
  _id: string;
  name: string;
  system: string;
  playbook: string;
  description: string;
  isAvailable: boolean;
  isRoll: boolean;
  mod?: string | number;
  isModAdded?: boolean;
}

export interface User {
  name: string;
  password: string;
  _id: string;
}

export interface ICharacter {
  _id: string;
  name: string;
  system: string;
  playbook: string;
  charDescription: string;
  moves: [
    {
      isAvailable: boolean;
      _id: string;
    }
  ],
  trackers: [
    {
      value: [
        {
          index: number;
          value: boolean;
        }
      ] | '',
      _id: string;
    }
  ],
  stats: [
    {
      name: string;
      value: number;
    },
  ],
  owner: string;
  notes: string;
}

export interface ICharInfo {
  name: string;
  systemName: string;
  available_at: string;
  madeBy: string;
  playbook: string;
  charDescription: string;
  playingThis: [string];
  playbookDescription: [string];
  movesText: string;
  notes: string;
  fieldName: string;
}

export interface Stat {
  name: string;
  value: number;
}

export interface Playbook {
  _id: string;
  name: string;
  systemName: string;
  available_at: string;
  madeBy: string;
  statOptionsText: string;
  movesText: string;
  playingThis: [string];
  description: [string];
  statsOptions: [
    [
      Stat
    ]
  ];
}

export interface ITrackerValueObj {
  index: number;
  value: boolean;
  text?: string;
}



export interface ITracker<T> {
  _id: string;
  name: string;
  system: string;
  playbook: string;
  description: string;
  type: 'horizontal' | 'vertical' | 'text';
  value: T;
}

// Function interfaces
//Login
export type LoginIssue = string;

export type ILogin = (username: string, password: string) => void;
export type ISignup = (username: string, password: string) => void;

//Charsheet

export type IUpdateTextArea = (newText: string, fieldName: string) => void;
export type IUpdateStat = (statName: string, newVal: number) => void;
export type IUpdateTextTracker = (trackerName: string, newText: string) => void;
export type IUpdateCheckboxTracker = (trackerName: string, changedIndex: number) => void;
export type ITextTracker = (tracker: ITracker<string>, handler: IUpdateTextTracker) => ReactElement;
export type ILineTracker = (tracker: ITracker<ITrackerValueObj[] | string>, handler: IUpdateCheckboxTracker) => void;
export type IRollDice = (baseroll: string, rollMod: number) => void;
export type IRemoveRoll = (rollIndex: number) => void;
export type IToggleMoveAvailable = (toggledMove: IMove) => void;
export type IToggleMoveAddMod = (toggledMove: IMove) => void;

export interface ITrackerHandlers {
  updateCheckboxTracker: IUpdateCheckboxTracker,
  updateTextTracker: IUpdateTextTracker;
}