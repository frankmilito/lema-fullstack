import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './index';
import { Button } from '../Button';

const meta = {
  title: 'Shared/UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Close modal when clicking backdrop',
    },
  },
  args: { onClose: () => { } },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = ({ isOpen: initialOpen = true, ...args }: { isOpen?: boolean } & Story['args']) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p className="text-gray-700 mb-4">
          This is the modal content. You can put any content here.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="tertiary" onClick={() => setIsOpen(false)}>Confirm</Button>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    isOpen: true,
    title: 'Modal Title',
    closeOnBackdropClick: true,
    children: (
      <>
        <p className="text-gray-700 mb-4">
          This is the modal content. You can put any content here.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="tertiary">Confirm</Button>
        </div>
      </>
    ),
  },
};


export const WithoutTitle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    isOpen: true,
    title: undefined,
    closeOnBackdropClick: true,
    children: (
      <>
        <p className="text-gray-700 mb-4">
          This is the modal content. You can put any content here.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="tertiary">Confirm</Button>
        </div>
      </>
    ),
  },
};

export const NoBackdropClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    isOpen: true,
    title: 'Modal Without Backdrop Close',
    closeOnBackdropClick: false,
    children: (
      <>
        <p className="text-gray-700 mb-4">
          This is the modal content. You can put any content here.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="tertiary">Confirm</Button>
        </div>
      </>
    ),
  },
};

export const WithForm: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="tertiary" onClick={() => setIsOpen(false)}>Submit</Button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
  args: {
    isOpen: false,
    title: 'Form Modal',
    closeOnBackdropClick: true,
    children: null,
  },
};


