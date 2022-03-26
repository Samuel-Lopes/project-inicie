export interface ICheckUserByEmail {
  checkByEmail: (input: ICheckUserByEmail.Input) => Promise<ICheckUserByEmail.Output>
}

export namespace ICheckUserByEmail {
  export type Input = { email: string, apiToken: string }
  export type Output = boolean
}
