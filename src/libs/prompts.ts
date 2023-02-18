type TemplateContext = {
  input: string;
  customPrompt?: string;
};

type Template = (context: TemplateContext) => string;

type ServerPredictionPrompt = {
  id: string;
  template: Template;
  temperature: number;
};

export const SERVER_PREDICTION_PROMPTS: ServerPredictionPrompt[] = [
  {
    id: "continuation",
    temperature: 0.5,
    template: ({ input }) =>
      `The following text has already been written:

"""TEXT: ${input}"""

Write the next paragraph, keeping the same voice and stay on the same topic. At least 3 sentences.

Next paragraph:`,
  },
  {
    id: "takeaways",
    temperature: 0.5,
    template: ({ input }) =>
      `My notes are below in triple quotes:

"""
${input}
"""

Write a markdown list (using dashes) of key takeaways from my notes:`,
  },
  {
    id: "fix-grammar",
    temperature: 0,
    template: ({ input }) =>
      `Correct the text into standard English and fix the grammar.

"""
${input}
"""

Correct spelling and grammar:`,
  },
  {
    id: "short-summary",
    temperature: 0.7,
    template: ({ input }) =>
      `Summarize the text below but keep it concise. Summarize using plain and simple language and keep the same tense.
            
"""
${input}
"""

Concise Summary:`,
  },
  {
    id: "long-summary",
    temperature: 0.7,
    template: ({ input }) =>
      `Summarize the text below into three long paragraphs. Summarize using plain and simple language and keep the same tense.
            
"""
${input}
"""

Long summary:`,
  },
  {
    id: "rephrase",
    temperature: 0.5,
    template: ({ input }) =>
      `Rewrite the text below in your own words. Rephrase the text.

"""
${input}
"""

Rephrased Text:`,
  },
  {
    id: "simplify",
    temperature: 0.5,
    template: ({ input }) =>
      `Explain the following text to a high schooler:
      
""""
${input}
"""

Simplification:`,
  },
  {
    id: "generate-titles",
    temperature: 0.7,
    template: ({ input }) =>
      `The blog post below has already been written:
  
"""BLOG POST: ${input}"""
  
Generate a markdown list (using dashes) of five appropriate headlines for the blog post:`,
  },
  {
    id: "generate-tweets",
    temperature: 0.7,
    template: ({ input }) =>
      `The blog post below has already been written:

"""BLOG POST: ${input}"""

Generate a markdown list (using dashes) of five tweets based off the blog post:`,
  },
  {
    id: "generate-outline",
    temperature: 0.5,
    template: ({ input }) =>
      `Create an outline for an essay about the topic below in the described format.
        
Topic:"""
${input}
"""

Format:"""
1. Introduction
    - < sub section >
    - < sub section >
    - < sub section >
2. < section >
    - < sub section >
    - < sub section >
    - < sub section >
3. < section >
    - < sub section >
    - < sub section >
    - < sub section >
4. < section >
    - < sub section >
    - < sub section >
    - < sub section >
5. Conclusion
    - < sub section >
    - < sub section >
    - < sub section > 
"""

Outline of the topic using the format above:`,
  },
  {
    id: "generate-overview",
    temperature: 0.5,
    template: ({ input }) =>
      `The article is below in the triple quotes:
"""
${input}
"""

Provide a overview of the article. Use the following format:
"""
Summary: 

< one to two line summary >

Key takeaways:
1. < first key takeaway >
2. < second key takeaway >
3. < third key takeaway >

Counter arguments:
1. < first main counter argument >
2. < second main counter argument >
"""

Article overview in the format above:`,
  },
  {
    id: "generate-counter-argument",
    temperature: 0.5,
    template: ({ input }) =>
      `Give the counter argument to the text below:
"""
${input}
"""

Counter Argument:`,
  },
  {
    id: "generate-email",
    temperature: 0.5,
    template: ({ input }) =>
      `Write a professional and articulate email for the subject below:
"""
Subject: ${input}
"""

Email:`,
  },
];
