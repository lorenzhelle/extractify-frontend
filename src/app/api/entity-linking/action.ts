"use server";

import { LLMModel } from "@/app/(index)/lib/constants";

const BACKEND_URL = process.env.BACKEND_URL;

export async function entityLinking(
  message: string,
  schema: string,
  model: LLMModel,
  domainDefinition?: string
) {
  try {
    if (!BACKEND_URL) {
      throw new Error("BACKEND_URL is not defined in environment variables");
    }

    const response = await fetch(`${BACKEND_URL}/entity-linking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        message,
        schema,
        model,
        domain_definition: domainDefinition || undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in entity linking:", error);
    throw new Error("Internal Server Error");
  }
}
