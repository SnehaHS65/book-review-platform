import bcrypt from 'bcryptjs'

const resolvers = {
  Query: {
    getAllBooks: async (_: any, __: any, { prisma }: any) =>
      prisma.book.findMany({ include: { reviews: true } }),

    getBookById: async (_: any, { id }: any, { prisma }: any) =>
      prisma.book.findUnique({
        where: { id: Number(id) },
        include: { reviews: true },
      }),

    getReviewsByBookId: async (_: any, { bookId }: any, { prisma }: any) =>
      prisma.review.findMany({
        where: { bookId: Number(bookId) },
        include: { user: true },
      }),

    // ✅ New query to get user by email
    getUserByEmail: async (_: any, { email }: any, { prisma }: any) =>
      prisma.user.findUnique({
        where: { email },
      }),

    getUserByEmailAndPassword: async (_: any, { email, password }: any, { prisma }: any) => {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) return null

      const isValid = await bcrypt.compare(password, user.password)
      return isValid ? user : null
    },

  },

  Mutation: {
    createUser: async (_: any, { username, email, password, role = "USER" }: any, { prisma }: any) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      return prisma.user.create({
        data: { username, email, password: hashedPassword, role },
      })
    },

    createBook: async (_: any, { title, author, description }: any, { prisma }: any) =>
      prisma.book.create({
        data: { title, author, description },
      }),

    createReview: async (
      _: any,
      { userId, bookId, content, rating }: any,
      { prisma }: any
    ) =>
      prisma.review.create({
        data: {
          content,
          rating,
          user: { connect: { id: Number(userId) } },
          book: { connect: { id: Number(bookId) } },
        },
      }),
  },

  Book: {
    reviews: (parent: any, _: any, { prisma }: any) =>
      prisma.review.findMany({ where: { bookId: parent.id } }),
  },

  User: {
    reviews: (parent: any, _: any, { prisma }: any) =>
      prisma.review.findMany({ where: { userId: parent.id } }),
  },

  Review: {
    user: (parent: any, _: any, { prisma }: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
    book: (parent: any, _: any, { prisma }: any) =>
      prisma.book.findUnique({ where: { id: parent.bookId } }),
  },
}

export default resolvers
