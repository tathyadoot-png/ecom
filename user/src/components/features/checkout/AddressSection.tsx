import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ShippingAddress } from '@/types/order.types';
import { ShippingAddressErrors } from '@/lib/validation';

interface AddressSectionProps {
  value: ShippingAddress;
  errors: ShippingAddressErrors;
  onChange: (field: keyof ShippingAddress, value: string) => void;
  email?: string;
}

const AddressSection = ({ value, errors, onChange, email }: AddressSectionProps) => {
  return (
    <Card className="space-y-5">
      <div>
        <h2 className="font-heading text-xl text-text">Shipping Address</h2>
        <p className="mt-1 text-sm text-text/60 font-body">
          Where should we deliver your order?
        </p>
      </div>

      {email && (
        <Input label="Email" type="email" value={email} disabled readOnly />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          value={value.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          error={errors.fullName}
        />
        <Input
          label="Phone"
          type="tel"
          value={value.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          error={errors.phone}
        />
      </div>

      <Input
        label="Address"
        value={value.address}
        onChange={(e) => onChange('address', e.target.value)}
        error={errors.address}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="City"
          value={value.city}
          onChange={(e) => onChange('city', e.target.value)}
          error={errors.city}
        />
        <Input
          label="State"
          value={value.state}
          onChange={(e) => onChange('state', e.target.value)}
          error={errors.state}
        />
        <Input
          label="Country"
          value={value.country}
          onChange={(e) => onChange('country', e.target.value)}
          error={errors.country}
        />
        <Input
          label="Postal Code"
          value={value.postalCode}
          onChange={(e) => onChange('postalCode', e.target.value)}
          error={errors.postalCode}
        />
      </div>
    </Card>
  );
};

export { AddressSection };
