import { Resend } from "resend";

type QuoteRequest = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventType: string;
  estimatedGuests: string;
  parkingSituation: string;
  parkingLayout: string;
  paymentCoverage: string;
  onSiteContactName: string;
  onSiteContactPhone: string;
  invoiceRecipientName: string;
  invoiceRecipientEmail: string;
};

const REQUIRED_FIELDS: Array<keyof QuoteRequest> = [
  "name",
  "email",
  "phone",
  "eventDate",
  "eventStartTime",
  "eventEndTime",
  "eventLocation",
  "eventType",
  "estimatedGuests",
  "parkingSituation",
  "parkingLayout",
  "paymentCoverage",
  "onSiteContactName",
  "onSiteContactPhone",
  "invoiceRecipientName",
  "invoiceRecipientEmail",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length === 10;
}

function fieldLabel(field: keyof QuoteRequest): string {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

export async function POST(request: Request) {
  let payload: Partial<Record<keyof QuoteRequest, unknown>>;

  try {
    const body = (await request.json()) as unknown;
    if (!body || typeof body !== "object") {
      return Response.json(
        { error: "Request body must be a JSON object." },
        { status: 400 },
      );
    }
    payload = body as Partial<Record<keyof QuoteRequest, unknown>>;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const missingFields = REQUIRED_FIELDS.filter(
    (field) => !isNonEmptyString(payload[field]),
  );

  if (missingFields.length > 0) {
    return Response.json(
      {
        error: `Missing required fields: ${missingFields
          .map((field) => fieldLabel(field))
          .join(", ")}`,
      },
      { status: 400 },
    );
  }

  const quote = REQUIRED_FIELDS.reduce((acc, field) => {
    acc[field] = String(payload[field]).trim();
    return acc;
  }, {} as QuoteRequest);

  if (!isValidEmail(quote.email) || !isValidEmail(quote.invoiceRecipientEmail)) {
    return Response.json(
      { error: "Please provide valid email addresses." },
      { status: 400 },
    );
  }

  if (!isValidPhone(quote.phone) || !isValidPhone(quote.onSiteContactPhone)) {
    return Response.json(
      { error: "Please provide valid 10-digit phone numbers." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return Response.json(
      {
        error:
          "Email service is not configured. Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or QUOTE_TO_EMAIL.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const messageLines = [
    "New ValetGo quote request",
    "",
    `Submitted: ${new Date().toISOString()}`,
    "",
    "Basic Info",
    `- Name: ${quote.name}`,
    `- Email: ${quote.email}`,
    `- Phone: ${quote.phone}`,
    "",
    "Event Details",
    `- Event date: ${quote.eventDate}`,
    `- Event start time: ${quote.eventStartTime}`,
    `- Event end time: ${quote.eventEndTime}`,
    `- Event location: ${quote.eventLocation}`,
    `- Event type: ${quote.eventType}`,
    "",
    "Parking & Logistics",
    `- Estimated guests: ${quote.estimatedGuests}`,
    `- Parking situation: ${quote.parkingSituation}`,
    `- Parking layout: ${quote.parkingLayout}`,
    "",
    "Service Details",
    `- Payment coverage: ${quote.paymentCoverage}`,
    "",
    "Coordination",
    `- On-site contact name: ${quote.onSiteContactName}`,
    `- On-site contact phone: ${quote.onSiteContactPhone}`,
    `- Invoice recipient name: ${quote.invoiceRecipientName}`,
    `- Invoice recipient email: ${quote.invoiceRecipientEmail}`,
  ];

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: quote.email,
      subject: `New quote request: ${quote.name} (${quote.eventDate})`,
      text: messageLines.join("\n"),
    });

    if (result.error) {
      return Response.json(
        { error: `Email provider error: ${result.error.message}` },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Failed to send request email. Please try again." },
      { status: 500 },
    );
  }
}
