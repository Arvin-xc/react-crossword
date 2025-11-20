import React, { useContext, useMemo } from 'react';

import { CrosswordContext } from './context';
import type { Direction } from './types';

interface ClueLookup {
  direction: Direction;
  number: string;
  clue: string;
}

/**
 * Renders the text for the currently-selected clue. This component looks up
 * the clue based on the focused cell and returns only the clue text (no
 * wrapper markup).
 */
export default function SelectedClue({
  fallback = null,
}: {
  /** optional content to render when no clue is selected */
  fallback?: React.ReactNode;
}) {
  const { clues, selectedDirection, selectedNumber } =
    useContext(CrosswordContext);

  const activeClue = useMemo<ClueLookup | null>(() => {
    if (!clues || !selectedNumber) {
      return null;
    }

    const directionClues = clues[selectedDirection];
    const match = directionClues?.find(
      (clueInfo) => clueInfo.number === selectedNumber
    );

    if (!match) {
      return null;
    }

    return {
      direction: selectedDirection,
      number: selectedNumber,
      clue: match.clue,
    };
  }, [clues, selectedDirection, selectedNumber]);

  if (!activeClue) {
    return { fallback };
  }

  return activeClue.clue;
}
