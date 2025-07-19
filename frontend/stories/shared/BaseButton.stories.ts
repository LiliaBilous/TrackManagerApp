import BaseButton from '@/shared/components/ui/BaseButton.vue'

interface BaseButtonProps {
  ariaLabel?: string
  dataTestid?: string
  buttonClass?: string
  type?: 'button' | 'submit' | 'reset'
  default?: string
  onClick?: (event: MouseEvent) => void
  disabled?: boolean
}

export default {
  title: 'UI/Button',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Aria-label for accessibility',
      table: { category: 'Accessibility' },
    },
    dataTestid: {
      control: 'text',
      description: 'Test id for testing',
      table: { category: 'Testing' },
    },
    buttonClass: {
      control: 'text',
      description: 'CSS class for button style (primary, secondary, text, danger, disabled)',
      table: { category: 'Style' },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type',
      table: { category: 'HTML' },
    },
    default: {
      control: 'text',
      description: 'Button label',
      table: { category: 'Content' },
    },
    onClick: { action: 'clicked', table: { category: 'Events' } },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { category: 'State' },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Material 3 styled button.
<!-- Оновлено опис компонента: замінено "outline" на "text" -->
Supports primary, secondary, text, danger, and disabled states.

- [Material 3 Guidelines](https://m3.material.io/components/buttons/overview)
- [Figma design](https://www.figma.com/design/7Fc4JWGZHdalew15agK6bC/Music-Track-Manager?node-id=8-182&p=f&t=2bYj8Kzc2dOKz64F-0)

**Usage:**

\`\`\`vue
<BaseButton buttonClass="button button-primary">Primary</BaseButton>
\`\`\`

**Best practices:**
- Use for main actions on a page
<!-- Оновлено опис найкращих практик: замінено "outline" на "text" -->
- Use text for secondary/less prominent actions
- Use danger for destructive actions
- Use aria-label for accessibility
        `,
      },
    },
  },
}

const render = (args: BaseButtonProps) => ({
  components: { BaseButton },
  setup() {
    return { args }
  },

  template: `
    <BaseButton v-bind="args" @click="args.onClick">
      {{ args.default }}
    </BaseButton>
  `,
})

export const Primary = {
  args: {
    default: 'Primary',
    buttonClass: 'button button-primary',
    ariaLabel: 'Primary action',
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Primary button for main actions.'
      }
    }
  }
}

export const Secondary = {
  args: {
    default: 'Secondary',
    buttonClass: 'button button-secondary',
    ariaLabel: 'Secondary action',
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Secondary button for less prominent actions.'
      }
    }
  }
}
export const Main = {
  args: {
    default: 'This is a button with a very long label to test overflow and responsiveness',
    buttonClass: 'button main__create-track-button',
    ariaLabel: 'Create track action',
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Main button for create track action on the page.'
      }
    }
  }
}

export const Text = {
  args: {
    default: 'Text',
    buttonClass: 'button button-outline',
    ariaLabel: 'Text button action',
  },
  render,
  parameters: {
    docs: {
      story: 'Text-style button for secondary or less prominent actions, without a visible border.'
    }
  }
}

export const Danger = {
  args: {
    default: 'Danger',
    buttonClass: 'button button-danger',
    ariaLabel: 'Danger action',
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Danger button for destructive actions.'
      }
    }
  }
}

export const Disabled = {
  args: {
    default: 'Disabled',
    buttonClass: 'button button-disabled',
    ariaLabel: 'Disabled button',
    disabled: true,
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Disabled state.'
      }
    }
  }
}
