import type { CaseStudy } from '@/lib/types';
import { bodySkeleton } from '../skeleton';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate. */
const senseChatbot: CaseStudy = {
  slug: 'sense-chatbot',
  collection: 'zero-to-one',
  year: '2023',
  company: 'Sense',
  monogram: 'SE',
  title: 'Sense Chatbot',
  summary:
    'Shipped in six months, to ten paying customers and more than double the ' +
    'revenue stretch goal.',
  projectType: '0 to 1 product design',
  role: 'Lead Designer',
  protected: false,
  tint: ['#EBDCC9', '#B7794E'],
  heroAspect: 16 / 10,
  heroCaption: '[CAPTION FOR THE HERO VISUAL]',
  heroAlt: '[ALT TEXT FOR THE HERO VISUAL]',
  facts: [
    { label: 'Timeline', value: 'Six months' },
    { label: 'Team', value: 'Four, one designer' },
    { label: 'Impact', value: 'Ten paying customers' },
  ],
  details: [
    { label: 'Role', value: 'Lead Designer' },
    { label: 'Team', value: 'Four, one designer' },
    { label: 'Timeline', value: 'Six months, 2020' },
    { label: 'Tools', value: '[TOOLS]' },
  ],
  brief: [
    {
      label: 'Background',
      body:
        'Sense builds automation for recruiting agencies: personalized candidate ' +
        'communication that integrates with applicant tracking systems (ATS). In ' +
        '2020 it had two products, Engage and Messaging, and a pandemic-battered ' +
        'market.',
    },
    {
      label: 'Project context',
      body:
        "I led all design for Sense's third product, a recruiting chatbot, on a " +
        'team of four (ML engineer, PM, front-end engineer, and me), on a timeline ' +
        'compressed by the need to stay competitive mid-pandemic.',
    },
    {
      label: 'The problem',
      body:
        'Recruiters spend up to 60% of their time on data entry and low-value ' +
        "introductory calls, while sourcing candidates remains the industry's " +
        'hardest job. Agencies wanted to automate data collection and pre-screening ' +
        'without making candidates feel processed. The framing: accelerate hiring ' +
        'for recruiters while keeping the candidate experience genuinely good.',
    },
    {
      label: 'The solution',
      body:
        'A two-sided MVP. Candidates got a conversational web chatbot with a ' +
        'WCAG-compliant design system, natural-language validation, and a tone ' +
        'shaped by internal dogfooding and UserTesting rounds. Recruiters got the ' +
        'Conversation Flow Designer: a node-based canvas for building custom ' +
        'conversations, mapping responses to ATS fields, and branching with ' +
        'condition nodes.',
    },
    {
      label: 'The outcome',
      body:
        'Shipped in six months. Ten paying customers by December, more than ' +
        "doubling the revenue stretch goal, including Sense's largest enterprise " +
        'deal, and it helped keep the company alive through the pandemic.',
    },
  ],
  sections: bodySkeleton('SENSE'),
};

export default senseChatbot;
