import toast from 'react-hot-toast';

export function showWinnerToast(name: string, time: number) {
  toast.custom(
    () => (
      <div className="border-warning bg-surface rounded-xl border-4 px-16 py-8 shadow-2xl">
        <h2 className="text-warning text-center text-3xl font-black">WINNER</h2>
        <p className="mt-4 text-center text-2xl font-bold">{name}</p>

        <p className="text-muted mt-2 text-center text-lg">
          {time.toFixed(2)} seconds
        </p>
      </div>
    ),
    {
      duration: 5000,
    },
  );
}
