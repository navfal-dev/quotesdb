import getAllQuotes from "@/lib/getAllQuotes";
import { NextResponse } from "next/server";

export const POST = async (request: Request): Promise<Response> => {
    // add quote request - POST
    const { quote } = await request.json();
    const quotes = await getAllQuotes();
    quotes.push(quote);
    return NextResponse.redirect("/quotes");
};
