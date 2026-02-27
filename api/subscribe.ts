// api/subscribe.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Define the shape of the expected request body
interface SubscribeBody {
  email: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body as SubscribeBody;
  
  // Use non-null assertion or check for presence
  const apiKey = process.env.VITE_OCTOPUS_API_KEY!;
  const listId = process.env.VITE_OCTOPUS_LIST_ID!;

  try {
    const response = await fetch(
      `https://emailoctopus.com/lists/${listId}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({ 
          status: "subscribed",
          email_address: email 
        }),
      }
    );

    const data = await response.json();
    console.log("______D", data)
    return res.status(response.status).json(data);
  } catch (error) {
    console.log("______E", error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
