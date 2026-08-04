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
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="flex gap-2">
        <Input
          value={draft.name}
          disabled={disabled}
          placeholder="Car name"
          error={draft.name ? error : null}
          onChange={e => dispatch(updateUpdateDraft({ name: e.target.value }))}
        />

        <Input
          type="color"
          value={draft.color}
          disabled={disabled}
          onChange={e => dispatch(updateUpdateDraft({ color: e.target.value }))}
        />
      </div>

      <Button type="submit" disabled={disabled || !!error}>
        Update
      </Button>
    </form>
  );
}
