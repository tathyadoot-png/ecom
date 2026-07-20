'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { ProfileActions } from './ProfileActions';
import { authService } from '@/services/auth.service';
import {
  validateChangePasswordForm,
  ChangePasswordFormErrors,
  ChangePasswordFormValues,
} from '@/lib/validation';

const EMPTY_FORM: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const SecuritySection = () => {
  const [values, setValues] = useState<ChangePasswordFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<ChangePasswordFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = Object.values(values).some((value) => value !== '');

  const handleChange = (field: keyof ChangePasswordFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleCancel = () => {
    setValues(EMPTY_FORM);
    setErrors({});
  };

  const handleSave = async () => {
    const validationErrors = validateChangePasswordForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);
    try {
      await authService.changePassword(values.currentPassword, values.newPassword);
      toast.success('Password changed');
      setValues(EMPTY_FORM);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not change password. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="space-y-5">
      <div>
        <h2 className="font-heading text-xl text-text">Security</h2>
        <p className="mt-1 text-sm text-text/60 font-body">Change your password.</p>
      </div>

      <PasswordInput
        label="Current Password"
        autoComplete="current-password"
        value={values.currentPassword}
        onChange={(e) => handleChange('currentPassword', e.target.value)}
        error={errors.currentPassword}
      />
      <PasswordInput
        label="New Password"
        autoComplete="new-password"
        placeholder="At least 6 characters"
        value={values.newPassword}
        onChange={(e) => handleChange('newPassword', e.target.value)}
        error={errors.newPassword}
      />
      <PasswordInput
        label="Confirm New Password"
        autoComplete="new-password"
        value={values.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
      />

      <ProfileActions
        isSaving={isSaving}
        hasChanges={hasChanges}
        onSave={handleSave}
        onCancel={handleCancel}
        saveLabel="Change Password"
      />
    </Card>
  );
};

export { SecuritySection };
