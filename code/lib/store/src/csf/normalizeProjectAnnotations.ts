import type {
  Renderer,
  ArgTypes,
  ProjectAnnotations,
  Store_NormalizedProjectAnnotations,
} from '@storybook/types';

import { inferArgTypes } from '../inferArgTypes';
import { inferControls } from '../inferControls';
import { normalizeInputTypes } from './normalizeInputTypes';

export function normalizeProjectAnnotations<TRenderer extends Renderer>({
  argTypes,
  globalTypes,
  argTypesEnhancers,
  ...annotations
}: ProjectAnnotations<TRenderer>): Store_NormalizedProjectAnnotations<TRenderer> {
  return {
    ...(argTypes && { argTypes: normalizeInputTypes(argTypes as ArgTypes) }),
    ...(globalTypes && { globalTypes: normalizeInputTypes(globalTypes) }),
    argTypesEnhancers: [
      ...(argTypesEnhancers || []),
      inferArgTypes,
      // inferControls technically should only run if the user is using the controls addon,
      // and so should be added by a preset there. However, as it seems some code relies on controls
      // annotations (in particular the angular implementation's `cleanArgsDecorator`), for backwards
      // compatibility reasons, we will leave this in the store until 7.0
      inferControls,
    ],
    ...annotations,
  };
}
