import { type SubmitEventHandler } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/app/store';

import { Button, Input } from '@/shared/ui';

import { validateName } from '../lib/validate';
import { selectCreateDraft, selectGarageCurrentPage } from '../selectors';
import { resetCreateDraft, updateCreateDraft } from '../slice';
import { createCar, fetchCars } from '../thunks';

export function CreateCarForm() {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectGarageCurrentPage);
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

    dispatch(fetchCars(currentPage));
    dispatch(resetCreateDraft());
    toast.success('Successfully created!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-row items-center gap-2"
    >
      <Input
        value={draft.name}
        placeholder="Car name"
        error={draft.name ? error : null}
        onChange={e => dispatch(updateCreateDraft({ name: e.target.value }))}
        className="w-full"
        wrapperClassname="min-w-0 flex-1"
      />

      <input
        value={draft.color}
        type="color"
        onChange={e => dispatch(updateCreateDraft({ color: e.target.value }))}
        className="h-10 w-10 shrink-0 cursor-pointer rounded border-0"
      />

      <Button
        type="submit"
        disabled={!!error}
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10 shrink-0 whitespace-nowrap"
      >
        Create
      </Button>
    </form>
  );
}
