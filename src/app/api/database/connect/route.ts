import { authenticatePostgress } from "@/lib/api/databaseConfig";
import { formSchema } from "@/lib/zod/schemas/schema";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest, response: NextResponse) {
  return NextResponse.json({
    message: "success",
  });
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const jsonData = await request.json();
    const parsedData = formSchema.safeParse(jsonData);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: parsedData.error.format() },
        { status: 400 }
      );
    }

    console.log("Process initiated")

    const isValidCredentials = await authenticatePostgress(parsedData.data);

    console.log("Process checked")

    if (!isValidCredentials) {
      return NextResponse.json(
        {
          message: "Database connection failed. Check your credentials.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Database connection successful. Credentials are valid.",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "error",
        error: (err as Error).message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
