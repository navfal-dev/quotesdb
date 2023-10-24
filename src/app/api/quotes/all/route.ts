import getAllQuotes from "@/lib/getAllQuotes";
import { NextResponse } from "next/server";

export const GET = async (request: Request): Promise<Response> =>
    NextResponse.json(await getAllQuotes());
