import getRandomQuote from "@/lib/getRandomQuote";
import { NextResponse } from "next/server";

export const GET = async (request: Request): Promise<Response> =>
    NextResponse.json(await getRandomQuote());
