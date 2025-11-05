import { FlowSchema } from "@/types/schema";

// SAVE SCHEMA

export async function saveSchema(schema: FlowSchema, name: string) {
  try {
    const response = await fetch("/api/schemas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        schema,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to save schema:", error);
    throw error;
  }
}

// LOAD SCHEMA

export async function loadSchema(schemaId: string): Promise<FlowSchema> {
  try {
    const response = await fetch(`/api/schemas/${schemaId}`);

    if (!response.ok) {
      throw new Error("Failed to load schema");
    }

    const data = await response.json();
    return data.schema;
  } catch (error) {
    console.error("Failed to load schema:", error);
    throw error;
  }
}

export async function getUserSchemas() {
  try {
    const response = await fetch("/api/schemas");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch schemas:", error);
    throw error;
  }
}
