import { IAddUserRepository, ICheckUserByEmail } from '@/domain/contracts/user'
import { User, validEmail } from '@/domain/entities'
import { ExistingUserError, InvalidApiTokenError, InvalidEmailError, InvalidGenderError, InvalidStatusError, ManyRequestsError } from '@/domain/errors'
import { Either, left, right } from '@/shared/either'

type Setup = (userRepo: IAddUserRepository & ICheckUserByEmail) => AddUser
type Input = Omit<User, 'id'> & { apiToken: string }
type Output = Either<InvalidEmailError |
InvalidGenderError |
ManyRequestsError |
InvalidApiTokenError |
ExistingUserError, User>
export type AddUser = (input: Input) => Promise<Output>

export const setupAddUser: Setup = (userRepo) => async ({ name, email, gender, status, apiToken }) => {
  const existingUser = !(await userRepo.checkByEmail({ email, apiToken }))
  if (existingUser) return left(new ExistingUserError(email))
  if (gender !== 'female' && gender !== 'male') {
    return left(new InvalidGenderError(gender))
  }
  if (status !== 'active' && status !== 'inactive') {
    return left(new InvalidStatusError(status))
  }
  const emailIsValid = validEmail(email)
  if (!emailIsValid) return left(new InvalidEmailError(email))
  const userOrError = await userRepo.add({ name, email, gender, status, apiToken })
  return userOrError.isLeft() ? left(userOrError.value) : right(userOrError.value)
}
