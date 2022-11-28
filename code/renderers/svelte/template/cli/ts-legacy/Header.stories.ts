import type { Meta, StoryObj } from '@storybook/svelte';
import Header from './Header.svelte';

const meta: Meta<Header> = {
  title: 'Example/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
