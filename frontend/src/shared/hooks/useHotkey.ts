import { useEffect, useCallback } from 'react';

type ModifierKey = 'ctrl' | 'meta' | 'shift' | 'alt';

interface HotkeyOptions {
  /** Key modifiers required alongside the main key */
  modifiers?: ModifierKey[];
  /** Do not trigger when focus is inside an input/textarea/contenteditable */
  ignoreInputs?: boolean;
  /** Allow event to bubble after handler fires */
  allowBubble?: boolean;
}

/**
 * Binds a keyboard shortcut globally on `document`.
 *
 * @param key - The `KeyboardEvent.key` value (e.g. 'k', 'Escape').
 * @param handler - Callback invoked when the hotkey fires.
 * @param options - Optional modifier keys and behavior flags.
 */
export function useHotkey(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: HotkeyOptions = {}
): void {
  const { modifiers = [], ignoreInputs = true, allowBubble = false } = options;

  const stableHandler = useCallback(handler, [handler]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (ignoreInputs) {
        const target = event.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      const modifiersMet =
        (!modifiers.includes('ctrl') || event.ctrlKey) &&
        (!modifiers.includes('meta') || event.metaKey) &&
        (!modifiers.includes('shift') || event.shiftKey) &&
        (!modifiers.includes('alt') || event.altKey);

      if (modifiersMet && event.key.toLowerCase() === key.toLowerCase()) {
        if (!allowBubble) event.preventDefault();
        stableHandler(event);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [key, modifiers, ignoreInputs, allowBubble, stableHandler]);
}
