export default function BuyAmountSelector({ buyAmount, onSetBuyAmount }) {
  const amounts = [1, 10, 50, 100];
  
  return (
    <div className="flex items-center justify-center gap-1.5 px-4 py-2">
      <span className="font-body text-xs text-muted-foreground mr-2">Buy:</span>
      {amounts.map(amt => (
        <button
          key={amt}
          onClick={() => onSetBuyAmount(amt)}
          className={`px-3 py-1 rounded-lg font-body text-xs font-bold transition-all
            ${buyAmount === amt
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
        >
          x{amt}
        </button>
      ))}
    </div>
  );
}