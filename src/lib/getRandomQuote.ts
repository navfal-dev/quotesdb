import { connect } from "@planetscale/database";
import { config } from "@/db/config";

import { drizzle } from "drizzle-orm/planetscale-serverless";

import { quotes, authors, categories } from "@/db/schema";

import { eq } from "drizzle-orm";

const quoteTracker = {
    prev: -1,
    setPrev: function (id: number) {
        this.prev = id;
    }
};

export default async function getRandomQuote(): Promise<Quote> {
    const conn = connect(config);
    const db = drizzle(conn);

    const results: Quote[] = await db
        .select({
            quote: quotes.quote,
            author: authors.author,
            category: categories.category
        })
        .from(quotes)
        .innerJoin(authors, eq(quotes.authorId, authors.id))
        .innerJoin(categories, eq(quotes.categoryId, categories.id));

    let prev = quoteTracker.prev;

    while (prev === quoteTracker.prev) {
        prev = Math.floor(Math.random() * results.length);
    }

    quoteTracker.setPrev(prev);

    return results[prev];
}
