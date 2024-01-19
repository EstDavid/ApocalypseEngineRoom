interface Move {
  _id:string,
  name:string,
  system:string,
  playbook:string,
  description:string,
  isAvailable:boolean,
  isRoll: boolean,
  mod?: string | number
}

export default Move;