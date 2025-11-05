// pages/api/schemas/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqCookies = await cookies();
  const session = reqCookies.get("session");

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Get user's schemas
    const schemas = await prisma.schema.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    });
    return res.json(schemas);
  }

  if (req.method === "POST") {
    // Save new schema
    const { name, schema } = req.body;

    const savedSchema = await prisma.schema.create({
      data: {
        name,
        schema: JSON.parse(JSON.stringify(schema)), // Ensure serialization
        userId: session.user.id,
      },
    });

    return res.json(savedSchema);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
