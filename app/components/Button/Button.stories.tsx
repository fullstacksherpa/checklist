import type { Meta, StoryObj } from '@storybook/react';
import { mockBaseTemplateProps } from './Button.mocks';
import BaseTemplate from './Button';

const meta: Meta<typeof BaseTemplate> = {
  title: 'templates/BaseTemplate',
  component: BaseTemplate,
};

export default meta;

type Story = StoryObj<typeof BaseTemplate>;

export const Base: Story = {
  args: {
    ...mockBaseTemplateProps.base,
  },
};
