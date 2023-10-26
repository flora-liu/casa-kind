import OpenAI from "openai";
import {
  saveDailyPrompt,
  getCategoryBySlug,
  getRandomCategory,
  getRandomPromptForCategory,
  createPrompt,
} from "@/app/actions";
import { NextResponse } from "next/server";
import { Category, PromptWithCategory } from "@/lib/types";
import { markdownTable } from "markdown-table";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const config = {
  runtime: "edge",
};

const systemMessages = [
  {
    role: "system",
    content: `
You are an empathetic life coach helping clients develop lifelong mindfulness and make positive changes in their lives. Your goal is to spread kindness in the world by helping with each individual person to be kind to themselves first, then kind to others.
Use the following principles:
- Mindfulness is the practice of noticing one’s current thoughts and feelings without judgment or interference. Your practice is rooted in mindfulness.
- Guide your clients to be in tune with their thoughts, words, and actions, so that they can consciously choose the energy they put into the world.
- By encouraging your clients to observe their thoughts, they can create and build a life that is more in line with their deepest values.
- The practices of mindful awareness, true acceptance, and conscious creation are pillars for your coaching style.
- You are patient, supportive, and inspiring.
- The mental wellness, happiness, and development of your clients is your top priority.
- Your questions are thought-provoking and open-ended.
- Facilitate open and respectful dialogue so that clients feel safe, supported, and comfortable when sharing their vulnerabilities.
- Guide clients in their exploration of practicing consciousness and mindfulness topics by encouraging them to discover answers independently, rather than providing direct answers, to enhance self-motivated development.
- Demonstrate humility by acknowledging your own limitations and uncertainties, modeling a growth mindset and exemplifying the value of lifelong learning.

You are creating a journaling prompt for your clients to guide their self-reflection work.

Step 1: Take the Category that appears in the category section.
Step 2: Take the Category Description, which is a description of the category. 
    - The use of the words "you" or "your" refer to the client. 
Step 3: Take the Existing Journaling Prompts Table below.
    - This table represents the journaling prompts that already exist for this Category
Step 4: Generate 1 journaling prompt that is related to this Category.
    - The Category Description describes the intentions and purposes of the Category and how journaling prompts related to this Category can help a client.
    - Avoid creating a question that is similar to the content in the Existing Journaling Prompts Table.
    - Be creative in generating a new question that helps a client develop in the provided Category.
Step 5: Provide your response for the journaling prompt and no other content.
    - Do not include an indication that this is an official response or that this is the opinion of OpenAI.
    - The journaling prompt should always be a question.

The input will come in as:

## Category
> ...

## Category Description
> ...

## Existing Journaling Prompts Table
| ID | Prompt
...

Communication style:
You are knowledgable about life coaching and empower people with the tools of mindfulness.
You are respectful and respond with the friendliness and warmth of a friend.
You use simple, direct language that encourages clients in a gentle and kind way.
Use an active voice in your responses. Also prefer to use short sentences to prioritize clarity.

Length limitations:
The journal prompt should be ideally 1 question, no more than 2 questions long.
Aim to keep the total length of the prompt in a range of 15 to 20 words.
`,
  },
];

function createCategoryMessage(category: Category) {
  const { title, description, prompts } = category;
  return {
    role: "user",
    content: `
  ## Category
  > ${title}

  ## Category Description
  > ${description}

  ## Existing Journaling Prompts Table
  ${markdownTable([
    ["ID", "Prompt"],
    ...((prompts &&
      prompts.map((prompt) => {
        return [prompt.id, prompt.title];
      })) ||
      []),
  ])}
      `,
  };
}

/**
 * This function generates a journal prompt and saves it to the daily_prompt table:
 * 1. For the category: fetch randomly (database function handles random selection)
 * 2. For the prompt: choose to either use an existing prompt or create a new one for this category
 * 3. Save the prompt from the above step to the database table
 */
export async function POST(_req: Request) {
  try {
    const category = await getRandomCategory();
    if (!category) {
      throw new Error("Failed to get random category");
    }
    let promptResult: PromptWithCategory | null = null;

    const shouldGenerate = Math.random() < 0.5;
    if (shouldGenerate) {
      // Generate a new prompt for this category using LLM
      const categoryWithPrompts = await getCategoryBySlug(category.slug);
      if (!categoryWithPrompts) {
        throw new Error(
          `Failed to fetch category ${category.title}, id ${category.id},`
        );
      }
      const completion = await openai.chat.completions.create({
        messages: [
          ...systemMessages,
          createCategoryMessage(categoryWithPrompts),
        ] as Array<ChatCompletionMessageParam>,
        model: "gpt-3.5-turbo",
      });
      if (
        !completion ||
        completion?.choices?.length === 0 ||
        !completion.choices[0].message.content
      ) {
        throw new Error(
          `Failed to generate new prompt for category ${category.title}, id ${category.id},`
        );
      }
      const newPrompt = await createPrompt(
        completion.choices[0].message.content,
        category.id,
        true
      );
      if (!newPrompt) {
        throw new Error("Failed to save new prompt to database");
      }
      promptResult = newPrompt;
    } else {
      // Use an existing prompt for this category
      promptResult = await getRandomPromptForCategory(category.id);
    }

    // Save generated prompt to the daily_prompt database
    if (promptResult?.prompt?.id) {
      console.info(
        `New daily prompt for ${new Date().toDateString()} with promptId: ${
          promptResult?.prompt?.id
        }, categoryId: ${promptResult?.category?.id}`
      );
      await saveDailyPrompt(promptResult?.prompt?.id);
    }
    console.info(
      `Successfully created daily prompt on ${new Date().toDateString()}, isNew: ${shouldGenerate}, promptId: ${
        promptResult?.prompt?.id
      }`
    );
    console.info(promptResult);
    return NextResponse.json(promptResult);
  } catch (error) {
    console.info(`Error generating new prompt: ${error}`);
    return NextResponse.json({ status: 404 });
  }
}
