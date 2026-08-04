import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button, Input } from '@/shared/ui';
import { type SubmitEventHandler } from 'react';
import toast from 'react-hot-toast';
import { validateName } from '../lib/validate';
import { selectCreateDraft } from '../selectors';
import { resetCreateDraft, updateCreateDraft } from '../slice';
import { createCar } from '../thunks';

export function CreateCarForm() {
  const dispatch = useAppDispatch();

  const draft = useAppSelector(selectCreateDraft);

  const error = validateName(draft.name);

  const handleSubmit: SubmitEventHandler = async event => {
    event.preventDefault();

    if (error) {
      return;
    }

    await dispatch(
      createCar({
        name: draft.name.trim(),
        color: draft.color,
      }),
    );

    dispatch(resetCreateDraft());
    toast.success('Successfully created!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="flex gap-2">
        <Input
          value={draft.name}
          placeholder="Car name"
          error={draft.name ? error : null}
          onChange={e => dispatch(updateCreateDraft({ name: e.target.value }))}
        />

        <Input
          value={draft.color}
          type="color"
          onChange={e => dispatch(updateCreateDraft({ color: e.target.value }))}
        />
      </div>

      <Button type="submit" disabled={!!error}>
        Create
      </Button>
    </form>
  );
}
