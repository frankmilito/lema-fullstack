import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './index';

const meta = {
  title: 'Shared/UI/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'body', 'label', 'error'],
      description: 'Typography variant',
    },
    component: {
      control: 'text',
      description: 'Override the default HTML element',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1 - Main Page Title',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2 - Section Title',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3 - Card Title',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text. It is used for regular paragraph content and is responsive with smaller text on mobile devices.',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Form Label',
    component: 'label',
    htmlFor: 'example-input',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'This is an error message',
  },
};

export const CustomComponent: Story = {
  args: {
    variant: 'h1',
    component: 'div',
    children: 'Heading 1 rendered as a div element',
  },
};

export const AllVariants: StoryObj<typeof Typography> = {
  render: () => (
    <div className="space-y-6 p-6">
      <Typography variant="h1">Heading 1 - Main Page Title</Typography>
      <Typography variant="h2">Heading 2 - Section Title</Typography>
      <Typography variant="h3">Heading 3 - Card Title</Typography>
      <Typography variant="body">
        Body text - This is used for regular paragraph content. It provides a clean and readable style for longer text blocks.
      </Typography>
      <Typography variant="label" component="label" htmlFor="example">
        Label - Form Label Text
      </Typography>
      <Typography variant="error">Error - Error message text</Typography>
    </div>
  ),
};


