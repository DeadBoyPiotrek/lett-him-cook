import { Prisma } from '@prisma/client';

// save the text to the database using prisma client route
export default async function handler(req, res) {
  const { text } = req.body;
}
