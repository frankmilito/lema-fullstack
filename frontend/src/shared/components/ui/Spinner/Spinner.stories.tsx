import type { Meta, StoryObj } from '@storybook/react-vite';
import Spinner from './index';

const meta = {
  title: 'Shared/UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};


export const FullScreen: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Spinner className="min-h-screen" />
    </div>
  ),
};


