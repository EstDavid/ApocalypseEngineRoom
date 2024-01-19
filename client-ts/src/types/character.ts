interface Character {
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

export default Character;