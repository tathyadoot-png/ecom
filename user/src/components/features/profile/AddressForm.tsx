'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AddressSection } from '@/components/features/checkout/AddressSection';
import { ProfileActions } from './ProfileActions';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { validateShippingAddress, ShippingAddressErrors } from '@/lib/validation';
import { ShippingAddress } from '@/types/order.types';
import { User } from '@/types/auth.types';

interface AddressFormProps {
  user: User;
}

const toShippingAddress = (user: User): ShippingAddress => ({
  fullName: user.address?.fullName || '',
  phone: user.address?.phone || '',
  address: user.address?.address || '',
  city: user.address?.city || '',
  state: user.address?.state || '',
  country: user.address?.country || 'India',
  postalCode: user.address?.postalCode || '',
});

// Reuses Checkout's AddressSection for the field markup and
// validateShippingAddress for validation — same shipping-address
// model, not a second copy of it.
const AddressForm = ({ user }: AddressFormProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const initial = toShippingAddress(user);

  const [value, setValue] = useState<ShippingAddress>(initial);
  const [errors, setErrors] = useState<ShippingAddressErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = JSON.stringify(value) !== JSON.stringify(initial);

  useUnsavedChangesGuard(hasChanges);

  const handleChange = (field: keyof ShippingAddress, fieldValue: string) => {
    setValue((prev) => ({ ...prev, [field]: fieldValue }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleCancel = () => {
    setValue(initial);
    setErrors({});
  };

  const handleSave = async () => {
    const validationErrors = validateShippingAddress(value);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please check your address fields');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      Object.entries(value).forEach(([key, fieldValue]) => formData.append(key, fieldValue));

      const { data } = await authService.updateProfile(formData);
      setUser(data.data);
      toast.success('Address updated');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not update address. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <AddressSection value={value} errors={errors} onChange={handleChange} />
      <ProfileActions
        isSaving={isSaving}
        hasChanges={hasChanges}
        onSave={handleSave}
        onCancel={handleCancel}
        saveLabel="Save Address"
      />
    </div>
  );
};

export { AddressForm };
