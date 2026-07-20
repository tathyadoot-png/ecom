import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InventoryStatus } from '@/types/product.types';

interface StockStatusProps {
  stock: number;
  inventoryStatus: InventoryStatus;
  className?: string;
}

const LOW_STOCK_THRESHOLD = 5;

const StockStatus = ({ stock, inventoryStatus, className }: StockStatusProps) => {
  const isOutOfStock = inventoryStatus === 'out_of_stock' || stock <= 0;
  const isLowStock = !isOutOfStock && stock <= LOW_STOCK_THRESHOLD;

  if (isOutOfStock) {
    return (
      <div className={cn('flex items-center gap-2 font-body text-sm text-primary', className)}>
        <XCircle className="h-4 w-4" />
        Out of stock
      </div>
    );
  }

  if (isLowStock) {
    return (
      <div className={cn('flex items-center gap-2 font-body text-sm text-accent', className)}>
        <AlertTriangle className="h-4 w-4" />
        Only {stock} left in stock
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2 font-body text-sm text-forest', className)}>
      <CheckCircle2 className="h-4 w-4" />
      In stock
    </div>
  );
};

export { StockStatus };
