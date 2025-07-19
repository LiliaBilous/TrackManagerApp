# ADR 0017: Material 3 Components: Design System, Storybook, and Integration

## Context

To improve UI consistency, scalability, and developer experience, the Track Manager project adopted Material 3 design principles and implemented base UI components (Button, Input, Card) using Storybook. The process included working with Figma, customizing the Material Theme, and integrating the components into the main project.

## Decision

- Studied Material 3 design system documentation and principles (typography, color, spacing, components)
- Explored the official Figma file for Material 3, reviewed component structure, grid, and styles
- Used the Material Theme Builder Figma plugin to generate a custom theme (primary/secondary colors, fonts)
- Identified required components for the project (Button, Input, Card, Progress)
- Implemented these components in Storybook with separate stories and basic documentation for each
- Integrated the created Material 3 components into the main project and used them on key pages

## Rationale

- Material 3 provides a modern, accessible, and widely recognized design system
- Using Figma and the Theme Builder plugin allows for rapid prototyping and theme customization
- Storybook enables isolated development, testing, and documentation of UI components
- Integrating these components ensures a consistent look and feel across the application

## Status

Accepted

## Consequences

**Positive:**

- Consistent, modern UI across the project
- Easier onboarding and faster development with reusable components
- Improved documentation and testing of UI via Storybook
- Ability to quickly adapt the theme via Figma and Theme Builder

**Negative:**

- Initial time investment to learn Material 3 and set up Storybook
- Need to maintain design tokens and sync with Figma as the design evolves

---

[⬅️ Previous](./ADR-0016-GitHubActionsCI.md) | [🏠 Index(README)](./README.md)
