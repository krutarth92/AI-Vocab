/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VocabTerm {
  id: string;
  term: string;
  category: 'Product' | 'AI' | 'Backend' | 'Frontend' | 'Data' | 'Architecture' | 'Strategy';
  what: string;
  why: string;
  where: string;
  mental_model: string;
  alternatives: string;
  related: string[]; // List of related vocab IDs
}

export interface TechStackReason {
  id: string;
  tech: string;
  title: string;
  reasoning: string[];
  alternativesRejected: {
    name: string;
    reason: string;
  }[];
}
