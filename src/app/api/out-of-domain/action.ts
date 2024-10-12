"use server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function checkDomain(
  query: string,
  model: string,
  domain: string
) {
  try {
    if (!BACKEND_URL) {
      throw new Error("BACKEND_URL is not defined in environment variables");
    }

    const response = await fetch(`${BACKEND_URL}/check_domain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        model,
        domain,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Optionally revalidate the path if needed
    // revalidatePath('/some-path')

    return data;
  } catch (error) {
    console.error("Error in domain checking:", error);
    throw new Error("Internal Server Error");
  }
}
