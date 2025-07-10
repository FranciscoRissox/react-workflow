import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { WorkflowNodeForTest } from '../../stories/components/node.story.tsx';

test('node', async ({ mount }) => {
  const component = await mount(<WorkflowNodeForTest />);
  await expect(component).toHaveCSS('position', 'absolute');
});
