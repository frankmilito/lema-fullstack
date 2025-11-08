import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyMessage } from './index';

const meta = {
  title: 'Shared/UI/EmptyMessage',
  component: EmptyMessage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Message to display',
    },
    variant: {
      control: 'select',
      options: ['empty', 'error'],
      description: 'Message variant',
    },
  },
} satisfies Meta<typeof EmptyMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    message: 'No items found',
    variant: 'empty',
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred while loading data',
    variant: 'error',
  },
};


export const AllVariants: StoryObj<typeof EmptyMessage> = {
  render: () => (
    <div className="space-y-6 p-6">
      <EmptyMessage message="No items found" variant="empty" />
      <EmptyMessage message="Error loading data" variant="error" />
    </div>
  ),
};


