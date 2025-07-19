import { ref } from 'vue'
import type { StoryFn } from '@storybook/vue3'
import BaseInput from '../../src/shared/components/ui/BaseInput.vue'

export default {
    title: 'UI/BaseInput',
    component: BaseInput,
    tags: ['autodocs'],
    argTypes: {
        modelValue: {
            control: 'text',
            description: 'Input value',
            table: { category: 'State' },
        },
        label: {
            control: 'text',
            description: 'Visible label',
            table: { category: 'Content' },
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
            table: { category: 'Content' },
        },
        error: {
            control: 'text',
            description: 'Error message',
            table: { category: 'State' },
        },
        id: {
            control: 'text',
            description: 'Unique id for input',
            table: { category: 'Accessibility' },
        },
        ariaLabel: {
            control: 'text',
            description: 'Aria-label for accessibility',
            table: { category: 'Accessibility' },
        },
        dataTestid: {
            control: 'text',
            description: 'Test id for input',
            table: { category: 'Testing' },
        },
        errorTestid: {
            control: 'text',
            description: 'Test id for error',
            table: { category: 'Testing' },
        },
        inputClass: {
            control: 'text',
            description: 'Custom class for input',
            table: { category: 'Style' },
        },
        type: {
            control: 'text',
            description: 'Input type (text, password, etc.)',
            table: { category: 'Content' },
        },
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
 `
            },
        },
    },
}

const Template: StoryFn<typeof BaseInput> = (args) => {
    const value = ref(args.modelValue)
    return {
        components: { BaseInput },
        setup() {
            return { args, value }
        },
        template: `<BaseInput v-bind="args" v-model="value" v-bind="args.disabled ? { disabled: true } : {}" />`,
    }
}

export const Default = Template.bind({})
Default.args = {
    modelValue: '',
    label: 'Name',
    placeholder: 'Enter your name',
    id: 'input-default',
    ariaLabel: 'Name input',
}
Default.parameters = {
    docs: {
        description: {
            story: 'Default input field with floating label.'
        }
    }
}

export const WithError = Template.bind({})
WithError.args = {
    modelValue: '',
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Invalid email address',
    id: 'input-error',
    ariaLabel: 'Email input',
}
WithError.parameters = {
    docs: {
        description: {
            story: 'Input field with error message and error state.'
        }
    }
}

export const Disabled = Template.bind({})
Disabled.args = {
    modelValue: '',
    label: 'Disabled',
    placeholder: 'Cannot type here',
    id: 'input-disabled',
    ariaLabel: 'Disabled input',
    inputClass: 'disabled',
    // disabled: true, // disabled передається через $attrs у v-bind
}
Disabled.parameters = {
    docs: {
        description: {
            story: 'Disabled input field.'
        }
    }
}

export const Password = Template.bind({})
Password.args = {
    modelValue: '',
    label: 'Password',
    placeholder: 'Enter your password',
    id: 'input-password',
    ariaLabel: 'Password input',
    type: 'password',
}
Password.parameters = {
    docs: {
        description: {
            story: 'Password input field.'
        }
    }
} 