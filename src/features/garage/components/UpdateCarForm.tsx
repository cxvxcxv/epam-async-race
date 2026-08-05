import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button, Input } from '@/shared/ui';
import { type SubmitEventHandler } from 'react';
import toast from 'react-hot-toast';
import { validateName } from '../lib/validate';
import { selectSelectedCarId, selectUpdateDraft } from '../selectors';
import { resetUpdateDraft, selectCar, updateUpdateDraft } from '../slice';
import { updateCar } from '../thunks';

export function UpdateCarForm() {
  const dispatch = useAppDispatch();

  const selectedCarId = useAppSelector(selectSelectedCarId);

  const draft = useAppSelector(selectUpdateDraft);

  const error = validateName(draft.name);

  const disabled = selectedCarId === null;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    if (disabled || error) {
      return;
    }

    await dispatch(
      updateCar({
        id: selectedCarId,
        car: {
          name: draft.name.trim(),
          color: draft.color,
        },
      }),
    );

    dispatch(selectCar(null));

    dispatch(resetUpdateDraft());

    toast.success('Successfully updated!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-row items-center gap-2"
    >
      <Input
        value={draft.name}
        disabled={disabled}
        placeholder="Car name"
        error={draft.name ? error : null}
        onChange={e => dispatch(updateUpdateDraft({ name: e.target.value }))}
        className="w-full"
        wrapperClassname="min-w-0 flex-1"
      />

      <input
        type="color"
        value={draft.color}
        disabled={disabled}
        onChange={e => dispatch(updateUpdateDraft({ color: e.target.value }))}
        className="h-10 w-10 shrink-0 cursor-pointer rounded border-0 p-0 disabled:cursor-not-allowed"
      />

      <Button
        type="submit"
        disabled={disabled || !!error}
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10 shrink-0 whitespace-nowrap"
      >
        Update
      </Button>
    </form>
  );
}
