import BaseCheckbox from '@/shared/components/ui/BaseCheckbox.vue'

interface BaseCheckboxProps {
  checked: boolean
  id?: string
  dataTestid?: string
  ariaLabel?: string
  default?: string
  onChange?: (value: boolean) => void
}

/**
 * Material 3 styled checkbox. Supports checked/unchecked states, accessibility, and custom labels.
 *
 * [Figma design](https://m3.material.io/components/checkboxes/overview)
 *
 * Best practices:
 * - Use for boolean options in forms
 * - Always provide a visible label and aria-label
 * - Use unique id for accessibility
 */
export default {
  title: 'UI/Checkbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state',
      table: { category: 'State' },
    },
    id: {
      control: 'text',
      description: 'Unique id for input',
      table: { category: 'Accessibility' },
    },
    dataTestid: {
      control: 'text',
      description: 'Test id for testing',
      table: { category: 'Testing' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Aria-label for accessibility',
      table: { category: 'Accessibility' },
    },
    default: {
      control: 'text',
      description: 'Label text',
      table: { category: 'Content' },
    },
    onChange: { action: 'changed', table: { category: 'Events' } },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# BaseCheckbox (Material 3)

Material 3 styled checkbox. Supports checked/unchecked states, accessibility, and custom labels.

- [Material 3 Guidelines](https://m3.material.io/components/checkboxes/overview)
- [Figma design](https://m3.material.io/components/checkboxes/overview)

**Usage:**

\`\`\`vue
<BaseCheckbox :checked="true" aria-label="Accept terms">Accept terms</BaseCheckbox>
\`\`\`

**Best practices:**
- Use for boolean options in forms
- Always provide a visible label and aria-label
- Use unique id for accessibility
        `,
      },
    },
  },
}

const render = (args: BaseCheckboxProps) => ({
  components: { BaseCheckbox },
  setup() {
    return { args }
  },
  template: `
    <BaseCheckbox 
      v-bind="args"
      @change="args.onChange"
    >
      {{ args.default }}
    </BaseCheckbox>
  `,
})

export const Default = {
  args: {
    checked: false,
    default: 'Label text',
    dataTestid: 'base-checkbox',
    ariaLabel: 'Base Checkbox',
    id: 'checkbox-default',
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Default unchecked state.'
      }
    }
  }
}

export const Checked = {
  args: {
    checked: true,
    default: 'Checked state',
    dataTestid: 'base-checkbox-checked',
    ariaLabel: 'Checked Checkbox',
    id: 'checkbox-checked',
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Checked state.'
      }
    }
  }
}

export const NoLabel = {
  args: {
    checked: false,
    ariaLabel: 'No label checkbox',
    id: 'checkbox-nolabel',
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Edge case: no visible label (aria-label only).'
      }
    }
  }
}

export const Interactive = {
  args: {
    checked: false,
    default: 'Click to toggle',
    ariaLabel: 'Interactive Checkbox',
    id: 'checkbox-interactive',
  },
  render,
  parameters: {
    docs: {
      description: {
        story: 'Interactive checkbox with change action (see Actions panel).'
      }
    }
  }
}
