'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ProfileActions } from './ProfileActions';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { User } from '@/types/auth.types';

interface ProfileInfoProps {
  user: User;
}

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

// Phone lives on user.address.phone and is edited in AddressForm
// (its real backend home, bundled with the rest of the shipping
// fields) — shown here read-only so there's exactly one place that
// can actually save it, not two forms racing to overwrite each other.
const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const setUser = useAuthStore((state) => state.setUser);

  const [name, setName] = useState(user.name);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasChanges = name !== user.name || avatarFile !== null;

  useUnsavedChangesGuard(hasChanges);

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AVATAR_SIZE) {
      toast.error('Avatar must be under 2MB');
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const resetAvatarPreview = () => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleCancel = () => {
    setName(user.name);
    resetAvatarPreview();
  };

  const handleSave = async () => {
    if (!name.trim() || name.trim().length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      if (avatarFile) formData.append('avatar', avatarFile);

      const { data } = await authService.updateProfile(formData);
      setUser(data.data);
      resetAvatarPreview();
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="space-y-5">
      <h2 className="font-heading text-xl text-text">Profile Info</h2>

      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-warm-beige/30">
          <Image
            src={avatarPreview || user.avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="64px"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Change avatar"
            className="absolute inset-0 flex items-center justify-center bg-text/50 text-cream opacity-0 transition-opacity hover:opacity-100"
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleAvatarSelect}
          className="hidden"
        />
        <span className="font-body text-xs text-text/50">JPG, PNG or WEBP. Max 2MB.</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Phone" value={user.address?.phone || 'Not set'} disabled readOnly />
      </div>

      <Input label="Email" value={user.email} disabled readOnly />
      <p className="-mt-3 font-body text-xs text-text/40">
        Phone is edited in Shipping Address below. Email cannot be changed.
      </p>

      <ProfileActions isSaving={isSaving} hasChanges={hasChanges} onSave={handleSave} onCancel={handleCancel} />
    </Card>
  );
};

export { ProfileInfo };
