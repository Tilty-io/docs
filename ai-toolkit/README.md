> **Version** : 0.15.0

# 🤖 Tilty AI Toolkit

This directory contains resources specifically designed to assist AI Agents (Cursor, Windsurf, GitHub Copilot, ChatGPT, Claude, etc.) in understanding and working with Tilty CMS.
**(See on [GitHub](https://github.com/Tilty-io/docs/tree/main/ai-toolkit))**

## 📄 The Main File: `AGENT_CONTEXT.md`

This is the **Reference Document** for any AI interaction.
It acts as a "Single Source of Truth" containing:
1.  **Strict Syntax Rules** (No hallucinations allowed).
2.  **TypeScript Definitions** for `ty-*` attributes.
3.  **Few-Shot Training** (Examples of Good/Bad code).
4.  **Technical Documentation** (Architecture, Multilingual, etc.).

### 🚀 How to use it?

#### 1. In AI Editors (Cursor, Windsurf, Copilot)
When you start a coding session involving Tilty templates:
1.  Open `AGENT_CONTEXT.md` in a tab (or pin it to context).
2.  The AI will automatically "read" the definitions and examples.
3.  Ask your question (e.g. *"Create a polymorphic list for a hero section"*).

#### 2. With ChatBots (ChatGPT, Claude, Gemini)
1.  **Upload** the `AGENT_CONTEXT.md` file to the chat.
2.  Use the following prompt:
    > "You are an expert Tilty Developer. I have uploaded the `AGENT_CONTEXT.md` file which contains the strict syntax and rules you must follow. Read it carefully before answering. Start by confirming the Tilty version."

#### 3. Creating Custom GPTs
If you are building a custom GPT or Assistant:
1.  Upload `AGENT_CONTEXT.md` to its **Knowledge Base**.
2.  In the System Instructions, add:
    > "Always refer to `AGENT_CONTEXT.md` for syntax validation. Never invent conventions not listed in that file."

---

## 🛠️ Maintenance

**⚠️ Note:** This toolkit is automatically generated during the Tilty release process.
The source files (`examples.md`, `ty-attributes.d.ts`) and the generation script reside in the private Tilty Core repository.

**Do not edit `AGENT_CONTEXT.md` manually**, as your changes will be overwritten by the next release.
