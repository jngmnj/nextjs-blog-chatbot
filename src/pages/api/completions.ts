import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type CompletoinsResponse = {
  messages: ChatCompletionMessageParam[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end(); // 개발을 위해 임시로 get method 사용

  const messages: ChatCompletionMessageParam[] = [];

  const response = await openai.chat.completions.create({
    // model: 'gpt-4o-2024-05-13',
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: '너는 친절한 챗봇이야.',
      },
      {
        role: 'user',
        content: '너는 누구니?',
      },
    ],
  });

  console.log(response);
  messages.push(response.choices[0].message);

  res.status(200).json({ messages });
}
