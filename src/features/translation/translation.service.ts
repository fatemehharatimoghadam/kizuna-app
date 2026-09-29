import { env } from "../../config/env";

import type {
  TranslationRequest,
  TranslationResult,
} from "./translation.types";

export async function translateText(
  request: TranslationRequest
): Promise<TranslationResult> {
  const response = await fetch(
    `${env.aiApiUrl}/api/translate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: request.text,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Translation request failed with status ${response.status}.`
    );
  }

  const data = (await response.json()) as TranslationResult;

  return data;
}