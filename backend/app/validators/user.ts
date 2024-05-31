import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    password: vine.string(),
    email: vine
      .string()
      .email()
      .normalizeEmail({
        all_lowercase: true,
      })
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    password: vine.string(),
    email: vine.string().email().normalizeEmail(),
  })
)
